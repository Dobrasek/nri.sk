'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NRiBrand } from '@/components/shared/NRiBrand'
import { BookingDialog } from '@/components/shared/BookingButton'

const navLinks = [
  { href: '/dospeli', label: 'Pre dospelých' },
  { href: '/deti', label: 'Pre deti & rodičov' },
  { href: '/blog', label: 'Blog' },
  { href: '/materialy', label: 'Materiály' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  // Dialóg drží navigácia, nie tlačidlo — mobilné menu sa pri otvorení zavrie
  // a tlačidlo s ním zmizne aj s vlastným stavom.
  const [booking, setBooking] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isKids = pathname.startsWith('/deti')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const accent = isKids ? '#2b8a62' : '#1b6b72'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0b1524]/95 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${accent} 0%, #2a9aa8 100%)` }}
          >
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <NRiBrand className="font-jakarta font-700 text-sm tracking-tight text-white" />
            <span className="font-jakarta text-[10px] tracking-wide uppercase text-white/50">
              Metóda
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium font-jakarta rounded-lg transition-all',
                pathname.startsWith(link.href)
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/6'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <button
          type="button"
          onClick={() => setBooking(true)}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-jakarta font-600 text-white rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${accent} 0%, #2a9aa8 100%)`,
            boxShadow: `0 4px 16px ${accent}55`,
          }}
        >
          Objednať sa
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg transition-all text-white/60 hover:text-white hover:bg-white/8"
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0b1524]/98 backdrop-blur-xl border-t border-white/8">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-4 py-3 text-sm font-jakarta font-medium rounded-lg transition-all',
                  pathname.startsWith(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/6'
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => { setOpen(false); setBooking(true) }}
              className="mt-2 px-4 py-3 text-sm font-jakarta font-600 text-white rounded-xl text-center"
              style={{ background: `linear-gradient(135deg, ${accent} 0%, #2a9aa8 100%)` }}
            >
              Objednať sa
            </button>
          </nav>
        </div>
      )}

      {booking && <BookingDialog onClose={() => setBooking(false)} />}
    </header>
  )
}
