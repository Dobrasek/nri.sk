'use client'

import { useState } from 'react'
import { kidsBrainRegions, type BrainRegion } from '@/lib/brain-data'
import { X, Gamepad2, Sparkles, Music2 } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

function BrainSVGKids({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const regions = [
    { id: 'frontal',      d: 'M 185 235 C 170 195 155 160 150 130 C 145 100 148 75 160 62 C 172 48 190 44 208 50 C 228 56 245 72 258 95 C 272 120 278 150 272 178 C 266 205 252 225 235 238 Z', lx: 218, ly: 145 },
    { id: 'parietal',     d: 'M 235 238 C 252 225 266 205 272 178 C 278 150 272 120 258 95 C 272 88 290 90 308 100 C 328 112 342 130 348 155 C 354 180 348 208 332 228 C 318 246 298 255 278 255 Z', lx: 295, ly: 165 },
    { id: 'occipital',    d: 'M 278 255 C 298 255 318 246 332 228 C 348 208 354 180 348 155 C 358 160 368 172 372 190 C 376 210 370 235 355 252 C 340 268 318 275 298 272 Z', lx: 330, ly: 225 },
    { id: 'temporal',     d: 'M 185 235 C 195 248 198 265 192 282 C 186 300 172 315 155 325 C 138 335 118 338 100 332 C 82 326 68 313 62 297 C 56 280 60 260 72 248 C 85 235 105 232 125 235 C 148 238 168 240 185 235 Z', lx: 125, ly: 285 },
    { id: 'cerebellum',   d: 'M 278 255 C 298 272 318 275 330 285 C 345 298 348 318 338 335 C 328 350 308 358 288 354 C 268 350 250 338 242 322 C 234 306 238 286 250 275 Z', lx: 285, ly: 315 },
    { id: 'brainstem',    d: 'M 185 235 C 200 242 215 245 230 242 C 242 240 250 275 242 322 C 238 344 230 358 218 360 C 206 362 196 354 190 342 C 182 328 182 310 185 295 C 188 278 188 258 185 235 Z', lx: 207, ly: 300 },
    { id: 'basalganglia', d: 'M 200 200 C 192 193 188 184 192 176 C 196 167 206 162 216 164 C 226 166 232 174 230 183 C 228 192 220 198 212 200 C 207 202 202 202 200 200 Z', lx: 212, ly: 184 },
    { id: 'corpus',       d: 'M 195 175 C 196 165 200 158 207 155 C 215 152 224 154 230 160 C 236 166 236 174 230 178 C 224 183 215 183 207 180 C 201 178 196 177 195 175 Z', lx: 214, ly: 168 },
  ]

  const getRegionData = (id: string) => kidsBrainRegions.find(r => r.id === id)

  const getColor = (id: string) => {
    const r = getRegionData(id)
    if (!r) return '#2b8a62'
    return selected === id ? r.hoverColor : r.color
  }

  const getOpacity = (id: string) => {
    if (!selected) return 0.85
    return selected === id ? 1 : 0.25
  }

  return (
    <div className="relative">
      <svg
        viewBox="60 40 330 340"
        className="w-full max-w-lg mx-auto drop-shadow-xl"
        aria-label="Interaktívny mozog pre deti — kliknite na oblasť"
      >
        {/* Base brain shape */}
        <path
          d="M 160 62 C 148 48 130 42 110 48 C 88 56 70 72 60 95 C 50 120 52 150 62 178 C 72 206 88 228 108 242 C 128 256 152 260 172 255 C 180 258 188 260 185 280 C 182 300 175 320 168 340 C 162 358 160 368 170 370 C 180 372 190 360 198 345 C 206 330 210 315 215 305 C 220 315 228 332 238 345 C 248 358 260 368 270 365 C 280 362 280 350 274 335 C 268 320 258 305 252 288 C 248 275 250 265 260 262 C 280 258 305 248 325 230 C 345 210 358 182 358 152 C 358 120 344 90 322 72 C 300 54 272 48 248 54 C 228 48 210 50 195 56 C 180 50 170 56 160 62 Z"
          fill="url(#brainGradKids)"
          stroke="#3db882"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        <defs>
          <radialGradient id="brainGradKids" cx="45%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#1e4a35" />
            <stop offset="50%" stopColor="#163828" />
            <stop offset="100%" stopColor="#0f2e1e" />
          </radialGradient>
        </defs>

        {/* Clickable regions */}
        {regions.map(region => {
          const data = getRegionData(region.id)
          if (!data) return null
          return (
            <g key={region.id}>
              <path
                d={region.d}
                fill={getColor(region.id)}
                opacity={getOpacity(region.id)}
                stroke={selected === region.id ? getColor(region.id) : 'rgba(255,255,255,.2)'}
                strokeWidth={selected === region.id ? 2.5 : 1}
                style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
                onClick={() => onSelect(region.id)}
              />
              <text
                x={region.lx}
                y={region.ly}
                textAnchor="middle"
                fill="white"
                fontSize="7.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="700"
                opacity={selected === region.id ? 1 : (selected ? 0.3 : 0.9)}
                style={{ cursor: 'pointer', pointerEvents: 'none', transition: 'opacity 0.25s' }}
              >
                {data.emoji} {data.name}
              </text>
            </g>
          )
        })}

        {selected && (() => {
          const region = regions.find(r => r.id === selected)
          if (!region) return null
          return (
            <>
              <circle cx={region.lx} cy={region.ly} r="6" fill="white" opacity="0.8">
                <animate attributeName="r" values="6;20;6" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x={region.lx + 18} y={region.ly - 8} fontSize="10" opacity="0.7">✨</text>
            </>
          )
        })()}
      </svg>
      <p className="text-center text-white/35 text-xs mt-3 font-jakarta">
        Kliknite na farebnú oblasť a zistíte, čo tam mozog robí!
      </p>
    </div>
  )
}

function RegionPanelKids({ region, onClose }: { region: BrainRegion; onClose: () => void }) {
  return (
    <div
      className="rounded-3xl border overflow-hidden shadow-xl"
      style={{ background: '#0d2218', borderColor: `${region.color}35` }}
    >
      <div
        className="p-6 border-b"
        style={{ borderColor: `${region.color}20`, background: `${region.color}18` }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-3xl mb-1">{region.emoji}</div>
            <h3 className="font-jakarta font-700 text-white text-xl">{region.name}</h3>
            <p className="text-xs uppercase tracking-wide mt-0.5 font-jakarta" style={{ color: region.color }}>{region.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5 max-h-[420px] overflow-y-auto">
        <p className="text-white/65 text-sm leading-relaxed">{region.description}</p>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" style={{ color: region.color }} />
            <span className="text-xs font-jakarta font-700 uppercase tracking-wide" style={{ color: region.color }}>
              Čo môžete vidieť
            </span>
          </div>
          <ul className="space-y-1">
            {region.symptoms.map(s => (
              <li key={s} className="text-white/55 text-xs flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: region.color }} />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="w-3.5 h-3.5" style={{ color: region.color }} />
            <span className="text-xs font-jakarta font-700 uppercase tracking-wide" style={{ color: region.color }}>
              Hry & aktivity
            </span>
          </div>
          <ul className="space-y-1">
            {region.activities.map(a => (
              <li key={a} className="text-white/55 text-xs flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: region.hoverColor }} />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Music2 className="w-3.5 h-3.5" style={{ color: region.color }} />
            <span className="text-xs font-jakarta font-700 uppercase tracking-wide" style={{ color: region.color }}>
              NRi techniky
            </span>
          </div>
          <ul className="space-y-1">
            {region.nriTechniques.map(t => (
              <li key={t} className="text-white/55 text-xs flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: region.color }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function InteractiveBrainChild() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedRegion = kidsBrainRegions.find(r => r.id === selectedId) ?? null

  return (
    <section className="py-28 px-6" style={{ background: '#0f1f18' }} id="mozog">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div
            className="section-label text-[#2b8a62] border border-[#2b8a62]/30 mb-4"
            style={{ background: 'rgba(43,138,98,.12)' }}
          >
            Interaktívny mozog
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-700 text-white mb-4">
            Čo sa deje v mozgu
            <br />
            <span className="text-gradient-green">vášho dieťaťa</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto">
            Kliknite na farebnú oblasť a zistíte, čo tam mozog robí, čo môžete pozorovať doma — a aké hry pomáhajú!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <AnimatedSection direction="left">
            <BrainSVGKids selected={selectedId} onSelect={id => setSelectedId(id === selectedId ? null : id)} />
          </AnimatedSection>

          <AnimatedSection direction="right">
            {selectedRegion ? (
              <RegionPanelKids region={selectedRegion} onClose={() => setSelectedId(null)} />
            ) : (
              <div
                className="rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center min-h-[400px] border"
                style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(43,138,98,.2)', boxShadow: '0 8px 32px rgba(0,0,0,.2)' }}
              >
                <div className="text-6xl mb-4">🧠✨</div>
                <h3 className="font-jakarta font-700 text-white text-xl mb-3">
                  Objavte mozog!
                </h3>
                <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-8">
                  Kliknite na farebnú oblasť v obrázku mozgu a zistíte, čo tam robí a aké hry mu pomôžu.
                </p>
                <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                  {kidsBrainRegions.slice(0, 6).map(r => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedId(r.id)}
                      className="text-left px-3 py-2.5 rounded-xl text-xs font-jakarta font-600 transition-all border hover:shadow-md"
                      style={{ color: r.color, background: `${r.color}18`, borderColor: `${r.color}30` }}
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
