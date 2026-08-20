import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { ArrowLeft, Clock } from 'lucide-react'
import BookingButton from '@/components/shared/BookingButton'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: `${post.title} — NRI Blog`, description: post.excerpt }
}

function parseMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="font-jakarta font-700 text-white text-xl mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-jakarta font-700 text-white text-2xl mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-jakarta font-800 text-white text-3xl mt-10 mb-5">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-600">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-white/80">$1</em>')
    .replace(/^- (.+)$/gm, '<li class="text-white/60 text-base leading-relaxed ml-4 list-disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul class="space-y-2 my-4">${m}</ul>`)
    .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="text-white/60 text-base leading-relaxed mb-4">$1</p>')
    .replace(/<p[^>]*><\/p>/g, '')
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const categoryColors: Record<string, { text: string; bg: string; label: string }> = {
    dospeli: { text: '#2a9aa8', bg: 'rgba(27,107,114,.1)', label: 'Pre dospelých' },
    deti:    { text: '#2b8a62', bg: 'rgba(43,138,98,.1)',  label: 'Pre deti & rodičov' },
    veda:    { text: '#7a2d45', bg: 'rgba(122,45,69,.1)',  label: 'Neurobiológia' },
  }
  const cat = categoryColors[post.category] ?? categoryColors.veda

  return (
    <div className="bg-[#0b1524] min-h-screen pt-24">
      <div className="max-w-2xl mx-auto px-6 pb-28">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors mt-8"
        >
          <ArrowLeft className="w-4 h-4" /> Späť na blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-jakarta font-700 px-2.5 py-1 rounded-full"
            style={{ color: cat.text, background: cat.bg }}
          >
            {cat.label}
          </span>
          <span className="flex items-center gap-1.5 text-white/30 text-xs">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h1 className="font-jakarta font-800 text-white text-4xl leading-[1.1] mb-6">
          {post.title}
        </h1>
        <p className="text-white/55 text-lg leading-relaxed mb-10 border-b border-white/8 pb-10">
          {post.excerpt}
        </p>

        {/* Content */}
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />

        {/* CTA */}
        <div
          className="mt-14 rounded-3xl p-8 text-center border"
          style={{ background: 'rgba(27,107,114,.08)', borderColor: 'rgba(27,107,114,.2)' }}
        >
          <p className="text-white/60 mb-4">Chcete sa dozvedieť viac osobne?</p>
          <BookingButton className="btn-primary">
            Objednať sa na sedenie
          </BookingButton>
        </div>
      </div>
    </div>
  )
}
