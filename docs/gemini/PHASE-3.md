# PHASE 3 — Home Page (statik, motion olmadan)

## Kontekst
Primitivlər və chrome hazırdır. İndi saytın ən vacib səhifəsini qururuq. **Animasiya bu fazada YOXDUR** — kompozisiya, iyerarxiya və copy tək başına güclü olmalıdır. Motion Phase 6-da əlavə olunur.

## Scope
```
src/components/home/Hero.tsx            (YENİ)
src/components/home/ProofStrip.tsx      (YENİ)
src/components/home/SelectedWork.tsx    (YENİ)
src/components/home/ProcessSnapshot.tsx (YENİ)
src/components/home/AboutTeaser.tsx     (YENİ)
src/components/home/FinalCta.tsx        (YENİ)
src/components/work/WorkCard.tsx        (YENİ — Phase 4-də təkrar istifadə olunacaq)
src/app/[locale]/page.tsx               (tam yazılır)
src/messages/*.json                     (yeni açarlar)
```

## Bloklar (bu sıra ilə, `docs/BUILD_PLAN.md` §6.1)

### 1. Hero
- Grid: copy `col 1-7`, media `col 8-12` (desktop); mobil: copy üstdə, media altda.
- Eyebrow (mono): rol/positioning.
- `h1` — `display-xl`, 2-3 sətir, sonuncu sətirdə bir söz `<em>` ilə vurğulanır (gold italic).
- Dəstək paraqrafı: `body-l`, max 68ch, 2 cümlə. Nə etdiyin + kimin üçün.
- CTA cütü: primary `View work` → `/work`, ghost `Get in touch` → `mailto:`.
- Media: `/images/hero-studio.png`, `MediaFrame`, `priority`, düzgün `sizes`. Bu LCP elementidir.
- Meta sətri (mono, kiçik): `Baku, Azerbaijan` · `Available 2026` · `01 / 05`.
- **Hero viewport-a sığmalıdır** (`min-height: 100svh` deyil — `svh` mobil address bar problemi yaradır; `min-height: max(560px, 88svh)` işlət və mütləq scroll işarəsi qoy).

### 2. Proof strip
Hairline ilə ayrılmış horizontal zolaq. 3-4 element: platformalar (iOS), status (`Live on App Store` — **yalnız link təsdiqlənəndə**), əsas stack (Swift, SwiftUI, Next.js, AI tooling).
Real link olmayan yerdə badge **göstərilmir** — boş badge qadağandır. Content yoxdursa bloku `TODO(content)` şərhi ilə render etmə.

### 3. Selected work
- Eyebrow + `display-m` başlıq + 1 cümlə intro.
- 3 `WorkCard`: desktop-da asimmetrik düzülüş (birinci kart daha böyük, `col 1-7`; digər ikisi `col 8-12` yığılmış) — grid template CSS-də, JS yoxdur.
- Kart strukturu `docs/DESIGN_SYSTEM.md` §7. Bütün kart tək link, `aria-label` layihə adı ilə.
- Altda ghost CTA: `All projects` → `/work`.

### 4. Process snapshot
3 addım: `01 Signal` · `02 System` · `03 Ship`. Hər birində 1 başlıq + 2 cümlə. **AI-nin harada dayandığı konkret yazılır** — bu blok "AI-first" iddiasının sübutudur, ümumi söz olmasın (`TODO(content)` daha yaxşıdır, boş marketinq cümləsindən).
Düzülüş: 3 sütun desktop, 1 sütun mobil, aralarında hairline.

### 5. About teaser
2 cümlə + portret/avatar yeri (`TODO(content)` — şəkil hələ yoxdur, `MediaFrame` placeholder ilə) + `More about the process` linki.

### 6. Final CTA
Mərkəzləşdirilmiş, geniş boşluqlu blok. `display-l` sual + email primary CTA + GitHub ghost. Burada dekorasiya minimumdur.

## Copy qaydaları
- Bütün mətnlər `src/messages/*.json`-a yazılır (§Phase 1-dəki namespace-lərə uyğun).
- AZ, EN, RU üçün ayrı təbii copy. Sözbəsöz tərcümə etmə.
- Ton: qısa, sakit, iddiasız, dəqiq. Hər cümlə ya məlumat versin, ya inam yaratsın.
- Qadağan: "AI-powered", "passionate", "cutting-edge", "I love building", emoji, nida işarəsi.
- Uydurma metrik yoxdur. "10+ layihə", "5 il təcrübə" kimi rəqəm yalnız təsdiqlənibsə yazılır.

## Qadağalar
- GSAP, `useEffect`-lə animasiya, scroll listener — heç biri.
- `"use client"` — bu fazada heç bir yeni client komponent olmamalıdır.
- Yeni dependency.

## Qəbul Meyarları
1. `npm run check` təmiz.
2. Home hər 3 dildə tam və təbii oxunur.
3. Səhifədə tək `h1`; heading ardıcıllığı `h1 → h2 → h3`, atlama yoxdur.
4. 320px, 768px, 1024px, 1440px, 1920px — heç birində horizontal scroll və ya sınıq layout yoxdur.
5. Bütün şəkillərdə `alt` (locale-aware), `sizes`, `aspect-ratio` var; CLS gözlə görünmür.
6. Klaviatura ilə hər CTA və kart əlçatandır.
7. Səhifədə heç bir `TODO(content)` mətn kimi **görünmür** — ya real content, ya blok gizlədilir.
8. Lighthouse (local, mobile) Performance ≥ 90, Accessibility 100.

## Hesabat
`AGENTS.md` formatında + hansı blokların `TODO(content)` səbəbindən gizlədildiyi.
