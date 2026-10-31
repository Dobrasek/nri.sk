'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Brain, LogIn, ChevronDown, KeyRound } from 'lucide-react'
import { Show } from '@clerk/nextjs'
import AccountButton from '@/components/clenstvo/AccountButton'
import { cn } from '@/lib/utils'
import { NRiBrand, renderNRi } from '@/components/shared/NRiBrand'
import { BookingDialog } from '@/components/shared/BookingButton'

// Jediná navigácia okrem prihlásenia a objednávky. Ostatné stránky (dospelí,
// deti, blog, materiály, kontakt) sú dostupné z úvodnej stránky a z pätičky.
const courseLinks: { href: string; label: string; disabled?: boolean }[] = [
  { href: '/vycvik', label: 'NRi pre praktikov' },
  { href: '/rodicia', label: 'NRi pre rodičov', disabled: true },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  // Dialóg drží navigácia, nie tlačidlo — mobilné menu sa pri otvorení zavrie
  // a tlačidlo s ním zmizne aj s vlastným stavom.
  const [booking, setBooking] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [courses, setCourses] = useState(false)
  const coursesRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isKids = pathname.startsWith('/deti')
  const coursesActive = courseLinks.some(l => !l.disabled && pathname.startsWith(l.href))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Rozbalená ponuka sa zavrie po kliknutí mimo, Escape aj po voľbe položky.
  useEffect(() => {
    if (!courses) return
    const onDown = (e: MouseEvent) => {
      if (!coursesRef.current?.contains(e.target as Node)) setCourses(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCourses(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [courses])

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

        {/* Kurzy + účet + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div
            ref={coursesRef}
            className="relative"
            onMouseEnter={() => setCourses(true)}
            onMouseLeave={() => setCourses(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={courses}
              // Najdenie myšou ponuku už otvorí — klik ju preto nesmie prepínať späť.
              onClick={() => setCourses(true)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-sm font-jakarta font-medium rounded-lg transition-all',
                coursesActive || courses
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/6'
              )}
            >
              Kurzy
              <ChevronDown className={cn('w-4 h-4 transition-transform', courses && 'rotate-180')} />
            </button>

            {courses && (
              // pt-2 drží ponuku „pripojenú“ k tlačidlu, aby ju hover nezavrel.
              <div className="absolute right-0 top-full pt-2 min-w-[14rem]">
                <div
                  role="menu"
                  className="rounded-xl border border-white/10 bg-[#0b1524]/98 backdrop-blur-xl shadow-xl shadow-black/30 p-1.5"
                >
                  {courseLinks.map(link =>
                    link.disabled ? (
                      <span
                        key={link.href}
                        role="menuitem"
                        aria-disabled="true"
                        title="Čoskoro"
                        className="block px-3.5 py-2.5 text-sm font-jakarta font-medium text-white/25 cursor-not-allowed select-none"
                      >
                        {renderNRi(link.label)}
                      </span>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setCourses(false)}
                        className={cn(
                          'block px-3.5 py-2.5 text-sm font-jakarta font-medium rounded-lg transition-all',
                          pathname.startsWith(link.href)
                            ? 'text-white bg-white/10'
                            : 'text-white/70 hover:text-white hover:bg-white/6'
                        )}
                      >
                        {renderNRi(link.label)}
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/clenstvo"
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 text-sm font-jakarta font-medium rounded-lg transition-all',
              pathname.startsWith('/clenstvo')
                ? 'text-white bg-white/10'
                : 'text-white/60 hover:text-white hover:bg-white/6'
            )}
          >
            <KeyRound className="w-4 h-4" /> Členská sekcia
          </Link>
          <Show when="signed-out">
            <Link
              href="/prihlasenie"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-jakarta font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/6 transition-all"
            >
              <LogIn className="w-4 h-4" /> Prihlásiť sa
            </Link>
          </Show>
          <Show when="signed-in">
            <AccountButton avatarClass="w-9 h-9" accent={accent} />
          </Show>
          <button
            type="button"
            onClick={() => setBooking(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-jakarta font-600 text-white rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${accent} 0%, #2a9aa8 100%)`,
              boxShadow: `0 4px 16px ${accent}55`,
            }}
          >
            Objednať sa
          </button>
        </div>

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
            <p className="px-4 pt-1 pb-1 text-[11px] font-jakarta font-semibold uppercase tracking-widest text-white/35">
              Kurzy
            </p>
            {courseLinks.map(link =>
              link.disabled ? (
                <span
                  key={link.href}
                  aria-disabled="true"
                  className="px-4 py-3 text-sm font-jakarta font-medium text-white/25 cursor-not-allowed select-none"
                >
                  {renderNRi(link.label)}
                </span>
              ) : (
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
                  {renderNRi(link.label)}
                </Link>
              )
            )}
            <Link
              href="/clenstvo"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 mt-1 text-sm font-jakarta font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/6 transition-all"
            >
              <KeyRound className="w-4 h-4" /> Členská sekcia
            </Link>
            <Show when="signed-out">
              <Link
                href="/prihlasenie"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-jakarta font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/6 transition-all"
              >
                <LogIn className="w-4 h-4" /> Prihlásiť sa
              </Link>
            </Show>
            <Show when="signed-in">
              <div className="px-4 py-3 flex items-center gap-3">
                <AccountButton avatarClass="w-8 h-8" />
                <span className="text-sm font-jakarta text-white/70">Môj účet</span>
              </div>
            </Show>
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
