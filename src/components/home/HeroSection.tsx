'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BreathingCircle from '@/components/shared/BreathingCircle'
import { NRiBrand } from '@/components/shared/NRiBrand'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    for (let i = 0; i < 55; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(42,154,168,0.45)'
        ctx.fill()
      })
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 140) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(42,154,168,${0.18 * (1 - d / 140)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0b1524]">
      {/* Neural network background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        aria-hidden
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1524]/60 via-transparent to-[#0b1524]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#1b6b72]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Label */}
        <div
          className="section-label text-[#2a9aa8] border border-[#2a9aa8]/30 mb-8"
          style={{ background: 'rgba(27,107,114,.12)' }}
        >
          Neuro-Rytmická Integrácia
        </div>

        {/* Main heading */}
        <h1 className="font-jakarta text-5xl md:text-7xl font-800 text-white mb-6 leading-[1.05]">
          Od prežívania
          <br />
          <span className="text-gradient-teal">k životu.</span>
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
          Keď telo nezabudlo.
        </p>
        <p className="text-white/45 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12">
          <NRiBrand /> pomáha nervovému systému znovu nájsť bezpečie, pohyb, pokoj a spojenie — prepojením neurovedu, rytmu, dychu a pohybu.
        </p>

        {/* Breathing circle */}
        <div className="flex justify-center mb-14">
          <BreathingCircle size={160} color="#1b6b72" />
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://complex-diagnostic.eu/objednani-terminu-vysetreni/" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
            Objednať sa na sedenie
          </a>
          <Link
            href="#vstup"
            className="px-8 py-4 text-base font-jakarta font-500 text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-xl transition-all"
          >
            Zistiť viac
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/25 text-xs font-jakarta tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </section>
  )
}
