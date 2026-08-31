import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/clenstvo/stripe'
import { getPacket, isTier } from '@/lib/clenstvo/packages'
import { db } from '@/db'
import { entitlements } from '@/db/schema'

/**
 * Prístup sa prideľuje tu, nie na success stránke — zákazník ju nemusí nikdy
 * otvoriť (zavrie mobil, stratí signál) a nárok by sa stratil.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('Chýba STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'not configured' }, { status: 500 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'missing signature' }, { status: 400 })
  }

  // Podpis sa overuje nad surovým telom — akýkoľvek JSON parse pred tým
  // by overenie rozbil.
  const raw = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(raw, signature, secret)
  } catch (err) {
    console.error('Stripe webhook: neplatný podpis', err)
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 })
  }

  // `completed` príde pri okamžitých platbách; pri odložených (bankový prevod)
  // dorazí ešte nezaplatené a nárok smie vzniknúť až z `async_payment_succeeded`.
  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object
    if (session.payment_status !== 'unpaid') {
      await grantAccess(session)
    }
  }

  if (event.type === 'checkout.session.async_payment_failed') {
    const session = event.data.object
    console.warn(`Stripe: platba zlyhala pre session ${session.id}`)
  }

  return NextResponse.json({ received: true })
}

async function grantAccess(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId ?? session.client_reference_id
  const packetSlug = session.metadata?.packetSlug

  if (!userId || !packetSlug) {
    console.error(`Stripe: session ${session.id} bez userId/packetSlug`)
    return
  }

  const packet = getPacket(packetSlug)
  if (!packet) {
    console.error(`Stripe: session ${session.id} s neznámym balíčkom ${packetSlug}`)
    return
  }

  const rows = packet.grants.filter(isTier).map(tier => ({
    userId,
    tier,
    packetSlug: packet.slug,
    source: 'stripe',
    stripeSessionId: session.id,
  }))

  // Stripe doručuje udalosti aspoň raz, takže rovnaká session môže doraziť
  // dvakrát. Unique index (user, tier) z toho robí no-op.
  await db.insert(entitlements).values(rows).onConflictDoNothing()

  console.log(`Prístup pridelený: ${userId} → ${packet.grants.join(', ')}`)
}
