import AnimatedSection from '@/components/shared/AnimatedSection'
import BookingButton from '@/components/shared/BookingButton'
import Link from 'next/link'

const steps = [
  {
    n: '01',
    title: 'Rytmická aktivácia',
    bpm: '110 BPM',
    song: 'Queen — We Will Rock You',
    desc: 'Silný základný rytmus dup-dup-plesk synchronizuje bazálne gangliá. Mozog sa orientuje v priestore a čase — základ pre všetky ďalšie pohyby.',
    color: '#4a3080',
    emoji: '🥁',
  },
  {
    n: '02',
    title: 'Energetická eskalácia',
    bpm: '133 BPM',
    song: 'The Prodigy — No Good',
    desc: 'Rýchly elektronický rytmus eskaluje sympatický nervový systém. Celotelo sa aktivuje — príprava na maximálnu integráciu oboch hemisfér.',
    color: '#c8400a',
    emoji: '⚡',
  },
  {
    n: '03',
    title: 'Freeze Dance — brzda',
    bpm: '120 BPM',
    song: 'Rammstein — Du Hast',
    desc: 'Frontálny lalok sa tréninguje inhibíciou — pohyb a stopka. Mozog sa učí prepínať medzi excitáciou a pokojom.',
    color: '#5a2020',
    emoji: '🛑',
  },
  {
    n: '04',
    title: 'Emocionálne spracovanie',
    bpm: '84 BPM',
    song: 'Imagine Dragons — Demons',
    desc: 'Pokles tempa uvoľňuje limbický systém. Pohyby vyjadrujú emócie — mozog integruje cítené s prežitým, bez slov.',
    color: '#7a2d45',
    emoji: '💜',
  },
  {
    n: '05',
    title: 'Hemisférová integrácia',
    bpm: '105 BPM',
    song: 'Linkin Park — In The End',
    desc: 'Skrížené pohyby rúk a nôh aktivujú corpus callosum. Ľavá a pravá hemisféra začínajú pracovať v tandeme.',
    color: '#2d5080',
    emoji: '🔄',
  },
  {
    n: '06',
    title: 'Tai-Ji & rovnováha',
    bpm: '55 BPM',
    song: 'Evanescence — My Immortal',
    desc: 'Extrémne pomalé, vedomé pohyby trénujú mozoček a prefrontálnu kôru. Budovanie sebaregulácie a telesného sústredenia.',
    color: '#1b6b72',
    emoji: '⚖️',
  },
  {
    n: '07',
    title: 'Dopamínová aktivácia',
    bpm: '160 BPM',
    song: 'Pharrell Williams — Happy',
    desc: 'Rýchle, ľahké pohyby uvoľňujú dopamín a serotonín. Mozog asociuje pohyb s radosťou — kľúčová fáza pre motivačné dráhy.',
    color: '#c8980a',
    emoji: '😄',
  },
  {
    n: '08',
    title: 'Zrkadlenie & dôvera',
    bpm: '72 BPM',
    song: 'Edith Piaf — Non, je ne regrette rien',
    desc: 'Terapeut kopíruje pohyby klienta — aktivujú sa zrkadlové neuróny, buduje sa bazálna dôvera a emočná bezpečnosť.',
    color: '#7a4d25',
    emoji: '🤝',
  },
  {
    n: '09',
    title: 'Mapa tela',
    bpm: '68 BPM',
    song: 'LP — Lost On You',
    desc: 'Rytmické vyklepávanie aktivuje propriocepciu — telo spoznáva samé seba. Budovanie telesnej mapy ako základ pre sebareguláciu.',
    color: '#3474b8',
    emoji: '🗺️',
  },
  {
    n: '10',
    title: 'Identita & sebaistota',
    bpm: '74 BPM',
    song: 'Gunčíková — I Stand',
    desc: 'Pohyby sú veľké, víťazné, priestorové. Mozog buduje pozitívny telesný obraz — "Stojím pevne, som tu."',
    color: '#2b8a62',
    emoji: '🦋',
  },
  {
    n: '11',
    title: 'Emočné ukotvenie',
    bpm: '76 BPM',
    song: 'Robbie Williams — Angels',
    desc: 'Jemné, ochranné pohyby aktivujú systém sociálnej väzby. Oxytocín a pocit "som v bezpečí s iným človekom."',
    color: '#8060c0',
    emoji: '🕊️',
  },
  {
    n: '12',
    title: 'Naladenie & spojenie',
    bpm: '67 BPM',
    song: 'Lady Gaga — Hold My Hand',
    desc: 'Pomalé synchrónne pohyby s terapeutom vytvárajú neurobiologické ladenie. Systém bezpečia sa plne aktivuje.',
    color: '#c87090',
    emoji: '🤲',
  },
  {
    n: '13',
    title: 'Hlboká integrácia',
    bpm: '70 BPM',
    song: 'Alexandra Burke — Hallelujah',
    desc: 'Pomalé, hlboké pohyby a hlas. Celý nervový systém sa zjednocuje — kognitívne, emočné a telesné ja sa stretávajú.',
    color: '#1a5060',
    emoji: '🌊',
  },
  {
    n: '14',
    title: 'Ukotvenie & záver',
    bpm: '50 BPM',
    song: 'The Piano Guys — O Come O Come Emmanuel',
    desc: 'Záverečný návrat do pokoja. Pevné objatie, hlboký tlak, mrmlanie M. Nervový systém integruje všetky nové skúsenosti do trvalých nervových dráh.',
    color: '#0d4060',
    emoji: '🏠',
  },
]

export default function TherapyProcess() {
  return (
    <section className="bg-[#0d1928] py-28 px-6" id="sedenie">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Protokol NRI
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-6">
            Ako prebieha sedenie
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Každé sedenie sleduje rovnakú štruktúru — od upokojenia cez aktiváciu späť do bezpečia. Predvídateľnosť rituálu je sama o sebe liečivá.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 80}>
              <div
                className="rounded-3xl p-7 h-full border hover:-translate-y-1 transition-transform duration-300"
                style={{ background: `${step.color}12`, borderColor: `${step.color}30` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{step.emoji}</div>
                  <div className="font-jakarta font-800 text-4xl" style={{ color: `${step.color}40` }}>
                    {step.n}
                  </div>
                </div>
                <div
                  className="text-xs font-jakarta font-600 uppercase tracking-wide px-2.5 py-1 rounded-full inline-block mb-3"
                  style={{ color: step.color, background: `${step.color}20`, border: `1px solid ${step.color}35` }}
                >
                  {step.bpm}
                </div>
                <h3 className="font-jakarta font-700 text-white mb-1">{step.title}</h3>
                <p className="text-xs italic mb-3" style={{ color: step.color }}>{step.song}</p>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <BookingButton service="adult" className="btn-primary text-base px-10 py-4">
            Objednať sa na prvé sedenie
          </BookingButton>
          <p className="text-white/30 text-sm mt-4">
            Prvé stretnutie: orientačný rozhovor + krátka ukážka sedenia
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
