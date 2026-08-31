import AnimatedSection from '@/components/shared/AnimatedSection'

const signs = [
  { icon: '💥', title: 'Výbuchy bez zjavnej príčiny', desc: 'Dieťa eskaluje z nuly na sto. Mozgový kmeň nespúšťa alarm úmyselne — nemôže si pomôcť.' },
  { icon: '👂', title: 'Extrémna citlivosť na zvuky', desc: 'Bežné zvuky pôsobia ako bolestivé. Talamus prepúšťa príliš veľa stimulov.' },
  { icon: '😴', title: 'Problémy so spánkom', desc: 'Nemôže zaspať, budí sa v noci. Nervový systém ostáva v stave alarmu aj v noci.' },
  { icon: '🌀', title: 'Točenie, skákanie, nekľud', desc: 'Dieťa sa neustále pohybuje. Vestibulárny systém a mozoček hľadajú stimuláciu.' },
  { icon: '🚫', title: 'Odmietanie dotyku', desc: 'Oblečenie, objatia, jedlo — všetko je "zlé". Taktilná precitlivenosť v parietálnom laloku.' },
  { icon: '🗣️', title: 'Oneskorená reč', desc: 'Nehovorí, hovorí málo alebo nerozumie pokynom. Brocovo centrum potrebuje rytmickú aktiváciu.' },
  { icon: '🎯', title: 'Problémy s pozornosťou', desc: 'Nevie sedieť, ľahko sa rozptýli. Frontálny lalok potrebuje tréning regulácie.' },
  { icon: '🏃', title: 'Motorická neohrabanosť', desc: 'Narážanie do vecí, padanie, ťažkosti s bicyklom. Mozoček potrebuje posilniť.' },
]

export default function WhatYouSeeAtHome() {
  return (
    <section className="py-28 px-6" style={{ background: '#0a1a14' }} id="doma">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2b8a62] border border-[#2b8a62]/30 mb-4"
            style={{ background: 'rgba(43,138,98,.12)' }}
          >
            Čo vidíte doma
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-6">
            Signály nervového systému
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Tieto prejavy nie sú „neposlušnosť" ani „nevychovanosť". Sú to správy, ktoré nervový systém dieťaťa posiela — a ktorým rozumieme.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {signs.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 60}>
              <div
                className="rounded-2xl p-6 h-full border hover:-translate-y-1 transition-transform duration-300"
                style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(43,138,98,.2)', boxShadow: '0 4px 20px rgba(0,0,0,.15)' }}
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-jakarta font-600 text-white text-sm mb-2">{s.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200} className="mt-12">
          <div
            className="rounded-3xl p-8 text-center border"
            style={{ background: 'rgba(43,138,98,.1)', borderColor: 'rgba(43,138,98,.25)' }}
          >
            <p className="text-white/70 text-lg font-jakarta font-500 mb-2">
              „Dieťa sa nespráva zle. Dieťa sa cíti nebezpečne."
            </p>
            <p className="text-white/35 text-sm">— Dr. Stuart Ablon, Think:Kids</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
