import type { Metadata } from 'next'
import { Check, Phone, MapPin, Users, Clock, Euro, Award, UserRound, CalendarDays } from 'lucide-react'
import type { ReactNode } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { NRiBrand, renderNRi } from '@/components/shared/NRiBrand'
import { ObfuscatedEmail } from '@/components/shared/ObfuscatedEmail'

export const metadata: Metadata = {
  title: 'NRi Practitioner — päťdňový výcvik | NRi',
  description:
    'Päťdňový zážitkový a praktický výcvik pre ľudí z pomáhajúcich profesií. Od porozumenia vývinu a regulácie nervového systému k bezpečnej aplikácii NRi. Smolenice, október 2027.',
}

const ACCENT = '#2a9aa8'
const WARM = '#c96b4a'

const FOR_WHOM = [
  'psychológom a psychoterapeutom',
  'špeciálnym pedagógom, logopédom a liečebným pedagógom',
  'EEG biofeedback trénerom',
  'fyzioterapeutom a ďalším zdravotníckym pracovníkom',
  'pedagogickým a odborným zamestnancom',
  'ďalším odborníkom pracujúcim s deťmi alebo dospelými',
]

const GOALS = [
  'pozorovať reakcie klienta',
  'rozlišovať pozorovanie od interpretácie',
  'prispôsobovať tempo a intenzitu',
  'rešpektovať hranice a súhlas',
  'rozpoznať známky nepohody alebo preťaženia',
  'vedieť intervenciu spomaliť, upraviť alebo zastaviť',
  'používať NRi iba v rozsahu svojej profesijnej kompetencie',
]

const TAKEAWAYS = [
  'rozumieť základným súvislostiam medzi vývinom, vzťahom, telom a reguláciou',
  'pozorovať telesné a behaviorálne prejavy klienta bez unáhleného diagnostikovania',
  'rozlišovať aktiváciu, útlm, únavu, odpor a možný distres',
  'bezpečne viesť jednotlivé časti NRi',
  'pracovať s tempom, rytmom, tlakom a kontaktom',
  'komunikovať súhlas a možnosť intervenciu zastaviť',
  'prispôsobiť postup veku a potrebám klienta',
  'rozpoznať hranice svojich kompetencií',
  'rozhodnúť, kedy NRi nepoužiť a klienta odoslať ďalšiemu odborníkovi',
]

interface Day {
  n: number
  title: string
  subtitle: string
  focus: string
  theory: string[]
  theoryNote?: { text: string; tone: 'info' | 'warn' }
  practiceTitle: string
  practice: string[]
  practiceIntro?: string
  practiceNote?: { text: string; tone: 'info' | 'warn' }
  practiceExtra?: { title: string; intro?: string; items?: string[] }
}

const DAYS: Day[] = [
  {
    n: 1,
    title: 'Prenatálny vývin, pôrod a bezpečie',
    subtitle: 'Od prvých podmienok vývinu k regulácii',
    focus: 'Vývin, stresová odpoveď, tlak, hranice',
    theory: [
      'prenatálny vývin nervového systému',
      'senzorický vývin plodu',
      'fyziológia stresu matky a plodu',
      'úloha placenty',
      'predčasný pôrod, hypoxia a perinatálne rizikové faktory',
      'fyziológia pôrodu a stresová odpoveď novorodenca',
      'oxytocín, katecholamíny a kortizol',
      'separácia po pôrode, pobyt na JIS a medicínske intervencie',
      'historický koncept prvotných odtlačkov Arthura Janova',
      'porovnanie Janovových hypotéz so súčasnými poznatkami vývinovej neurovedy',
    ],
    theoryNote: {
      text: 'Náročný pôrod automaticky neznamená traumatizáciu. Účastníci sa učia rozlišovať udalosť, pozorovateľné reakcie a neskoršiu odbornú interpretáciu.',
      tone: 'warn',
    },
    practiceTitle: 'Zážitková a praktická časť',
    practice: [
      'vnímanie reakcie organizmu na tlak, odpor a uvoľnenie',
      'pozorovanie dychu, potreby priestoru a hraníc',
      'prvé aktivačné pohyby NRi',
      'tempo, rytmus, tlak, vedenie a zastavenie',
      'bezpečný prvý kontakt s plachtou',
      'komunikovanie súhlasu a možnosti kedykoľvek vystúpiť',
    ],
    practiceNote: {
      text: 'Cvičenia neslúžia na „rekonštrukciu pôrodu“. Učia účastníka vnímať vlastné telesné reakcie a rešpektovať reakcie druhého človeka.',
      tone: 'info',
    },
  },
  {
    n: 2,
    title: 'Prvý rok života a vzťahová regulácia',
    subtitle: 'Keď sa regulácia rozvíja vo vzťahu',
    focus: 'Koregulácia, väzba, kontakt a autonómia',
    theory: [
      'raná koregulácia',
      'potreba spojenia, naladenia, dôvery a autonómie',
      'vývinové témy podľa Laurencea Hellera',
      'Bowlbyho teória vzťahovej väzby',
      'bezpečná základňa, separácia a návrat',
      'vnútorné pracovné modely',
      'pozorovania Mary Ainsworthovej',
      'bezpečná, vyhýbavá, ambivalentná a dezorganizovaná väzba',
      'hranice medzi vývinovým modelom, pozorovaním a diagnózou',
    ],
    practiceTitle: 'Zážitková a praktická časť',
    practice: [
      'priblíženie a vzdialenie',
      'kontakt, prerušenie kontaktu a jeho obnovenie',
      'vedenie a nasledovanie',
      'rozlišovanie kontaktu, kontroly, podriadenia a autonómie',
      'nácvik vedenia rúk, tlaku do dlaní, hojdania a spomaľovania',
      'sledovanie toho, čo sa s klientom počas pohybu deje',
    ],
    practiceNote: {
      text: 'Účastník sa neučí iba to, či bol pohyb vykonaný správne. Učí sa pozorovať, ako klient na pohyb a kontakt reaguje.',
      tone: 'info',
    },
  },
  {
    n: 3,
    title: 'Trauma, obranné reakcie a hranice',
    subtitle: 'Pozorovanie pred interpretáciou',
    focus: 'Pozorovanie, distres, spomalenie a zastavenie',
    theory: [
      'trauma a jej telesné prejavy',
      'implicitná a explicitná pamäť',
      'spúšťače, zvýšená a znížená aktivácia',
      'disociácia a telesné reakcie',
      'obranné reakcie fight, flight, freeze a immobilita',
      'orientácia, zdroje, titrácia a pendulácia',
      'vybrané koncepty Bessela van der Kolka a Petra Levina',
      'hranice práce absolventa kurzu',
    ],
    practiceTitle: 'Praktická časť',
    practiceIntro:
      'Účastníci pracujú v trojiciach v rolách praktik, klient a pozorovateľ. Pozorovateľ najskôr zaznamenáva iba to, čo skutočne vidí:',
    practice: [],
    practiceExtra: {
      title: 'Účastníci sa učia rozpoznávať:',
      items: [
        'zmenu dychu',
        'motorickú aktiváciu alebo stíšenie',
        'stratu kontaktu',
        'zmenu hlasu a mimiky',
        'známky nepohody',
        'potrebu spomaliť alebo intervenciu zastaviť',
      ],
    },
  },
  {
    n: 4,
    title: 'Autonómny nervový systém a regulácia',
    subtitle: 'Od fyziológie k praktickému pozorovaniu',
    focus: 'HRV, tempo, intenzita a práca s plachtou',
    theory: [
      'sympatický a parasympatický nervový systém',
      'vagus a baroreflex',
      'respiračná sínusová arytmia',
      'základy HRV',
      'HR, RR intervaly, RMSSD, SDNN, HF, LF, SD1 a SD2',
      'čo môže HRV naznačiť a čo z neho nemožno vyvodzovať',
      'polyvagálna teória Stephena Porgesa',
      'neurocepcia, sociálne zapojenie, mobilizácia a immobilizácia',
      'odborné hranice a diskutované časti polyvagálnej teórie',
    ],
    theoryNote: {
      text: 'Praktický rámec regulácie nepoužívame na vysvetľovanie každého správania jedinou vetvou vagu.',
      tone: 'warn',
    },
    practiceTitle: 'Zážitkový experiment',
    practiceIntro:
      'Na dobrovoľníkovi môžeme sledovať: HRV pred intervenciou • NRi • HRV po intervencii. Účastníci sa učia odlišovať nameraný údaj od jeho interpretácie.',
    practice: [],
    practiceExtra: {
      title: 'Praktická časť',
      items: [
        'vedenie dlhších, 10- až 15-minútových častí NRi',
        'sledovanie hlasu, tempa a načasovania',
        'regulácia intenzity a tlaku',
        'reakcia na zmeny klientovho stavu',
        'bezpečné uloženie klienta do plachty',
        'kontrola tlaku, dychu a komfortu',
        'dohodnutie jasného signálu na zastavenie',
        'okamžité a bezpečné uvoľnenie klienta',
      ],
    },
    practiceNote: {
      text: 'STOP znamená okamžité zastavenie. Nesúhlas ani nepohodu klienta nevysvetľujeme ako odpor, ktorý treba prekonať.',
      tone: 'warn',
    },
  },
  {
    n: 5,
    title: 'NRi v praxi a kompetencia praktika',
    subtitle: 'Od jednotlivých pohybov k bezpečnému vedeniu celej intervencie',
    focus: 'Celý protokol, skúška, profesijné hranice',
    theory: [
      'indikácie a kontraindikácie',
      'práca s deťmi a dospelými',
      'prispôsobenie pri PAS a komunikačných ťažkostiach',
      'práca s neverbálnym klientom',
      'možné prejavy traumatizácie a disociácie',
      'kedy NRi modifikovať',
      'kedy intervenciu prerušiť',
      'kedy klienta odoslať ďalšiemu odborníkovi',
      'profesijné a etické hranice absolventa',
    ],
    practiceTitle: 'Praktická časť',
    practiceIntro:
      'Účastníci absolvujú celý 39-minútový protokol NRi a následne pracujú v trojiciach: praktik vedie intervenciu, klient ju zažíva, pozorovateľ pracuje s kompetenčným checklistom. Každý účastník prejde všetkými tromi rolami.',
    practice: [],
    practiceExtra: {
      title: 'Pozorovateľ sleduje:',
      items: [
        'tempo a rytmus',
        'intenzitu kontaktu',
        'rešpektovanie hraníc',
        'komunikáciu a predvídateľnosť',
        'dych a telesné signály klienta',
        'motorickú aktiváciu alebo stíšenie',
        'známky distresu',
        'schopnosť praktika pružne reagovať',
      ],
    },
  },
]

const SCHEDULE: [string, string][] = [
  ['08.30 – 09.00', 'Príchod, orientácia a krátky check-in'],
  ['09.00 – 10.30', 'Teoretický blok I'],
  ['10.30 – 10.45', 'Prestávka'],
  ['10.45 – 12.00', 'Teoretický blok II'],
  ['12.00 – 13.00', 'Obed'],
  ['13.00 – 13.45', 'Spoločné NRi'],
  ['13.45 – 14.15', 'Reflexia skúsenosti'],
  ['14.15 – 15.45', 'Praktický nácvik pohybovej časti'],
  ['15.45 – 16.00', 'Prestávka'],
  ['16.00 – 17.15', 'Práca s plachtou a praktický nácvik'],
  ['17.15 – 17.30', 'Integrácia dňa'],
]

const ENTRY_EXPERIENCE = [
  'pôsobenie rytmu a zmeny tempa',
  'skúsenosť s vedením druhým človekom',
  'rozdiel medzi vedením a tlačením',
  'tlak do rúk a pohyb cez os tela',
  'spomaľovanie a odovzdanie časti kontroly',
  'kontakt s plachtou',
  'význam predvídateľnosti, súhlasu a možnosti pohyb zastaviť',
]

const EXAM_CASE = [
  'čo pozoruje',
  'čo zatiaľ nevie',
  'čo potrebuje zistiť',
  'ako prispôsobil kontakt a intervenciu',
  'kedy by intervenciu prerušil',
  'kedy by klienta odoslal ďalšiemu odborníkovi',
]

const EXAM_PRACTICE = [
  'bezpečné uloženie klienta',
  'komunikovanie súhlasu',
  'správnu manipuláciu s plachtou',
  'kontrolu tlaku',
  'sledovanie dychu a komfortu',
  'okamžitú reakciu na signál STOP',
  'bezpečné uvoľnenie klienta',
]

const AFTER_COURSE = [
  '20 zdokumentovaných intervencií',
  'minimálne dve supervízie',
  'vyhodnotenie dokumentácie a praktických kompetencií',
]

const REFERRALS = [
  'akútnu suicidálnu krízu',
  'psychotický stav',
  'závažné disociatívne prejavy, ktoré nevie bezpečne zvládnuť',
  'akútny neurologický alebo zdravotný problém',
  'výraznú negatívnu reakciu na intervenciu',
  'stav mimo profesijnej kompetencie absolventa',
]

function Bullets({ items, accent = ACCENT }: { items: string[]; accent?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map(item => (
        <li key={item} className="flex items-start gap-3 text-white/65 leading-relaxed">
          <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: accent }} />
          <span>{renderNRi(item)}</span>
        </li>
      ))}
    </ul>
  )
}

function Note({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) {
  const c = tone === 'warn' ? WARM : ACCENT
  return (
    <div
      className="rounded-xl p-5 text-white/85 font-medium leading-relaxed"
      style={{ background: `${c}14`, border: `1px solid ${c}55` }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mb-8">
      {label && (
        <div
          className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25"
          style={{ background: 'rgba(27,107,114,.1)' }}
        >
          {label}
        </div>
      )}
      <h2 className="font-jakarta text-3xl md:text-4xl font-bold text-white leading-tight">{children}</h2>
    </div>
  )
}

export default function VycvikPage() {
  return (
    <div className="theme-adults min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div
              className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25"
              style={{ background: 'rgba(27,107,114,.1)' }}
            >
              Päťdňový zážitkový a praktický výcvik
            </div>
            <h1 className="font-jakarta text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <NRiBrand /> <span className="text-gradient-teal">Practitioner</span>
            </h1>
            <p className="text-white/70 text-xl md:text-2xl leading-relaxed mb-4 max-w-3xl">
              Od porozumenia vývinu a regulácie nervového systému k bezpečnej aplikácii <NRiBrand />
            </p>
            <p className="text-white/45 mb-8">Pre ľudí z pomáhajúcich profesií · Smolenice</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-5 opacity-70">
                <p className="font-jakarta font-semibold text-white">1. – 5. februára 2027</p>
                <p className="text-sm mt-1" style={{ color: WARM }}>
                  Vypredané
                </p>
              </div>
              <div className="glass-card p-5 ring-1 ring-[#2a9aa8]/40">
                <p className="font-jakarta font-semibold text-white">4. – 8. októbra 2027</p>
                <p className="text-sm mt-1 text-[#2a9aa8]">Voľné miesta: 8 + 2 náhradníci</p>
              </div>
            </div>

            <a href="#prihlaska" className="btn-primary">
              Chcem sa prihlásiť
            </a>

            <p className="text-white/40 mt-8 text-sm tracking-wide">
              Zažiť • pochopiť • pozorovať • rozlíšiť • nacvičiť • reflektovať
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Čo je NRi + pre koho */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-14">
          <AnimatedSection>
            <Note>
              <NRiBrand /> výcvik nie je päť dní pasívneho počúvania prednášok. Každý deň prepája
              teóriu so skúsenosťou v tele, pozorovaním reakcií a bezpečným praktickým nácvikom.
            </Note>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading>
              Čo je <NRiBrand />
            </SectionHeading>
            <p className="text-white/65 leading-relaxed mb-6">
              <NRiBrand /> – neuro-rytmická integrácia – je štruktúrovaná 39-minútová intervencia,
              ktorá využíva hudbu, rytmus, vedený pohyb, telesný kontakt a prácu s plachtou.
            </p>
            <p className="text-white/65 leading-relaxed mb-5">
              Cieľom výcviku nie je naučiť sa mechanicky zopakovať jednotlivé pohyby. Účastník sa učí:
            </p>
            <Bullets items={GOALS} />
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading>Pre koho je výcvik určený</SectionHeading>
            <p className="text-white/65 leading-relaxed mb-5">
              Výcvik je určený ľuďom pôsobiacim v pomáhajúcich profesiách, najmä:
            </p>
            <Bullets items={FOR_WHOM} />
            <div className="mt-8">
              <Note tone="warn">
                Absolvovanie výcviku rozširuje kompetencie účastníka iba v rámci jeho pôvodného
                vzdelania a profesijného oprávnenia. Nenahrádza psychoterapeutické, psychologické ani
                zdravotnícke vzdelanie.
              </Note>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading>Čo si z výcviku odnesiete</SectionHeading>
            <p className="text-white/65 leading-relaxed mb-5">Počas kurzu sa naučíte:</p>
            <Bullets items={TAKEAWAYS} />
          </AnimatedSection>
        </div>
      </section>

      {/* Program */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionHeading label="Program">Päť dní, päť tém</SectionHeading>
          </AnimatedSection>

          <div className="space-y-4">
            {DAYS.map(day => (
              <AnimatedSection key={day.n} delay={day.n * 40}>
                <details className="glass-card group open:ring-1 open:ring-[#2a9aa8]/30" open={day.n === 1}>
                  <summary className="cursor-pointer list-none p-6 flex items-start gap-5">
                    <span
                      className="font-jakarta text-3xl font-bold leading-none shrink-0 mt-1"
                      style={{ color: WARM }}
                    >
                      {day.n}
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-bold uppercase tracking-widest" style={{ color: WARM }}>
                        {day.n}. deň
                      </span>
                      <span className="block font-jakarta text-xl md:text-2xl font-bold text-white mt-1">
                        {day.title}
                      </span>
                      <span className="block text-[#2a9aa8] italic mt-1">{day.subtitle}</span>
                      <span className="block text-white/40 text-sm mt-2">Ťažisko: {day.focus}</span>
                    </span>
                    <span className="text-white/30 text-2xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="px-6 pb-7 pl-6 md:pl-[4.5rem] space-y-6">
                    <div>
                      <h3 className="font-jakarta font-semibold text-white mb-3">Teoretická časť</h3>
                      <Bullets items={day.theory} />
                    </div>
                    {day.theoryNote && <Note tone={day.theoryNote.tone}>{day.theoryNote.text}</Note>}

                    <div>
                      <h3 className="font-jakarta font-semibold text-white mb-3">{day.practiceTitle}</h3>
                      {day.practiceIntro && (
                        <p className="text-white/65 leading-relaxed mb-4">{renderNRi(day.practiceIntro)}</p>
                      )}
                      {day.practice.length > 0 && <Bullets items={day.practice} />}
                    </div>

                    {day.n === 3 && (
                      <div className="rounded-xl p-5 bg-white/[.04] border border-white/10 text-white/85 font-medium">
                        „Klient prestal pohybovať rukami, zadržal dych a pozeral do jedného bodu.“
                        <p className="text-white/50 text-sm font-normal mt-3">
                          Až následne sa diskutujú možné interpretácie.
                        </p>
                      </div>
                    )}
                    {day.n === 3 && (
                      <Note tone="warn">Pozorovanie nie je interpretácia. Interpretácia nie je diagnóza.</Note>
                    )}

                    {day.practiceExtra && (
                      <div>
                        <h3 className="font-jakarta font-semibold text-white mb-3">{day.practiceExtra.title}</h3>
                        {day.practiceExtra.items && <Bullets items={day.practiceExtra.items} />}
                      </div>
                    )}
                    {day.practiceNote && <Note tone={day.practiceNote.tone}>{day.practiceNote.text}</Note>}
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ako výcvik prebieha */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <AnimatedSection>
            <SectionHeading>Ako výcvik prebieha</SectionHeading>
            <p className="text-white/65 leading-relaxed mb-8">
              Každý výcvikový deň trvá približne osem hodín a obsahuje teóriu, spoločnú skúsenosť,
              praktický nácvik a reflexiu.
            </p>
            <h3 className="font-jakarta text-xl font-semibold text-white mb-4">Orientačný denný harmonogram</h3>
            <div className="glass-card overflow-hidden">
              {SCHEDULE.map(([time, what], i) => (
                <div
                  key={time}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-3 ${
                    i % 2 ? 'bg-white/[.03]' : ''
                  }`}
                >
                  <span className="font-jakarta font-semibold text-sm text-[#2a9aa8] sm:w-40 shrink-0">{time}</span>
                  <span className="text-white/70">{renderNRi(what)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Note>Celkový rozsah základného výcviku je približne 40 prezenčných hodín.</Note>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading>Podmienky vstupu do kurzu</SectionHeading>
            <p className="text-white/65 leading-relaxed mb-4">
              Výcvik je otvorený ľuďom z pomáhajúcich profesií. Pred začiatkom výcviku absolvuje každý
              účastník minimálne päť kompletných <NRiBrand /> sedení.
            </p>
            <p className="text-white/65 leading-relaxed mb-5">Osobná skúsenosť umožňuje spoznať:</p>
            <Bullets items={ENTRY_EXPERIENCE} />
            <div className="mt-8">
              <Note tone="warn">
                Absolvovanie <NRiBrand /> pred kurzom nie je psychologickým skríningom ani automatickou zárukou
                spôsobilosti pracovať s klientmi.
              </Note>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading>Záverečné overenie vedomostí a zručností</SectionHeading>
            <p className="text-white/65 leading-relaxed mb-8">
              Výcvik sa nekončí iba písomným testom. Záverečné hodnotenie má tri časti.
            </p>
            <div className="space-y-8">
              <div>
                <h3 className="font-jakarta text-xl font-semibold text-[#2a9aa8] mb-2">1. Teoretický test</h3>
                <p className="text-white/65 leading-relaxed">
                  Overenie základných vedomostí z vývinu, regulácie, bezpečnosti, pozorovania a
                  profesijných hraníc.
                </p>
              </div>
              <div>
                <h3 className="font-jakarta text-xl font-semibold text-[#2a9aa8] mb-2">2. Rozbor kazuistiky</h3>
                <p className="text-white/65 leading-relaxed mb-4">
                  Účastník dostane modelovú situáciu a pomenuje:
                </p>
                <Bullets items={EXAM_CASE} />
              </div>
              <div>
                <h3 className="font-jakarta text-xl font-semibold text-[#2a9aa8] mb-2">3. Praktická skúška</h3>
                <p className="text-white/65 leading-relaxed mb-4">
                  Účastník musí bezpečne viesť <NRiBrand /> a preukázať schopnosť reagovať na potreby klienta.
                </p>
                <h4 className="font-jakarta font-semibold text-white mb-3">Samostatná skúška práce s plachtou</h4>
                <p className="text-white/65 leading-relaxed mb-3">Účastník preukáže:</p>
                <Bullets items={EXAM_PRACTICE} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Cesta k praxi + bezpečnosť */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <AnimatedSection>
            <SectionHeading>Cesta k samostatnej praxi</SectionHeading>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Pred kurzom – ja ako klient', 'Minimálne päť vlastných NRi sedení.'],
                ['Počas kurzu – ja ako účastník', 'Päť skupinových NRi a každodenná reflexia.'],
                ['Počas kurzu – ja ako budúci praktik', 'Praktický nácvik jednotlivých častí a celého protokolu.'],
              ].map(([t, d]) => (
                <div key={t} className="glass-card p-6">
                  <h3 className="font-jakarta font-semibold text-white mb-2">{renderNRi(t)}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{renderNRi(d)}</p>
                </div>
              ))}
              <div className="glass-card p-6">
                <h3 className="font-jakarta font-semibold text-white mb-3">
                  Po kurze – ja ako začínajúci <NRiBrand /> Practitioner
                </h3>
                <Bullets items={AFTER_COURSE} />
              </div>
            </div>
            <div className="mt-6">
              <Note tone="warn">
                Samotné absolvovanie päťdňového kurzu ešte neznamená pripravenosť samostatne pracovať so
                všetkými typmi klientov.
              </Note>
            </div>

            <h3 className="font-jakarta text-xl font-semibold text-white mt-10 mb-4">Stupne vzdelávania</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card p-6">
                <h4 className="font-jakarta font-semibold text-[#2a9aa8] mb-2">
                  <NRiBrand /> Practitioner – Level 1
                </h4>
                <p className="text-white/55 text-sm leading-relaxed">
                  Základný päťdňový výcvik, dokumentovaná prax a supervízia.
                </p>
              </div>
              <div className="glass-card p-6">
                <h4 className="font-jakarta font-semibold text-[#2a9aa8] mb-2">
                  <NRiBrand /> Practitioner – Level 2
                </h4>
                <p className="text-white/55 text-sm leading-relaxed">
                  Nadväzujúci výcvik zameraný na komplexnejšie situácie a klientov, napríklad PAS,
                  vývinovú traumatizáciu alebo disociatívne prejavy.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionHeading>Bezpečnosť a hranice kompetencií</SectionHeading>
            <p className="text-white/65 leading-relaxed mb-4">
              Účastník sa učí rozpoznať situácie, v ktorých <NRiBrand /> nevykonáva alebo klienta odosiela
              ďalšiemu odborníkovi. Ide najmä o:
            </p>
            <Bullets items={REFERRALS} accent={WARM} />
            <div className="mt-8">
              <Note tone="warn">
                Rozsah práce po absolvovaní kurzu vždy závisí od pôvodného vzdelania účastníka. Iné
                kompetencie má učiteľ, špeciálny pedagóg, psychológ, psychoterapeut alebo zdravotnícky
                pracovník.
              </Note>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Praktické informácie */}
      <section id="prihlaska" className="py-16 px-6 scroll-mt-28">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionHeading label="Prihláška">Praktické informácie</SectionHeading>

            <div className="grid sm:grid-cols-2 gap-4">
              <Info icon={<CalendarDays className="w-4 h-4" />} title="Termíny">
                <p className="text-white/45 line-through">1. – 5. februára 2027</p>
                <p className="text-sm" style={{ color: WARM }}>
                  Vypredané
                </p>
                <p className="mt-2">4. – 8. októbra 2027</p>
              </Info>
              <Info icon={<MapPin className="w-4 h-4" />} title="Miesto">
                <p>Obrancov mieru 4</p>
                <p>Smolenice</p>
              </Info>
              <Info icon={<Clock className="w-4 h-4" />} title="Rozsah">
                <p>5 dní</p>
                <p>približne 40 hodín</p>
              </Info>
              <Info icon={<Users className="w-4 h-4" />} title="Kapacita">
                <p>8 účastníkov</p>
                <p>+ 2 náhradníci</p>
              </Info>
              <Info icon={<Euro className="w-4 h-4" />} title="Cena">
                <p>600 € pri úhrade najneskôr 3 mesiace pred kurzom</p>
                <p className="mt-1">700 € pri úhrade najneskôr 1 mesiac pred kurzom</p>
              </Info>
              <Info icon={<Award className="w-4 h-4" />} title="Doklad">
                <p>Osvedčenie o absolvovaní</p>
              </Info>
              <Info icon={<UserRound className="w-4 h-4" />} title="Lektorka">
                <p>Mgr. Bibiana Naďová Dobrovolná</p>
              </Info>
              <Info icon={<Check className="w-4 h-4" />} title="Podmienka prijatia">
                <p>Pomáhajúca profesia a päť absolvovaných <NRiBrand /> sedení</p>
              </Info>
            </div>

            <div className="glass-card p-8 mt-8 text-center ring-1 ring-[#2a9aa8]/30">
              <h3 className="font-jakarta text-2xl font-bold text-white mb-3">Chcem sa prihlásiť</h3>
              <p className="text-white/60 max-w-xl mx-auto mb-6">
                Napíšte nám na e-mail alebo zavolajte. Voľné miesta sú na termín 4. – 8. októbra 2027.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ObfuscatedEmail
                  user="info"
                  domain="nri.sk"
                  className="btn-primary"
                />
                <a
                  href="tel:+421914202306"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" /> +421 914 202 306
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-16 text-center">
            <h2 className="font-jakarta text-3xl md:text-4xl font-bold text-white mb-4">
              <NRiBrand /> nie je iba protokol
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              Päť dní môže človeka naučiť jednotlivé kroky <NRiBrand />. Kompetentný praktik však vzniká až
              spojením osobnej skúsenosti, odborného výcviku, dokumentovanej praxe, reflexie a
              supervízie.
            </p>
            <p className="text-[#2a9aa8] font-semibold">
              Zažiť • pochopiť • rozpoznať • nacvičiť • bezpečne aplikovať
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

function Info({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="glass-card p-6">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2a9aa8] mb-3">
        {icon} {title}
      </p>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </div>
  )
}
