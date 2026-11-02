import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { getTranslation, type BlogLang, type BlogPost } from '@/lib/blog'
import BookingButton from '@/components/shared/BookingButton'
import { parseMarkdown } from '@/lib/markdown'
import LanguageSwitch from './LanguageSwitch'
import { blogBase, blogStrings, categoryStyle } from './strings'

export default function BlogPostView({ post, lang }: { post: BlogPost; lang: BlogLang }) {
  const t = blogStrings[lang]
  const cat = categoryStyle[post.category] ?? categoryStyle.veda
  const other: BlogLang = lang === 'sk' ? 'en' : 'sk'
  const translation = getTranslation(post, other)
  const hrefs = {
    [lang]: `${blogBase(lang)}/${post.slug}`,
    // Bez prekladu prepínač vedie na zoznam článkov v druhom jazyku.
    [other]: translation ? `${blogBase(other)}/${translation.slug}` : blogBase(other),
  } as Record<BlogLang, string>

  return (
    <div lang={t.htmlLang} className="bg-[#0b1524] min-h-screen pt-24">
      <div className="max-w-2xl mx-auto px-6 pb-28">
        <div className="flex items-center justify-between mb-10 mt-8">
          <Link
            href={blogBase(lang)}
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </Link>
          <LanguageSwitch current={lang} hrefs={hrefs} />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-jakarta font-700 px-2.5 py-1 rounded-full"
            style={{ color: cat.text, background: cat.bg }}
          >
            {t.categories[post.category] ?? t.categories.veda}
          </span>
          <span className="flex items-center gap-1.5 text-white/30 text-xs">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h1 className="font-jakarta font-800 text-white text-4xl leading-[1.1] mb-6">{post.title}</h1>
        <p className={`text-white/55 text-lg leading-relaxed border-b border-white/8 pb-10 ${post.author ? 'mb-0' : 'mb-10'}`}>
          {post.excerpt}
        </p>
        {post.author && (
          <p className="text-white/35 text-sm py-5 mb-5 border-b border-white/8">
            {t.by} <span className="text-white/60">{post.author}</span>
          </p>
        )}

        <div className="prose-custom" dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }} />

        <div
          className="mt-14 rounded-3xl p-8 text-center border"
          style={{ background: 'rgba(27,107,114,.08)', borderColor: 'rgba(27,107,114,.2)' }}
        >
          <p className="text-white/60 mb-4">{t.ctaText}</p>
          <BookingButton className="btn-primary">{t.ctaButton}</BookingButton>
        </div>
      </div>
    </div>
  )
}
