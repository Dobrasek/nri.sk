import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts, getTranslation } from '@/lib/blog'
import BlogPostView from '@/components/blog/BlogPostView'

interface Props { params: Promise<{ slug: string }> }

// Články sa odomykajú podľa dátumu — stránky sa preto obnovujú každých 10 minút.
export const revalidate = 600

export async function generateStaticParams() {
  return getAllPosts('en').map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, 'en')
  if (!post) return {}
  const sk = getTranslation(post, 'sk')
  return {
    title: `${post.title} — NRi Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: sk ? { sk: `/blog/${sk.slug}`, en: `/en/blog/${slug}` } : undefined,
    },
  }
}

export default async function BlogPostPageEn({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug, 'en')
  if (!post) notFound()
  return <BlogPostView post={post} lang="en" />
}
