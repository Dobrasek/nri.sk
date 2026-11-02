import type { BlogCategory, BlogLang } from '@/lib/blog'

export const blogBase = (lang: BlogLang) => (lang === 'en' ? '/en/blog' : '/blog')

export const blogStrings = {
  sk: {
    label: 'Blog',
    heading: 'Pochopiť nervový systém',
    intro: 'Články o neurobiológii, traume, NRi terapii a každodennej regulácii.',
    empty: 'Čoskoro tu budú prvé články.',
    back: 'Späť na blog',
    ctaText: 'Chcete sa dozvedieť viac osobne?',
    ctaButton: 'Objednať sa na sedenie',
    switchLabel: 'Jazyk',
    by: 'Autorka',
    upcoming: 'Pripravujeme',
    nextArticle: 'Ďalší článok o',
    moreTopics: 'Ďalšie témy v rade',
    countdown: { days: 'dní', hours: 'hodín', minutes: 'minút', seconds: 'sekúnd', done: 'Nový článok je už online.', reload: 'Obnoviť stránku' },
    htmlLang: 'sk',
    categories: {
      nri: 'Metóda NRI',
      dospeli: 'Pre dospelých',
      deti: 'Pre deti & rodičov',
      veda: 'Neurobiológia',
    },
  },
  en: {
    label: 'Blog',
    heading: 'Understanding the nervous system',
    intro: 'Articles on neurobiology, trauma, NRI therapy and everyday regulation.',
    empty: 'The first articles are coming soon.',
    back: 'Back to the blog',
    ctaText: 'Want to learn more in person?',
    ctaButton: 'Book a session',
    switchLabel: 'Language',
    by: 'By',
    upcoming: 'Coming soon',
    nextArticle: 'Next article in',
    moreTopics: 'More topics in the series',
    countdown: { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds', done: 'A new article is online.', reload: 'Reload page' },
    htmlLang: 'en',
    categories: {
      nri: 'The NRI method',
      dospeli: 'For adults',
      deti: 'For children & parents',
      veda: 'Neurobiology',
    },
  },
} satisfies Record<BlogLang, { categories: Record<BlogCategory, string> } & Record<string, unknown>>

export const categoryStyle: Record<BlogCategory, { text: string; bg: string }> = {
  nri:     { text: '#2a9aa8', bg: 'rgba(27,107,114,.1)' },
  dospeli: { text: '#2a9aa8', bg: 'rgba(27,107,114,.1)' },
  deti:    { text: '#2b8a62', bg: 'rgba(43,138,98,.1)' },
  veda:    { text: '#7a2d45', bg: 'rgba(122,45,69,.1)' },
}
