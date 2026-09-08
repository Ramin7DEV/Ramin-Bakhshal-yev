# PHASE 1 — FIX (review nəticəsi: FIX)

İş böyük hissədə düzgündür: `npm run check` təmiz, 24 statik səhifə build olunur, `az/en/ru` message ağacları **tam eynidir** (hər birində 86 açar), content tipləri `satisfies` ilə bağlıdır, şəkil ölçüləri real fayllarla üst-üstə düşür, `profile.ts` dürüstdür.

Aşağıdakı 4 bloklayıcı düzəldiləndən sonra faza qəbul edilir. Hamısı işlək serverdə ölçülüb.

---

## B1. `/` ünvanı 404 qaytarır — locale yönləndirməsi ümumiyyətlə işləmir

**Ölçmə:**
```
GET /                          -> 404
GET / (Accept-Language: ru)    -> 404
GET /fr                        -> 404
```
Sayta kök ünvandan girən hər kəs 404 görür. Bu, V1-in ən kritik routing davranışıdır.

**Səbəb:** Next.js 16-da **Middleware → Proxy** adlandırılıb. Sənəd: `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`:

> Starting with Next.js 16, Middleware is now called Proxy. Create a `proxy.ts` file in the project root, **or inside `src` if applicable, so that it is located at the same level as `pages` or `app`**.

Bu layihədə `app` qovluğu `src/app`-dadır, deməli fayl **`src/proxy.ts`** olmalıdır. Hazırkı `middleware.ts` (repo kökündə) heç vaxt işə düşmür.

**Düzəliş:** `middleware.ts` silinir, məzmunu `src/proxy.ts`-ə köçürülür (import yolu `./i18n/routing`-ə düzəlir):

```ts
// src/proxy.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

`next-intl@4.14.2`-də hələ `./proxy` export-u yoxdur (paket export siyahısı yoxlanıldı) — import `next-intl/middleware` olaraq qalır, yalnız **fayl adı və yeri** dəyişir.

**Təsdiqlənib:** bu dəyişikliklə ölçülən nəticə:
```
/                        -> 307 /az
/ (Accept-Language: ru)  -> 307 /ru
/ (Accept-Language: en)  -> 307 /en
/ (Accept-Language: de)  -> 307 /az     (fallback düzgün)
/work                    -> 307 /az/work
```

---

## B2. Şrift yükləmə: `/az` səhifəsində 10 fayl / 322 KB

**Ölçmə (`performance.getEntriesByType('resource')`):**

| | preload linki | fayl | həcm |
|---|---|---|---|
| indiki `/az` | 9 | 10 | **322 KB** |
| büdcə | — | ≤ 6 | ≤ 150 KB |

Üstəlik `/az` səhifəsində **kiril `@font-face`-ləri də mövcuddur** (66 font-face qaydası sayıldı).

**Səbəb:** `latinFonts` və `cyrillicFonts` eyni modulda (`fonts.ts`) yaradılır. `next/font` çağırışları modul səviyyəsində statikdir — modul layout tərəfindən import olunan kimi **hər iki konfiqurasiyanın** CSS-i və preload linkləri hər səhifəyə düşür. `className`-in yalnız birini tətbiq etmək şəbəkə yükünü azaltmır.

Bu, mənim Phase 1 spesifikasiyamdakı səhv idi (locale-ə görə iki konfiqurasiya). `docs/gemini/PHASE-1.md` §5 düzəldildi.

**Düzəliş:** `fonts.ts` tək konfiqurasiyaya endirilir, hər üç subset saxlanılır, **`preload: false`**:

```ts
const display = Source_Serif_4({
  variable: '--font-display-face',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
});
// body (Manrope) və mono (IBM_Plex_Mono) üçün eyni: 3 subset + preload: false
```

`latinFonts` / `cyrillicFonts` / `getFontClassName(locale)` ayrımı **tamamilə silinir** — bir `fontClassName` export olunur və `[locale]/layout.tsx` onu birbaşa işlədir.

**Təsdiqlənib** (production build, təmiz cache):

| | fayl | həcm |
|---|---|---|
| `/az` | **3** | **80 KB** |
| `/ru` | **4** | **94 KB** |

`unicode-range` sayəsində brauzer yalnız səhifədə faktiki işlənən subset-i endirir.

**Əlavə səbəb:** hazırkı kiril konfiqurasiyasında `latin-ext` **yoxdur**. Locale switcher hər səhifədə dilləri öz adı ilə göstərəcək (`Azərbaycan`) — `ə` hərfi `latin-ext`-dədir, ona görə `/ru` səhifəsində başqa şriftə düşərdi. Tək konfiqurasiya bu problemi də aradan qaldırır.

---

## B3. Layihə fayllarında uydurulmuş məlumat

`AGENTS.md` qayda 6 pozulub. Heç kim tərəfindən verilməmiş faktlar kodda real dəyər kimi durur:

| Fayl | Uydurulmuş sahə |
|---|---|
| `mirrorly.ts` | `status: 'in-development'`, `year: '2025'`, `stack: ['iOS','SwiftUI','Vision AI','CoreML']` |
| `azerbaijan-otur.ts` | `status: 'live'`, `year: '2024'`, `stack: ['React Native','TypeScript','Node.js','PostgreSQL']` |
| `beauty-app.ts` | `status: 'concept'`, `year: '2025'`, `stack: ['SwiftUI','CoreML','Computer Vision','Metal']` |

`status: 'live'` layihənin yayımda olduğunu **iddia edir**. Bu dəyərlər case səhifəsində fakt cərgəsində göstərilir. Yanlış texnologiya siyahısı isə birbaşa peşəkarlıq problemidir — founder stack-ə baxıb sual verə bilər.

**Düzəliş:**
1. `src/content/types.ts`-də bu sahələr opsional edilir:
```ts
status?: ProjectStatus;
year?: string;
stack: string[];   // boş massiv icazəlidir
```
2. Hər üç layihədə `status` və `year` **silinir**, `stack: []` edilir.
3. Case səhifəsində olmayan fakt render olunmur (`{project.year && <>...</>}`).
4. Bu sahələr `docs/CONTENT_INVENTORY.md` §2-dən doldurulanda geri qayıdır.

`alt` mətnləri də dəqiqləşdirilir: şəkillər abstrakt render-lərdir, "Mirrorly mobil tətbiqi interfeysi" yox, faktiki görünəni təsvir et.

---

## B4. Kök 404 səhifəsi etibarsız HTML qaytarır

**Ölçmə:** `.next/server/app/_not-found.html` faylı `<script>` və `<meta>` ilə başlayır — `<html>`, `<head>`, `<body>` teqləri **yoxdur**.

**Səbəb:** `src/app/layout.tsx` yalnız `children` qaytarır; `<html>`/`<body>` `[locale]/layout.tsx`-dədir. Locale layout-una düşməyən istənilən sorğu (kök səviyyəli 404-lər) natamam sənəd verir: `lang` atributu yoxdur, stil yoxdur.

**Düzəliş:** `src/app/not-found.tsx` yaradılır — tam HTML sənədi qaytarır (default locale `az`, `<html lang="az">`, `globals.css` artıq root layout-dan gəlir), sadə 404 mesajı və `/az`-a link. Mesaj `az.json`-dan oxunur.

---

## Bloklamayan qeydlər

**N1.** `[locale]/layout.tsx`-də `generateMetadata` message faylını birbaşa `import()` edir. `getTranslations({ locale, namespace: 'meta' })` işlət — next-intl-in öz keşindən keçir və Phase 7-də metadata sistemi ilə uyğun olur.

**N2.** `viewport.themeColor: '#08090A'` hardcode edilib və `--surface-void` token-u ilə dublikatdır. `src/lib/theme.ts`-də tək sabit kimi saxla (metadata CSS dəyişəni oxuya bilmir, ona görə bir mənbədən gəlməlidir).

**N3.** Case səhifəsində `<section>` daxilində bütün chapter-lər `chapterProblem` başlığı altında toplanıb — Phase 4-də hər chapter öz başlığını alacaq. İndi problem deyil, sadəcə qeyd.

---

## Qəbul Meyarları (FIX üçün)

1. `npm run check` təmiz.
2. `curl -s -o /dev/null -w "%{http_code} %{redirect_url}" http://localhost:3000/` → `307 .../az`; `Accept-Language: ru` → `/ru`; `de` → `/az`.
3. `/az/work/yoxdur` → 404 və səhifə tam HTML sənədidir (`<html lang="az">` var).
4. Production build + təmiz cache: `/az` səhifəsində şrift faylı ≤ 6, ümumi həcm ≤ 150 KB.
5. `grep -rn "status:\|year:" src/content/projects/` → nəticə boşdur; `stack: []`.
6. `.next/server/app/_not-found.html` `<html` ilə başlayan tam sənəddir.
7. `middleware.ts` repo kökündə **yoxdur**; `src/proxy.ts` mövcuddur.

## Hesabat
`AGENTS.md` formatında + 2-ci və 4-cü meyarların ölçmə nəticələri.
