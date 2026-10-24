import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, PlayCircle, FileText, Clock } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { TIER_META, TIERS, isTier } from '@/lib/clenstvo/packages'
import { getMyTiers } from '@/lib/clenstvo/access'
import { getLessons } from '@/lib/clenstvo/content'

interface Props { params: Promise<{ tier: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tier } = await params
  if (!isTier(tier)) return {}
  return { title: `${TIER_META[tier].name} — Členská sekcia NRi`, robots: { index: false } }
}

export default async function TierPage({ params }: Props) {
  const { tier } = await params
  if (!isTier(tier)) notFound()

  // Middleware overí, že je používateľ prihlásený; tu sa overuje, či na tento
  // konkrétny stupeň má nárok.
  const owned = await getMyTiers()
  if (!owned.includes(tier)) redirect('/clenstvo')

  const meta = TIER_META[tier]
  const lessons = getLessons(tier)
  const themeClass = meta.theme === 'kids' ? 'theme-kids' : 'theme-adults'
  const bg = meta.theme === 'kids' ? 'bg-[#0f1f18]' : 'bg-[#0b1524]'

  return (
    <div className={`${themeClass} ${bg} min-h-screen pt-32 pb-24 px-6`}>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/clenstvo"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Späť na členskú sekciu
        </Link>

        <AnimatedSection className="mb-12">
          <div
            className="section-label"
            style={{ color: meta.accent, background: `${meta.accent}1a`, border: `1px solid ${meta.accent}40` }}
          >
            Stupeň {TIERS.indexOf(tier) + 1}
          </div>
          <h1 className="font-jakarta text-4xl md:text-5xl font-bold text-white mb-4">{meta.name}</h1>
          <p className="text-white/50 text-lg max-w-2xl">{meta.perex}</p>
        </AnimatedSection>

        {lessons.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <p className="text-white/60">Obsah tohto stupňa sa práve pripravuje.</p>
            <p className="text-white/35 text-sm mt-2">Ozveme sa vám, akonáhle pribudne.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson, i) => (
              <AnimatedSection key={lesson.slug} delay={i * 60}>
                <Link
                  href={`/clenstvo/${tier}/${lesson.slug}`}
                  className="glass-card p-6 flex items-start gap-5 group hover:bg-white/[.07] transition-colors"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-jakarta font-bold"
                    style={{ background: `${meta.accent}22`, color: meta.accent }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-jakarta text-lg font-semibold text-white mb-1">
                      {lesson.title}
                    </h2>
                    <p className="text-white/45 text-sm leading-relaxed">{lesson.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-white/35">
                      {lesson.muxPlaybackId && (
                        <span className="inline-flex items-center gap-1.5">
                          <PlayCircle className="w-3.5 h-3.5" /> Video
                        </span>
                      )}
                      {lesson.duration && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                        </span>
                      )}
                      {lesson.attachments?.length ? (
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" /> {lesson.attachments.length} na stiahnutie
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/25 group-hover:text-white/60 transition-colors shrink-0 mt-1" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
