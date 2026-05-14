import AnimatedSection from '@/components/shared/AnimatedSection'
import { NRiBrand } from '@/components/shared/NRiBrand'

const symptoms = [
  { icon: '🌊', title: 'Chronická úzkosť', desc: 'Pocit neustáleho alarmu, aj keď sa nič nedeje. Hypervigilia, "čakanie na katastrofu".' },
  { icon: '❄️', title: 'Freeze reakcie', desc: 'Zamrznutie v situáciách stresu. Neschopnosť konať alebo hovoriť, akoby vás telo paralyzovalo.' },
  { icon: '🌀', title: 'Emočné preťaženie', desc: 'Reakcie, ktoré sú silnejšie ako situácia vyžaduje. Ľahká zápallivosť alebo naopak úplné otupenie.' },
  { icon: '🔇', title: 'Odpojenie od tela', desc: 'Pocit, že ste "mimo seba", nereálni, pohľad zhora. Telo ako cudzinec.' },
  { icon: '💢', title: 'Chronické napätie', desc: 'Stuhnutá šija, bolesť ramenných kríži, napätie v čeľusti. Telo nesie to, čo myseľ "spracovala".' },
  { icon: '🧩', title: 'ADHD & dysregulácia', desc: 'Problémy s pozornosťou, impulzivitou, reguláciou energie. Nie charakter — stav nervového systému.' },
  { icon: '😶', title: 'Psychosomatika', desc: 'Bolesti bez organickej príčiny, syndróm dráždivého čreva, migrény, koža. Telo hovorí to, čo slová nevedia.' },
  { icon: '💤', title: 'Poruchy spánku', desc: 'Problém so zaspávaním, nočné prebúdzanie, nenávratný spánok. Nervový systém stále "hliadkuje".' },
]

export default function Symptoms() {
  return (
    <section className="bg-[#0b1524] py-28 px-6" id="symptomy">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#7a2d45] border border-[#7a2d45]/30 mb-4"
            style={{ background: 'rgba(122,45,69,.12)' }}
          >
            Prejavy & symptómy
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-6">
            Spoznávate sa?
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Tieto prejavy nie sú slabosťou, poruchou osobnosti ani problémom „v hlave". Sú signálom nervového systému, ktorý sa naučil prežívať v nebezpečnom svete.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {symptoms.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 60}>
              <div className="glass-card p-6 h-full hover:-translate-y-1 transition-transform duration-300 group cursor-default">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-jakarta font-600 text-white text-sm mb-2 group-hover:text-[#2a9aa8] transition-colors">
                  {s.title}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200} className="mt-12">
          <div
            className="rounded-3xl p-8 text-center border"
            style={{ background: 'rgba(27,107,114,.08)', borderColor: 'rgba(27,107,114,.2)' }}
          >
            <p className="text-white/70 text-lg font-jakarta font-500 mb-2">
              „Každý z týchto prejavov má svoje miesto v mozgu — a každé miesto sa dá trénovať."
            </p>
            <p className="text-white/35 text-sm">— princíp <NRiBrand iColor="#e53535" /> metódy</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
