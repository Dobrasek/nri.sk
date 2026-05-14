# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on http://localhost:3000
npm run build      # Production build (also type-checks)
npm run lint       # ESLint
```

## Architecture

**Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · No external UI library

**Two audience themes** — the site serves adults (`/dospeli`) and children+parents (`/deti`) with distinct visual identities:
- Adults: dark navy/petrol (`#0b1524` bg, `#1b6b72` accent, `#7a2d45` secondary)
- Children: light warm white (`#f8f7f4` bg, `#2b8a62` accent, pastels)
- Theme is applied via `.theme-adults` / `.theme-kids` CSS classes that set `--bg`, `--primary`, etc. custom properties declared in `globals.css`

**Design tokens** are defined in `src/app/globals.css` inside `@theme inline {}` (Tailwind v4 syntax). Custom utility classes (`glass-card`, `btn-primary`, `btn-kids`, `section-label`, `text-gradient-*`) are also in globals.css.

**Fonts** loaded via `next/font/google` in `src/app/layout.tsx`:
- `Plus_Jakarta_Sans` → CSS var `--font-jakarta` → used for headings/UI
- `Inter` → CSS var `--font-inter` → used for body text

## Key files

| Path | Purpose |
|------|---------|
| `src/lib/brain-data.ts` | All brain region data (names, symptoms, NRI techniques, activities) for both adults and kids interactive brain |
| `src/lib/blog.ts` | Reads Markdown files from `src/content/blog/` using gray-matter |
| `src/components/adults/InteractiveBrain.tsx` | SVG brain with clickable regions + detail panel (dark theme) |
| `src/components/children/InteractiveBrainChild.tsx` | Same but light/playful version for kids |
| `src/components/shared/BreathingCircle.tsx` | Animated breathing component (pure CSS/JS, no Framer Motion) |
| `src/components/shared/AnimatedSection.tsx` | Scroll-triggered fade-in via IntersectionObserver |
| `src/content/blog/*.md` | Blog posts with gray-matter frontmatter (title, excerpt, date, category, readTime) |

## Pages

- `/` — Home: neural network hero canvas, audience selector cards, NRI explanation, 3-layer brain model
- `/dospeli` — Adults: hero + NervousSystemLayers + Symptoms + InteractiveBrain + TherapyProcess (6-song protocol) + Testimonials + FAQ
- `/deti` — Children: hero + WhatYouSeeAtHome + InteractiveBrainChild + BrainActivities (Tai-Ji routines) + NRITherapyChild
- `/blog` + `/blog/[slug]` — Blog listing + post (Markdown rendered via simple regex parser)
- `/materialy` — PDF/resource downloads listing
- `/kontakt` — Contact form (client-side state only — needs backend integration)

## Content

Real NRI therapy content from `/txt/`:
- `vysvetleni_pohybu_v_tele.txt` — Adults: full NRI protocol, playlist, Tai-Ji movements, toning techniques
- `vysvetleni_pohybu_v_tele_pro_deti.txt` — Children: same adapted for kids, crisis guide, Tiger game

Original images in `/img/` (NRI protocols, movement diagrams) available for embedding.

## Patterns

- All server components by default; only add `'use client'` for state/effects/event handlers
- `AnimatedSection` wraps sections for scroll reveal — pass `delay` (ms) and `direction` props
- Brain SVG paths use `viewBox="60 40 330 340"` — hand-crafted coordinates
- Blog markdown uses simple regex renderer in `[slug]/page.tsx` — not MDX
- Contact form submits to `setSent(true)` only — needs real API route (Resend, Formspree, etc.)
