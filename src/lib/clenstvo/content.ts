import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Tier } from './packages'

const contentRoot = path.join(process.cwd(), 'src/content/clenstvo')

export interface Attachment {
  /** Zobrazený názov, napr. „Checklist dysregulácie". */
  label: string
  /** Cesta k súboru vo Vercel Blob (privátny), alebo relatívna cesta v /public. */
  href: string
  /** Napr. „PDF · 4 strany". */
  meta?: string
}

export interface Lesson {
  slug: string
  tier: Tier
  title: string
  excerpt: string
  /** Poradie v zozname; nižšie číslo je vyššie. */
  order: number
  /** Mux playback id, ak k lekcii patrí video. */
  muxPlaybackId?: string
  /** Dĺžka videa/lekcie, napr. „12 min". */
  duration?: string
  attachments?: Attachment[]
  content: string
}

function tierDir(tier: Tier): string {
  return path.join(contentRoot, tier)
}

export function getLessons(tier: Tier): Lesson[] {
  const dir = tierDir(tier)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const { data, content } = matter(fs.readFileSync(path.join(dir, filename), 'utf8'))
      return { slug, tier, content, order: 0, ...data } as Lesson
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'sk'))
}

export function getLesson(tier: Tier, slug: string): Lesson | null {
  const fullPath = path.join(tierDir(tier), `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  return { slug, tier, content, order: 0, ...data } as Lesson
}
