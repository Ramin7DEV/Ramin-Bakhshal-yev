# PHASE 2 — Design System Primitives & Site Chrome

## Kontekst
Phase 1 qəbul edilib: 3 dilli routing və content qatı işləyir, səhifələr stilsizdir. İndi vizual sistemi kodda qururuq: primitiv komponentlər + header/footer/menu. Səhifə məzmunu **hələ yazılmır**.

## Scope
```
src/components/primitives/  Container, Section, Eyebrow, Heading, Body, Button,
                            Tag, Rule, MediaFrame, VisuallyHidden   (hamısı YENİ)
src/components/layout/      SiteHeader, PrimaryNav, MobileMenu, SiteFooter,
                            SkipLink, LocaleSwitcher                (hamısı YENİ)
src/app/[locale]/layout.tsx (header/footer qoşulur)
src/app/[locale]/styleguide/page.tsx  (YENİ — yalnız development)
src/styles/base.css         (yalnız lazım olsa kiçik əlavə)
```

## Tapşırıqlar

### 1. Primitivlər
Hamısı **Server Component** (heç birində `"use client"` olmamalıdır).

- `Container` — `max-width: var(--container-max)`, `padding-inline: var(--gutter)`, mərkəzli. `as` prop ilə element seçimi.
- `Section` — `<section>`, `padding-block: var(--space-section)`, opsional `id`, opsional `surface` variantı (`void` | `obsidian`).
- `Eyebrow` — mono label (`.t-label`), opsional `tone` (`tertiary` | `signal`).
- `Heading` — `level` (1-4) və `size` (`display-xl` | `display-l` | `display-m` | `heading`) ayrı prop-lardır. **Semantik səviyyə vizual ölçüdən asılı deyil** — bu a11y üçün vacibdir.
- `Body` — `size` (`l` | `m` | `s`), `max-width: var(--measure)` default.
- `Button` — `variant: 'primary' | 'ghost'`, `as: 'link' | 'button'`. Link halında `next-intl` `Link`-i (daxili) və ya `<a target="_blank" rel="noreferrer">` (xarici, avtomatik təyin olunur). Ox işarəsi `aria-hidden`. Min 44×44px.
- `Tag` — `active` prop-u ilə.
- `Rule` — hairline ayırıcı, `role="presentation"`.
- `MediaFrame` — `next/image` sarğısı: məcburi `aspectRatio`, `--radius-md`, `overflow: hidden`, `--shadow-media`, placeholder fon. `priority` və `sizes` prop kimi ötürülür.
- `VisuallyHidden`.

Stil yanaşması: hər komponentin öz CSS module faylı (`Component.module.css`) və ya `base.css`-də sinif — **birini seç və hər yerdə eyni saxla**. Seçimini hesabatda yaz. Dəyərlər yalnız token-lardan.

### 2. Site chrome

**SiteHeader** (`Server`, daxilində kiçik client hissələr):
- Sol: monoqram `RB` + tam ad. Ana səhifəyə link.
- Mərkəz/sağ: `PrimaryNav` — Work, About, Contact. Aktiv route `aria-current="page"` və gold underline.
- Sağ: `LocaleSwitcher` + status mətni (`Available for select work / 2026` — messages-dən).
- Scroll davranışı: səhifə yuxarısında şəffaf, 80px-dən sonra `--surface-void` fon + hairline alt sərhəd (`backdrop-filter` **istifadə etmə** — performans). Bu davranış üçün kiçik client komponent icazəlidir.
- `<768px`: naviqasiya gizlənir, `Menu` düyməsi görünür.

**MobileMenu** (`"use client"`):
- Native `<dialog>` + `showModal()` → focus trap pulsuz gəlir.
- `Esc` bağlayır, bağlananda fokus açan düyməyə qayıdır.
- Tam ekran, böyük tipografiya (`display-m`), sətir-sətir naviqasiya, altda locale switcher və email.
- `body` scroll kilidi açıq olduqda.
- `aria-labelledby`, `aria-modal` düzgün.

**LocaleSwitcher** (`"use client"`):
- 3 dil, hər biri **öz dilində**: `Azərbaycan`, `English`, `Русский`.
- Aktiv dildə `aria-current="true"`.
- Keçid `usePathname` + `useRouter` (next-intl navigation) ilə — **eyni səhifədə qalır**, ana səhifəyə atmır.
- Desktop-da inline mono siyahı (`AZ · EN · RU`), mobil menyuda tam adlarla.

**SiteFooter**:
- Üç sütun: brend/qısa cümlə · naviqasiya · əlaqə (email, GitHub).
- Alt sətir: copyright, `Built in Baku`, `Back to top` linki (`#main-content`).
- Hairline üst sərhəd.

**SkipLink** — `main`-ə keçid, ilk tab elementi, fokusda görünür.

### 3. `[locale]/layout.tsx`
`SkipLink` → `SiteHeader` → `<main id="main-content">{children}</main>` → `SiteFooter`. `NextIntlClientProvider` yalnız lazım olan messages ilə (bütün fayl deyil — bundle üçün vacibdir).

### 4. Styleguide səhifəsi
`/[locale]/styleguide` — **yalnız `process.env.NODE_ENV !== 'production'`**, əks halda `notFound()`.
Göstərir: rəng swatch-ları (kontrast dəyəri ilə), tipografiya şkalası, spacing şkalası, bütün Button/Tag/Card variantları, focus state nümunəsi, MediaFrame nümunəsi.
Bu səhifə review üçün əsas alətdir — səliqəli və tam olsun.

## Qadağalar
- Səhifə məzmunu (hero, kartlar, case) yazma.
- GSAP və ya animasiya kitabxanası işlətmə (hover CSS keçidləri olar).
- İkon kitabxanası quraşdırma — lazım olan bir neçə ikon inline SVG kimi yazılır (`aria-hidden`, `currentColor`).
- `backdrop-filter` işlətmə.

## Qəbul Meyarları
1. `npm run check` təmiz.
2. Styleguide səhifəsi hər 3 dildə açılır və bütün primitivləri göstərir.
3. Klaviatura ilə: Tab → skip link görünür → header → nav → locale → menu. Fokus halqası hər yerdə görünür.
4. Mobil menyu: `Esc` bağlayır, fokus geri qayıdır, arxa fon scroll olmur.
5. Locale switcher `/en/about` → `/ru/about` keçidini düzgün edir.
6. 320px enində horizontal scroll yoxdur.
7. Heç bir komponentdə hex/px/ms hardcode yoxdur.
8. `"use client"` yalnız `MobileMenu`, `LocaleSwitcher` və header scroll observer-indədir.

## Hesabat
`AGENTS.md` formatında + stil yanaşması seçimi (CSS module / global sinif) və səbəbi.
