# PHASE 6 — Motion Layer (GSAP ScrollTrigger)

## Kontekst
Bütün səhifələr statik olaraq hazırdır və **onsuz da yaxşı görünür**. Motion indi əlavə olunur ki, mövcud kompozisiyanı gücləndirsin. Əgər hansısa animasiya səhifəni yaxşılaşdırmırsa — əlavə edilmir.

Spesifikasiya: `docs/BUILD_PLAN.md` §7 və `docs/DESIGN_SYSTEM.md` §6. Kontekst üçün `claudedocs/research_scroll_driven_transition_architecture_2026-07-29.md` oxunmalıdır.

## Scope
```
src/components/motion/MotionProvider.tsx  (YENİ, "use client")
src/components/motion/Reveal.tsx          (YENİ, "use client")
src/components/motion/ScrollScene.tsx     (YENİ, "use client")
src/components/motion/ParallaxMedia.tsx   (YENİ, "use client")
src/lib/motion.ts                         (genişləndirilir)
mövcud səhifə komponentləri              (yalnız sarğı əlavəsi)
```

## Tapşırıqlar

### 1. MotionProvider
- `gsap.registerPlugin(ScrollTrigger)` — bir dəfə, client-də.
- `gsap.defaults({ ease: EASE.out, duration: DURATION.base })`.
- `gsap.matchMedia()` ilə 3 kontekst: `(min-width: 1024px)` (tam), `(max-width: 1023px)` (yüngül), `(prefers-reduced-motion: reduce)` (yalnız opacity).
- Bütün ScrollTrigger-lər `matchMedia` konteksti daxilində yaradılır ki, avtomatik təmizlənsin.
- Route dəyişəndə `ScrollTrigger.refresh()`; şəkillər yüklənəndən sonra da bir dəfə refresh.

### 2. Reveal
- `useGSAP` (`@gsap/react`) istifadə olunur — manual cleanup yazma.
- Davranış: `opacity 0→1`, `y 24→0`, `--dur-base`, `--ease-entrance`, `stagger 80ms` (`children` prop-u ilə çoxlu element).
- **Kritik:** başlanğıc vəziyyət JS-də `gsap.set()` ilə qurulur, CSS-də deyil. JS yüklənməsə mətn tam görünən qalmalıdır.
- `ScrollTrigger`: `start: 'top 82%'`, `once: true`.
- Reduced motion: yalnız 200ms opacity, `y` yoxdur.

### 3. ScrollScene
Pin + scrub tələb edən bölmələr üçün. Prop-lar: `pin`, `scrub`, `start`, `end`, `onProgress`.
Yalnız ≥1024px-də aktiv. Mobil və reduced-motion halında uşaqları olduğu kimi render edir (sarğı DOM-a təsir etmir).

### 4. ParallaxMedia
Şəkil üçün max **8%** `y` yerdəyişməsi, `scrub: true`. Yalnız desktop.

### 5. Səhnələrin tətbiqi
`docs/BUILD_PLAN.md` §7 cədvəlinə uyğun:
- Hero: başlıq sətirləri mask reveal (hər sətir ayrı `overflow: hidden` sarğıda), cover `scale 1.06→1`.
- Selected work: kartlar stagger reveal.
- Case chapters: sticky numeral progress (CSS sticky qalır, GSAP yalnız rəqəm/xətt progress-ini scrub edir).
- Process: xətt progress scrub + addım reveal.
- Final CTA: sadə fade-up, başqa heç nə.

**Home-da `h1` heç vaxt gec görünməməlidir** — hero reveal LCP-ni gecikdirməməlidir. Hero başlığı üçün animasiya `duration ≤ 600ms` və dərhal başlayır (scroll gözləmir).

## Qadağalar
- `width`, `height`, `top`, `left`, `filter`, `box-shadow` animasiyası.
- Scroll hijacking, smooth-scroll kitabxanası (Lenis daxil).
- Intro overlay / gate — **V1-də yoxdur**.
- Yeni dependency.
- `useEffect` içində manual GSAP cleanup (`useGSAP` istifadə olunur).

## Qəbul Meyarları
1. `npm run check` təmiz.
2. JavaScript söndürülmüş halda bütün mətn və şəkillər görünür (`view-source` + JS disable testi).
3. macOS/iOS "Reduce Motion" aktiv ikən: pin yoxdur, scrub yoxdur, yalnız qısa fade. Səhifə tam funksionaldır.
4. Route keçidlərində konsolda ScrollTrigger xətası və ya artıq qalmış trigger yoxdur (`ScrollTrigger.getAll().length` route dəyişəndə artmır).
5. Mobil (375px) scroll 60fps-ə yaxındır, jank yoxdur; DevTools Performance-da uzun task (>200ms) yoxdur.
6. CLS ≤ 0.03 (animasiya layout sürüşməsi yaratmır).
7. Home route JS artımı GSAP daxil ≤ 60KB gzip.

## Hesabat
`AGENTS.md` formatında + hansı səhnələrin əlavə edildiyi, hansılarının **qəsdən əlavə edilmədiyi** və səbəbi.
