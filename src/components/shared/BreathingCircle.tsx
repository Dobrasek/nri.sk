'use client'

import { useEffect, useState } from 'react'

interface Props {
  size?: number
  color?: string
  className?: string
}

export default function BreathingCircle({ size = 180, color = '#1b6b72', className = '' }: Props) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [label, setLabel] = useState('Nadýchnite sa')

  useEffect(() => {
    const cycle = [
      { phase: 'inhale' as const, label: 'Nadýchnite sa', ms: 4000 },
      { phase: 'hold' as const,   label: 'Zadržte',        ms: 2000 },
      { phase: 'exhale' as const, label: 'Vydýchnite',     ms: 6000 },
    ]
    let idx = 0
    let timer: ReturnType<typeof setTimeout>

    const next = () => {
      const { phase, label, ms } = cycle[idx]
      setPhase(phase)
      setLabel(label)
      idx = (idx + 1) % cycle.length
      timer = setTimeout(next, ms)
    }
    next()
    return () => clearTimeout(timer)
  }, [])

  const r = size / 2
  const scale = phase === 'inhale' ? 1.18 : phase === 'hold' ? 1.18 : 1
  const duration = phase === 'inhale' ? '4s' : phase === 'hold' ? '0.1s' : '6s'

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          transform: `scale(${scale})`,
          transition: `transform ${duration} ease-in-out`,
        }}
      />
      {/* Mid ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: size * 1.15,
          height: size * 1.15,
          borderColor: `${color}30`,
          transform: `scale(${scale})`,
          transition: `transform ${duration} ease-in-out`,
        }}
      />
      {/* Core circle */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 38% 38%, ${color}90 0%, ${color}50 60%, ${color}20 100%)`,
          boxShadow: `0 0 40px ${color}50, inset 0 0 30px ${color}30`,
          transform: `scale(${scale})`,
          transition: `transform ${duration} ease-in-out`,
        }}
      >
        <span
          className="text-white/90 text-xs font-jakarta font-500 tracking-wide text-center px-3"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,.5)' }}
        >
          {label}
        </span>
      </div>

      {/* SVG progress ring */}
      <svg
        className="absolute"
        width={size + 20}
        height={size + 20}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={(size + 20) / 2}
          cy={(size + 20) / 2}
          r={r + 5}
          fill="none"
          stroke={`${color}40`}
          strokeWidth="1.5"
        />
        <circle
          cx={(size + 20) / 2}
          cy={(size + 20) / 2}
          r={r + 5}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * (r + 5)}`}
          strokeDashoffset={
            phase === 'inhale'
              ? 2 * Math.PI * (r + 5) * 0
              : phase === 'hold'
                ? 2 * Math.PI * (r + 5) * 0
                : 2 * Math.PI * (r + 5) * 1
          }
          style={{
            transition: `stroke-dashoffset ${duration} linear`,
            opacity: 0.7,
          }}
        />
      </svg>
    </div>
  )
}
