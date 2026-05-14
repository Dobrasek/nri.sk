import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: 'dospeli' | 'deti' | 'veda'
  readTime: string
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  return files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, filename)
    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
    return { slug, content, ...data } as BlogPost
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  return { slug, content, ...data } as BlogPost
}
