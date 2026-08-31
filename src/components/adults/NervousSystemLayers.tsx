import AnimatedSection from '@/components/shared/AnimatedSection'

export default function NervousSystemLayers() {
  return (
    <section className="bg-[#0d1928] py-28 px-6" id="nervovy-system">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Neurobiológia traumy
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-6">
            Ako funguje nervový systém<br />
            <span className="text-gradient-teal">pri traume a strese</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Trauma nie je to, čo sa vám stalo. Je to to, čo sa stalo vo vašom nervovom systéme. A to sa dá zmeniť.
          </p>
        </AnimatedSection>

        {/* Polyvagal states */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              state: 'Bezpečie',
              latin: 'Ventral Vagal',
              color: '#1b6b72',
              bg: 'rgba(27,107,114,.12)',
              icon: '🌿',
              desc: 'Nervový systém je v regulácii. Sme schopní kontaktu, učenia, hry a tvorivosti. Srdce bije pokojne.',
              signs: ['Otvorenosť vzťahom', 'Schopnosť koncentrácie', 'Hravosť a zvedavosť', 'Pokojný dych a tep'],
            },
            {
              state: 'Mobilizácia',
              latin: 'Sympatikus (Boj / Útek)',
              color: '#c8700a',
              bg: 'rgba(200,112,10,.12)',
              icon: '⚡',
              desc: 'Amygdala spustila alarm. Telo sa mobilizuje na boj alebo útek. Pri chronickom strese uviazneme tu.',
              signs: ['Úzkosť a strach', 'Impulzivita', 'Hypervigilancia', 'Napätie v tele', 'Podráždenosť'],
            },
            {
              state: 'Zamrznutie',
              latin: 'Dorsal Vagal (Freeze)',
              color: '#4a3080',
              bg: 'rgba(74,48,128,.12)',
              icon: '❄️',
              desc: 'Hlboká obrana. Keď boj ani útek neboli možné, mozog sa „vypol". Disociácia, odpojenie, strnulosť.',
              signs: ['Disociácia a odpojenie', 'Emočné otupenie', 'Únava a ťažoba', 'Pocit beznádeje', 'Freeze reakcie'],
            },
          ].map((s, i) => (
            <AnimatedSection key={s.state} delay={i * 100}>
              <div
                className="rounded-3xl p-8 h-full border"
                style={{ background: s.bg, borderColor: `${s.color}30` }}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="font-jakarta font-700 text-white text-xl mb-0.5">{s.state}</div>
                <div className="text-xs uppercase tracking-wide mb-4" style={{ color: s.color }}>
                  {s.latin}
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.signs.map(sign => (
                    <li key={sign} className="flex items-center gap-2 text-white/50 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* NRI explanation */}
        <AnimatedSection>
          <div
            className="rounded-3xl p-10 md:p-14 border"
            style={{ background: 'rgba(27,107,114,.08)', borderColor: 'rgba(27,107,114,.2)' }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="font-jakarta text-3xl font-700 text-white mb-4">
                  Trauma nie je vaša chyba.<br />
                  <span className="text-gradient-teal">Je to stav nervovej sústavy.</span>
                </h3>
                <p className="text-white/55 leading-relaxed mb-6">
                  Keď sme prežili niečo ohromujúce, mozgový kmeň a amygdala si to zapamätali — nie ako príbeh, ale ako telesný stav. Telo zostalo v alarme, aj keď nebezpečenstvo pominulo.
                </p>
                <p className="text-white/55 leading-relaxed">
                  NRi pracuje priamo s týmto telesným stavom — nie cez slová a príbehy, ale cez rytmus, pohyb a dych, ktoré hovoria najhlbším centrám mozgu: <em className="text-white/80 not-italic">„Si v bezpečí. Môžeš sa uvoľniť."</em>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { step: '01', title: 'Rytmus ukotvuje kmeň', desc: 'Fixná hudba a predvídateľné poradie uspokojujú amygdalu. Mozog prestáva vyhodnocovať hrozbu.' },
                  { step: '02', title: 'Pohyb buduje dráhy', desc: 'Tai-Ji a skrížené pohyby vytvárajú nové nervové spojenia cez neuroplasticitu.' },
                  { step: '03', title: 'Dych mení stav', desc: 'Vedomý dych aktivuje blúdivý nerv a prepína z módu prežitia do módu bezpečia.' },
                ].map(item => (
                  <div key={item.step} className="glass-card p-5 flex gap-4">
                    <div className="font-jakarta font-800 text-3xl" style={{ color: '#1b6b7255' }}>{item.step}</div>
                    <div>
                      <div className="font-jakarta font-600 text-white text-sm mb-1">{item.title}</div>
                      <div className="text-white/45 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
