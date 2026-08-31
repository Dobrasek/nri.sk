import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Lock } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { NRiBrand } from '@/components/shared/NRiBrand'
import BuyButton from '@/components/clenstvo/BuyButton'
import { PACKETS, TIER_META, TIERS, formatPrice } from '@/lib/clenstvo/packages'
import { getMyTiers } from '@/lib/clenstvo/access'

export const metadata: Metadata = {
  title: 'Členská sekcia — NRi | Teória, Deti, Dospelí',
  description:
    'Uzavretá členská sekcia NRi — teoretický základ, práca s dieťaťom a práca s dospelým. Videá, PDF materiály, hudba a návody na jednom mieste.',
}

export default async function ClenstvoPage() {
  const owned = await getMyTiers()

  return (
    <div className="theme-adults min-h-screen">
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div
              className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25"
              style={{ background: 'rgba(27,107,114,.1)' }}
            >
              Členská sekcia
            </div>
            <h1 className="font-jakarta text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Celá metóda <NRiBrand />
              <br />
              <span className="text-gradient-teal">na jednom mieste</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Prednášky, video návody, hudba a materiály na stiahnutie. Prístup platí natrvalo —
              nie je to predplatné, platíte raz.
            </p>
          </AnimatedSection>

          {owned.length > 0 && (
            <AnimatedSection className="mb-12">
              <div className="glass-card p-6 flex flex-wrap items-center justify-center gap-4">
                <p className="text-white/70">Máte odomknuté:</p>
                {owned.map(tier => (
                  <Link
                    key={tier}
                    href={`/clenstvo/${tier}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                    style={{
                      background: `${TIER_META[tier].accent}22`,
                      color: TIER_META[tier].accent,
                      border: `1px solid ${TIER_META[tier].accent}55`,
                    }}
                  >
                    <Check className="w-4 h-4" /> {TIER_META[tier].name}
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Tri stupne */}
          <AnimatedSection delay={100} className="grid md:grid-cols-3 gap-5 mb-16">
            {TIERS.map(tier => {
              const meta = TIER_META[tier]
              const unlocked = owned.includes(tier)
              return (
                <div key={tier} className="glass-card p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: meta.accent }}
                    >
                      Stupeň {TIERS.indexOf(tier) + 1}
                    </span>
                    {unlocked ? (
                      <Check className="w-4 h-4" style={{ color: meta.accent }} />
                    ) : (
                      <Lock className="w-4 h-4 text-white/25" />
                    )}
                  </div>
                  <h2 className="font-jakarta text-2xl font-bold text-white mb-3">{meta.name}</h2>
                  <p className="text-white/50 text-sm leading-relaxed">{meta.perex}</p>
                </div>
              )
            })}
          </AnimatedSection>

          {/* Balíčky */}
          <AnimatedSection delay={200}>
            <h2 className="font-jakarta text-2xl font-bold text-white text-center mb-3">
              Vyberte si prístup
            </h2>
            <p className="text-white/40 text-center text-sm mb-10">
              Teória je v cene každého praktického stupňa.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PACKETS.map(packet => {
                const alreadyOwned = packet.grants.every(t => owned.includes(t))
                return (
                  <div
                    key={packet.slug}
                    className={`glass-card p-7 flex flex-col ${
                      packet.featured ? 'ring-1 ring-[#2a9aa8]/40' : ''
                    }`}
                  >
                    {packet.featured && (
                      <div
                        className="section-label text-[#2a9aa8] self-start !mb-3"
                        style={{ background: 'rgba(27,107,114,.15)' }}
                      >
                        Najvýhodnejšie
                      </div>
                    )}
                    <h3 className="font-jakarta text-xl font-bold text-white mb-2">{packet.name}</h3>
                    <p className="font-jakarta text-3xl font-bold text-white mb-4">
                      {formatPrice(packet.amount)}
                    </p>
                    <p className="text-white/45 text-sm leading-relaxed mb-6 flex-1">
                      {packet.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {packet.grants.map(tier => (
                        <li key={tier} className="flex items-center gap-2 text-sm text-white/60">
                          <Check className="w-3.5 h-3.5 shrink-0" style={{ color: TIER_META[tier].accent }} />
                          {TIER_META[tier].name}
                        </li>
                      ))}
                    </ul>

                    {alreadyOwned ? (
                      <p className="text-center text-sm text-white/40 py-3">Už máte odomknuté</p>
                    ) : (
                      <BuyButton packetSlug={packet.slug} label="Kúpiť" />
                    )}
                  </div>
                )
              })}
            </div>

            <p className="text-white/35 text-sm text-center mt-8">
              Máte od nás zľavový kód? Zadáte ho na platobnej stránke.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
