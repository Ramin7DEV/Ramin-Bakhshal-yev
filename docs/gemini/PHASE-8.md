# PHASE 8 — Performance & Accessibility Hardening

## Kontekst
Funksional olaraq sayt hazırdır. Bu faza ölçmə və düzəltmə fazasıdır. **Yeni feature əlavə edilmir.**

Hədəflər: `docs/BUILD_PLAN.md` §9 (performans) və §10 (a11y).

## Tapşırıqlar

### 1. Şəkil optimizasiyası
- `public/images/*` fayllarını yoxla: 300KB-dan böyük olan hər cover optimallaşdırılır (AVIF/WebP variantı əlavə olunur və ya mənbə sıxılır).
- Hər `next/image`-də düzgün `sizes` (viewport-a uyğun, `100vw` hər yerdə **yanlışdır**).
- Yalnız hero cover `priority`; qalanları lazy.
- `next.config.ts`-də `images.formats: ['image/avif', 'image/webp']`.

### 2. Bundle
- `npm run build` çıxışında hər route-un First Load JS-ini qeyd et.
- Home ≤ 170KB gzip. Aşırsa: GSAP-ın yalnız lazım olan hissəsini import et, `ScrollTrigger`-i `dynamic()` ilə yüklə, `NextIntlClientProvider`-ə ötürülən messages-i daralt.
- İstifadə olunmayan CSS və komponentləri sil.

### 3. Font
- `next/font` `preload` yalnız ilk ekranda görünən fontlar üçün.
- `adjustFontFallback` aktiv (layout shift üçün).
- Yüklənən weight sayını yoxla — `DESIGN_SYSTEM.md` §3-dəki siyahıdan artıq yüklənmirsə təsdiqlə.

### 4. Accessibility auditi
Hər səhifə üçün:
- Heading ağacını çıxar və yoxla (tək `h1`, atlama yoxdur).
- Bütün interaktiv elementlərin əlçatan adı var.
- `aria-*` atributları doğru istifadə olunub (yanlış `role` yoxdur).
- Rəng kontrastı: real render olunmuş mətnləri yoxla, xüsusən `--text-tertiary` istifadələrini.
- Klaviatura ilə tam gəzinti: heç bir tələ (focus trap) yoxdur, tab sırası vizual sıra ilə üst-üstə düşür.
- `prefers-reduced-motion` ilə tam sayt gəzilir.
- Zoom 200%-də (və `text-spacing` artırılmış halda) layout sınmır.
- `<html lang>` və dil dəyişimi düzgün.

### 5. Ölçmə və hesabat
Production build üzərində Lighthouse (mobile, throttled) hər əsas səhifə üçün: Home, Work, bir Case, About, Contact.
Nəticələri cədvəl kimi hesabata yaz: Performance / Accessibility / Best Practices / SEO + LCP / CLS / TBT.

### 6. Xırda sərtləşdirmələr
- `next.config.ts`-də təhlükəsizlik başlıqları: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` (camera/mic/geo qapalı).
- 404 səhifəsi dizayn edilmiş və 3 dildə işlək.
- Konsolda heç bir warning/error yoxdur (hydration warning daxil).

## Qəbul Meyarları
1. Lighthouse mobile: Performance ≥ 92, Accessibility 100, Best Practices ≥ 95, SEO 100 — **hər 5 səhifədə**.
2. LCP < 1.8s, CLS < 0.03, TBT < 200ms.
3. Home First Load JS ≤ 170KB gzip.
4. Konsol tam təmiz.
5. 200% zoom-da hər səhifə oxunaqlı, horizontal scroll yoxdur.
6. Heç bir funksional dəyişiklik edilməyib (yalnız optimizasiya).

## Hesabat
`AGENTS.md` formatında + Lighthouse cədvəli (əvvəl/sonra) + bundle ölçüləri.
