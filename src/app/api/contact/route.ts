import { NextRequest, NextResponse } from 'next/server'

const SE_BASE = 'https://app.smartemailing.cz/api/v3'

function seAuth() {
  return (
    'Basic ' +
    Buffer.from(
      `${process.env.SMARTEMAILING_USERNAME}:${process.env.SMARTEMAILING_API_KEY}`
    ).toString('base64')
  )
}

// Simple in-memory rate limiter (max 3 submits per IP per hour)
const recentSubmits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = 60 * 60 * 1000
  const prev = (recentSubmits.get(ip) ?? []).filter(t => now - t < window)
  if (prev.length >= 3) return true
  recentSubmits.set(ip, [...prev, now])
  return false
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, message, _trap, _loadedAt } = body

  // Honeypot — bots fill this hidden field, humans never see it
  if (_trap) return NextResponse.json({ ok: true })

  // Timing check — legitimate users take > 2s to fill a form
  if (_loadedAt && Date.now() - Number(_loadedAt) < 2000) {
    return NextResponse.json({ ok: true })
  }

  // Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Príliš veľa správ. Skúste znova neskôr.' },
      { status: 429 }
    )
  }

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Vyplňte všetky povinné polia.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Neplatná emailová adresa.' }, { status: 400 })
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: seAuth(),
  }

  const nameParts = (name as string).trim().split(/\s+/)
  const firstname = nameParts[0]
  const lastname = nameParts.slice(1).join(' ')

  try {
    // 1. Import contact into SmartEmailing list
    const importRes = await fetch(`${SE_BASE}/import`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        settings: { update: true, add_namedays: false },
        data: [
          {
            emailaddress: email,
            firstname,
            lastname,
            phone: phone || '',
            contactlists: [
              { id: Number(process.env.SMARTEMAILING_LIST_ID), status: 'confirmed' },
            ],
          },
        ],
      }),
    })

    if (!importRes.ok) {
      const err = await importRes.text()
      console.error('SmartEmailing import error:', err)
      return NextResponse.json(
        { error: 'Odoslanie zlyhalo. Skúste neskôr alebo nás kontaktujte telefonicky.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('SmartEmailing error:', err)
    return NextResponse.json(
      { error: 'Odoslanie zlyhalo. Skúste neskôr alebo nás kontaktujte telefonicky.' },
      { status: 500 }
    )
  }
}
