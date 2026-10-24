import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

// DOČASNÁ stránka — po zapísaní prístupu zmazať.
export const metadata: Metadata = { title: 'Moje ID — NRi', robots: { index: false } }

export default async function MojeIdPage() {
  const { userId } = await auth()

  return (
    <div className="theme-adults min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <div className="glass-card p-8 max-w-lg w-full text-center">
        {userId ? (
          <>
            <p className="text-white/70 mb-3">Vaše ID používateľa:</p>
            <p className="text-white font-mono text-lg break-all select-all">{userId}</p>
          </>
        ) : (
          <>
            <p className="text-white/70 mb-4">Nie ste prihlásený.</p>
            <Link href="/prihlasenie?redirect_url=%2Fmoje-id" className="btn-primary">
              Prihlásiť sa
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
