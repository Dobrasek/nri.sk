import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogLang = 'sk' | 'en'
export type BlogCategory = 'dospeli' | 'deti' | 'veda' | 'nri'

const contentRoot = path.join(process.cwd(), 'src/content/blog')

/** Slovenčina žije priamo v `src/content/blog/`, angličtina v podpriečinku `en/`. */
const dirFor = (lang: BlogLang) => (lang === 'en' ? path.join(contentRoot, 'en') : contentRoot)

export interface BlogPost {
  slug: string
  lang: BlogLang
  /** Spoločné ID článku v oboch jazykoch — páruje SK a EN verziu. */
  id?: string
  author?: string
  title: string
  excerpt: string
  date: string
  category: BlogCategory
  readTime: string
  content: string
}

const TZ = 'Europe/Bratislava'

/** Dnešný dátum (YYYY-MM-DD) podľa bratislavského času — články sa odomykajú o polnoci tam. */
export function todayInBratislava(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

/** Okamih (UTC), kedy v Bratislave nastane polnoc daného dňa YYYY-MM-DD. */
export function bratislavaMidnight(date: string): Date {
  const [y, m, d] = date.split('-').map(Number)
  const offsetAt = (t: number) => {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat('en-US', {
        timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
      }).formatToParts(new Date(t)).map(x => [x.type, Number(x.value)]),
    )
    return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - t
  }
  const guess = Date.UTC(y, m - 1, d)
  let t = guess - offsetAt(guess)
  t = guess - offsetAt(t)
  return new Date(t)
}

/** Na vývoji môže `BLOG_SHOW_UNPUBLISHED=1` odomknúť všetky články (náhľad). */
const showAll = () => process.env.BLOG_SHOW_UNPUBLISHED === '1' && process.env.NODE_ENV !== 'production'

export function isPublished(post: BlogPost): boolean {
  return showAll() || post.date <= todayInBratislava()
}

function readPost(lang: BlogLang, slug: string): BlogPost | null {
  const fullPath = path.join(dirFor(lang), `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  return { slug, lang, content, ...data } as BlogPost
}

function readAll(lang: BlogLang): BlogPost[] {
  const dir = dirFor(lang)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => readPost(lang, f.replace(/\.md$/, '')))
    .filter((p): p is BlogPost => p !== null)
}

/** Zverejnené články, najnovšie prvé. */
export function getAllPosts(lang: BlogLang = 'sk'): BlogPost[] {
  return readAll(lang)
    .filter(isPublished)
    .sort((a, b) => b.date.localeCompare(a.date))
}

/** Ešte nezverejnené články, najbližší prvý. */
export function getUpcomingPosts(lang: BlogLang = 'sk'): BlogPost[] {
  return readAll(lang)
    .filter(p => !isPublished(p))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Nezverejnený článok sa tvári, že neexistuje (404). */
export function getPostBySlug(slug: string, lang: BlogLang = 'sk'): BlogPost | null {
  const post = readPost(lang, slug)
  return post && isPublished(post) ? post : null
}

/** Verzia tohto článku v druhom jazyku (párovanie cez `id`), ak existuje. */
export function getTranslation(post: BlogPost, lang: BlogLang): BlogPost | null {
  if (!post.id) return null
  return getAllPosts(lang).find(p => p.id === post.id) ?? null
}
