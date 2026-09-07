# PHASE 7 — SEO, Metadata & Structured Data

## Scope
```
src/lib/seo.ts                          (YENİ)
src/app/[locale]/**/page.tsx            (generateMetadata əlavəsi)
src/app/sitemap.ts                      (YENİ)
src/app/robots.ts                       (YENİ)
src/app/[locale]/opengraph-image.tsx    (YENİ)
src/app/[locale]/work/[slug]/opengraph-image.tsx (YENİ)
src/messages/*.json                     (meta namespace tamamlanır)
src/app/manifest.ts                     (YENİ)
```

## Tapşırıqlar

### 1. `src/lib/seo.ts`
`buildMetadata({ locale, path, title, description, image })` funksiyası:
- `metadataBase` — `process.env.NEXT_PUBLIC_SITE_URL` (fallback `https://raminbakhshaliyev.com`).
- `alternates.canonical` — cari locale-in tam URL-i.
- `alternates.languages` — `az`, `en`, `ru` + `x-default` → `/az`.
- `openGraph`: `type`, `siteName`, `locale` (`az_AZ`, `en_US`, `ru_RU`), `alternateLocale`, `url`, `title`, `description`, `images`.
- `twitter`: `summary_large_image`.
- `robots`: index, follow.

Hər səhifə `generateMetadata` ilə bu funksiyanı çağırır. Başlıqlar `messages.meta`-dan gəlir; case səhifələrində layihə adı + qısa summary istifadə olunur.

### 2. Sitemap
`app/sitemap.ts` — bütün route × locale (5 route × 3 locale + 3 case × 3 locale). Hər giriş üçün `alternates.languages`. `lastModified` real tarixlə.

### 3. Robots
Tam icazə + `sitemap` URL-i. Development mühitində `noindex` (əgər preview deploy varsa `VERCEL_ENV !== 'production'` yoxlaması ilə).

### 4. OG şəkillər
`next/og` `ImageResponse` ilə, 1200×630:
- Ana OG: qara fon, ad, positioning cümləsi, mono meta sətri, incə gold hairline. Layihə token rənglərinə uyğun.
- Case OG: layihə adı + index + statement, eyni vizual dil.
- Font: `ImageResponse` üçün font faylı `fetch` ilə yüklənir (edge-safe). Fraunces və Manrope yalnız lazım olan simvollar üçün.
- `alt` mətni təyin olunur, `contentType: 'image/png'`.

### 5. JSON-LD
- Home: `Person` — `name`, `url`, `jobTitle` (locale-aware), `knowsAbout`, `sameAs` (GitHub, LinkedIn), `address` (Baku, AZ).
- Case: `CreativeWork` — `name`, `description`, `author` (Person referansı), `dateCreated`, `url`, `image`.
- `<script type="application/ld+json">` server komponentində, `dangerouslySetInnerHTML` ilə, məzmun `JSON.stringify` edilmiş obyektdən (XSS üçün `<` simvolu escape olunur).

### 6. Manifest
`app/manifest.ts` — ad, qısa ad, `theme_color: #08090A`, `background_color: #08090A`, ikonlar (mövcud favicon-dan törədilir).

## Qəbul Meyarları
1. `npm run check` təmiz.
2. Hər səhifədə tam bir `canonical` var və doğrudur.
3. `hreflang` cütləri **qarşılıqlıdır**: `/en/work` → `az`, `ru`, `x-default` göstərir və hər biri geri işarə edir.
4. `/sitemap.xml` və `/robots.txt` düzgün cavab verir; sitemap 24 URL saxlayır.
5. OG şəkillər `/{locale}/opengraph-image` ünvanında render olunur və oxunaqlıdır (kiçik ölçüdə də başlıq oxunur).
6. JSON-LD Google Rich Results Test-də xətasız keçir.
7. Hər 3 dildə `og:locale` və `<html lang>` uyğundur.
8. Heç bir səhifədə duplikat `title` yoxdur.

## Hesabat
`AGENTS.md` formatında + sitemap URL siyahısı.
