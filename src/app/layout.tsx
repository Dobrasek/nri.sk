import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NRi — Neuro-Rytmická Integrácia | Od prežívania k životu',
  description: 'NRi pomáha nervovému systému znovu nájsť bezpečie, pohyb, pokoj a spojenie. Pre dospelých aj deti. Trauma, ADHD, úzkosť, senzorická integrácia.',
  keywords: 'NRi, Neuro-Rytmická Integrácia, trauma, ADHD, nervový systém, deti, Smolenice Slovensko',
  openGraph: {
    title: 'NRi — Od prežívania k životu',
    description: 'Keď telo nezabudlo. NRi prepája neurovedu, pohyb, hudbu a dych.',
    type: 'website',
    locale: 'sk_SK',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${jakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
