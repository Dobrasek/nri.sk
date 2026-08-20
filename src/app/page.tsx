import HeroSection from '@/components/home/HeroSection'
import AudienceCards from '@/components/home/AudienceCards'
import WhatIsNRI from '@/components/home/WhatIsNRI'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import BookingButton from '@/components/shared/BookingButton'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AudienceCards />
      <WhatIsNRI />

      {/* Science strip */}
      <section className="bg-[#0b1524] py-16 px-6 border-y border-white/6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-white/30 text-sm font-jakarta uppercase tracking-widest">
              Vedecky podložené metódy
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-5">
            {[
              'Polyvagálna teória (S. Porges)',
              'Somatic Experiencing',
              'Rytmická nervová stimulácia',
              'Neuroplasticita',
              'Sensory Integration (A.J. Ayres)',
              'Trauma-Informed Care',
            ].map(item => (
              <div key={item} className="text-white/35 text-sm font-jakarta">{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0d1928] py-28 px-6">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-6">
            Urobte prvý krok<br />
            <span className="text-gradient-teal">smerom k bezpečiu</span>
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Prvé orientačné stretnutie je nezáväzné. Spoločne zistíme, čo váš nervový systém potrebuje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton className="btn-primary text-base px-10 py-4">
              Objednať sa
            </BookingButton>
            <Link
              href="/blog"
              className="px-10 py-4 text-base font-jakarta font-500 text-white/60 hover:text-white border border-white/12 hover:border-white/25 rounded-xl transition-all"
            >
              Čítať blog
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
