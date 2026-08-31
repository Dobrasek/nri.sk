import AnimatedSection from '@/components/shared/AnimatedSection'
import { Music, Wind, Move, Brain } from 'lucide-react'
import { NRiBrand } from '@/components/shared/NRiBrand'

const pillars = [
  {
    icon: Brain,
    title: 'Neuroveda',
    text: 'Pracujeme priamo s mozgovým kmeňom, limbickým systémom a kortexom — nie len so symptómami.',
    color: '#1b6b72',
  },
  {
    icon: Music,
    title: 'Rytmus & Hudba',
    text: 'Špecificky vybraná hudba (60–120 BPM) synchronizuje neuróny a otvára hlboké štruktúry mozgu.',
    color: '#7a2d45',
  },
  {
    icon: Move,
    title: 'Pohyb',
    text: 'Tai-Ji sekvencie, skrížené pohyby a proprioceptívna stimulácia budujú nové nervové dráhy.',
    color: '#2d5080',
  },
  {
    icon: Wind,
    title: 'Dych',
    text: 'Rytmické dychové cvičenia aktivujú blúdivý nerv a prepínajú nervový systém do bezpečného stavu.',
    color: '#1a4530',
  },
]

export default function WhatIsNRI() {
  return (
    <section className="bg-[#0d1928] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Čo je NRi
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-6">
            Neuro-Rytmická Integrácia
          </h2>
          <p className="text-white/55 text-lg max-w-3xl mx-auto leading-relaxed">
            <NRiBrand /> je metóda, ktorá využíva synergiu hudby, pohybu a dychu na cielené ovplyvnenie hlbokých neurologických centier. Pomáha reštartovať oslabené nervové dráhy a vytvárať nové prepojenia cez neuroplasticitu.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 80} direction="up">
              <div className="glass-card p-7 h-full hover:-translate-y-1 transition-transform duration-300">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${p.color}25`, border: `1px solid ${p.color}40` }}
                >
                  <p.icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <h3 className="font-jakarta font-700 text-white mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* 3-layer brain model */}
        <AnimatedSection>
          <div className="glass-card p-10 md:p-14">
            <div className="text-center mb-12">
              <h3 className="font-jakarta text-3xl font-700 text-white mb-3">
                Tri vrstvy nervového systému
              </h3>
              <p className="text-white/45 max-w-lg mx-auto">
                NRi pracuje zdola nahor — najprv zakotvuje mozgový kmeň, potom limbický systém, nakoniec kortex.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0">
              {[
                {
                  layer: '01',
                  title: 'Mozgový kmeň',
                  sub: 'Plazí mozog',
                  desc: 'Prežitie, rytmus, dych, bazálne bezpečie',
                  color: '#7a4020',
                  bg: 'rgba(122,64,32,.15)',
                },
                {
                  layer: '02',
                  title: 'Limbický systém',
                  sub: 'Emočný mozog',
                  desc: 'Emócie, väzba, pamäť, dôvera',
                  color: '#7a2d45',
                  bg: 'rgba(122,45,69,.15)',
                },
                {
                  layer: '03',
                  title: 'Neokortex',
                  sub: 'Mysliac mozog',
                  desc: 'Rozhodovanie, jazyk, kreativita, sebaovládanie',
                  color: '#1b6b72',
                  bg: 'rgba(27,107,114,.15)',
                },
              ].map((item, i) => (
                <div key={item.layer} className="flex flex-col md:flex-row items-center">
                  <div
                    className="rounded-2xl p-6 w-full md:w-48 text-center border"
                    style={{
                      background: item.bg,
                      borderColor: `${item.color}35`,
                    }}
                  >
                    <div className="text-4xl font-jakarta font-800 mb-1" style={{ color: item.color }}>
                      {item.layer}
                    </div>
                    <div className="font-jakarta font-700 text-white text-sm mb-0.5">{item.title}</div>
                    <div className="text-[10px] uppercase tracking-wide font-jakarta" style={{ color: item.color }}>
                      {item.sub}
                    </div>
                    <div className="text-white/40 text-xs mt-2 leading-snug">{item.desc}</div>
                  </div>
                  {i < 2 && (
                    <div className="w-px md:w-12 h-12 md:h-px border-l md:border-l-0 md:border-t border-dashed border-white/15 mx-0 md:mx-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
