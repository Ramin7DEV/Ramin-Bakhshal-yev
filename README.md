# raminbakhshaliyev.com

Ramin Bakhshalıyev üçün premium, çoxdilli personal brand saytı.
Positioning: **AI-first engineer** · iOS / mobile product builder.

Status: **V1 yenidən qurulur** (Phase 0-dan başlayaraq).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · next-intl · GSAP ScrollTrigger · Vercel

## Sənədlər

| Fayl | Nə üçün |
|---|---|
| `AGENTS.md` | Layihə qaydaları — hər agent və insan üçün məcburi |
| `AI_FIRST_PORTFOLIO_MASTER_PLAN.md` | Strategiya və brend (source of truth) |
| `docs/BUILD_PLAN.md` | V1 texniki icra planı, faza cədvəli, Definition of Done |
| `docs/DESIGN_SYSTEM.md` | Token-lar, tipografiya, komponent standartları |
| `docs/CONTENT_INVENTORY.md` | Doldurulmalı content (Ramin doldurur) |
| `docs/REVIEW_PROTOCOL.md` | Faza review protokolu (lead icra edir) |
| `docs/gemini/PHASE-*.md` | Implementer üçün faza prompt-ları |
| `claudedocs/research_*.md` | Scroll motion arxitekturası araşdırması |

## İş axını

```
Plan (Claude) → Prompt (docs/gemini/PHASE-N.md) → İcra (Gemini) → Review (Claude) → Commit
```

Faza qəbul edilmədən növbətiyə keçilmir.

## Script-lər

```bash
npm run dev        # development server
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build
```

## Qovluq strukturu

`docs/BUILD_PLAN.md` §3-ə bax.
