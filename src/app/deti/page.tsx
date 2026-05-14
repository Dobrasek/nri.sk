import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/shared/AnimatedSection'
import BreathingCircle from '@/components/shared/BreathingCircle'
import WhatYouSeeAtHome from '@/components/children/WhatYouSeeAtHome'
import InteractiveBrainChild from '@/components/children/InteractiveBrainChild'
import BrainActivities from '@/components/children/BrainActivities'
import NRITherapyChild from '@/components/children/NRITherapyChild'

export const metadata: Metadata = {
  title: 'NRi pre deti — ADHD, PAS, Hypersenzitivita, Reč, Motorika',
  description: 'NRi pre deti — ADHD, porucha autistického spektra, hypersenzitivita, oneskorená reč, motorické ťažkosti, dysregulácia. Pomáhame nervovému systému dieťaťa nájsť bezpečie cez rytmus, pohyb a hudbu.',
}

const conditions = [
  { icon: '🌀', label: 'ADHD' },
  { icon: '🌈', label: 'PAS / Autizmus' },
  { icon: '👂', label: 'Hypersenzitivita' },
  { icon: '🗣️', label: 'Oneskorená reč' },
  { icon: '🤸', label: 'Motorické ťažkosti' },
  { icon: '💥', label: 'Emocionálne výbuchy' },
  { icon: '😴', label: 'Poruchy spánku' },
  { icon: '🌊', label: 'Dysregulácia' },
  { icon: '⚖️', label: 'Vestibulárny systém' },
  { icon: '🎯', label: 'Propriocepcia' },
  { icon: '🧊', label: 'Trauma' },
  { icon: '🧩', label: 'PVL & Dyspraxia' },
]

export default function DetiPage() {
  return (
    <div className="bg-[#0f1f18]">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: 'linear-gradient(135deg, #0f1f18 0%, #0d2218 50%, #12172a 100%)' }}
      >
        {/* Decorative glows */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #3db882, transparent)' }} />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #9b7ec8, transparent)' }} />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center py-20">
          <AnimatedSection direction="left">
            <div
              className="section-label text-[#2b8a62] border border-[#2b8a62]/30 mb-6"
              style={{ background: 'rgba(43,138,98,.12)' }}
            >
              Pre deti & rodičov
            </div>
            <h1 className="font-jakarta text-5xl md:text-6xl font-800 text-white mb-6 leading-[1.05]">
              Dieťa nie je
              <br />
              <span className="text-gradient-green">„problémové".</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Výbuchy, hypersenzitivita, problémy s rečou alebo spánkom — to sú signály nervového systému dieťaťa. Pohybom, rytmom a hrou ho môžeme naučiť byť v bezpečí.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://complex-diagnostic.eu/objednani-terminu-vysetreni/" target="_blank" rel="noopener noreferrer" className="btn-primary btn-kids px-8 py-4">
                Objednať dieťa
              </a>
              <a
                href="#doma"
                className="px-8 py-4 text-sm font-jakarta font-500 text-white/55 hover:text-white border border-white/15 hover:border-white/30 rounded-xl transition-all"
              >
                Čo vidíme doma
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="flex justify-center">
            <div className="relative">
              <BreathingCircle size={200} color="#2b8a62" />
              {[
                { label: '🎵 Rytmus', top: '-1rem', right: '-3rem', color: '#2b8a62' },
                { label: '⚖️ Rovnováha', bottom: '-1rem', left: '-3rem', color: '#3474b8' },
                { label: '🤲 Pohyb', top: '40%', right: '-4.5rem', color: '#8060c0' },
              ].map(chip => (
                <div
                  key={chip.label}
                  className="absolute px-3 py-1.5 rounded-xl text-xs font-jakarta font-600 text-white"
                  style={{
                    top: chip.top, right: chip.right, bottom: chip.bottom, left: chip.left,
                    background: `${chip.color}50`,
                    border: `1px solid ${chip.color}60`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {chip.label}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Conditions cloud */}
        <div className="absolute bottom-0 left-0 right-0 py-8 px-6 backdrop-blur-sm border-t border-white/6" style={{ background: 'rgba(0,0,0,.25)' }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-white/30 text-xs font-jakarta uppercase tracking-wide mb-4 text-center">
              Pracujeme s týmito oblasťami
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {conditions.map(c => (
                <span
                  key={c.label}
                  className="text-xs px-3 py-1.5 rounded-full font-jakarta font-500 text-white/65"
                  style={{ background: 'rgba(43,138,98,.14)', border: '1px solid rgba(43,138,98,.25)' }}
                >
                  {c.icon} {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhatYouSeeAtHome />
      <InteractiveBrainChild />
      <BrainActivities />
      <NRITherapyChild />

      {/* Parent blog teaser */}
      <section className="py-20 px-6" style={{ background: '#0a1a14' }}>
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div
                className="section-label text-[#2b8a62] border border-[#2b8a62]/30 mb-4"
                style={{ background: 'rgba(43,138,98,.12)' }}
              >
                Pre rodičov
              </div>
              <h2 className="font-jakarta text-3xl font-700 text-white mb-4">
                Zdroje a materiály<br />
                <span className="text-gradient-green">pre každodenný život</span>
              </h2>
              <p className="text-white/55 leading-relaxed mb-6">
                Checklisty, PDF sprievodcovia, blogové články a plagáty — všetko, čo potrebujete na podporu nervového systému vášho dieťaťa doma.
              </p>
              <div className="flex gap-4">
                <Link href="/materialy" className="btn-primary btn-kids px-6 py-3 text-sm">
                  Stiahnuť materiály
                </Link>
                <Link
                  href="/blog"
                  className="px-6 py-3 text-sm font-jakarta font-500 text-[#2b8a62] border border-[#2b8a62]/30 rounded-xl hover:bg-[#2b8a62]/8 transition-all"
                >
                  Blog
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '📋', title: 'Checklist dysregulácie', type: 'PDF' },
                { icon: '🗺️', title: 'Mapa mozgu dieťaťa', type: 'Plagát A3' },
                { icon: '🎮', title: 'Hry podľa mozgu', type: 'Príručka' },
                { icon: '🎵', title: 'NRI playlist guide', type: 'PDF' },
              ].map(item => (
                <div
                  key={item.title}
                  className="p-4 rounded-2xl border text-center hover:shadow-md transition-all"
                  style={{ borderColor: 'rgba(43,138,98,.25)', background: 'rgba(43,138,98,.1)' }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-jakarta font-600 text-white text-xs mb-0.5">{item.title}</div>
                  <div className="text-[10px] text-[#2b8a62] uppercase tracking-wide">{item.type}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Final CTA */}
      <section
        className="py-28 px-6"
        style={{ background: 'linear-gradient(135deg, #0d2218 0%, #12172a 100%)' }}
      >
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🌱</div>
          <h2 className="font-jakarta text-4xl font-700 text-white mb-4">
            Každý mozog sa môže zmeniť.
          </h2>
          <p className="text-white/55 text-lg mb-10">
            Neuroplasticita u detí je obrovská. Čím skôr začneme, tým viac nových dráh sa vytvorí. Prvé stretnutie je nezáväzné.
          </p>
          <a href="https://complex-diagnostic.eu/objednani-terminu-vysetreni/" target="_blank" rel="noopener noreferrer" className="btn-primary btn-kids text-base px-10 py-4">
            Objednať sa na prvé stretnutie
          </a>
        </AnimatedSection>
      </section>
    </div>
  )
}
