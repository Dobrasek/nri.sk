import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Clock } from 'lucide-react'
import { TIER_META, isTier } from '@/lib/clenstvo/packages'
import { getMyTiers } from '@/lib/clenstvo/access'
import { getLesson } from '@/lib/clenstvo/content'
import { parseMarkdown } from '@/lib/markdown'
import LessonVideo from '@/components/clenstvo/LessonVideo'

interface Props { params: Promise<{ tier: string; lesson: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tier, lesson: slug } = await params
  if (!isTier(tier)) return {}
  const lesson = getLesson(tier, slug)
  return lesson ? { title: `${lesson.title} — NRi`, robots: { index: false } } : {}
}

export default async function LessonPage({ params }: Props) {
  const { tier, lesson: slug } = await params
  if (!isTier(tier)) notFound()

  const owned = await getMyTiers()
  if (!owned.includes(tier)) redirect('/clenstvo')

  const lesson = getLesson(tier, slug)
  if (!lesson) notFound()

  const meta = TIER_META[tier]
  const themeClass = meta.theme === 'kids' ? 'theme-kids' : 'theme-adults'
  const bg = meta.theme === 'kids' ? 'bg-[#0f1f18]' : 'bg-[#0b1524]'

  return (
    <div className={`${themeClass} ${bg} min-h-screen pt-32 pb-24 px-6`}>
      <article className="max-w-2xl mx-auto">
        <Link
          href={`/clenstvo/${tier}`}
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Späť na {meta.name}
        </Link>

        <h1 className="font-jakarta text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {lesson.title}
        </h1>
        {lesson.duration && (
          <p className="inline-flex items-center gap-1.5 text-white/35 text-sm mb-8">
            <Clock className="w-4 h-4" /> {lesson.duration}
          </p>
        )}

        {lesson.muxPlaybackId && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <LessonVideo playbackId={lesson.muxPlaybackId} title={lesson.title} accent={meta.accent} />
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(lesson.content) }} />

        {lesson.attachments?.length ? (
          <div className="mt-12 pt-10 border-t border-white/10">
            <h2 className="font-jakarta text-xl font-bold text-white mb-5">Na stiahnutie</h2>
            <div className="space-y-3">
              {lesson.attachments.map(file => (
                <a
                  key={file.href}
                  href={file.href}
                  className="glass-card p-4 flex items-center gap-4 group hover:bg-white/[.07] transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${meta.accent}22`, color: meta.accent }}
                  >
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{file.label}</p>
                    {file.meta && <p className="text-white/35 text-xs mt-0.5">{file.meta}</p>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </div>
  )
}
