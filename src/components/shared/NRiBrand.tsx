import type { ReactNode } from 'react'

interface Props {
  className?: string
  iColor?: string
}

export function NRiBrand({ className = '', iColor = '#e53535' }: Props) {
  return (
    <span className={className}>
      NR<span style={{ color: iColor, fontWeight: 700 }}>i</span>
    </span>
  )
}

export function renderNRi(text: string, iColor = '#e53535'): ReactNode[] {
  const parts = text.split('NRi')
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <NRiBrand key={i} iColor={iColor} />]
      : [part]
  )
}
