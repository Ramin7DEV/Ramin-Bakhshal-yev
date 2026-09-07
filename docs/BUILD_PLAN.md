# BUILD PLAN — raminbakhshaliyev.com (V1)

Versiya: 1.0 · Tarix: 2026-09-07 · Status: Təsdiq edilib, icraya hazır
Lead/Reviewer: Claude (Opus) · Implementer: Gemini · Owner: Ramin Bakhshalıyev

Bu sənəd V1 buraxılışının **texniki source of truth**-udur. Strategiya üçün `AI_FIRST_PORTFOLIO_MASTER_PLAN.md`, vizual qərarlar üçün `docs/DESIGN_SYSTEM.md` oxunur.

---

## 1. V1 Scope (kilidlənib)

### Daxildir
- Home (lobby)
- Work qalereyası (curated gallery)
- 3 case study səhifəsi: Mirrorly, Azerbaijan Otur, Beauty App
- About / Process
- Contact
- 3 dil: `az` (default), `en`, `ru`
- GSAP ScrollTrigger motion layer
- Tam SEO (hreflang, sitemap, OG, JSON-LD)
- Vercel deployment + custom domain

### V1-ə daxil DEYİL (V2-yə keçir)
- AI bot (`/bot`) — serverless AI layer
- Lab mini-oyunlar (`/lab`)
- CMS
- Blog
- Light theme

> Səbəb: yarımçıq bot və ya oyun premium hissi gücləndirmir, zəiflədir. V1 hədəfi bir şeyi mükəmməl etməkdir: "bu insan keyfiyyətli iş görür" sübutu. Bot və Lab bu təməl üzərində V2-də əlavə olunur — arxitektura onlara yer saxlayır (§4 route ehtiyatı).

### V1 uğur meyarı
Sayta ilk dəfə girən founder 10 saniyə ərzində bunu deyə bilməlidir:
> "Bu insan AI ilə real məhsul qurur, detala fikir verir, onunla işləmək olar."

---

## 2. Texniki Stack (kilidlənib)

Bu versiyalar `npm` registry-dən 2026-09-07 tarixində yoxlanılıb. Dəqiq bu versiyalar quraşdırılır.

| Paket | Versiya | Rol |
|---|---|---|
| `next` | `16.3.4` | Framework (App Router) |
| `react` / `react-dom` | `19.2.4` | UI runtime |
| `typescript` | `^5` | Type layer, strict |
| `tailwindcss` + `@tailwindcss/postcss` | `4.3.3` | Utility layer |
| `next-intl` | `4.14.2` | Lokalizasiya + locale routing |
| `gsap` | `3.15.0` | Motion engine (ScrollTrigger, Observer) |
| `@gsap/react` | `2.1.2` | `useGSAP` hook, React cleanup |
| `eslint` + `eslint-config-next` | `^9` / `16.3.4` | Lint |

Runtime: Node `>=22`. Package manager: `npm`.

**Yeni paket əlavə etmək qadağandır** (icon set, UI kit, animation library, utility library daxil). Ehtiyac yaranarsa faza hesabatında `Open questions` bölməsində soruşulur.

### Niyə Lenis yoxdur
`claudedocs/research_scroll_driven_transition_architecture_2026-07-29.md` sənədinin qərarı saxlanılır: əvvəlcə native scroll + ScrollTrigger. Lenis yalnız real cihazda ölçmədən sonra, V1-dən sonra qiymətləndirilir.

---

## 3. Repo Strukturu

```
src/
  app/
    [locale]/
      layout.tsx              # locale layout: fonts, nav, footer, providers
      page.tsx                # Home
      work/page.tsx           # Work gallery
      work/[slug]/page.tsx    # Case study
      about/page.tsx
      contact/page.tsx
      not-found.tsx
    layout.tsx                # root: <html>, minimal
    sitemap.ts
    robots.ts
    favicon.ico
  components/
    primitives/               # Container, Section, Eyebrow, Heading, Body, Button,
                              # Tag, Rule, MediaFrame, VisuallyHidden
    layout/                   # SiteHeader, PrimaryNav, MobileMenu, SiteFooter,
                              # SkipLink, LocaleSwitcher
    home/                     # Hero, ProofStrip, SelectedWork, ProcessSnapshot, FinalCta
    work/                     # WorkGrid, WorkCard, WorkFilter
    case/                     # CaseHero, CaseChapter, CaseMedia, CaseFacts, NextProject
    motion/                   # MotionProvider, Reveal, ScrollScene, ParallaxMedia
  content/
    types.ts                  # Localized<T>, Project, Profile, ProcessStep
    profile.ts
    projects/
      index.ts                # ordered export + getProject(slug)
      mirrorly.ts
      azerbaijan-otur.ts
      beauty-app.ts
  i18n/
    routing.ts                # locales, defaultLocale, pathnames
    request.ts                # getRequestConfig
    navigation.ts             # Link, redirect, usePathname, useRouter wrappers
  messages/
    az.json  en.json  ru.json # UI chrome strings only
  lib/
    seo.ts                    # buildMetadata(), alternates, JSON-LD
    cn.ts                     # className birləşdirici (öz yazımız, 6 sətir)
    motion.ts                 # duration/easing sabitləri, prefersReducedMotion()
  styles/
    tokens.css                # bütün design token-lar
    base.css                  # reset, typography base, focus, reduced-motion
    globals.css               # @import tailwindcss + tokens + base
middleware.ts                 # next-intl locale middleware (repo root)
public/
  images/                     # project və hero şəkilləri
  og/                         # generated/static OG assets
docs/                         # bu plan və prompt-lar
```

**Qayda:** komponent qovluqları düz (flat) saxlanılır, `index.ts` barrel faylı yalnız `content/projects` üçün var.

---

## 4. Routing və Lokalizasiya

### Locale strategiyası
- `locales = ['az', 'en', 'ru']`, `defaultLocale = 'az'`
- `localePrefix: 'always'` → `/az`, `/en`, `/ru`. `/` → middleware `Accept-Language` ilə yönləndirir, dəstəklənməyən dil → `/az`.
- Locale seçimi cookie-də (`NEXT_LOCALE`) saxlanılır, manual switch onu üstələyir.
- `generateStaticParams` ilə bütün locale × route kombinasiyaları build-time render olunur (tam statik, sürətli).

### Route xəritəsi
| Route | Səhifə | Render |
|---|---|---|
| `/{locale}` | Home | Static |
| `/{locale}/work` | Work gallery | Static |
| `/{locale}/work/[slug]` | Case study | Static (3 slug × 3 locale = 9) |
| `/{locale}/about` | About / Process | Static |
| `/{locale}/contact` | Contact | Static |
| `/{locale}/bot` | **V2 ehtiyatı** | — |
| `/{locale}/lab` | **V2 ehtiyatı** | — |

Slug-lar bütün dillərdə eynidir (`mirrorly`, `azerbaijan-otur`, `beauty-app`) — link paylaşımı və analytics sadə qalır.

### Mətn qatının bölgüsü (ciddi qayda)
- `src/messages/*.json` → **yalnız UI chrome**: nav, buttonlar, label-lar, form mətnləri, error/empty state, metadata şablonları.
- `src/content/**` → **məzmun**: profil, layihələr, case study mətnləri, process addımları. Hər sahə `Localized<T>` tipindədir.

Səbəb: content strukturludur və gələcəkdə CMS-ə köçəcək; chrome isə tərcümə faylı olaraq qalır.

### Lokalizasiya keyfiyyət qaydası
Tərcümə deyil, **lokal copy**. RU və EN versiyaları AZ-ın sözbəsöz tərcüməsi olmamalıdır. Copy hazır olmayan yerdə `TODO(content)` qalır və faza hesabatında bildirilir — uydurulmuş mətn yazılmır.

---

## 5. Content Data Model

```ts
// src/content/types.ts
export type Locale = 'az' | 'en' | 'ru';
export type Localized<T> = Record<Locale, T>;

export type ProjectStatus = 'live' | 'in-development' | 'concept';
export type ProjectCategory = 'ai' | 'mobile' | 'product-design';

export interface ProjectLink {
  kind: 'app-store' | 'google-play' | 'github' | 'website' | 'video';
  href: string;
  label: Localized<string>;
}

export interface CaseChapter {
  id: string;                      // 'problem' | 'role' | 'ai-workflow' | ...
  eyebrow: Localized<string>;
  title: Localized<string>;
  body: Localized<string[]>;       // paraqraf massivi
  media?: MediaAsset;
}

export interface MediaAsset {
  src: string;
  alt: Localized<string>;
  width: number;
  height: number;
  poster?: string;                 // video üçün
}

export interface Project {
  slug: 'mirrorly' | 'azerbaijan-otur' | 'beauty-app';
  index: '01' | '02' | '03';
  status: ProjectStatus;
  categories: ProjectCategory[];
  year: string;
  title: string;                   // brend adı — tərcümə olunmur
  summary: Localized<string>;      // 1 cümlə, kart üçün
  statement: Localized<string>;    // 2-3 cümlə, hero üçün
  role: Localized<string[]>;
  stack: string[];                 // texnologiya adları — tərcümə olunmur
  outcome: Localized<string[]>;    // real nəticələr; boş ola bilər, uydurulmaz
  cover: MediaAsset;
  chapters: CaseChapter[];
  links: ProjectLink[];
  accent: 'gold' | 'signal' | 'ivory';
}

export interface Profile {
  name: string;
  role: Localized<string>;
  positioning: Localized<string>;
  bio: Localized<string[]>;
  location: Localized<string>;
  availability: Localized<string>;
  email: string;
  social: ProjectLink[];
}
```

Bütün content faylları bu tiplərə `satisfies` ilə bağlanır ki, çatışmayan locale compile-time-da tutulsun.

---

## 6. Səhifə Məzmun Xəritəsi

### 6.1 Home — 6 blok, bu sıra ilə
1. **Hero** — positioning bir cümlədə, ad, rol, əsas CTA (`Work` + `Contact`), workbench görseli. LCP elementi burada olur və optimallaşdırılır.
2. **Proof strip** — real sübut: live app statusu, platformalar, əsas stack. Metrik yalnız real olarsa. Boş badge yoxdur.
3. **Selected work** — 3 layihə kartı, hər birində: index, ad, bir cümlə, status, stack, cover. Kart bütövlükdə klik sahəsidir.
4. **Process snapshot** — 3 addım (`Signal → System → Ship`), hər birində AI-nin harada dayandığı konkret yazılır.
5. **About teaser** — 2 cümlə + `About` linki.
6. **Final CTA** — bir dominant çağırış: email. İkincil: GitHub, LinkedIn.

### 6.2 Work
Intro (1 cümlə) → filter (`All / AI / Mobile / Product design`, client-side, URL query ilə sinxron) → project grid (2 sütun desktop, 1 mobil) → hər kartda status badge.

### 6.3 Case study şablonu (3 layihə üçün eyni skelet)
1. Case hero — title, statement, meta cərgəsi (year / role / status / platform)
2. `problem` — nə problemi həll edir
3. `role` — Raminin konkret rolu
4. `ai-workflow` — **ən vacib bölmə**: AI-nin hansı addımda, necə istifadə olunduğu. Konkret alət və konkret nəticə. Bu bölmə saytın əsas fərqləndiricisidir.
5. `system` — texniki/dizayn sistem qərarları
6. Media qalereyası
7. `outcome` — nəticə (real, ölçülə bilən; yoxdursa keyfiyyət təsviri)
8. Links
9. Next project

### 6.4 About
Portret/avatar → hekayə (3-4 paraqraf) → iş prinsipləri → AI workflow → alətlər → CTA.

### 6.5 Contact
Aydın çağırış (kim üçün, nə üçün yazmalı) → email (dominant) → GitHub / LinkedIn → cavab müddəti gözləntisi → yerləşmə və vaxt zonası.
V1-də form **yoxdur** — `mailto:` kifayətdir və spam riski sıfırdır. Form V2-də dəyərləndirilir.

---

## 7. Motion Arxitekturası

Prinsip: **motion mənanı gücləndirir, diqqəti oğurlamır.** Hər səhnə bir məqsədə xidmət edir.

### Qat quruluşu
- `MotionProvider` (client) — GSAP plugin qeydiyyatı (`ScrollTrigger`, `Observer`), `gsap.matchMedia()` ilə desktop/mobil/reduced-motion konteksti, global defaults.
- `Reveal` — mətn və blok görünmə (opacity + y, stagger). CSS-ə yaxın, ucuz.
- `ScrollScene` — pin + scrub tələb edən bölmələr üçün.
- `ParallaxMedia` — şəkil üçün ölçülü parallax (max 8% yerdəyişmə).

### Səhnələr
| Səhnə | Davranış | Cihaz |
|---|---|---|
| Hero | Başlıq sətir-sətir mask reveal, şəkil yumşaq scale-out (1.06 → 1.0) | Hamısı |
| Hero → Work | Scroll ilə hero meta sönür, growth line uzanır | Desktop scrub, mobil sadə fade |
| Selected work | Kartlar stagger reveal, hover-də cover 1.03 scale + hairline işıqlanma | Desktop; mobilə hover yoxdur |
| Case hero | Cover shared-element hissi: work kartından case səhifəsinə eyni vizual dil | Hamısı |
| Case chapters | Sticky numeral sütunu, mətn scroll ilə irəliləyir | Desktop pin, mobil static |
| Process | 3 addım ardıcıl reveal, xətt progress-i scrub | Desktop |
| Final CTA | Sadə fade-up. Burada effekt minimumdur — çağırış aydın qalmalıdır | Hamısı |

### Məcburi qaydalar
1. `useGSAP` (`@gsap/react`) istifadə olunur — manual cleanup səhvi olmasın.
2. Yalnız `transform` və `opacity` animasiya olunur. `width`, `height`, `top`, `left`, `filter` scroll-a bağlanmır.
3. `prefers-reduced-motion: reduce` → bütün scrub və pin söndürülür, yalnız 200ms opacity keçidi qalır. `gsap.matchMedia()` ilə idarə olunur.
4. Heç bir animasiya kontenti gizlətmiş halda ilişib qalmamalıdır: JS yüklənməsə də mətn görünən olmalıdır (`Reveal` initial state CSS-də deyil, JS-də qurulur).
5. Mobil (<768px): pin yoxdur, scrub minimumdur, yalnız reveal.
6. ScrollTrigger `refresh()` şəkil yükləndikdən sonra çağırılır (layout sürüşməsinin qarşısını almaq üçün).

### Intro gate
V1-də **intro overlay yoxdur.** Köhnə prototipdəki "Enter the atelier" ekranı silinib. Səbəb: kontenti gecikdirir, LCP-ni zədələyir, ikinci ziyarətdə əngəldir və premium deyil, maneə hissi verir. Premium ilk təəssürat hero-nun özündə qurulur.

---

## 8. SEO

- Hər locale üçün ayrı `title` / `description` (`generateMetadata`, messages-dən şablon).
- `alternates.languages` — 3 locale + `x-default` (→ `az`).
- `canonical` hər səhifə üçün mütləq.
- `app/sitemap.ts` — bütün route × locale, `alternates` ilə.
- `app/robots.ts` — tam icazə, sitemap linki.
- JSON-LD: Home-da `Person` (+`knowsAbout`, `sameAs`), case səhifələrində `CreativeWork`.
- OG: `next/og` ilə route-səviyyəli dinamik OG şəkil (`opengraph-image.tsx`) — locale-aware başlıq ilə.
- Şəkillərdə mənalı `alt` (locale-aware). Dekorativ şəkillərdə `alt=""`.

---

## 9. Performans Büdcəsi

Ölçmə: production build, Lighthouse mobile (Moto G Power, 4G).

| Metrik | Hədəf | Qırmızı xətt |
|---|---|---|
| LCP | < 1.8s | 2.5s |
| CLS | < 0.03 | 0.1 |
| INP | < 150ms | 200ms |
| Home route JS (gzip) | < 170 KB | 200 KB |
| Lighthouse Performance | ≥ 92 | 85 |
| Lighthouse Accessibility | 100 | 95 |

Qaydalar:
- Bütün şəkillər `next/image`, `sizes` düzgün, hero `priority`.
- Şəkil mənbələri AVIF/WebP; cover şəkilləri ≤ 300 KB.
- Fontlar `next/font` ilə self-hosted, `display: swap`, yalnız lazım olan subset və weight.
- GSAP yalnız client komponentlərdə import olunur; `ScrollTrigger` dinamik yüklənir və mobil reduced-motion halında ümumiyyətlə yüklənmir.
- Video autoplay yoxdur; poster + istifadəçi klikindən sonra yüklənmə.

---

## 10. Accessibility Standartı

Hədəf: **WCAG 2.2 AA**, Lighthouse a11y 100.

- Semantik HTML: `header`, `nav`, `main`, `article`, `footer`. Səhifədə tək `h1`, heading iyerarxiyası pozulmur.
- Skip link hər səhifədə, ilk fokuslanan element.
- `:focus-visible` görünən halqa (2px signal rəngi, 3px offset) — heç vaxt `outline: none` tək başına.
- Kontrast: mətn ≥ 4.5:1, böyük mətn ≥ 3:1. Token-lar §DESIGN_SYSTEM-də yoxlanılıb.
- Locale switcher: `aria-current="true"` aktiv dildə, hər seçim öz dilində yazılır (`Azərbaycan`, `English`, `Русский`).
- Mobile menu: `dialog` semantikası, focus trap, `Esc` bağlayır, bağlananda fokus açan düyməyə qayıdır.
- Hover-a bağlı kritik məlumat yoxdur.
- `prefers-reduced-motion` tam dəstəklənir (§7).
- Klaviatura ilə bütün interaktiv elementlərə çatmaq mümkündür; tab sırası vizual sıra ilə üst-üstə düşür.

---

## 11. Faza Cədvəli

Hər faza `docs/gemini/PHASE-N.md` faylındakı prompt ilə icra olunur. **Faza qəbul edilmədən növbətiyə keçmək olmaz.**

| # | Faza | Çıxış | Review fokusu |
|---|---|---|---|
| 0 | Foundation & reset | Build keçən boş skelet, token-lar, config | Struktur, strict TS, token tamlığı |
| 1 | i18n & content layer | 3 dil routing, tiplənmiş content, boş səhifələr | Locale fallback, tip təhlükəsizliyi |
| 2 | Design system & chrome | Primitivlər, header, footer, mobile menu, locale switcher | Token uyğunluğu, a11y, responsive |
| 3 | Home (statik) | Tam Home, motion olmadan | Kompozisiya, iyerarxiya, copy qatı |
| 4 | Work + case study | Qalereya, filter, 3 case səhifəsi | Content modeli, şablon ardıcıllığı |
| 5 | About + Contact | 2 səhifə | Ton, CTA aydınlığı |
| 6 | Motion layer | GSAP səhnələri | Cleanup, reduced-motion, performans |
| 7 | SEO & metadata | hreflang, sitemap, OG, JSON-LD | Doğruluq, canonical |
| 8 | Performance & a11y hardening | Büdcəyə uyğunluq | Lighthouse, real ölçmə |
| 9 | QA & deploy | Vercel + domain | Cross-device, final rubric |

---

## 12. Definition of Done (V1)

1. `az`, `en`, `ru` — üç dildə hər səhifə tam və təbii copy ilə işləyir.
2. Home ilk 10 saniyədə `AI-first engineer` mövqeyini aydın çatdırır.
3. Hər case study `ai-workflow` bölməsində konkret, dürüst məlumat verir.
4. Mobil təcrübə desktop qədər səliqəlidir; heç bir horizontal scroll yoxdur.
5. Lighthouse: Performance ≥ 92, Accessibility 100, Best Practices ≥ 95, SEO 100 (mobile).
6. Klaviatura ilə bütün sayt gəzilə bilir; `prefers-reduced-motion` hörmət olunur.
7. hreflang, canonical, sitemap, robots, OG — hamısı doğru.
8. Uydurma məlumat, fake metrik, boş badge yoxdur.
9. `npm run lint`, `npx tsc --noEmit`, `npm run build` təmiz keçir.
10. Vercel-də production deploy + `raminbakhshaliyev.com` domeni işləyir.
