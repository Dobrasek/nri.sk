import type { Metadata } from 'next'
import BlogIndex from '@/components/blog/BlogIndex'

// Články sa odomykajú podľa dátumu — stránky sa preto obnovujú každých 10 minút.
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Blog — NRi | Neurobiology & Nervous System Regulation',
  description: 'Articles on the nervous system, trauma, the NRI method, emotional regulation and practical tips for adults and children.',
  alternates: { canonical: '/en/blog', languages: { sk: '/blog', en: '/en/blog' } },
}

export default function BlogPageEn() {
  return <BlogIndex lang="en" />
}
