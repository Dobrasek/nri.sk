'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { ArrowRight, Loader2 } from 'lucide-react'

interface Props {
  packetSlug: string
  label: string
  kids?: boolean
}

export default function BuyButton({ packetSlug, label, kids }: Props) {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    // Nákup potrebuje účet — inak by nebolo ku komu nárok priradiť.
    if (!isSignedIn) {
      router.push(`/registracia?redirect_url=${encodeURIComponent('/clenstvo')}`)
      return
    }

    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/clenstvo/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packet: packetSlug }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Platbu sa nepodarilo otvoriť.')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Platbu sa nepodarilo otvoriť.')
      setBusy(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={!isLoaded || busy}
        className={`btn-primary w-full justify-center ${kids ? 'btn-kids' : ''} disabled:opacity-60`}
      >
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Otváram platbu…
          </>
        ) : (
          <>
            {label} <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {error && <p className="text-[#e08080] text-sm mt-3 text-center">{error}</p>}
    </div>
  )
}
