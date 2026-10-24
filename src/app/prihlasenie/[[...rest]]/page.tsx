import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'
import { clerkAppearance } from '@/lib/clenstvo/clerkAppearance'

export const metadata: Metadata = {
  title: 'Prihlásenie — NRi',
  robots: { index: false },
}

export default function SignInPage() {
  return (
    <div className="theme-adults min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <SignIn appearance={clerkAppearance} />
    </div>
  )
}
