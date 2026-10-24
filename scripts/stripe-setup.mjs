/**
 * Založí v Stripe produkty, ceny a zľavový kód pre členskú sekciu.
 * Idempotentné — opakované spustenie nič nezduplikuje.
 *
 *   node --env-file=.env.local scripts/stripe-setup.mjs
 */
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PACKETS = [
  { slug: 'teoria',       name: 'NRi Teória',           amount: 42000, desc: 'Prednáška, PDF materiály a návody.' },
  { slug: 'deti',         name: 'NRi Deti',             amount: 10000, desc: 'Práca s dieťaťom. Teória v cene.' },
  { slug: 'dospeli',      name: 'NRi Dospelí',          amount: 10000, desc: 'Práca s dospelým. Teória v cene.' },
  { slug: 'deti-dospeli', name: 'NRi Deti + Dospelí',   amount: 18000, desc: 'Oba praktické stupne. Teória v cene.' },
]

const COUPON = { id: 'nri-klient-80', amountOff: 8000, name: 'Individuálny klient −80 €' }
const PROMO_CODE = 'KLIENT2026'

const lookupKey = slug => `nri_${slug.replace(/-/g, '_')}`

for (const p of PACKETS) {
  const key = lookupKey(p.slug)
  const existing = await stripe.prices.list({ lookup_keys: [key], active: true, limit: 1 })

  if (existing.data[0]) {
    console.log(`= ${p.name} — cena už existuje (${existing.data[0].id})`)
    continue
  }

  const products = await stripe.products.search({ query: `metadata['nri_slug']:'${p.slug}'` })
  const product =
    products.data[0] ??
    (await stripe.products.create({
      name: p.name,
      description: p.desc,
      metadata: { nri_slug: p.slug },
    }))

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: p.amount,
    currency: 'eur',
    lookup_key: key,
  })
  console.log(`+ ${p.name} — ${p.amount / 100} € (${price.id})`)
}

// Pevná zľava, nie percentuálna: 100 → 20 €, 180 → 100 €.
let coupon
try {
  coupon = await stripe.coupons.retrieve(COUPON.id)
  console.log(`= kupón ${COUPON.id} už existuje`)
} catch {
  coupon = await stripe.coupons.create({
    id: COUPON.id,
    name: COUPON.name,
    amount_off: COUPON.amountOff,
    currency: 'eur',
    duration: 'once',
  })
  console.log(`+ kupón ${COUPON.id} — −${COUPON.amountOff / 100} €`)
}

const promos = await stripe.promotionCodes.list({ code: PROMO_CODE, limit: 1 })
if (promos.data[0]) {
  console.log(`= kód ${PROMO_CODE} už existuje`)
} else {
  // Novšie API verzie berú kupón zabalený v `promotion`, nie ako plochý `coupon`.
  await stripe.promotionCodes.create({
    promotion: { type: 'coupon', coupon: coupon.id },
    code: PROMO_CODE,
  })
  console.log(`+ kód ${PROMO_CODE}`)
}

console.log('\nHotovo.')
