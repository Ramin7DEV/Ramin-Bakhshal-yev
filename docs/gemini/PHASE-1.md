# PHASE 1 — i18n Routing & Content Layer

## Kontekst
Phase 0 qəbul edilib: token-lar, base stillər, fontlar hazırdır. İndi 3 dilli routing skeletini və tiplənmiş content qatını qururuq. **Bu fazada vizual dizayn yoxdur** — səhifələr sadə, stilsiz, amma düzgün strukturlu olacaq.

## Scope — yalnız bu fayllar
```
middleware.ts                        (YENİ, repo kökü)
src/i18n/routing.ts                  (YENİ)
src/i18n/request.ts                  (YENİ)
src/i18n/navigation.ts               (YENİ)
src/messages/az.json en.json ru.json (YENİ)
src/content/types.ts                 (YENİ)
src/content/profile.ts               (YENİ)
src/content/projects/*.ts            (YENİ)
src/app/layout.tsx                   (sadələşdirilir)
src/app/[locale]/layout.tsx          (YENİ)
src/app/[locale]/page.tsx            (YENİ, placeholder)
src/app/[locale]/work/page.tsx       (YENİ, placeholder)
src/app/[locale]/work/[slug]/page.tsx(YENİ, placeholder)
src/app/[locale]/about/page.tsx      (YENİ, placeholder)
src/app/[locale]/contact/page.tsx    (YENİ, placeholder)
src/app/[locale]/not-found.tsx       (YENİ)
src/app/page.tsx                     (SİLİNİR)
next.config.ts                       (next-intl plugin)
```

> **Next.js 16 qeydi:** bu versiyada `params` və `searchParams` `Promise`-dir və `await` edilməlidir. API yazmazdan əvvəl `node_modules/next/dist/docs/01-app/` altındakı sənədləri oxu — təlim məlumatındakı köhnə imzalara güvənmə.

## Tapşırıqlar

### 1. next-intl quraşdırması
- `src/i18n/routing.ts`: `defineRouting({ locales: ['az','en','ru'], defaultLocale: 'az', localePrefix: 'always' })`.
- `src/i18n/navigation.ts`: `createNavigation(routing)` → `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` export.
- `src/i18n/request.ts`: `getRequestConfig` — locale validasiyası, dəstəklənməyən locale-də `notFound()`, messages dinamik import.
- `middleware.ts`: `createMiddleware(routing)`, `matcher` statik faylları və `_next`-i istisna edir.
- `next.config.ts`: `createNextIntlPlugin('./src/i18n/request.ts')` ilə sarılır.
- Root `src/app/layout.tsx` minimuma endirilir; fontlar və `<html lang>` `[locale]/layout.tsx`-ə keçir (`lang` dinamik olmalıdır).
- Hər səhifədə `generateStaticParams` ilə 3 locale build olunur. `setRequestLocale` düzgün çağırılır ki, statik render işləsin.

### 2. Message strukturu
Üç fayl da **eyni açar ağacına** malik olmalıdır. Namespace-lər:
```
common     — actions (viewWork, contact, viewCase, allProjects, backToWork), states (loading, empty)
nav        — work, about, contact, menu, close, skipToContent
locale     — switcherLabel, az, en, ru
hero       — eyebrow, titleLines[], description, ctaPrimary, ctaSecondary
proof      — eyebrow, title, statusLive, statusDev, statusConcept
work       — eyebrow, title, intro, filterAll, filterAi, filterMobile, filterDesign, empty
caseStudy  — chapterProblem, chapterRole, chapterAiWorkflow, chapterSystem,
             factYear, factRole, factStack, factStatus, outcomeTitle, linksTitle, nextProject
process    — eyebrow, title, steps[] (title + body)
about      — eyebrow, title, principlesTitle, toolsTitle, aiWorkflowTitle
contact    — eyebrow, title, intro, emailLabel, responseTime, location, socialTitle
footer     — copyright, builtIn, backToTop
meta       — siteName, defaultTitle, defaultDescription, titleTemplate,
             home/work/about/contact üçün title + description
a11y       — mainLandmark, projectSelected, externalLink, currentLanguage
```
AZ tam yazılır. EN və RU **təbii lokal copy** ilə yazılır (sözbəsöz tərcümə yox). Əmin olmadığın marketinq cümləsində `TODO(content)` qoy — uydurma.

### 3. Content qatı
- `src/content/types.ts` — `docs/BUILD_PLAN.md` §5-dəki tiplər eynilə.
- `src/content/profile.ts` — real məlumat: ad `Ramin Bakhshalıyev`, email `raminbakhshaliyev@gmail.com`, GitHub `https://github.com/Ramin7DEV`, yer: Bakı. LinkedIn və digərləri hələ yoxdur → `TODO(content)`.
- `src/content/projects/mirrorly.ts`, `azerbaijan-otur.ts`, `beauty-app.ts` — struktur tam qurulur, mətnlər `docs/CONTENT_INVENTORY.md`-dən götürülür. Orada olmayan sahə üçün `TODO(content): <nə lazımdır>` string-i qoyulur.
- Cover şəkilləri: `/images/project-mirrorly.png`, `/images/project-azerbaijan-otur.png`, `/images/project-beauty-app.png`. `width`/`height` faktiki fayl ölçüsündən oxunur.
- `src/content/projects/index.ts` — sıralı massiv (`01`, `02`, `03`), `getProject(slug)`, `getAllSlugs()`.
- Hər content faylı `satisfies Project` ilə yoxlanılır ki, çatışmayan locale compile-time-da xəta versin.

### 4. Placeholder səhifələr
Hər səhifə: `<main>` + `h1` (messages-dən) + o səhifənin hansı content-i alacağını göstərən sadə siyahı. Stil yoxdur. `work/[slug]` üçün `generateStaticParams` 3 slug × 3 locale = 9 səhifə qaytarır; mövcud olmayan slug → `notFound()`.


### 5. Şrift yükləmə strategiyası

**Problem:** `next/font` elan edilmiş **hər subset üçün** `<link rel="preload">` yaradır — səhifənin dilindən asılı olmayaraq.

**Həll (ölçmə ilə təsdiqlənib):** bir tək şrift konfiqurasiyası, üç subset, `preload: false`. `unicode-range` sayəsində brauzer yalnız səhifədə faktiki işlənən subset-i endirir.

```ts
Source_Serif_4({ variable: '--font-display-face',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  style: ['normal', 'italic'], display: 'swap', preload: false })
```

Locale-ə görə iki ayrı konfiqurasiya **işləmir**: hər ikisi eyni modul qrafındadır, ona görə hər səhifəyə hər ikisinin `@font-face` və preload-ları düşür.

**Qəbul meyarı:** production build, təmiz cache — bir locale səhifəsində ≤ 6 şrift faylı və ≤ 150 KB.

## Qadağalar
- Dizayn, komponent, animasiya yoxdur.
- Komponentdə literal mətn yoxdur — hamısı `useTranslations` / `getTranslations` və ya content qatından.
- Yeni dependency yoxdur.

## Qəbul Meyarları
1. `npm run check` təmiz.
2. `/` → `/az`-a yönləndirir; `Accept-Language: ru` ilə → `/ru`; naməlum dil → `/az`.
3. `/en/work/mirrorly` və `/ru/work/beauty-app` işləyir; `/az/work/yoxdur` → 404.
4. `npm run build` çıxışında 15+ statik səhifə görünür (5 route × 3 locale).
5. `az.json`, `en.json`, `ru.json` açar ağacları **tam eynidir** (fərq varsa build-də göstər).
6. `<html lang>` hər locale-də düzgündür.
7. Heç bir `any`, heç bir `@ts-ignore`.

## Hesabat
`AGENTS.md` formatında + `TODO(content)` siyahısı tam sadalanır.
