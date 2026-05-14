'use client'

import { useState, useEffect, useRef } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { ObfuscatedEmail } from '@/components/shared/ObfuscatedEmail'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function KontaktPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const loadedAtRef = useRef(Date.now())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    // Read honeypot from the form element itself (hidden input)
    const trap = (e.currentTarget.elements.namedItem('_trap') as HTMLInputElement)?.value ?? ''

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _trap: trap,
          _loadedAt: loadedAtRef.current,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Niečo sa pokazilo.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Odoslanie zlyhalo. Skúste neskôr.')
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,.05)',
    border: '1px solid rgba(255,255,255,.1)',
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#1b6b72]'

  return (
    <div className="bg-[#0b1524] min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-6 pb-28">
        <AnimatedSection className="text-center mb-16 pt-8">
          <div
            className="section-label text-[#2a9aa8] border border-[#2a9aa8]/25 mb-4"
            style={{ background: 'rgba(27,107,114,.1)' }}
          >
            Objednať sa
          </div>
          <h1 className="font-jakarta text-5xl font-700 text-white mb-4">
            Začnime spolu
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Prvé orientačné stretnutie je nezáväzné. Napíšte nám a my sa ozveme do 24 hodín.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <AnimatedSection direction="left">
            <div className="flex flex-col gap-6">
              <div className="glass-card p-7">
                <h2 className="font-jakarta font-700 text-white text-lg mb-5">Kontakt</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1b6b72]/20 border border-[#1b6b72]/25">
                      <Mail className="w-4 h-4 text-[#2a9aa8]" />
                    </div>
                    <ObfuscatedEmail
                      user="info"
                      domain="nri.sk"
                      className="text-white/65 hover:text-white text-sm transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1b6b72]/20 border border-[#1b6b72]/25">
                      <Phone className="w-4 h-4 text-[#2a9aa8]" />
                    </div>
                    <div>
                      <a href="tel:+421914202306" className="text-white/65 hover:text-white text-sm transition-colors">
                        +421 914 202 306
                      </a>
                      <p className="text-white/35 text-xs mt-0.5">k dispozícii 8:00–9:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1b6b72]/20 border border-[#1b6b72]/25">
                      <MapPin className="w-4 h-4 text-[#2a9aa8]" />
                    </div>
                    <span className="text-white/65 text-sm">Obrancov mieru 4, 91904 Smolenice</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-7">
                <h3 className="font-jakarta font-600 text-white mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2a9aa8]" /> Ordinačné hodiny
                </h3>
                <div className="space-y-2 text-sm text-white/55">
                  <div className="flex justify-between">
                    <span>Pondelok — Piatok</span>
                    <span className="text-white/75">9:00 — 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Víkend</span>
                    <span className="text-white/30">Zatvorené</span>
                  </div>
                </div>
              </div>

              <div
                className="rounded-3xl p-7 border"
                style={{ background: 'rgba(27,107,114,.08)', borderColor: 'rgba(27,107,114,.2)' }}
              >
                <div className="text-2xl mb-3">💬</div>
                <h3 className="font-jakarta font-700 text-white mb-2">Čo vás čaká na prvom stretnutí?</h3>
                <ul className="space-y-2 text-white/55 text-sm">
                  {[
                    'Orientačný rozhovor (vaše ťažkosti a ciele)',
                    'Krátka ukážka NRi techniky',
                    'Plán ďalšieho postupu',
                    'Žiadne záväzky — vy sa rozhodnete',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#1b6b72] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="right">
            {status === 'sent' ? (
              <div className="glass-card p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <CheckCircle className="w-16 h-16 text-[#2b8a62] mb-5" />
                <h2 className="font-jakarta font-700 text-white text-2xl mb-3">
                  Správa odoslaná!
                </h2>
                <p className="text-white/55 leading-relaxed">
                  Ozveme sa vám do 24 hodín. Tešíme sa na spoločnú cestu.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-5">
                <h2 className="font-jakarta font-700 text-white text-lg mb-2">Napíšte nám</h2>

                {/* Honeypot — hidden from humans, bots fill it */}
                <input
                  type="text"
                  name="_trap"
                  autoComplete="off"
                  tabIndex={-1}
                  style={{ display: 'none' }}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-jakarta font-500 block mb-1.5">Meno *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Jana Nováková"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-jakarta font-500 block mb-1.5">Telefón</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+421 914 202 306"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-jakarta font-500 block mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jana@email.sk"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs font-jakarta font-500 block mb-1.5">Vaša správa *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Napíšte nám o svojej situácii, čo vás trápi, alebo položte otázku..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'Odosiela sa…' : 'Odoslať správu'}
                </button>

                <p className="text-white/25 text-xs text-center">
                  Vaše údaje sú v bezpečí. Nikdy ich nezdieľame s tretími stranami.
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
