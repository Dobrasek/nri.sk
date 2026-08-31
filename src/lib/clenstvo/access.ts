import 'server-only'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { entitlements } from '@/db/schema'
import { isTier, type Tier } from './packages'

/** Stupne, na ktoré má prihlásený používateľ nárok. Neprihlásený → prázdne. */
export async function getMyTiers(): Promise<Tier[]> {
  const { userId } = await auth()
  if (!userId) return []
  return getTiersForUser(userId)
}

export async function getTiersForUser(userId: string): Promise<Tier[]> {
  const rows = await db
    .select({ tier: entitlements.tier })
    .from(entitlements)
    .where(eq(entitlements.userId, userId))
  return rows.map(r => r.tier).filter(isTier)
}

export async function hasTier(tier: Tier): Promise<boolean> {
  return (await getMyTiers()).includes(tier)
}
