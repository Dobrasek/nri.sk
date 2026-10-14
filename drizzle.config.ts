import type { Config } from 'drizzle-kit'

// Migrácie idú priamo, nie cez pooler — PgBouncer v transaction móde
// nezvláda session-level príkazy, ktoré migrácie potrebujú.
export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL_UNPOOLED! },
} satisfies Config
