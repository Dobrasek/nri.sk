import Link from 'next/link'
import type { BlogLang } from '@/lib/blog'
import { blogStrings } from './strings'

interface Props {
  current: BlogLang
  /** Kam vedie prepínač pre každý jazyk (verzia článku, alebo zoznam). */
  hrefs: Record<BlogLang, string>
}

export default function LanguageSwitch({ current, hrefs }: Props) {
  return (
    <div
      role="group"
      aria-label={blogStrings[current].switchLabel}
      className="inline-flex rounded-full border border-white/10 p-0.5 text-xs font-jakarta font-700"
    >
      {(['sk', 'en'] as const).map(l => (
        <Link
          key={l}
          href={hrefs[l]}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? 'true' : undefined}
          className={`px-3 py-1 rounded-full transition-colors ${
            l === current ? 'bg-[#1b6b72] text-white' : 'text-white/45 hover:text-white'
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
