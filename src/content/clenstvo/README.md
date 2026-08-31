# Obsah členskej sekcie

Každý stupeň má vlastný priečinok — `teoria/`, `deti/`, `dospeli/`. Jeden `.md` súbor
je jedna lekcia. Názov súboru je adresa lekcie, takže `ranna-rutina.md` bude na
`/clenstvo/deti/ranna-rutina`.

## Frontmatter

```yaml
---
title: "Názov lekcie"
excerpt: "Jedna veta do zoznamu."
order: 1                       # poradie v zozname, nižšie je vyššie
duration: "12 min"             # nepovinné
muxPlaybackId: "abc123..."     # nepovinné — playback id z Mux
attachments:                   # nepovinné
  - label: "Checklist dysregulácie"
    href: "/materialy/checklist.pdf"
    meta: "PDF · 4 strany"
---
```

Pod frontmatterom je bežný Markdown — nadpisy `##`, tučné `**takto**`, kurzíva
`*takto*`, odrážky `-`. Rovnaká sada ako na blogu.

## Videá

Video sa nahrá do Mux, ten vráti **playback id**. To sa vloží do `muxPlaybackId`.
Prehrávač sa objaví nad textom lekcie.

## Prílohy

`href` môže byť súbor v `public/`, alebo odkaz do Vercel Blob. Pozor: čokoľvek
v `public/` je verejné aj pre neprihlásených — citlivé materiály patria do Blobu.
