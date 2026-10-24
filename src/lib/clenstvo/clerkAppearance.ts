/**
 * Vzhľad Clerk komponentov — web je tmavý, Clerk je vo východzom stave svetlý.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: '#1b6b72',
    // Plné farby — Clerk z priesvitného pozadia odvodzuje svetlú tému a vyrobí
    // tmavé texty, ktoré na tmavom webe nie sú čitateľné.
    colorBackground: '#121e31',
    colorForeground: '#ffffff',
    colorMutedForeground: 'rgba(255,255,255,.65)',
    colorMuted: '#1b2a40',
    colorInput: '#1b2a40',
    colorInputForeground: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: 'rgba(255,255,255,.65)',
    colorNeutral: '#ffffff',
    colorShimmer: 'rgba(255,255,255,.12)',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-inter)',
  },
  elements: {
    cardBox: 'shadow-2xl',
    card: 'border border-white/10',
    formFieldInput: 'border border-white/15',
    headerTitle: 'font-jakarta',
    footer: 'bg-transparent',
    footerAction: 'bg-transparent',
    footerActionText: 'text-white/70',
    footerActionLink: 'text-[#3fb6c0] hover:text-white',
    footerPages: 'bg-transparent',
  },
} as const
