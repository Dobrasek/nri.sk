import { NextResponse, type NextRequest } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { getPacket } from '@/lib/clenstvo/packages'
import { stripe, findPriceId } from '@/lib/clenstvo/stripe'
import { getTiersForUser } from '@/lib/clenstvo/access'

/** Náhodná prípona pre `integration_identifier` — Stripe ju chce 8-znakovú. */
function suffix(): string {
  const abc = 'abcdefghijklmnopqrstuvwxyz'
  return Array.from({ length: 8 }, () => abc[Math.floor(Math.random() * abc.length)]).join('')
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Musíte byť prihlásený.' }, { status: 401 })
  }

  const { packet: packetSlug } = await req.json()
  const packet = typeof packetSlug === 'string' ? getPacket(packetSlug) : undefined
  if (!packet) {
    return NextResponse.json({ error: 'Neznámy balíček.' }, { status: 400 })
  }

  // Kto už všetky stupne balíčka má, nemá čo platiť druhýkrát.
  const owned = await getTiersForUser(userId)
  if (packet.grants.every(t => owned.includes(t))) {
    return NextResponse.json({ error: 'Tento obsah už máte odomknutý.' }, { status: 409 })
  }

  const priceId = await findPriceId(packet.slug)
  if (!priceId) {
    console.error(`Stripe: chýba cena pre balíček ${packet.slug}`)
    return NextResponse.json(
      { error: 'Platba je dočasne nedostupná. Skúste neskôr alebo nás kontaktujte.' },
      { status: 503 },
    )
  }

  const user = await currentUser()
  const origin = req.nextUrl.origin

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    // Bez tohto by klienti s individuálnou dohodou nemali kam zadať kód.
    allow_promotion_codes: true,
    client_reference_id: userId,
    customer_email: user?.primaryEmailAddress?.emailAddress,
    metadata: { userId, packetSlug: packet.slug },
    // Prežije aj to, keď zákazník po zaplatení nikdy neotvorí success stránku —
    // nárok zapisuje webhook, toto je len kam ho poslať späť.
    success_url: `${origin}/clenstvo/dakujeme?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/clenstvo`,
    integration_identifier: `nri-clenstvo-${suffix()}`,
  })

  return NextResponse.json({ url: session.url })
}
