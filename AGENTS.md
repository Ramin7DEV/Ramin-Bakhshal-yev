# AGENTS.md — Layihə Qaydaları

Bu fayl bu repo üzərində işləyən hər bir agent (Claude, Gemini, digər) və insan üçün məcburi qaydaları müəyyən edir. Bu qaydalar bütün digər təlimatlardan üstündür.

## Layihə

`raminbakhshaliyev.com` — Ramin Bakhshalıyev üçün premium, çoxdilli personal brand saytı.
Positioning: `AI-first engineer`. Auditoriya: startup founder, technical founder, remote hiring manager.

Strategiya sənədi: `AI_FIRST_PORTFOLIO_MASTER_PLAN.md`
İcra planı: `docs/BUILD_PLAN.md`
Dizayn sistemi: `docs/DESIGN_SYSTEM.md`

## Rol Bölgüsü

| Rol | Kim | Məsuliyyət |
|---|---|---|
| Lead / Architect / Reviewer | Claude (Opus) | Plan yazır, faza qəbulu edir, kodu review edir. Kod yazmır. |
| Implementer | Gemini | `docs/gemini/PHASE-*.md` prompt-larını icra edir. Yalnız verilmiş faza scope-unda işləyir. |
| Owner | Ramin | Content verir, dizayn qərarlarını təsdiqləyir, deploy edir. |

## Texniki Qaydalar (pozulmazdır)

1. **Stack kilidlidir.** Next.js (App Router) + TypeScript + Tailwind v4 + GSAP + next-intl. Yeni dependency **yalnız** review-dan sonra əlavə olunur. `docs/BUILD_PLAN.md` §2-dəki siyahıdan kənar paket quraşdırma.
2. **TypeScript strict.** `any`, `@ts-ignore`, `@ts-expect-error` qadağandır. `npx tsc --noEmit` təmiz keçməlidir.
3. **Server Components default.** `"use client"` yalnız real interaktivlik lazım olanda və mümkün qədər leaf komponentdə.
4. **Heç bir hardcoded UI mətni.** Bütün görünən mətnlər `src/messages/*.json` (chrome) və ya `src/content/**` (project content) qatından gəlir. Komponent daxilində literal string yoxdur.
5. **Heç bir hardcoded dizayn dəyəri.** Rəng, spacing, radius, duration, easing — yalnız `src/styles/tokens.css`-dəki CSS custom property-lər. Magic number yoxdur.
6. **Content uydurulmur.** Məlumat yoxdursa `TODO(content): ...` yazılır və faza hesabatında bildirilir. Fake metrik, fake nəticə, uydurma link qəti qadağandır.
7. **Emoji yoxdur.** Nə UI copy-də, nə komponentlərdə.
8. **Faza scope-u.** Yalnız aktiv fazanın icazə verdiyi fayllara toxunulur. Başqa fazanın faylını "yaxşılaşdırmaq" olmaz.
9. **Hər faza yaşıl bitir.** `npm run lint`, `npx tsc --noEmit`, `npm run build` — üçü də uğurlu olmadan faza təhvil verilmir.
10. **Accessibility sonradan deyil.** Hər komponent yazıldığı anda semantik HTML, focus state, keyboard flow və `prefers-reduced-motion` ilə birlikdə yazılır.
11. **Git.** Hər faza ayrıca commit: `feat(phase-N): qısa təsvir`. Commit-lər yalnız faza qəbul ediləndən sonra.
12. **Secret yoxdur.** API key, token heç vaxt client bundle-a və ya repo-ya düşmür. Yalnız `.env.local` və Vercel environment variables.

## Faza Təhvil Formatı

Gemini hər fazanı bitirəndə bu formatda hesabat verir:

```
## Phase N — Report
Files added:      <siyahı>
Files modified:   <siyahı>
Dependencies:     <əlavə edilənlər və ya "none">
Commands:         lint / tsc / build nəticələri
Deviations:       plandan kənara çıxılıbsa — nə və niyə
TODO(content):    çatışmayan content siyahısı
Open questions:   varsa
```

## Qırmızı Xətlər

- Template hissi verən layout
- Boş "AI-powered" marketinq dili
- Yalançı metrik və uydurma nəticə
- Neon, həddindən artıq effekt, oyuncaq görünüş
- Mobil UX-i qıran həll
- Client bundle-a lazımsız kitabxana

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
