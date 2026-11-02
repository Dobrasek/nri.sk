import type { Metadata } from 'next'
import BlogIndex from '@/components/blog/BlogIndex'

// Články sa odomykajú podľa dátumu — stránky sa preto obnovujú každých 10 minút.
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Blog — NRi | Neurobiológia, Rodičovstvo',
  description: 'Články o nervovom systéme, traume, NRi metóde, regulácii emócií a praktických tipoch pre dospelých aj deti.',
  alternates: { canonical: '/blog', languages: { sk: '/blog', en: '/en/blog' } },
}

export default function BlogPage() {
  return <BlogIndex lang="sk" />
}
