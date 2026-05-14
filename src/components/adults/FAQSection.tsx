'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { renderNRi } from '@/components/shared/NRiBrand'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: 'Čo je NRi a pre koho je vhodná?',
    a: 'Neuro-Rytmická Integrácia (NRi) je metóda, ktorá využíva rytmus, pohyb a dych na prácu s nervovým systémom. Je vhodná pre dospelých, ktorí prežívajú chronický stres, úzkosť, trauma, ADHD, emočnú dysreguláciu, psychosomatické ťažkosti alebo pocit odpojenia od tela.',
  },
  {
    q: 'Ako prebieha prvé stretnutie?',
    a: 'Prvé stretnutie je orientačné — spoločne si porozprávame váš príbeh, ťažkosti a ciele. Potom nasleduje krátka ukážka sedenia, aby ste cítili, ako NRi funguje v praxi. Trvá cca 75 minút.',
  },
  {
    q: 'Koľko sedení treba?',
    a: 'Záleží na hĺbke a dĺžke ťažkostí. Pri chronickej traume odporúčame 12–20 sedení. Prvé zmeny bývajú viditeľné po 3–5 sedeniach. Sedenia prebiehajú 1× týždenne, neskôr 1× za 2 týždne.',
  },
  {
    q: 'Musím mať nejakú diagnózu?',
    a: 'Nie. NRI nie je len pre ľudí s diagnózou. Pracujeme so všetkými, ktorí cítia, že ich nervový systém nie je v rovnováhe — bez ohľadu na to, či majú "papier" alebo nie.',
  },
  {
    q: 'Je NRi vedecky podložená?',
    a: 'Áno. NRI integruje poznatky z neurobiológie traumy (van der Kolk, Porges), Polyvagálnej teórie (Stephen Porges), somato-senzorických prístupov a rytmickej stimulácie mozgu. Každá technika má neurovedecké zdôvodnenie.',
  },
  {
    q: 'Kombinuje sa NRi s inými metódami?',
    a: 'Áno, NRi je kompatibilná s psychoterapiou, EMDR, Somatic Experiencing a ďalšími metódami. Mnohí klienti pokračujú v kombinácii s iným odborníkom.',
  },
  {
    q: 'Pracujete aj online?',
    a: 'Niektoré časti protokolu je možné robiť online (dych, informačné sedenia, niektoré pohybové cvičenia). Pre plnohodnotnú prácu s NRi je však vhodná fyzická prítomnosť kvôli taktilnej a proprioceptívnej stimulácii.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-[#0d1928] py-28 px-6" id="faq">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            FAQ
          </div>
          <h2 className="font-jakarta text-4xl font-700 text-white mb-4">
            Časté otázky
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 50}>
              <div className="glass-card overflow-hidden">
                <button
                  className="w-full text-left px-7 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-jakarta font-600 text-white text-sm leading-snug">{renderNRi(faq.q)}</span>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 text-[#2a9aa8] transition-transform duration-200"
                    style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }}
                  />
                </button>
                {open === i && (
                  <div className="px-7 pb-6 text-white/55 text-sm leading-relaxed border-t border-white/6 pt-4">
                    {renderNRi(faq.a)}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200} className="text-center mt-12">
          <p className="text-white/40 text-sm mb-4">Stále máte otázku?</p>
          <Link href="/kontakt" className="btn-primary">
            Napíšte nám
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
