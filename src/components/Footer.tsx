import Link from 'next/link'
import { Brain, Mail, Phone, MapPin } from 'lucide-react'
import { NRiBrand } from '@/components/shared/NRiBrand'
import { ObfuscatedEmail } from '@/components/shared/ObfuscatedEmail'

export default function Footer() {
  return (
    <footer className="bg-[#08111e] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1b6b72] to-[#2a9aa8]">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <NRiBrand className="font-jakarta font-700 text-white" />
                <p className="text-[10px] text-white/40 uppercase tracking-wide">Neuro-Rytmická Integrácia</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Pomáhame nervovému systému znovu nájsť bezpečie, pohyb, pokoj a spojenie — pre dospelých aj deti.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <ObfuscatedEmail user="info" domain="nri.sk" className="hover:text-white/70 transition-colors" />
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                <div>
                  <a href="tel:+421914202306" className="text-white/40 hover:text-white/70 text-sm transition-colors">+421 914 202 306</a>
                  <p className="text-white/25 text-xs">k dispozícii 8:00–9:00</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin className="w-4 h-4" /> Obrancov mieru 4, 91904 Smolenice
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-jakarta font-600 text-white text-sm mb-4">Metóda</h4>
            <ul className="flex flex-col gap-2">
              {[
                ['Pre dospelých', '/dospeli'],
                ['Pre deti & rodičov', '/deti'],
                ['Ako prebieha sedenie', '/dospeli#sedenie'],
                ['FAQ', '/dospeli#faq'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/45 hover:text-white/75 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-jakarta font-600 text-white text-sm mb-4">Zdroje</h4>
            <ul className="flex flex-col gap-2">
              {[
                ['Blog', '/blog'],
                ['PDF Materiály', '/materialy'],
                ['Checklisty', '/materialy#checklisty'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/45 hover:text-white/75 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://complex-diagnostic.eu/objednani-terminu-vysetreni/" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white/75 text-sm transition-colors">
                  Objednať sa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© 2025 <NRiBrand iColor="#e53535" />. Všetky práva vyhradené.</p>
          <p className="text-white/25 text-xs">
            Informácie na webe nie sú náhradou odbornej diagnostiky.
          </p>
        </div>
      </div>
    </footer>
  )
}
