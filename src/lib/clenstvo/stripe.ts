import 'server-only'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Chýba STRIPE_SECRET_KEY')
}

// Inštancia klienta, nie globálny `Stripe.apiKey` — ten je vo všetkých
// súčasných SDK deprecated.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

/** Lookup key ceny v Stripe pre daný balíček — `scripts/stripe-setup.ts` ich zakladá. */
export function lookupKey(packetSlug: string): string {
  return `nri_${packetSlug.replace(/-/g, '_')}`
}

/**
 * Cena sa hľadá cez lookup key, nie cez natvrdo zapísané `price_…` id.
 * Keby cenu v Stripe niekto zmazal a založil znova, stačí jej dať rovnaký
 * lookup key a kód sa nemusí ani dotknúť.
 */
export async function findPriceId(packetSlug: string): Promise<string | null> {
  const prices = await stripe.prices.list({
    lookup_keys: [lookupKey(packetSlug)],
    active: true,
    limit: 1,
  })
  return prices.data[0]?.id ?? null
}
