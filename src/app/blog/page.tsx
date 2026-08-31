import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — NRi | Neurobiológia, Rodičovstvo',
  description: 'Články o nervovom systéme, traume, NRi metóde, regulácii emócií a praktických tipoch pre dospelých aj deti.',
}

const categoryColors: Record<string, { text: string; bg: string; label: string }> = {
  dospeli: { text: '#2a9aa8', bg: 'rgba(27,107,114,.1)', label: 'Pre dospelých' },
  deti:    { text: '#2b8a62', bg: 'rgba(43,138,98,.1)',  label: 'Pre deti & rodičov' },
  veda:    { text: '#7a2d45', bg: 'rgba(122,45,69,.1)',  label: 'Neurobiológia' },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-[#0b1524] min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-6 pb-28">
        <AnimatedSection className="text-center mb-16 pt-8">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Blog
          </div>
          <h1 className="font-jakarta text-5xl font-700 text-white mb-4">
            Pochopiť nervový systém
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Články o neurobiológii, traume, NRi terapii a každodennej regulácii.
          </p>
        </AnimatedSection>

        {posts.length === 0 ? (
          <div className="text-center text-white/40 py-20">
            <div className="text-5xl mb-4">📝</div>
            <p>Čoskoro tu budú prvé články.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => {
              const cat = categoryColors[post.category] ?? categoryColors.veda
              return (
                <AnimatedSection key={post.slug} delay={i * 80}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block glass-card p-7 h-full hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-black/20"
                  >
                    <div
                      className="text-xs font-jakarta font-700 px-2.5 py-1 rounded-full inline-block mb-4"
                      style={{ color: cat.text, background: cat.bg }}
                    >
                      {cat.label}
                    </div>
                    <h2 className="font-jakarta font-700 text-white text-base leading-snug mb-3 group-hover:text-[#2a9aa8] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/45 text-sm leading-relaxed mb-5">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-white/30 text-xs">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#2a9aa8] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
