import Link from 'next/link'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { ArrowRight } from 'lucide-react'
import { NRiBrand } from '@/components/shared/NRiBrand'

export default function AudienceCards() {
  return (
    <section id="vstup" className="bg-[#0b1524] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Vyberte svoju cestu
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-4">
            Kto ste?
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            <NRiBrand /> má iný prístup pre dospelých a pre deti — každý nervový systém potrebuje niečo iné.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Adults card */}
          <AnimatedSection delay={100} direction="left">
            <Link
              href="/dospeli"
              className="group relative block rounded-3xl overflow-hidden h-full min-h-[480px] transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1b6b72]/20"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f2238] via-[#122a40] to-[#0b1a2e]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1b6b72]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Neural illustration */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-15">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" stroke="#2a9aa8" strokeWidth="1" strokeDasharray="4 8" />
                  <circle cx="100" cy="100" r="55" stroke="#1b6b72" strokeWidth="1" strokeDasharray="3 6" />
                  <circle cx="100" cy="100" r="30" stroke="#2a9aa8" strokeWidth="1.5" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#1b6b72" strokeWidth="0.5" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="#1b6b72" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="8" fill="#2a9aa8" opacity="0.6" />
                  {[0,45,90,135,180,225,270,315].map((angle, i) => {
                    const rad = angle * Math.PI / 180
                    const x1 = 100 + 30 * Math.cos(rad)
                    const y1 = 100 + 30 * Math.sin(rad)
                    const x2 = 100 + 78 * Math.cos(rad)
                    const y2 = 100 + 78 * Math.sin(rad)
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2a9aa8" strokeWidth="0.5" opacity="0.5" />
                  })}
                  {[30, 60, 90, 120, 150, 200, 240, 280, 330].map((angle, i) => {
                    const rad = angle * Math.PI / 180
                    const cx = 100 + 55 * Math.cos(rad)
                    const cy = 100 + 55 * Math.sin(rad)
                    return <circle key={i} cx={cx} cy={cy} r="3" fill="#1b6b72" opacity="0.7" />
                  })}
                </svg>
              </div>

              <div className="relative z-10 p-10 flex flex-col h-full">
                <div
                  className="section-label text-[#2a9aa8] self-start border border-[#2a9aa8]/25"
                  style={{ background: 'rgba(27,107,114,.15)' }}
                >
                  Pre dospelých
                </div>

                <h3 className="font-jakarta text-3xl md:text-4xl font-700 text-white mt-6 mb-4 leading-tight">
                  Telo pamätá,<br />
                  <span className="text-gradient-teal">aj keď rozum zabudol.</span>
                </h3>

                <p className="text-white/55 leading-relaxed mb-6">
                  Chronická úzkosť, emočné preťaženie, freeze reakcie, odpojenie od tela — nie je to vaša chyba. Je to stav nervového systému. A dá sa zmeniť.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['Trauma', 'Úzkosť', 'ADHD', 'Burnout', 'Psychosomatika', 'Freezing'].map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full text-[#2a9aa8] border border-[#2a9aa8]/20"
                      style={{ background: 'rgba(27,107,114,.1)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 text-[#2a9aa8] font-jakarta font-600 group-hover:gap-4 transition-all">
                  Vstúpiť do sekcie <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </AnimatedSection>

          {/* Kids card */}
          <AnimatedSection delay={200} direction="right">
            <Link
              href="/deti"
              className="group relative block rounded-3xl overflow-hidden h-full min-h-[480px] transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#2b8a62]/20"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f8f7f4] via-[#f0f7f0] to-[#eff5ff]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2b8a62]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Playful illustration */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
                <svg viewBox="0 0 200 200" fill="none">
                  {/* Stars/sparkles */}
                  {[[30,40],[160,50],[80,150],[150,140],[50,110]].map(([cx,cy],i) => (
                    <g key={i} transform={`translate(${cx},${cy})`}>
                      <line x1="-8" y1="0" x2="8" y2="0" stroke="#2b8a62" strokeWidth="1.5" />
                      <line x1="0" y1="-8" x2="0" y2="8" stroke="#2b8a62" strokeWidth="1.5" />
                      <line x1="-5" y1="-5" x2="5" y2="5" stroke="#2b8a62" strokeWidth="1" />
                      <line x1="5" y1="-5" x2="-5" y2="5" stroke="#2b8a62" strokeWidth="1" />
                    </g>
                  ))}
                  {/* Circles */}
                  <circle cx="100" cy="90" r="50" stroke="#3db882" strokeWidth="2" fill="none" strokeDasharray="8 4" />
                  <circle cx="100" cy="90" r="25" fill="#2b8a62" opacity="0.25" />
                  <circle cx="100" cy="90" r="12" fill="#3db882" opacity="0.5" />
                  {/* Wave */}
                  <path d="M20 150 Q50 130 80 150 Q110 170 140 150 Q170 130 180 150" stroke="#3474b8" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <div className="relative z-10 p-10 flex flex-col h-full">
                <div
                  className="section-label text-[#2b8a62] self-start border border-[#2b8a62]/25"
                  style={{ background: 'rgba(43,138,98,.1)' }}
                >
                  Pre deti & rodičov
                </div>

                <h3 className="font-jakarta text-3xl md:text-4xl font-700 text-[#162030] mt-6 mb-4 leading-tight">
                  Dieťa nie je<br />
                  <span className="text-gradient-green">„problémové".</span>
                </h3>

                <p className="text-[#162030]/60 leading-relaxed mb-6">
                  Výbuchy, hypersenzitivita, problémy s rečou alebo spánkom — sú signálom nervového systému. Pohybom, rytmom a hrou ho môžeme naučiť byť v bezpečí.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['ADHD', 'PAS', 'Hypersenzitivita', 'Reč', 'Motorika', 'Výbuchy'].map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full text-[#2b8a62] border border-[#2b8a62]/20"
                      style={{ background: 'rgba(43,138,98,.1)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 text-[#2b8a62] font-jakarta font-600 group-hover:gap-4 transition-all">
                  Vstúpiť do sekcie <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
