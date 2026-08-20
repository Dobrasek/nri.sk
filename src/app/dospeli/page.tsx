import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { NRiBrand } from '@/components/shared/NRiBrand'
import BreathingCircle from '@/components/shared/BreathingCircle'
import NervousSystemLayers from '@/components/adults/NervousSystemLayers'
import InteractiveBrain from '@/components/adults/InteractiveBrain'
import TherapyProcess from '@/components/adults/TherapyProcess'
import Symptoms from '@/components/adults/Symptoms'
import Testimonials from '@/components/adults/Testimonials'
import FAQSection from '@/components/adults/FAQSection'
import BookingButton from '@/components/shared/BookingButton'

export const metadata: Metadata = {
  title: 'NRi pre dospelých — Trauma, Úzkosť, ADHD, Burnout',
  description: 'NRi pre dospelých — spracovanie traumy, chronickej úzkosti, emočného preťaženia, freeze reakcií a psychosomatických ťažkostí cez neurovedu, rytmus a pohyb.',
}

export default function DospeliPage() {
  return (
    <div className="theme-adults">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0b1524] pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b6b72]/8 via-transparent to-[#7a2d45]/6 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1b6b72]/6 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center py-20">
          <AnimatedSection direction="left">
            <div
              className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-6"
              style={{ background: 'rgba(27,107,114,.1)' }}
            >
              Pre dospelých
            </div>
            <h1 className="font-jakarta text-5xl md:text-6xl font-800 text-white mb-6 leading-[1.05]">
              Keď telo<br />
              <span className="text-gradient-teal">nezabudlo.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Trauma, úzkosť, freeze, emočné preťaženie — nie sú to chyby charakteru. Sú to stavy nervového systému, ktoré sa naučili prežívať. <NRiBrand /> to vie zmeniť.
            </p>
            <div className="flex flex-wrap gap-4">
              <BookingButton service="adult" className="btn-primary px-8 py-4">
                Objednať sa
              </BookingButton>
              <a href="#nervovy-system" className="px-8 py-4 text-sm font-jakarta font-500 text-white/60 hover:text-white border border-white/12 hover:border-white/25 rounded-xl transition-all">
                Ako to funguje
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="flex justify-center">
            <div className="relative">
              <BreathingCircle size={220} color="#1b6b72" />
              {/* Floating info chips */}
              <div
                className="absolute -top-4 -right-8 px-4 py-2 rounded-xl text-xs font-jakarta font-600 text-white"
                style={{ background: 'rgba(27,107,114,.3)', border: '1px solid rgba(27,107,114,.4)' }}
              >
                Mozgový kmeň
              </div>
              <div
                className="absolute -bottom-4 -left-8 px-4 py-2 rounded-xl text-xs font-jakarta font-600 text-white"
                style={{ background: 'rgba(122,45,69,.3)', border: '1px solid rgba(122,45,69,.4)' }}
              >
                Amygdala & Limbický systém
              </div>
              <div
                className="absolute top-1/2 -right-20 -translate-y-1/2 px-4 py-2 rounded-xl text-xs font-jakarta font-600 text-white"
                style={{ background: 'rgba(45,80,128,.3)', border: '1px solid rgba(45,80,128,.4)' }}
              >
                Neokortex
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <NervousSystemLayers />
      <Symptoms />
      <InteractiveBrain />
      <TherapyProcess />
      <Testimonials />
      <FAQSection />

      {/* Final CTA */}
      <section className="bg-[#0b1524] py-28 px-6">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <h2 className="font-jakarta text-4xl font-700 text-white mb-4">
            Ste pripravený/á urobiť prvý krok?
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Prvé stretnutie je nezáväzné a orientačné. Spoločne sa pozrieme na váš nervový systém a nájdeme cestu k bezpečiu.
          </p>
          <BookingButton service="adult" className="btn-primary text-base px-10 py-4">
            Objednať prvé stretnutie
          </BookingButton>
        </AnimatedSection>
      </section>
    </div>
  )
}
