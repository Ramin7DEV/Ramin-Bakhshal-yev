# PHASE 2 — FIX (review nəticəsi: FIX)

Primitivlərin API dizaynı yaxşıdır: `Heading` semantik səviyyəni vizual ölçüdən ayırır, `Button` xarici linki avtomatik tanıyır, CSS Modules seçimi düzgündür, `--header-height` və `--target-min` token əlavəsi təsdiqlənir (`docs/DESIGN_SYSTEM.md` §4-ə yazıldı). Styleguide səhifəsinin özü — rəng swatch-ları, kontrast dəyərləri, tipografiya şkalası — səliqəlidir.

Amma saytda hazırda **heç bir səhifəyə baxmaq mümkün deyil**. Aşağıdakı 3 problem düzəldilməlidir.

---

## B1. Bağlı `<dialog>` bütün saytı örtür — hər ekran ölçüsündə

**Ölçmə** (`/az/styleguide`, viewport 1440×900):
```js
dialog.open                            // false
getComputedStyle(dialog).display       // "flex"   ← olmalıydı "none"
document.elementFromPoint(720, 450)    // <nav> (menyu içindən)
document.documentElement.scrollHeight  // 6146px — məzmun var, amma görünmür
```

Yəni menyu **bağlı olduğu halda** tam ekranı tutur: `position: fixed; inset: 0; z-index: 999; display: flex`. Nəticədə hər səhifədə (`/az`, `/en/work`, styleguide — hamısında) istifadəçi yalnız menyunu görür. Mobil də, desktop da.

**Səbəb:** `MobileMenu.module.css`-də `.dialog` qaydası `display: flex` təyin edir. Brauzerin defolt `dialog:not([open]) { display: none }` qaydası sinif selektoru tərəfindən üstələnir. Faylda `[open]` və ya `:not([open])` şərti ümumiyyətlə yoxdur.

**Düzəliş:**
```css
.dialog {
  display: none;            /* bağlı vəziyyət */
}

.dialog[open] {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  inset: 0;
  /* qalan mövcud qaydalar */
}
```

**Yoxlama (məcburi, iddia yox — ölçmə):** hər üç ekran ölçüsündə (375, 768, 1440) səhifə yüklənəndən sonra:
```js
getComputedStyle(document.querySelector('dialog')).display === 'none'
```
və menyu düyməsinə klikdən sonra `=== 'flex'`, `Esc`-dən sonra yenidən `'none'`.

---

## B2. Sərt kodlanmış ingilis `aria-label`-lar

`AGENTS.md` qayda 4 pozulub. Dörd yerdə ekran oxuyucusuna gedən mətn həmişə ingiliscədir — azərbaycanlı və rus istifadəçi öz dilində saytda ingiliscə etiket eşidir:

| Fayl | Sətir | Mətn |
|---|---|---|
| `LocaleSwitcher.tsx` | 36, 55 | `aria-label="Language selection"` |
| `PrimaryNav.tsx` | 19 | `aria-label="Primary navigation"` |
| `MobileMenu.tsx` | 87 | `aria-label="Mobile navigation"` |

**Düzəliş:** `locale.switcherLabel` açarı onsuz da mövcuddur — onu işlət. `nav` namespace-inə iki yeni açar əlavə et (hər üç dildə): `nav.primaryLabel`, `nav.mobileLabel`.

`LocaleSwitcher` client komponentdir → `useTranslations('locale')`; `PrimaryNav` server komponentdir → mövcud `getTranslations` çağırışından istifadə et.

---

## B3. `HeaderScrollObserver` server-render olunmuş DOM-u əl ilə dəyişir

Hazırkı kod `document.getElementById('site-header').setAttribute(...)` və `document.querySelectorAll('[data-nav-link]')` üzərindən `aria-current` təyin edir.

Problemlər:
1. React-in idarə etdiyi DOM-a kənardan müdaxilədir — yenidən render zamanı atributlar itə bilər.
2. `aria-current` yalnız JavaScript yükləndikdən sonra mövcud olur; ilk HTML-də aktiv səhifə işarəsi yoxdur.
3. Bu üslub növbəti fazalarda təkrarlanacaq və getdikcə kövrək olacaq.

**Düzəliş:**
- `PrimaryNav` client komponentə çevrilir və `usePathname()` (`@/i18n/navigation`) ilə `aria-current="page"`-i **deklarativ** render edir. Mətnlər prop kimi server tərəfdən ötürülür ki, tərcümə serverdə qalsın:
```tsx
// SiteHeader.tsx (server) — mətnləri hazırlayır
<PrimaryNav items={[{href:'/work', label:t('work')}, ...]} ariaLabel={t('primaryLabel')} />
```
- Header-in scroll vəziyyəti üçün kiçik client komponent `<header>` elementinin özünü render edir və `data-scrolled`-i React state ilə idarə edir. Server-render olunan məzmun ona `children` kimi ötürülür (bu, App Router-də dəstəklənir və məzmun server komponent olaraq qalır).
- `data-nav-link` atributu və DOM sorğuları tamamilə silinir.

`"use client"` fayllarının sayı dəyişmir (3 qalır): `MobileMenu`, `LocaleSwitcher`, `PrimaryNav` + header shell (`HeaderScrollObserver` silinir, yerinə header shell gəlir).

---

## Bloklamayan qeydlər

**N1.** `styleguide/page.tsx` rəng dəyərlərini (`hex: '#08090A'`) əl ilə təkrar yazır. Dev-only səhifə olduğu üçün bloklamır, amma `tokens.css` dəyişəndə köhnələcək. Mümkünsə dəyəri runtime-da `getComputedStyle(document.documentElement).getPropertyValue('--surface-void')` ilə oxu, ya da faylın başında "bu siyahı `tokens.css` ilə əl ilə sinxronlaşdırılır" şərhi qoy.

**N2.** Native `<dialog>` + `showModal()` işlədilirsə `aria-modal="true"` artıqdır (brauzer özü təyin edir). Zərəri yoxdur, silmək olar.

**N3.** `document.body.style.overflow = 'hidden'` iOS Safari-də arxa fon scroll-unu tam kilidləmir. Phase 8-də real cihazda yoxlanılacaq — indi dəyişiklik lazım deyil.

---

## Qəbul Meyarları (FIX üçün)

Hər bənd üçün **ölçmə nəticəsi** tələb olunur, "işləyir" ifadəsi kifayət deyil.

1. `npm run check` təmiz.
2. `/az`, `/en/work`, `/ru/about` və `/az/styleguide` səhifələrində 375px, 768px və 1440px enində: səhifə məzmunu görünür, `getComputedStyle(dialog).display === 'none'`.
3. Menyu düyməsinə klik → dialog açılır; `Esc` → bağlanır; fokus menyu düyməsinə qayıdır; arxa fon scroll olunmur.
4. Heç bir komponentdə sərt kodlanmış `aria-label` yoxdur: `grep -rnE 'aria-label="[A-Za-z ]+"' src/components/` boş nəticə verir.
5. JavaScript söndürülmüş halda `/az/work` səhifəsində naviqasiya linkində `aria-current="page"` mövcuddur (ilk HTML-də).
6. `grep -rn "getElementById\|querySelectorAll" src/components/` boş nəticə verir.
7. 320px enində horizontal scroll yoxdur (`document.documentElement.scrollWidth <= window.innerWidth`).

## Hesabat

`AGENTS.md` formatında. **Qəbul meyarları bölməsində hər bənd üçün faktiki ölçmə nəticəsini yaz** (rəqəm, `true`/`false`, və ya `grep` çıxışı) — əvvəlki hesabatda 2, 3, 4 və 6-cı meyarlar "təsdiqləndi" kimi göstərilmişdi, halbuki menyu overlay-i bütün səhifəni örtdüyü üçün onları yoxlamaq mümkün deyildi.
