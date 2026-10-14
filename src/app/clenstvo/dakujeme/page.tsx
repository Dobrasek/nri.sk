import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { TIER_META } from '@/lib/clenstvo/packages'
import { getMyTiers } from '@/lib/clenstvo/access'

export const metadata: Metadata = {
  title: 'Ďakujeme — NRi',
  robots: { index: false },
}

export default async function DakujemePage() {
  // Nárok zapisuje webhook, nie táto stránka. Pri okamžitých platbách je hotový
  // skôr, než sa sem zákazník vráti; pri odloženej platbe ešte nie — preto sa
  // tu nič nepridáva, len sa ukáže aktuálny stav.
  const owned = await getMyTiers()

  return (
    <div className="theme-adults bg-[#0b1524] min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-[#1b6b72]/20 border border-[#2a9aa8]/40 flex items-center justify-center mx-auto mb-8">
          <Check className="w-7 h-7 text-[#2a9aa8]" />
        </div>

        <h1 className="font-jakarta text-3xl md:text-4xl font-bold text-white mb-4">
          Ďakujeme za dôveru
        </h1>

        {owned.length > 0 ? (
          <>
            <p className="text-white/50 mb-10">
              Platba prebehla a prístup máte odomknutý natrvalo. Potvrdenie sme vám poslali e-mailom.
            </p>
            <div className="space-y-3">
              {owned.map(tier => (
                <Link
                  key={tier}
                  href={`/clenstvo/${tier}`}
                  className="glass-card p-5 flex items-center justify-between group hover:bg-white/[.07] transition-colors"
                >
                  <span className="font-jakarta font-semibold text-white">
                    {TIER_META[tier].name}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-white/50 mb-4">
              Platbu spracúvame. Pri bežnej karte to trvá pár sekúnd, pri bankovom prevode
              aj niekoľko dní — prístup sa odomkne sám, akonáhle peniaze dorazia.
            </p>
            <p className="text-white/35 text-sm mb-10">
              Stránku môžete pokojne obnoviť.
            </p>
            <Link href="/clenstvo" className="btn-primary">
              Späť na členskú sekciu <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
