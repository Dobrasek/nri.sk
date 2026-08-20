// Objednávanie beží na rezervačnom widgete Adamia (adamio.sk, sk.html + booking.js).
// Widget vie predvoliť službu z parametra `sluzba` a rovno otvoriť kalendár —
// id musia sedieť so SERVICES v repozitári complex-diagnostic.eu.
const BOOKING_BASE = 'https://adamio.sk/'

export const BOOKING_SERVICES = {
  child: { id: 'eb-dite', label: 'NRi terapia — dieťa', note: '55 min · 50 €' },
  adult: { id: 'eb-dospely', label: 'NRi terapia — dospelý', note: '80 min · 60 €' },
} as const

export type BookingService = keyof typeof BOOKING_SERVICES

export function bookingUrl(service: BookingService): string {
  return `${BOOKING_BASE}?sluzba=${BOOKING_SERVICES[service].id}#objednat`
}
