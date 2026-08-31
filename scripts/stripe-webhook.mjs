/**
 * Založí (alebo nájde) webhook endpoint pre členskú sekciu a vypíše jeho
 * signing secret. Ten patrí do STRIPE_WEBHOOK_SECRET.
 *
 *   node --env-file=.env.local scripts/stripe-webhook.mjs https://www.nri.sk
 */
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const origin = process.argv[2]
if (!origin) {
  console.error('Použitie: node --env-file=.env.local scripts/stripe-webhook.mjs <origin>')
  process.exit(1)
}
const url = `${origin.replace(/\/$/, '')}/api/stripe/webhook`

const EVENTS = [
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
]

const existing = await stripe.webhookEndpoints.list({ limit: 100 })
const found = existing.data.find(e => e.url === url)

if (found) {
  console.log(`= endpoint už existuje: ${found.id}`)
  console.log('  Secret sa dá prečítať len pri vytvorení. Ak ho nemáš, zmaž endpoint a spusti znova.')
} else {
  const created = await stripe.webhookEndpoints.create({
    url,
    enabled_events: EVENTS,
    description: 'NRi členská sekcia — prideľovanie prístupu',
  })
  console.log(`+ endpoint ${created.id} → ${url}`)
  console.log(`\nSTRIPE_WEBHOOK_SECRET=${created.secret}`)
}
