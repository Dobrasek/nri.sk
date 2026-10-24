/**
 * Jednoduchý regex renderer Markdownu — rovnaký, aký používa blog.
 * Vstup píšeme my, nie návštevníci, takže sa výstup vkladá cez
 * `dangerouslySetInnerHTML` bez sanitizácie.
 */
export function parseMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="font-jakarta font-700 text-white text-xl mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-jakarta font-700 text-white text-2xl mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-jakarta font-800 text-white text-3xl mt-10 mb-5">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-600">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-white/80">$1</em>')
    .replace(/^- (.+)$/gm, '<li class="text-white/60 text-base leading-relaxed ml-4 list-disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul class="space-y-2 my-4">${m}</ul>`)
    .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="text-white/60 text-base leading-relaxed mb-4">$1</p>')
    .replace(/<p[^>]*><\/p>/g, '')
}
