import AnimatedSection from '@/components/shared/AnimatedSection'
import { renderNRi } from '@/components/shared/NRiBrand'

const testimonials = [
  {
    quote: 'Po rokoch práce s inými odborníkmi mi NRi dala to, čo som nikde inde nenašla — pocit, že sa môžem cítiť bezpečne vo vlastnom tele. Prvýkrát od detstva.',
    name: 'Zuzana, 34',
    tag: 'Trauma & úzkosť',
    color: '#1b6b72',
  },
  {
    quote: 'Myslel som si, že som len „nervózny typ". Po 8 sedeniach som pochopil, že môj nervový systém bol desaťročia v alarme. Teraz viem, ako ho „vypnúť".',
    name: 'Martin, 41',
    tag: 'Chronický stres & ADHD',
    color: '#7a2d45',
  },
  {
    quote: 'Freeze pri konflikte ma paralyzoval v práci aj doma. NRi mi ukázala, že to nie je zbabelosť — a naučila ma z toho stavu vyjsť. Zmenilo to môj život.',
    name: 'Katarína, 28',
    tag: 'Freeze reakcie',
    color: '#4a3080',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#0b1524] py-28 px-6" id="pribehy">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Príbehy klientov
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-4">
            Čo hovoria tí,<br />
            <span className="text-gradient-teal">ktorí prešli cestou</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 100}>
              <div
                className="rounded-3xl p-8 h-full border"
                style={{ background: `${t.color}10`, borderColor: `${t.color}25` }}
              >
                <div className="text-3xl mb-5">❝</div>
                <p className="text-white/70 leading-relaxed mb-6 italic">
                  {renderNRi(t.quote)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="font-jakarta font-600 text-white text-sm">{t.name}</div>
                  <div
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ color: t.color, background: `${t.color}20`, border: `1px solid ${t.color}30` }}
                  >
                    {t.tag}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200} className="mt-10">
          <div className="text-center text-white/30 text-sm">
            * Príbehy sú anonymizované so súhlasom klientov.
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
