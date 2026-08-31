import AnimatedSection from '@/components/shared/AnimatedSection'

const activities = [
  {
    title: '🌳 Strom v rannom vánku',
    duration: '1 minúta',
    target: 'Mozoček & Amygdala',
    color: '#2b8a62',
    steps: [
      'Dieťa stojí s mierne pokrčenými kolenami, nohy na šírku ramien',
      'S nádychom pomaly dvíha ruky pred sebou až nad hlavu',
      'S výdychom ruky klesajú po stranách dole',
      '"Si pevný strom, tvoje korene idú hlboko do zeme"',
    ],
  },
  {
    title: '⛅ Hladkanie oblakov',
    duration: '1 minúta',
    target: 'Corpus Callosum',
    color: '#3474b8',
    steps: [
      'Jedna ruka je hore, druhá dole',
      'Dieťa plynule mení ich polohu — ruky prechádzajú pred tvárou v oblúkoch',
      'Pohyb vychádza z pása, ktorý sa mierne otáča',
      '"Tvoje ruky sú mäkké ako vata, jemne odsuň oblaky"',
    ],
  },
  {
    title: '🐒 Odháňanie opice',
    duration: '1 minúta',
    target: 'Frontálny lalok',
    color: '#e8724a',
    steps: [
      'Jedna ruka smeruje vpred s otvorenou dlaňou',
      'Druhá sa oblúkom vracia k uchu a potom "odstrčí" niečo pred sebou',
      'Striedajte strany — vyžaduje pomalý, kontrolovaný pohyb',
      '"Opica ti chce vziať pozornosť, jemne ju odstrč nabok"',
    ],
  },
  {
    title: '🐚 Zdvíhanie perly',
    duration: '1 minúta',
    target: 'Propriocepcia',
    color: '#8060c0',
    steps: [
      'Dieťa ide do mierneho poddrepu (rovný chrbát)',
      'Rukami akoby niečo nabralo zo zeme',
      'Pomaly to dvíha pred hrudník, kde dlane spojí',
      '"Našiel si vzácnu perlu pokoja, vynes ju hore"',
    ],
  },
  {
    title: '🐯 Hra na tigra — sila',
    duration: '3 minúty',
    target: 'Mozgový kmeň & Bazálne gangliá',
    color: '#c8980a',
    steps: [
      'FÁZA 1: Jemne trasite rukami a nohami dieťaťa ("tiger sa prebúdza")',
      'FÁZA 2: Dlaňami proti dlaniam — dieťa tlačí do vás ("ukáž svoju silu!")',
      'FÁZA 3: Rýchly bicykel nohami ("tiger beží cez džungľu!")',
      'FÁZA 4: Spoločne zakričte silné "HA!" ("víťazný ryk tigra!")',
    ],
  },
  {
    title: '🚪 Zavretie dverí pokoja',
    duration: '1 minúta',
    target: 'Ukončenie — integrácia',
    color: '#1b6b72',
    steps: [
      'Dlane sú položené na sebe na bruchu (pod pupkom)',
      'Dieťa zatvorí oči',
      'Urobte tri hlboké nádychy do brucha, kde cíti teplo dlaní',
      '"Ulož si všetok ten pokoj do svojho bruška na celý deň"',
    ],
  },
]

export default function BrainActivities() {
  return (
    <section className="py-28 px-6" style={{ background: '#0f1f18' }} id="aktivity">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2b8a62] border border-[#2b8a62]/30 mb-4"
            style={{ background: 'rgba(43,138,98,.12)' }}
          >
            Hry & aktivity
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-6">
            5-minútová ranná rutina
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Tieto pohyby sú navrhnuté tak, aby pred školou „prebudili" mozoček a frontálnu kôru, zatiaľ čo upokoja amygdalu. Robte ich <strong className="text-white/80">spolu</strong> s dieťaťom — vaša spoluregulácia je najdôležitejšia.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a, i) => (
            <AnimatedSection key={a.title} delay={i * 70}>
              <div
                className="rounded-3xl p-7 h-full border hover:shadow-lg transition-all hover:-translate-y-1"
                style={{
                  background: `${a.color}0d`,
                  borderColor: `${a.color}30`,
                  boxShadow: `0 4px 20px ${a.color}12`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-jakarta font-700 text-white text-base leading-snug">{a.title}</h3>
                </div>
                <div className="flex gap-2 mb-4">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-jakarta font-600"
                    style={{ color: a.color, background: `${a.color}18`, border: `1px solid ${a.color}30` }}
                  >
                    {a.duration}
                  </span>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-jakarta font-500"
                    style={{ color: `${a.color}cc`, background: `${a.color}10` }}
                  >
                    {a.target}
                  </span>
                </div>
                <ol className="space-y-2">
                  {a.steps.map((step, si) => (
                    <li key={si} className="flex items-start gap-2 text-xs text-white/60 leading-relaxed">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white mt-0.5"
                        style={{ background: a.color }}
                      >
                        {si + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300} className="mt-12">
          <div
            className="rounded-3xl p-8 text-center border"
            style={{ background: 'rgba(43,138,98,.1)', borderColor: 'rgba(43,138,98,.25)' }}
          >
            <p className="text-white/65 font-jakarta font-500 mb-2">
              💡 Rada pre rodiča: Robte to spolu s dieťaťom. Vaša spoluregulácia a pokojné tempo sú pre jeho vyvíjajúci sa mozog dôležitejšie než dokonalé prevedenie cvikov.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
