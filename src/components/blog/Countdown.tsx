'use client'

import { useEffect, useState } from 'react'

interface Props {
  /** ISO čas, kedy sa článok odomkne. */
  target: string
  labels: { days: string; hours: string; minutes: string; seconds: string; done: string; reload: string }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Countdown({ target, labels }: Props) {
  // Pred mountom nič nerátame, aby sa server a klient nerozišli (hydration).
  const [left, setLeft] = useState<number | null>(null)

  useEffect(() => {
    const end = new Date(target).getTime()
    const tick = () => setLeft(Math.max(0, end - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  if (left === null) return <div className="h-[72px]" aria-hidden />

  if (left === 0) {
    return (
      <div className="text-white/70 text-sm">
        {labels.done}{' '}
        <button onClick={() => window.location.reload()} className="underline text-[#2a9aa8] hover:text-white">
          {labels.reload}
        </button>
      </div>
    )
  }

  const s = Math.floor(left / 1000)
  const parts: [number, string][] = [
    [Math.floor(s / 86400), labels.days],
    [Math.floor((s % 86400) / 3600), labels.hours],
    [Math.floor((s % 3600) / 60), labels.minutes],
    [s % 60, labels.seconds],
  ]

  return (
    <div role="timer" className="flex gap-3 justify-center">
      {parts.map(([n, label]) => (
        <div key={label} className="min-w-[64px] rounded-2xl px-3 py-2 bg-white/5 border border-white/10 text-center">
          <div className="font-jakarta font-800 text-white text-2xl tabular-nums">{pad(n)}</div>
          <div className="text-white/40 text-[11px] uppercase tracking-wide">{label}</div>
        </div>
      ))}
    </div>
  )
}
