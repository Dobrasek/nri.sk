import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts, getTranslation } from '@/lib/blog'
import BlogPostView from '@/components/blog/BlogPostView'

interface Props { params: Promise<{ slug: string }> }

// Články sa odomykajú podľa dátumu — stránky sa preto obnovujú každých 10 minút.
export const revalidate = 600

export async function generateStaticParams() {
  return getAllPosts('sk').map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, 'sk')
  if (!post) return {}
  const en = getTranslation(post, 'en')
  return {
    title: `${post.title} — NRi Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: en ? { sk: `/blog/${slug}`, en: `/en/blog/${en.slug}` } : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug, 'sk')
  if (!post) notFound()
  return <BlogPostView post={post} lang="sk" />
}
