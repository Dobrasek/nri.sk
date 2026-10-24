'use client'

import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

/**
 * Záložka „Prístup“ v okne Spravovať účet — ukazuje ID používateľa, ktoré nám
 * člen pošle, aby sme mu ručne odomkli lekcie. Po spustení platieb sa dá zrušiť.
 */
function UserIdPanel() {
  const { user } = useUser()
  const [copied, setCopied] = useState(false)
  const id = user?.id ?? ''

  async function copy() {
    try {
      await navigator.clipboard.writeText(id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Kopírovanie nie je dostupné — ID je označiteľné ručne.
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
        Prístup k obsahu
      </h1>
      <p style={{ fontSize: '0.875rem', opacity: 0.75, marginBottom: '1rem' }}>
        Ak vám máme odomknúť lekcie ručne, pošlite nám toto ID:
      </p>
      <code
        style={{
          display: 'block',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          background: 'rgba(0,0,0,.06)',
          fontSize: '0.875rem',
          wordBreak: 'break-all',
          userSelect: 'all',
        }}
      >
        {id}
      </code>
      <button
        type="button"
        onClick={copy}
        style={{ marginTop: '0.75rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
      >
        {copied ? 'Skopírované ✓' : 'Skopírovať ID'}
      </button>
    </div>
  )
}

interface Props {
  avatarClass: string
  accent?: string
}

export default function AccountButton({ avatarClass, accent }: Props) {
  return (
    <UserButton
      appearance={{ elements: { avatarBox: avatarClass } }}
      userProfileProps={accent ? { appearance: { variables: { colorPrimary: accent } } } : undefined}
    >
      <UserButton.UserProfilePage
        label="Prístup"
        url="pristup"
        labelIcon={<KeyRound size={16} />}
      >
        <UserIdPanel />
      </UserButton.UserProfilePage>
    </UserButton>
  )
}
