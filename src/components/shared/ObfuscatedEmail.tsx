'use client'

import { useEffect, useState } from 'react'

interface Props {
  user: string
  domain: string
  className?: string
}

export function ObfuscatedEmail({ user, domain, className }: Props) {
  const [email, setEmail] = useState('')

  useEffect(() => {
    setEmail(`${user}@${domain}`)
  }, [user, domain])

  if (!email) return <span className={className}>…</span>

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  )
}
