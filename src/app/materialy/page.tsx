import type { Metadata } from 'next'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Download, FileText, BookOpen, Image } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Materiály — NRi | PDF, Checklisty, Plagáty',
  description: 'Zadarmo stiahnuteľné materiály: checklisty dysregulácie, mapa mozgu, NRI playlist guide, príručky pre rodičov.',
}

const materials = [
  {
    icon: FileText,
    title: 'Checklist dysregulácie nervového systému',
    desc: 'Sebahodnotenie pre dospelých — 20 otázok, ktoré pomôžu identifikovať stav vášho nervového systému.',
    category: 'Pre dospelých',
    type: 'PDF • A4',
    color: '#1b6b72',
    available: true,
  },
  {
    icon: Image,
    title: 'Mapa mozgu dieťaťa',
    desc: 'Farebný plagát s oblasťami mozgu, ich funkciami a odporúčanými aktivitami. Ideálne na vylepenie doma.',
    category: 'Pre deti & rodičov',
    type: 'PDF • A3',
    color: '#2b8a62',
    available: true,
  },
  {
    icon: BookOpen,
    title: 'Hry podľa oblastí mozgu',
    desc: 'Príručka s 24 hrami a aktivitami priradenými ku konkrétnym oblastiam mozgu. Vhodné pre deti 2–12 rokov.',
    category: 'Pre deti & rodičov',
    type: 'PDF • 12 strán',
    color: '#3474b8',
    available: true,
  },
  {
    icon: FileText,
    title: 'NRI Playlist Guide',
    desc: 'Kompletný protokol NRI — poradie skladieb, BPM, pohyby ku každej skladbe a krízový ťahák.',
    category: 'Pre rodičov & odborníkov',
    type: 'PDF • 8 strán',
    color: '#7a2d45',
    available: true,
  },
  {
    icon: Image,
    title: 'Polyvagálna pyramída',
    desc: 'Vizuálny plagát vysvetľujúci tri stavy nervového systému a ich prejavy. Vhodné pre ambulanciu aj domov.',
    category: 'Neurobiológia',
    type: 'PDF • A3',
    color: '#4a3080',
    available: true,
  },
  {
    icon: FileText,
    title: 'Krízový ťahák — reakcie nervovej sústavy',
    desc: 'Rýchloupravná karta pre rodičov: čo robiť, keď dieťa plače, stuhne, disociuje alebo má záchvaty.',
    category: 'Pre deti & rodičov',
    type: 'PDF • A5 na vytlačenie',
    color: '#c8700a',
    available: false,
  },
  {
    icon: BookOpen,
    title: 'Ranná rutina — 5 minút pre mozog',
    desc: 'Ilustrovaný sprievodca rannou Tai-Ji rutinou pre deti. Každý pohyb s metaforou a cielenou oblasťou mozgu.',
    category: 'Pre deti & rodičov',
    type: 'PDF • 6 strán',
    color: '#2b8a62',
    available: false,
  },
  {
    icon: FileText,
    title: 'Sprievodca tónovaním pre rodičov',
    desc: 'Technika vokálneho tónovania — kde priložiť ruky, ako tónovať ku každej časti tela a ku každej skladbe.',
    category: 'Pre rodičov',
    type: 'PDF • 4 strany',
    color: '#1b6b72',
    available: false,
  },
]

export default function MaterialyPage() {
  return (
    <div className="bg-[#0b1524] min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-6 pb-28">
        <AnimatedSection className="text-center mb-16 pt-8">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Materiály
          </div>
          <h1 className="font-jakarta text-5xl font-700 text-white mb-4">
            PDF, Plagáty & Checklisty
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Zadarmo stiahnuteľné materiály na podporu nervového systému — doma, v škole alebo v ambulancii.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          {materials.map((mat, i) => (
            <AnimatedSection key={mat.title} delay={i * 60}>
              <div
                className="glass-card p-6 flex gap-5 hover:-translate-y-0.5 transition-all"
                style={{ borderColor: mat.available ? `${mat.color}25` : 'rgba(255,255,255,.05)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${mat.color}20`, border: `1px solid ${mat.color}35` }}
                >
                  <mat.icon className="w-5 h-5" style={{ color: mat.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-jakarta font-600 text-white text-sm leading-snug">{mat.title}</h3>
                    {!mat.available && (
                      <span className="text-[10px] text-white/25 border border-white/10 px-2 py-0.5 rounded-full flex-shrink-0 font-jakarta">
                        Čoskoro
                      </span>
                    )}
                  </div>
                  <p className="text-white/45 text-xs leading-relaxed mt-1 mb-3">{mat.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span
                        className="text-[10px] font-jakarta px-2 py-0.5 rounded-full"
                        style={{ color: mat.color, background: `${mat.color}15` }}
                      >
                        {mat.category}
                      </span>
                      <span className="text-[10px] text-white/30 font-jakarta">{mat.type}</span>
                    </div>
                    {mat.available ? (
                      <button
                        className="flex items-center gap-1.5 text-xs font-jakarta font-600 transition-all hover:gap-2"
                        style={{ color: mat.color }}
                      >
                        <Download className="w-3.5 h-3.5" /> Stiahnuť
                      </button>
                    ) : (
                      <span className="text-white/20 text-xs font-jakarta">Pripravujeme</span>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300} className="mt-12">
          <div
            className="rounded-3xl p-8 text-center border"
            style={{ background: 'rgba(27,107,114,.08)', borderColor: 'rgba(27,107,114,.2)' }}
          >
            <p className="text-white/60 mb-2">Hľadáte niečo špeciálne?</p>
            <p className="text-white/40 text-sm mb-5">
              Vieme vytvoriť materiály na mieru pre vašu ambulanciu, školu alebo rodinné centrum.
            </p>
            <a
              href="/kontakt"
              className="btn-primary inline-flex"
            >
              Napíšte nám
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
