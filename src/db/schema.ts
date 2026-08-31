import { pgTable, text, timestamp, uniqueIndex, serial } from 'drizzle-orm/pg-core'

/**
 * Kto na aký stupeň má nárok.
 *
 * Nároky sa držia ako množina riadkov (používateľ × stupeň), nie ako číselná
 * úroveň. Kúpa balíčka „Deti" zapíše dva riadky — `teoria` a `deti` — takže
 * kontrola prístupu je vždy len otázka „existuje riadok?", nezávisle na tom,
 * ako sa balíčky v budúcnosti preskladajú.
 */
export const entitlements = pgTable(
  'entitlements',
  {
    id: serial('id').primaryKey(),
    /** Clerk user id (`user_…`). */
    userId: text('user_id').notNull(),
    /** 'teoria' | 'deti' | 'dospeli' */
    tier: text('tier').notNull(),
    /** Z ktorého balíčka nárok vznikol — kvôli dohľadateľnosti. */
    packetSlug: text('packet_slug').notNull(),
    /** 'stripe' pri nákupe, 'manual' keď prístup pridelí Jarda ručne. */
    source: text('source').notNull().default('stripe'),
    /** Stripe Checkout Session id — zároveň poistka proti dvojitému zápisu. */
    stripeSessionId: text('stripe_session_id'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => [uniqueIndex('entitlements_user_tier_idx').on(table.userId, table.tier)],
)

export type Entitlement = typeof entitlements.$inferSelect
