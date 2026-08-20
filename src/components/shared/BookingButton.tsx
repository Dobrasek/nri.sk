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
        className={cn(
          'relative w-full max-w-md rounded-3xl p-7 border shadow-2xl',
          isKids ? 'bg-[#f8f7f4] border-black/8' : 'bg-[#101d30] border-white/10'
        )}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavrieť"
          className={cn(
            'absolute top-4 right-4 p-2 rounded-lg transition-colors',
            isKids ? 'text-black/35 hover:text-black/70' : 'text-white/40 hover:text-white'
          )}
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          className={cn(
            'font-jakarta text-2xl font-700 mb-2 pr-8',
            isKids ? 'text-[#1f2a2e]' : 'text-white'
          )}
        >
          Objednať termín
        </h2>
        <p className={cn('text-sm mb-7', isKids ? 'text-[#1f2a2e]/60' : 'text-white/50')}>
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
                  'flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border transition-all group',
                  isKids
                    ? 'bg-white border-black/8 hover:border-[#2b8a62]/50 hover:-translate-y-0.5'
                    : 'bg-white/4 border-white/10 hover:border-[#2a9aa8]/50 hover:bg-white/8 hover:-translate-y-0.5'
                )}
              >
                <span className="flex flex-col text-left">
                  <span
                    className={cn(
                      'font-jakarta font-600 text-[15px]',
                      isKids ? 'text-[#1f2a2e]' : 'text-white'
                    )}
                  >
                    {svc.label}
                  </span>
                  <span className={cn('text-xs mt-0.5', isKids ? 'text-[#1f2a2e]/50' : 'text-white/45')}>
                    {svc.note}
                  </span>
                </span>
                <ArrowRight
                  className={cn(
                    'w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1',
                    isKids ? 'text-[#2b8a62]' : 'text-[#2a9aa8]'
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
