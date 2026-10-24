import { drizzle } from 'drizzle-orm/node-postgres'
import { attachDatabasePool } from '@vercel/functions'
import { Pool } from 'pg'
import * as schema from './schema'

// Fluid compute drží inštanciu funkcie nažive medzi requestami, takže pool sa
// oplatí vytvoriť raz a nechať ho recyklovať. `attachDatabasePool` sa postará
// o čisté zavretie pri odstavení inštancie.
const globalForDb = globalThis as unknown as { pool?: Pool }

const pool =
  globalForDb.pool ??
  new Pool({ connectionString: process.env.DATABASE_URL, max: 5 })

if (!globalForDb.pool) {
  globalForDb.pool = pool
  attachDatabasePool(pool)
}

export const db = drizzle(pool, { schema })
export { schema }
