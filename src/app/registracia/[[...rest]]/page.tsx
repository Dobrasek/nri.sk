import type { Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'
import { clerkAppearance } from '@/lib/clenstvo/clerkAppearance'

export const metadata: Metadata = {
  title: 'Registrácia — NRi',
  robots: { index: false },
}

export default function SignUpPage() {
  return (
    <div className="theme-adults min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <SignUp appearance={clerkAppearance} />
    </div>
  )
}
