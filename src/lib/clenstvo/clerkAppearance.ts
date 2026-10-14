/**
 * Vzhľad Clerk komponentov — web je tmavý, Clerk je vo východzom stave svetlý.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: '#1b6b72',
    colorBackground: 'rgba(255,255,255,.04)',
    colorText: '#ffffff',
    colorTextSecondary: 'rgba(255,255,255,.55)',
    colorInputBackground: 'rgba(255,255,255,.06)',
    colorInputText: '#ffffff',
    colorNeutral: '#ffffff',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-inter)',
  },
  elements: {
    cardBox: 'shadow-2xl',
    card: 'bg-white/[.04] backdrop-blur-xl border border-white/10',
    headerTitle: 'font-jakarta',
    footer: 'bg-transparent',
  },
} as const
