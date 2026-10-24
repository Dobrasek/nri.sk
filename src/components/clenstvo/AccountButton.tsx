'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Fingerprint, X } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

/**
 * Položka „Moje ID“ v menu účtu — ukáže ID používateľa, ktoré nám člen pošle,
 * aby sme mu ručne odomkli lekcie. Vlastné okno namiesto záložky v okne Clerku,
 * lebo to sa v Safari nevykreslilo. Po spustení platieb sa dá zrušiť.
 */
function UserIdDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Kopírovanie nie je dostupné — ID je označiteľné ručne.
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Moje ID"
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#121e31] p-8 text-center"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavrieť"
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="font-jakarta font-semibold text-white mb-2">Moje ID</p>
        <p className="text-sm text-white/65 mb-5">
          Ak vám máme odomknúť lekcie ručne, pošlite nám toto ID:
        </p>
        <p className="font-mono text-sm text-white break-all select-all rounded-lg bg-white/[.06] p-3">
          {id}
        </p>
        <button type="button" onClick={copy} className="btn-primary mt-5 w-full justify-center">
          {copied ? 'Skopírované ✓' : 'Skopírovať ID'}
        </button>
      </div>
    </div>,
    document.body,
  )
}

interface Props {
  avatarClass: string
  accent?: string
}

export default function AccountButton({ avatarClass, accent }: Props) {
  const { user } = useUser()
  const [open, setOpen] = useState(false)

  return (
    <>
      <UserButton
        appearance={{ elements: { avatarBox: avatarClass } }}
        userProfileProps={accent ? { appearance: { variables: { colorPrimary: accent } } } : undefined}
      >
        <UserButton.MenuItems>
          <UserButton.Action
            label="Moje ID"
            labelIcon={<Fingerprint size={16} />}
            onClick={() => setOpen(true)}
          />
        </UserButton.MenuItems>
      </UserButton>
      {open && user && <UserIdDialog id={user.id} onClose={() => setOpen(false)} />}
    </>
  )
}
