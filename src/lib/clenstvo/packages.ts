/**
 * Členská sekcia — stupne a predajné balíčky.
 *
 * Stupne sú tri, ale balíčkov je viac než stupňov: teória sa pribaľuje zadarmo
 * ku všetkému, a deti+dospelí sa dajú kúpiť spolu lacnejšie. Preto sa
 * `grants` drží pri balíčku, nie pri stupni — čo kto vidí, je vždy zjednotenie
 * `grants` všetkých balíčkov, ktoré si kúpil.
 */

export const TIERS = ['teoria', 'deti', 'dospeli'] as const
export type Tier = (typeof TIERS)[number]

export interface TierMeta {
  slug: Tier
  name: string
  perex: string
  /** Ktorá téma webu sa na stránke stupňa použije. */
  theme: 'adults' | 'kids'
  accent: string
}

export const TIER_META: Record<Tier, TierMeta> = {
  teoria: {
    slug: 'teoria',
    name: 'Teória',
    perex: 'Prednáška, PDF materiály a návody — neurobiologický základ, na ktorom stoja oba ďalšie stupne.',
    theme: 'adults',
    accent: '#1b6b72',
  },
  deti: {
    slug: 'deti',
    name: 'Deti',
    perex: 'Špecifiká práce s dieťaťom — video návody, hudba, PDF dokumenty.',
    theme: 'kids',
    accent: '#2b8a62',
  },
  dospeli: {
    slug: 'dospeli',
    name: 'Dospelí',
    perex: 'Špecifiká práce s dospelým — video návody, hudba, PDF dokumenty.',
    theme: 'adults',
    accent: '#7a2d45',
  },
}

export interface Packet {
  slug: string
  name: string
  /** Cena v centoch — Stripe počíta v najmenšej jednotke meny. */
  amount: number
  currency: 'eur'
  /** Stupne, ktoré tento balíček odomkne. Teória je vždy medzi nimi. */
  grants: readonly Tier[]
  description: string
  /** Zvýrazniť v ponuke ako odporúčanú voľbu. */
  featured?: boolean
}

export const PACKETS: readonly Packet[] = [
  {
    slug: 'teoria',
    name: 'Teória',
    amount: 42000,
    currency: 'eur',
    grants: ['teoria'],
    description: 'Samotný teoretický základ, bez praktických stupňov.',
  },
  {
    slug: 'deti',
    name: 'Deti',
    amount: 10000,
    currency: 'eur',
    grants: ['teoria', 'deti'],
    description: 'Práca s dieťaťom. Teória je v cene.',
  },
  {
    slug: 'dospeli',
    name: 'Dospelí',
    amount: 10000,
    currency: 'eur',
    grants: ['teoria', 'dospeli'],
    description: 'Práca s dospelým. Teória je v cene.',
  },
  {
    slug: 'deti-dospeli',
    name: 'Deti + Dospelí',
    amount: 18000,
    currency: 'eur',
    grants: ['teoria', 'deti', 'dospeli'],
    description: 'Oba praktické stupne naraz, o 20 € lacnejšie. Teória je v cene.',
    featured: true,
  },
]

export function getPacket(slug: string): Packet | undefined {
  return PACKETS.find(p => p.slug === slug)
}

export function isTier(value: string): value is Tier {
  return (TIERS as readonly string[]).includes(value)
}

/** 42000 → "420 €" */
export function formatPrice(amount: number): string {
  const whole = amount / 100
  return `${Number.isInteger(whole) ? whole : whole.toFixed(2)} €`
}
