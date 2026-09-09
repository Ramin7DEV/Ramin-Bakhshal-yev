# PHASE 7A — SEO İnfrastrukturu (content-dən asılı olmayan hissə)

## Kontekst
Phase 2 qəbul edilib: dizayn sistemi, header, footer, dil seçici hazırdır. Səhifə məzmunu (Phase 3-5) content gözlədiyi üçün **paralel olaraq** SEO təməlini qururuq. Bu faza yalnız infrastruktur yaradır — mətnlər mövcud `messages/*.json` açarlarından gəlir, ona görə copy sonradan dəyişəndə SEO avtomatik yenilənir.

> **Next.js 16 qeydi:** `params` `Promise`-dir. `generateMetadata`, `sitemap`, `robots`, `manifest` və `ImageResponse` API-lərini yazmazdan əvvəl `node_modules/next/dist/docs/01-app/` altındakı müvafiq sənədləri oxu.

## Scope — yalnız bu fayllar
```
src/lib/seo.ts                                    (YENİ)
src/app/sitemap.ts                                (YENİ)
src/app/robots.ts                                 (YENİ)
src/app/manifest.ts                               (YENİ)
src/app/[locale]/opengraph-image.tsx              (YENİ)
src/app/[locale]/work/[slug]/opengraph-image.tsx  (YENİ)
src/app/[locale]/layout.tsx                       (metadata genişləndirilir)
src/app/[locale]/*/page.tsx                       (generateMetadata əlavəsi)
src/messages/*.json                               (meta namespace tamamlanır)
.env.example                                      (yenilənir)
```

**Toxunma:** komponentlər, styleguide, content faylları, stillər.

## Tapşırıqlar

### 1. `src/lib/seo.ts`
`buildMetadata({ locale, path, title, description, ogImage? })` funksiyası:
- `metadataBase`: `process.env.NEXT_PUBLIC_SITE_URL` (fallback `https://raminbakhshaliyev.com`).
- `alternates.canonical`: cari locale-in tam URL-i.
- `alternates.languages`: `az`, `en`, `ru` + `x-default` → `/az`.
- `openGraph`: `type: 'website'` (case səhifələrində `'article'`), `siteName`, `locale` (`az_AZ` / `en_US` / `ru_RU`), `alternateLocale`, `url`, `title`, `description`.
- `twitter`: `card: 'summary_large_image'`.
- `robots`: `index: true, follow: true` — amma `process.env.VERCEL_ENV !== 'production'` olduqda `index: false`.

Ayrıca `personJsonLd(locale)` və `creativeWorkJsonLd(project, locale)` helper-ləri. **Yalnız mövcud məlumatı yaz** — `profile.ts`-də `TODO(content)` olan sahə JSON-LD-yə düşməsin (uydurma `jobTitle` yazma; açarı tamamilə buraxma).

### 2. Səhifə metadata-ları
Hər `page.tsx`-ə `generateMetadata` əlavə et; başlıq və təsvir `messages.meta`-dan `getTranslations` ilə gəlir. Case səhifəsində layihə adı + `summary` işlənir. Hələ `TODO(content)` olan mətn varsa, o səhifə üçün ümumi `meta.defaultDescription` işlədilir — `TODO(content)` sətri **heç vaxt** metadata-ya düşməməlidir.

`meta` namespace-i tamamla (hər üç dildə): `siteName`, `titleTemplate`, `defaultTitle`, `defaultDescription`, və `home`, `work`, `about`, `contact` üçün `title` + `description`.

### 3. `sitemap.ts`
Bütün route × locale: 5 route × 3 locale + 3 case × 3 locale = **24 URL**. Hər giriş üçün `alternates.languages`. `styleguide` route-u sitemap-a **düşmür**. `lastModified` real tarixlə.

### 4. `robots.ts`
Production-da tam icazə + sitemap linki. `VERCEL_ENV !== 'production'` olduqda `disallow: '/'`.

### 5. `manifest.ts`
Ad, qısa ad, `start_url: '/az'`, `display: 'standalone'`, `theme_color` və `background_color` — `THEME_COLOR` sabitindən (`src/lib/theme.ts`).

### 6. OG şəkillər (`next/og`)
1200×630, `ImageResponse` ilə. Vizual dil `docs/DESIGN_SYSTEM.md`-ə uyğun: `--surface-void` fon, ivory başlıq, bir incə qızıl hairline, altda mono meta sətri (`raminbakhshaliyev.com`).
- Ana OG: ad + `meta.defaultTitle`.
- Case OG: layihə adı + index nömrəsi.
- Şrift: `ImageResponse` `next/font` işlədə bilmir — şrift faylını `fetch` ilə yüklə (`edge`-safe) və ya sistem fallback ilə kifayətlən. **Kiril mətnini dəstəklədiyinə əmin ol** (RU OG-də hərflər kvadrat çıxmamalıdır).
- `alt` mətni təyin et.

### 7. `.env.example`
`NEXT_PUBLIC_SITE_URL` şərhi ilə birlikdə saxla.

## Qadağalar
- Səhifə məzmunu (hero, kartlar) yazma — bu, Phase 3-ün işidir.
- Komponentlərə toxunma.
- Uydurma təsvir və ya açar söz yazma.
- Yeni dependency.

## Qəbul Meyarları (hər biri üçün faktiki nəticə yaz)
1. `npm run check` təmiz.
2. `curl -s localhost:3000/sitemap.xml | grep -c "<url>"` → **24**.
3. `/robots.txt` sitemap linkini göstərir.
4. `/az`, `/en/work`, `/ru/about` səhifələrində: tam bir `<link rel="canonical">`, üç `hreflang` + `x-default`.
5. hreflang qarşılıqlıdır: `/en/work` → `az`, `ru`, `x-default`; onların hər biri geri işarə edir.
6. `/az/opengraph-image` və `/ru/work/mirrorly/opengraph-image` PNG qaytarır; RU variantında kiril hərfləri düzgün render olunur.
7. Heç bir səhifənin `<title>` və ya `<meta name="description">` dəyərində `TODO` sözü yoxdur:
   `for p in /az /en /ru /az/work /az/about /az/contact; do curl -s localhost:3000$p | grep -o '<title>[^<]*</title>'; done`
8. `/az/styleguide` sitemap-da yoxdur.

## Hesabat
`AGENTS.md` formatında + yuxarıdakı 8 bəndin faktiki çıxışı.
