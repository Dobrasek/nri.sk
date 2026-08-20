'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BOOKING_SERVICES, bookingUrl, type BookingService } from '@/lib/booking'

type Props = {
  /** Ak je známe, pre koho sa objednáva, ide sa rovno do kalendára danej terapie. */
  service?: BookingService
  className?: string
  children: React.ReactNode
}

export default function BookingButton({ service, className, children }: Props) {
  const [open, setOpen] = useState(false)

  if (service) {
    return (
      <a href={bookingUrl(service)} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && <BookingDialog onClose={() => setOpen(false)} />}
    </>
  )
}

export function BookingDialog({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const isKids = pathname.startsWith('/deti')
  // Zavretie klávesou a zamknutý scroll pozadia — dialóg je fixed cez celú stranu,
  // bez toho by sa pod ním dala rolovať stránka.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const options: BookingService[] = ['child', 'adult']

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
      style={{ background: 'rgba(3,9,17,.72)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Objednanie termínu"
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-7 border shadow-2xl"
        style={{
          background: isKids ? '#132a20' : '#101d30',
          borderColor: isKids ? 'rgba(43,138,98,.25)' : 'rgba(255,255,255,.1)',
          boxShadow: '0 8px 40px rgba(0,0,0,.4)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavrieť"
          className="absolute top-4 right-4 p-2 rounded-lg text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-jakarta text-2xl font-700 mb-2 pr-8 text-white">
          Objednať termín
        </h2>
        <p className="text-sm mb-7 text-white/50">
          Vyberte, pre koho je stretnutie. Otvorí sa rezervačný kalendár s voľnými termínmi.
        </p>

        <div className="flex flex-col gap-3">
          {options.map(key => {
            const svc = BOOKING_SERVICES[key]
            return (
              <a
                key={key}
                href={bookingUrl(key)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border bg-white/5 transition-all hover:bg-white/8 hover:-translate-y-0.5 group',
                  isKids
                    ? 'border-[#2b8a62]/25 hover:border-[#2b8a62]/60'
                    : 'border-white/10 hover:border-[#2a9aa8]/50'
                )}
              >
                <span className="flex flex-col text-left">
                  <span className="font-jakarta font-600 text-[15px] text-white">
                    {svc.label}
                  </span>
                  <span className="text-xs mt-0.5 text-white/45">
                    {svc.note}
                  </span>
                </span>
                <ArrowRight
                  className={cn(
                    'w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1',
                    isKids ? 'text-[#3db882]' : 'text-[#2a9aa8]'
                  )}
                />
              </a>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}
