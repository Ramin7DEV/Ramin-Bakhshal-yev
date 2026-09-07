# PHASE 0 — Foundation & Design Tokens

## Kontekst
Repo təmizlənib: `src/app/` qovluğunda yalnız `favicon.ico` var, `public/images/` içində 4 şəkil var. Config faylları (`package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`) mövcuddur. Sənin işin işlək, boş, amma tam nizamlı təməl qurmaqdır.

## Scope — yalnız bu fayllar
```
package.json                 (dependency əlavəsi)
tsconfig.json                (strict sərtləşdirmə)
next.config.ts
src/styles/tokens.css        (YENİ)
src/styles/base.css          (YENİ)
src/styles/globals.css       (YENİ)
src/lib/cn.ts                (YENİ)
src/lib/motion.ts            (YENİ)
src/app/layout.tsx           (YENİ — müvəqqəti root layout)
src/app/page.tsx             (YENİ — müvəqqəti placeholder, Phase 1-də silinəcək)
.env.example                 (YENİ)
```

## Tapşırıqlar

### 1. Dependency-lər
Dəqiq bu versiyaları quraşdır (başqa heç nə):
```bash
npm install next@16.3.4 react@19.2.4 react-dom@19.2.4
npm install next-intl@4.14.2 gsap@3.15.0 @gsap/react@2.1.2
```
`package.json` script-lərinə əlavə et:
```json
"typecheck": "tsc --noEmit",
"check": "npm run lint && npm run typecheck && npm run build"
```

### 2. TypeScript sərtləşdirmə
`tsconfig.json` `compilerOptions`-a əlavə et:
```json
"noUncheckedIndexedAccess": true,
"noImplicitOverride": true,
"noFallthroughCasesInSwitch": true,
"forceConsistentCasingInFileNames": true
```
`target` `ES2022`-yə qaldırılır.

### 3. `src/styles/tokens.css`
`docs/DESIGN_SYSTEM.md` §2–§6-dakı **bütün** token-ları CSS custom property kimi `:root` altında yaz. Heç birini buraxma, heç birini dəyişdirmə, əlavə token uydurma. Bölmələri şərhlə ayır (`/* Surfaces */`, `/* Text */`, `/* Type scale */`, ...).

### 4. `src/styles/base.css`
- Modern reset: `box-sizing: border-box`, margin sıfırlama, `img/video { display:block; max-width:100% }`.
- `html { scroll-behavior: smooth; }` — amma `@media (prefers-reduced-motion: reduce)` daxilində `auto`.
- `body`: `--surface-void` fon, `--text-primary` mətn, `--font-body`, `min-width: 320px`, `-webkit-font-smoothing: antialiased`.
- Tipografiya baza sinifləri: `.t-display-xl`, `.t-display-l`, `.t-display-m`, `.t-heading`, `.t-body-l`, `.t-body-m`, `.t-body-s`, `.t-label` — hər biri §3-dəki ölçü, line-height və letter-spacing ilə.
- `.t-label` mono + uppercase + `letter-spacing: 0.16em`.
- `em` üçün display italic + gold qaydası (§3).
- `:focus-visible` qaydası (§7).
- `.visually-hidden` utility.
- `@media (prefers-reduced-motion: reduce)` bloku: bütün `animation-duration`/`transition-duration` → `0.01ms`, `scroll-behavior: auto`.
- `::selection`: `--accent-signal` fon, `--text-inverse` mətn.

### 5. `src/styles/globals.css`
```css
@import "tailwindcss";
@import "./tokens.css";
@import "./base.css";
```
Tailwind v4 `@theme inline` bloku ilə token-ları Tailwind utility-lərinə bağla (rəng və spacing üçün), amma **Tailwind-i əsas dizayn mexanizmi kimi işlətmə** — layout üçün Tailwind, dizayn dəyərləri üçün token-lar.

### 6. `src/lib/cn.ts`
Xarici paketsiz, 10 sətirdən qısa `cn(...inputs: (string | false | null | undefined)[]): string` funksiyası.

### 7. `src/lib/motion.ts`
Motion sabitləri TypeScript tərəfdə (GSAP üçün): `DURATION` və `EASE` obyektləri `docs/DESIGN_SYSTEM.md` §6-dakı dəyərlərlə (GSAP `cubic-bezier` string formatında), və `prefersReducedMotion(): boolean` helper-i (SSR-safe: `typeof window === 'undefined'` yoxlaması ilə).

### 8. `src/app/layout.tsx` (müvəqqəti)
- `next/font/google` ilə Fraunces, Manrope, IBM Plex Mono — `docs/DESIGN_SYSTEM.md` §3-dəki weight-lər və `variable` adları (`--font-display`, `--font-body`, `--font-mono`), `display: "swap"`, `subsets: ["latin", "latin-ext", "cyrillic"]` (RU üçün cyrillic vacibdir).
- `globals.css` import.
- `<html lang="az">`, `<body>`.
- `metadata`: title/description placeholder.
- `viewport`: `themeColor: "#08090A"`.

### 9. `src/app/page.tsx` (müvəqqəti)
Sadə səhifə: `h1` + bir paraqraf + hər tipografiya sinifinin bir nümunəsi + rəng token-larının vizual swatch-ları. Bu səhifə **review üçün** lazımdır və Phase 1-də silinir.

### 10. `.env.example`
```
NEXT_PUBLIC_SITE_URL=https://raminbakhshaliyev.com
```
`next.config.ts`-də dəyişiklik lazım deyilsə toxunma.

## Qadağalar
- Heç bir komponent qurma (header, footer, card — heç biri).
- Heç bir content yazma.
- Sadalanandan başqa dependency quraşdırma.
- `docs/DESIGN_SYSTEM.md`-dəki dəyərləri dəyişdirmə.

## Qəbul Meyarları
1. `npm run check` (lint + typecheck + build) tam təmiz keçir.
2. `npm run dev` açılır, `/` səhifəsi token swatch-larını göstərir.
3. `tokens.css`-də `DESIGN_SYSTEM.md` §2–§6-dakı hər token mövcuddur.
4. Heç bir faylda hex rəng, px spacing və ya ms duration hardcode edilməyib (yalnız `tokens.css`-də).
5. Fontlar şəbəkədən deyil, `next/font` ilə self-hosted yüklənir; cyrillic subset daxildir.
6. `strict` + 4 yeni compiler option aktivdir və kod onlara uyğundur.

## Hesabat
`AGENTS.md`-dəki formatda.
