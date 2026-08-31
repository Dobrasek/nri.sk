'use client'

import { useState } from 'react'
import { adultsBrainRegions, type BrainRegion } from '@/lib/brain-data'
import { X, Zap, Target, Music } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

function BrainSVG({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const regions = [
    // Frontal lobe
    { id: 'frontal', d: 'M 185 235 C 170 195 155 160 150 130 C 145 100 148 75 160 62 C 172 48 190 44 208 50 C 228 56 245 72 258 95 C 272 120 278 150 272 178 C 266 205 252 225 235 238 Z', label: 'Frontálny lalok', lx: 218, ly: 145 },
    // Parietal lobe
    { id: 'parietal', d: 'M 235 238 C 252 225 266 205 272 178 C 278 150 272 120 258 95 C 272 88 290 90 308 100 C 328 112 342 130 348 155 C 354 180 348 208 332 228 C 318 246 298 255 278 255 Z', label: 'Parietálny lalok', lx: 295, ly: 165 },
    // Occipital lobe
    { id: 'occipital', d: 'M 278 255 C 298 255 318 246 332 228 C 348 208 354 180 348 155 C 358 160 368 172 372 190 C 376 210 370 235 355 252 C 340 268 318 275 298 272 Z', label: 'Okcipitálny lalok', lx: 330, ly: 225 },
    // Temporal lobe
    { id: 'temporal', d: 'M 185 235 C 195 248 198 265 192 282 C 186 300 172 315 155 325 C 138 335 118 338 100 332 C 82 326 68 313 62 297 C 56 280 60 260 72 248 C 85 235 105 232 125 235 C 148 238 168 240 185 235 Z', label: 'Temporálny lalok', lx: 125, ly: 285 },
    // Cerebellum
    { id: 'cerebellum', d: 'M 278 255 C 298 272 318 275 330 285 C 345 298 348 318 338 335 C 328 350 308 358 288 354 C 268 350 250 338 242 322 C 234 306 238 286 250 275 Z', label: 'Mozoček', lx: 285, ly: 315 },
    // Brain stem
    { id: 'brainstem', d: 'M 185 235 C 200 242 215 245 230 242 C 242 240 250 275 242 322 C 238 344 230 358 218 360 C 206 362 196 354 190 342 C 182 328 182 310 185 295 C 188 278 188 258 185 235 Z', label: 'Mozgový kmeň', lx: 207, ly: 300 },
    // Limbic (shown as internal)
    { id: 'limbic', d: 'M 200 200 C 195 188 190 175 192 163 C 194 150 202 140 212 138 C 222 135 233 140 238 150 C 244 162 242 178 235 190 C 228 202 215 208 205 205 Z', label: 'Limbický systém', lx: 214, ly: 172 },
    // Thalamus
    { id: 'thalamus', d: 'M 215 218 C 210 210 206 202 208 194 C 210 186 218 182 226 183 C 234 184 240 190 240 198 C 240 206 235 214 228 218 C 222 222 217 222 215 218 Z', label: 'Talamus', lx: 224, ly: 202 },
    // Basal ganglia
    { id: 'basalganglia', d: 'M 195 225 C 188 220 184 212 186 204 C 188 196 196 190 204 190 C 212 190 218 196 218 204 C 218 212 214 220 208 225 C 203 228 198 228 195 225 Z', label: 'Bazálne gangliá', lx: 202, ly: 210 },
    // Corpus callosum
    { id: 'corpus', d: 'M 195 175 C 196 165 200 158 207 155 C 215 152 224 154 230 160 C 236 166 236 174 230 178 C 224 183 215 183 207 180 C 201 178 196 177 195 175 Z', label: 'Corpus Callosum', lx: 214, ly: 168 },
  ]

  const getColor = (id: string) => {
    const region = adultsBrainRegions.find(r => r.id === id)
    if (!region) return '#1a3050'
    if (selected === id) return region.hoverColor
    return region.color
  }

  const getOpacity = (id: string) => {
    if (!selected) return 0.75
    return selected === id ? 1 : 0.35
  }

  return (
    <div className="relative">
      <svg
        viewBox="60 40 330 340"
        className="w-full max-w-lg mx-auto drop-shadow-2xl"
        aria-label="Interaktívny mozog — kliknite na oblasť"
      >
        {/* Base brain silhouette */}
        <path
          d="M 160 62 C 148 48 130 42 110 48 C 88 56 70 72 60 95 C 50 120 52 150 62 178 C 72 206 88 228 108 242 C 128 256 152 260 172 255 C 180 258 188 260 185 280 C 182 300 175 320 168 340 C 162 358 160 368 170 370 C 180 372 190 360 198 345 C 206 330 210 315 215 305 C 220 315 228 332 238 345 C 248 358 260 368 270 365 C 280 362 280 350 274 335 C 268 320 258 305 252 288 C 248 275 250 265 260 262 C 280 258 305 248 325 230 C 345 210 358 182 358 152 C 358 120 344 90 322 72 C 300 54 272 48 248 54 C 228 48 210 50 195 56 C 180 50 170 56 160 62 Z"
          fill="url(#brainGrad)"
          stroke="#1b6b72"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Brain sulci lines for realism */}
        <path d="M 185 75 C 195 85 200 98 197 112" stroke="#2a9aa8" strokeWidth="1" fill="none" opacity="0.2" />
        <path d="M 235 238 C 245 228 255 218 258 205" stroke="#2a9aa8" strokeWidth="1" fill="none" opacity="0.2" />
        <path d="M 150 180 C 162 172 175 168 188 170" stroke="#2a9aa8" strokeWidth="1" fill="none" opacity="0.15" />
        <path d="M 120 250 C 135 245 150 242 165 245" stroke="#2a9aa8" strokeWidth="1" fill="none" opacity="0.15" />

        <defs>
          <radialGradient id="brainGrad" cx="45%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#1a3050" />
            <stop offset="60%" stopColor="#0f2238" />
            <stop offset="100%" stopColor="#081420" />
          </radialGradient>
          <filter id="regionGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Clickable regions */}
        {regions.map(region => (
          <g key={region.id}>
            <path
              d={region.d}
              fill={getColor(region.id)}
              opacity={getOpacity(region.id)}
              stroke={selected === region.id ? getColor(region.id) : 'transparent'}
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'all 0.25s ease', filter: selected === region.id ? 'url(#regionGlow)' : 'none' }}
              onClick={() => onSelect(region.id)}
            />
            {/* Label */}
            <text
              x={region.lx}
              y={region.ly}
              textAnchor="middle"
              fill="white"
              fontSize="7.5"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="600"
              opacity={selected === region.id ? 1 : (selected ? 0.3 : 0.7)}
              style={{ cursor: 'pointer', pointerEvents: 'none', transition: 'opacity 0.25s' }}
            >
              {region.label}
            </text>
          </g>
        ))}

        {/* Pulse animation on selected */}
        {selected && (() => {
          const region = regions.find(r => r.id === selected)
          if (!region) return null
          return (
            <circle
              cx={region.lx}
              cy={region.ly}
              r="5"
              fill="none"
              stroke={getColor(selected)}
              strokeWidth="1.5"
              opacity="0.8"
            >
              <animate attributeName="r" values="5;18;5" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
          )
        })()}
      </svg>

      <p className="text-center text-white/35 text-xs mt-3 font-jakarta">
        Kliknite na oblasť mozgu pre detail
      </p>
    </div>
  )
}

function RegionPanel({ region, onClose }: { region: BrainRegion; onClose: () => void }) {
  return (
    <div className="rounded-3xl border overflow-hidden" style={{ background: 'rgba(18,32,48,.95)', borderColor: `${region.color}35` }}>
      <div className="p-6 border-b" style={{ borderColor: `${region.color}25`, background: `${region.color}18` }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl mb-1">{region.emoji}</div>
            <h3 className="font-jakarta font-700 text-white text-xl">{region.name}</h3>
            <p className="text-xs uppercase tracking-wide mt-0.5" style={{ color: region.hoverColor }}>{region.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5 max-h-[400px] overflow-y-auto">
        <p className="text-white/65 text-sm leading-relaxed">{region.description}</p>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3.5 h-3.5" style={{ color: region.hoverColor }} />
            <span className="text-xs font-jakarta font-600 uppercase tracking-wide" style={{ color: region.hoverColor }}>
              Prejavy & symptómy
            </span>
          </div>
          <ul className="space-y-1">
            {region.symptoms.map(s => (
              <li key={s} className="text-white/55 text-xs flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: region.color }} />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Music className="w-3.5 h-3.5" style={{ color: region.hoverColor }} />
            <span className="text-xs font-jakarta font-600 uppercase tracking-wide" style={{ color: region.hoverColor }}>
              NRi techniky
            </span>
          </div>
          <ul className="space-y-1">
            {region.nriTechniques.map(t => (
              <li key={t} className="text-white/55 text-xs flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: region.hoverColor }} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3.5 h-3.5" style={{ color: region.hoverColor }} />
            <span className="text-xs font-jakarta font-600 uppercase tracking-wide" style={{ color: region.hoverColor }}>
              Aktivity
            </span>
          </div>
          <ul className="space-y-1">
            {region.activities.map(a => (
              <li key={a} className="text-white/55 text-xs flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: region.color }} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function InteractiveBrain() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedRegion = adultsBrainRegions.find(r => r.id === selectedId) ?? null

  return (
    <section className="bg-[#0b1524] py-28 px-6" id="mozog">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Interaktívny mozog
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-4">
            Kliknite a objavte,<br />
            <span className="text-gradient-teal">čo sa deje vo vašom mozgu</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Každá oblasť mozgu hrá svoju úlohu. Kliknutím sa dozviete, čo zodpovedá za vaše symptómy a ako NRi pracuje práve s touto oblasťou.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <AnimatedSection direction="left">
            <BrainSVG selected={selectedId} onSelect={id => setSelectedId(id === selectedId ? null : id)} />
          </AnimatedSection>

          <AnimatedSection direction="right">
            {selectedRegion ? (
              <RegionPanel region={selectedRegion} onClose={() => setSelectedId(null)} />
            ) : (
              <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="font-jakarta font-700 text-white text-xl mb-3">
                  Vyberte oblasť
                </h3>
                <p className="text-white/45 text-sm leading-relaxed max-w-xs">
                  Kliknite na farebnú oblasť v diagrame mozgu a zistíte jej funkciu, typické príznaky a NRi techniky na jej posilnenie.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-2 w-full max-w-xs">
                  {adultsBrainRegions.slice(0, 6).map(r => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedId(r.id)}
                      className="text-left px-3 py-2 rounded-xl text-xs font-jakarta font-500 text-white/60 hover:text-white transition-all border border-white/8 hover:border-white/20"
                      style={{ background: `${r.color}20` }}
                    >
                      {r.emoji} {r.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
