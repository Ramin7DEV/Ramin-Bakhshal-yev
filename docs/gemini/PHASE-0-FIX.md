# PHASE 0 — FIX (review nəticəsi: FIX)

Phase 0 strukturu düzgündür, `npm run check` təmiz keçir, token-lar tamdır. Aşağıdakı 4 bloklayıcı problem düzəldiləndən sonra faza qəbul edilir.

Hər problem **brauzerdə empirik təsdiqlənib** — nəzəri deyil.

---

## B1. Display şrift dəyişir: Fraunces → Source Serif 4

**Səbəb:** Fraunces-də kiril əlifbası yoxdur (`next/font` metadata: `subsets: latin, latin-ext, vietnamese`). Canvas ölçməsi ilə təsdiqləndi: `Русский` mətni Fraunces-də və mövcud olmayan şriftdə **eyni enə** malikdir → şrift kirili render etmir, Georgia-ya düşür. Azərbaycan hərfləri (`ə Ə ğıöüçş`) isə Fraunces-də real glyph kimi mövcuddur.

Üç dilli saytda RU başlıqların tam başqa şriftdə çıxması qəbuledilməzdir.

**Düzəliş:** `docs/DESIGN_SYSTEM.md` §3 yeniləndi. `layout.tsx`-də:

```ts
import { Source_Serif_4, Manrope, IBM_Plex_Mono } from "next/font/google";

const display = Source_Serif_4({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
});
```

`weight` **verilmir** (variable font). `style: ["normal","italic"]` məcburidir — `<em>` vurğusu italic tələb edir.

---

## B2. Token şrift dəyişənləri next/font-un metrik fallback-ını üstələyir

**Təsdiq:** brauzerdə `getComputedStyle(document.documentElement).getPropertyValue('--font-display')` → `"Fraunces", Georgia, serif`. next/font `"Fraunces Fallback"` ailəsini `size-adjust: 115.45%` ilə yaradır, amma kaskadda heç vaxt istifadə olunmur (`document.fonts.check('"Fraunces Fallback"')` → `false`).

**Nəticə:** şrift yüklənənə qədər fallback metrikləri uyğunlaşdırılmır → layout sıçrayışı. Bu, CLS < 0.03 büdcəsini birbaşa pozur.

**Səbəb:** `layout.tsx`-dəki `variable: "--font-display"` və `tokens.css`-dəki `--font-display` **eyni addır**. Hər ikisi `<html>` elementinə eyni spesifiklik ilə tətbiq olunur, mənbə sırasına görə `tokens.css` qalib gəlir.

**Düzəliş:**
- `layout.tsx`: `variable: "--font-display-face"`, `"--font-body-face"`, `"--font-mono-face"`.
- `tokens.css`:
```css
--font-display: var(--font-display-face), Georgia, 'Times New Roman', serif;
--font-body:    var(--font-body-face), system-ui, -apple-system, sans-serif;
--font-mono:    var(--font-mono-face), ui-monospace, SFMono-Regular, monospace;
```

---

## B3. `@theme inline` blokunda öz-özünə istinad edən dəyişənlər

**Təsdiq:** generasiya olunmuş CSS-də:
```css
--font-display: var(--font-display);   /* Tailwind @theme inline */
--radius-xs: var(--radius-xs);
```
Bu, dairəvi istinaddır. Hazırda işləyir, **yalnız ona görə ki** `tokens.css` bloku təsadüfən daha sonra emit olunur. İmport sırası və ya Tailwind versiyası dəyişəndə bütün şrift və radius utility-ləri səssizcə sınacaq.

**Düzəliş:** `globals.css`-dəki `@theme inline` blokundan **ad toqquşması olan** girişləri çıxar:
- `--font-display`, `--font-body`, `--font-mono` → sil (bu ailələr birbaşa token kimi işlədilir).
- `--radius-xs/sm/md/pill` → sil.

Rəng (`--color-*`) və spacing (`--spacing-*`) girişləri **qalır** — onların adları token adları ilə toqquşmur, ona görə problem yaratmır.

Düzəlişdən sonra generasiya olunmuş CSS-də `--x: var(--x)` şablonu **qalmamalıdır**:
```bash
grep -oE '\-\-[a-z-]+:var\(\-\-\1\)' .next/static/chunks/*.css   # nəticə boş olmalıdır
```

---

## B4. `font-variation-settings` təsirsizdir

**Təsdiq:** `layout.tsx`-də `weight: ["300","400"]` verildiyi üçün next/font **static** instance-lar yüklədi (`document.fonts` siyahısında `Fraunces:300` və `Fraunces:400` ayrı üzlər kimi, variable üz yoxdur). Static şriftdə `font-variation-settings: 'SOFT' 0, 'WONK' 0, 'opsz' 96` heç bir təsir etmir — `base.css`-də 4 sinifdə ölü koddur.

**Düzəliş:**
- `layout.tsx`-də display şrift üçün `weight` verilmir (B1-ə bax).
- `base.css`-dəki bütün `font-variation-settings` sətirləri **silinir**.
- Əvəzinə heç nə yazılmır: `font-optical-sizing: auto` brauzer defoltudur və `opsz` oxunu font-size-a görə avtomatik tənzimləyir.
- Display siniflərində çəki lazım olsa `font-weight` ilə verilir (`.t-display-xl { font-weight: 300 }` kimi — variable font bunu dəstəkləyir).

---

## Kiçik düzəlişlər (bloklamayan, indi edilir)

**N1. `.gitignore`** — sualının cavabı: **bəli**. `.env*` sətrindən sonra əlavə et:
```
!.env.example
```

**N2. `metadata.description`** — `"TODO(content): ..."` sətri metadata-da qalmasın; Phase 1-də real dəyər gələnə qədər neytral placeholder yaz (`"Personal portfolio of Ramin Bakhshalıyev."`). Səbəb: TODO mətnləri crawler-ə görünən sahələrdə qalmamalıdır.

**N3. `AGENTS.md`** — `next dev` faylın sonuna `<!-- BEGIN:nextjs-agent-rules -->` bloku əlavə edir və hər dəfə bərpa edir. Bu blok **saxlanılır və commit edilir** (silmək mənasızdır). Bloku dəyişdirmə.

**N4. `src/app/page.tsx`** — inline `style={{}}` obyektləri bu müvəqqəti səhifə üçün qəbul olunur (Phase 1-də silinir), amma bu üslub Phase 2-dəki real komponentlərə **keçməməlidir**. Orada CSS module və ya qlobal sinif istifadə olunacaq.

---

## Sonrakı bütün fazalar üçün qeyd

Next.js 16 öz sənədlərini repo daxilində gətirir: `node_modules/next/dist/docs/01-app/`.
Next-ə aid API yazmazdan əvvəl (`params`/`searchParams` artıq `Promise`-dir, `generateMetadata`, `middleware`, `next/font`) həmin sənədləri oxu — təlim məlumatındakı köhnə API-lərə güvənmə.

---

## Qəbul Meyarları (FIX üçün)

1. `npm run check` təmiz.
2. Brauzerdə `getComputedStyle(document.documentElement).getPropertyValue('--font-display')` nəticəsi `"Source Serif 4", "Source Serif 4 Fallback", Georgia, ...` şəklindədir — yəni next/font-un fallback ailəsi zəncirdədir.
3. `document.fonts` siyahısında display şrift **variable** üz kimi görünür (ayrı 300/400 static üzlər yox).
4. Kiril testi: `/` səhifəsinə müvəqqəti olaraq `Русский текст` və `Azərbaycan dili — ə ğ ı ö ü ç ş` sətirlərini `.t-display-l` sinfi ilə əlavə et; hər ikisi **eyni şriftdə** render olunmalıdır (canvas eni ilə yoxla: hər iki mətn üçün display şrift eni fallback enindən fərqlənməlidir).
5. Generasiya olunmuş CSS-də `--x: var(--x)` dairəvi istinadı yoxdur.
6. `base.css`-də `font-variation-settings` qalmayıb.
7. `.env.example` `git status`-da görünür.

## Hesabat
`AGENTS.md` formatında + 4-cü qəbul meyarının nəticəsi (kiril + AZ hərflərinin eyni şriftdə render olunduğunun təsdiqi).
