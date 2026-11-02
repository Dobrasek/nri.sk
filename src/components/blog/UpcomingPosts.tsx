import { getUpcomingPosts, bratislavaMidnight, type BlogLang } from '@/lib/blog'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Countdown from './Countdown'
import { blogStrings } from './strings'

function formatDate(date: string, lang: BlogLang) {
  const sameYear = date.slice(0, 4) === new Date().getFullYear().toString()
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'sk-SK', {
    day: 'numeric', month: 'long', year: sameYear ? undefined : 'numeric', timeZone: 'UTC',
  })
}

export default function UpcomingPosts({ lang }: { lang: BlogLang }) {
  const t = blogStrings[lang]
  const [next, ...rest] = getUpcomingPosts(lang)
  if (!next) return null

  return (
    <AnimatedSection className="mt-20">
      <div className="text-center mb-8">
        <div
          className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
          style={{ background: 'rgba(27,107,114,.1)' }}
        >
          {t.upcoming}
        </div>
        <h2 className="font-jakarta text-3xl font-700 text-white">{t.nextArticle}</h2>
      </div>

      <div
        className="max-w-2xl mx-auto rounded-3xl p-8 text-center border"
        style={{ background: 'rgba(27,107,114,.08)', borderColor: 'rgba(27,107,114,.2)' }}
      >
        <p className="text-white/40 text-sm mb-2">{formatDate(next.date, lang)}</p>
        <p className="font-jakarta font-700 text-white text-xl leading-snug mb-6">{next.title}</p>
        <Countdown target={bratislavaMidnight(next.date).toISOString()} labels={t.countdown} />
      </div>

      {rest.length > 0 && (
        <div className="max-w-2xl mx-auto mt-10">
          <h3 className="font-jakarta font-700 text-white/70 text-sm mb-4">{t.moreTopics}</h3>
          <ul className="divide-y divide-white/8 border-y border-white/8">
            {rest.map(p => (
              <li key={p.slug} className="flex items-baseline justify-between gap-6 py-3">
                <span className="text-white/60 text-sm">{p.title}</span>
                <span className="text-white/30 text-xs whitespace-nowrap">{formatDate(p.date, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </AnimatedSection>
  )
}
