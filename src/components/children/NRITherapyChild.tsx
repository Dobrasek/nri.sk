import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { NRiBrand } from '@/components/shared/NRiBrand'
import BookingButton from '@/components/shared/BookingButton'

const playlist = [
  { n: '01', song: 'Queen — We Will Rock You', bpm: '110 BPM', goal: 'Bazálne gangliá', desc: 'Silné dup-dup-plesk. Bazálna ganglia stimulácia — filter pohybu.', color: '#4a3080' },
  { n: '02', song: 'The Prodigy — No Good', bpm: '133 BPM', goal: 'Energia & Excitácia', desc: 'Rýchly rytmus! Celotelo v pohybe — preskakujeme, mávame, tanec bez hraníc.', color: '#c8400a' },
  { n: '03', song: 'Rammstein — Du Hast', bpm: '120 BPM', goal: 'Freeze Dance', desc: 'Dynamické pohyby + STOPKA. Frontálny lalok — inhibícia impulzov.', color: '#c05a5a' },
  { n: '04', song: 'Imagine Dragons — Demons', bpm: '84 BPM', goal: 'Emócie & Limbický', desc: 'Pomalšie pohyby, mäkký rytmus. Pomenúvame emócie telom.', color: '#7a2d45' },
  { n: '05', song: 'Linkin Park — In The End', bpm: '105 BPM', goal: 'Prepojenie hemisfér', desc: 'Skrížené pohyby! Pravá ruka — ľavá noha. Prepájame obe strany mozgu.', color: '#2d5080' },
  { n: '06', song: 'Evanescence — My Immortal', bpm: '55 BPM', goal: 'Tai-Ji & Rovnováha', desc: 'Extrémne pomalé "odhadzovanie loptičky". Mozoček a hlboká stabilita.', color: '#8060c0' },
  { n: '07', song: 'Pharrell Williams — Happy', bpm: '160 BPM', goal: 'Radosť & Dopamín', desc: 'Najrýchlejšia pieseň! Skoky, otočky, smiech. Pohyb = radosť!', color: '#c8980a' },
  { n: '08', song: 'Edith Piaf — Non, je ne regrette rien', bpm: '72 BPM', goal: 'Zrkadlenie & Emócie', desc: 'Jemné húpavé pohyby. Odborník kopíruje pohyby dieťaťa — budovanie dôvery.', color: '#7a4d25' },
  { n: '09', song: 'LP — Lost On You', bpm: '68 BPM', goal: 'Mapa tela', desc: 'Rytmické vyklepávanie po častiach tela. Budovanie telesnej mapy.', color: '#3474b8' },
  { n: '10', song: 'Gunčíková — I Stand', bpm: '74 BPM', goal: 'Sila & Sebaistota', desc: 'Veľké, silné pohyby! Stojím pevne na nohách. Budujeme telesný sebaobraz.', color: '#2b8a62' },
  { n: '11', song: 'Robbie Williams — Angels', bpm: '76 BPM', goal: 'Bezpečie & Emócie', desc: 'Jemné objímavé pohyby. Cítim, že som v bezpečí a nie som sám.', color: '#8060c0' },
  { n: '12', song: 'Lady Gaga — Hold My Hand', bpm: '67 BPM', goal: 'Naladenie & Spojenie', desc: 'Pohybujeme sa spolu, v rovnakom rytme. Sme spojení — to je bezpečie.', color: '#c87090' },
  { n: '13', song: 'Alexandra Burke — Hallelujah', bpm: '70 BPM', goal: 'Integrácia & Pokoj', desc: 'Pomalé, hlboké pohyby. Všetko čo sme prežili, ukladáme do tela ako bezpečnú spomienku.', color: '#1a5060' },
  { n: '14', song: 'The Piano Guys — O Come O Come Emmanuel', bpm: '50 BPM', goal: 'Záver & Ukotvenie', desc: 'Klbíčkovanie a kolísanie. Pevné zavinutie, hlboký tlak. Integrácia.', color: '#0d4060' },
]

export default function NRITherapyChild() {
  return (
    <section className="py-28 px-6" style={{ background: '#0a1a14' }} id="sedenie">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2b8a62] border border-[#2b8a62]/30 mb-4"
            style={{ background: 'rgba(43,138,98,.12)' }}
          >
            Protokol <NRiBrand iColor="#e53535" /> pre deti
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-6">
            Ako prebieha sedenie<br />
            <span className="text-gradient-green">pre dieťa</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Každé sedenie sleduje rovnaké hudobné poradie. Mozog dieťaťa si vytvorí "reflexnú mapu" — a rituál sám o sebe sa stáva zdrojom bezpečia.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {playlist.map((item, i) => (
            <AnimatedSection key={item.n} delay={i * 60}>
              <div
                className="rounded-2xl p-5 h-full border hover:shadow-lg hover:-translate-y-1 transition-all"
                style={{
                  background: `${item.color}0d`,
                  borderColor: `${item.color}30`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-jakarta font-800 text-2xl" style={{ color: `${item.color}70` }}>
                    {item.n}
                  </span>
                  <span
                    className="text-[10px] font-jakarta font-700 px-2 py-0.5 rounded-full uppercase tracking-wide"
                    style={{ color: item.color, background: `${item.color}20` }}
                  >
                    {item.bpm}
                  </span>
                </div>
                <div className="font-jakarta font-700 text-white text-xs mb-0.5">{item.song}</div>
                <div className="text-[10px] uppercase tracking-wide mb-2" style={{ color: item.color }}>{item.goal}</div>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div
            className="rounded-3xl p-8 md:p-12 border"
            style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(43,138,98,.2)', boxShadow: '0 8px 40px rgba(0,0,0,.2)' }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="font-jakarta text-3xl font-700 text-white mb-4">
                  Prečo poradie<br />
                  <span className="text-gradient-green">nikdy nemeníme?</span>
                </h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  Keď nervový systém dieťaťa presne vie, čo príde, amygdala sa upokojuje. Prestáva vyhodnocovať hrozbu a otvára sa pre učenie a rast.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Po niekoľkých sedeniach mozog dieťaťa automaticky rozpozná prvé tóny skladby — a <em className="not-italic text-white/80">telo sa začne nastaľovať na daný typ pohybu ešte pred jeho začiatkom</em>. To je neuroplasticita v praxi.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '🏡', title: 'Rituál = Bezpečie', desc: 'Fixná štruktúra hovorí mozgovému kmeňu: "Toto poznám, som v bezpečí."' },
                  { icon: '📈', title: 'Od kmeňa ku kortexu', desc: 'Každé sedenie prechádza od upokojenia cez aktiváciu k integrácii.' },
                  { icon: '🔄', title: 'Neuroplasticita', desc: 'Opakovaním sa vytvárajú nové nervové dráhy — mozog sa fyzicky mení.' },
                ].map(item => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-4 rounded-2xl border"
                    style={{ background: 'rgba(43,138,98,.1)', borderColor: 'rgba(43,138,98,.2)' }}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="font-jakarta font-600 text-white text-sm mb-0.5">{item.title}</div>
                      <div className="text-white/50 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200} className="text-center mt-12">
          <BookingButton service="child" className="btn-primary btn-kids text-base px-10 py-4">
            Objednať dieťa na prvé sedenie
          </BookingButton>
          <p className="text-white/35 text-sm mt-4">
            Prvé sedenie: zoznámenie, anamnéza a krátka ukážka sedenia
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
