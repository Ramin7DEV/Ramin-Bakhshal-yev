# DESIGN SYSTEM — raminbakhshaliyev.com

Versiya: 1.0 · Bu sənəd `src/styles/tokens.css` faylının mənbəyidir.
Kodda **heç bir dizayn dəyəri hardcode edilmir** — yalnız buradakı token-lar.

---

## 1. Vizual İstiqamət

**Digital atelier / editorial museum.**

Sayt qaranlıq, sakit və nizamlıdır. Effekt deyil, tipografiya və boşluq işləyir. Rəng az, amma dəqiq istifadə olunur. Hər ekranda bir dominant element var — qalanları ona xidmət edir.

Referans hiss: yüksək səviyyəli sənət kataloqu + mühəndis sənədi. Nə startup landing page, nə də dribbble effekt şousu.

**Üç qayda:**
1. Boşluq bahalıdır — onu cəsarətlə istifadə et.
2. Bir ekranda bir mesaj.
3. Dekorativ element yalnız informasiya daşıyırsa qalır (hairline = struktur, numeral = naviqasiya, mono label = kontekst).

---

## 2. Rəng

### Səthlər
```css
--surface-void:      #08090A;  /* səhifə fonu */
--surface-obsidian:  #0D0E10;  /* qalxmış bölmə */
--surface-graphite:  #121316;  /* kart */
--surface-slate:     #1A1C20;  /* hover / input */
```

### Xətlər
```css
--line-hairline: rgba(237, 233, 223, 0.10);  /* struktur xətləri */
--line-medium:   rgba(237, 233, 223, 0.18);  /* kart sərhədi */
--line-strong:   rgba(237, 233, 223, 0.32);  /* aktiv / fokus sərhədi */
```

### Mətn
```css
--text-primary:   #EDE9DF;  /* warm ivory */
--text-secondary: #A8A399;
--text-tertiary:  #837E76;  /* yalnız ≥14px meta mətn */
--text-inverse:   #08090A;  /* açıq fon üzərində */
```

### Aksentlər
```css
--accent-gold:    #D3AA69;  /* brend vurğusu, editorial emphasis */
--accent-signal:  #88DDD7;  /* interaktivlik, fokus, sistem statusu */
--accent-gold-dim:   rgba(211, 170, 105, 0.14);
--accent-signal-dim: rgba(136, 221, 215, 0.14);
```

**Aksent qaydası:** `gold` = insan/brend tərəfi (vurğulanan söz, layihə nömrəsi). `signal` = maşın/interaktiv tərəfi (link hover, focus ring, status nöqtəsi). **Bir komponentdə hər ikisi eyni anda işlədilmir.** Ekranda gold vurğusu 1-2 yerdən çox olmur.

### Kontrast (ölçülüb, WCAG 2.2)
| Mətn | `void` üzərində | `graphite` üzərində | Status |
|---|---|---|---|
| primary | 16.44:1 | 15.32:1 | AAA |
| secondary | 7.94:1 | 7.40:1 | AAA |
| tertiary | 4.95:1 | 4.61:1 | AA (yalnız meta) |
| gold | 9.23:1 | 8.60:1 | AAA |
| signal | 12.69:1 | 11.83:1 | AAA |

Yeni rəng əlavə edilirsə, kontrast yenidən ölçülməli və bu cədvələ yazılmalıdır.

---

## 3. Tipografiya

### Ailələr

Şrift ailəsi token-ları `next/font` dəyişənləri üzərində **kompozisiya edilir** — belə ki, next/font-un metrik-uyğunlaşdırılmış fallback-ı (`size-adjust`) itməsin:

```css
/* next/font bunları təyin edir (layout.tsx-də `variable` adı): */
/* --font-display-face, --font-body-face, --font-mono-face          */

--font-display: var(--font-display-face), Georgia, 'Times New Roman', serif;
--font-body:    var(--font-body-face), system-ui, -apple-system, sans-serif;
--font-mono:    var(--font-mono-face), ui-monospace, SFMono-Regular, monospace;
```

**Qayda:** next/font-un `variable` adı ilə token adı eyni OLMAMALIDIR. Eyni olduqda token faylı next/font-un dəyərini üstələyir və `"... Fallback"` metrik ailəsi kaskaddan düşür (CLS qorunması itir).

| Rol | Şrift | Yüklənmə |
|---|---|---|
| display | **Source Serif 4** | variable (`opsz` 8-60, `wght` 200-900), `style: ['normal','italic']` |
| body | **Manrope** | variable (`wght`) |
| mono | **IBM Plex Mono** | static `400`, `500` |

Subsets: hər üçündə `['latin', 'latin-ext', 'cyrillic']`. `latin-ext` Azərbaycan `ə ğ ı ö ü ç ş` hərfləri üçün, `cyrillic` rus dili üçün məcburidir. next/font hər subset üçün ayrıca `@font-face` + `unicode-range` yaradır — istifadəçi yalnız öz dilinin faylını yükləyir.

> **Niyə Source Serif 4:** Fraunces-də kiril əlifbası yoxdur (brauzerdə təsdiqlənib — RU başlıqlar Georgia-ya düşürdü). Üç dildə eyni display siması brend bütövlüyü üçün vacibdir.

**Optik ölçü:** `font-optical-sizing: auto` (brauzer defolt davranışı) istifadə olunur — `opsz` oxu font-size-a uyğun avtomatik tənzimlənir. Əl ilə `font-variation-settings` yazılmır; yazılarsa `font-optical-sizing`-i söndürür.

**Variable font qaydası:** variable şrift üçün `next/font`-a `weight` massivi **verilmir** — verildikdə static instance-lar yüklənir və `opsz`/`wght` oxları işləmir. Lazım olan çəki CSS-də `font-weight` ilə seçilir.

### Şkala (fluid, `clamp`)
```css
--type-display-xl: clamp(3.25rem, 8.5vw, 8rem);      /* line-height .9,  ls -.035em */
--type-display-l:  clamp(2.5rem, 5.5vw, 5rem);       /* line-height .95, ls -.03em  */
--type-display-m:  clamp(2rem, 3.6vw, 3.25rem);      /* line-height 1.05,ls -.02em  */
--type-heading:    clamp(1.375rem, 2vw, 1.75rem);    /* line-height 1.2, ls -.01em  */
--type-body-l:     clamp(1.0625rem, 1.15vw, 1.25rem);/* line-height 1.6             */
--type-body-m:     1rem;                             /* line-height 1.65            */
--type-body-s:     0.875rem;                         /* line-height 1.55            */
--type-label:      0.75rem;                          /* mono, uppercase, ls .16em   */
```

### Qaydalar
- Səhifədə **tək** `display-xl` (hero h1). Təkrarlanmır.
- Body mətn sətri 60-75 simvoldan uzun olmur (`max-width: 68ch`).
- Mono label həmişə `text-transform: uppercase`, `letter-spacing: 0.16em`, `--text-tertiary` və ya `--accent-signal`.
- Vurğulanan söz `<em>` ilə: `font-family: var(--font-display); font-style: italic; color: var(--accent-gold);`
- Heç vaxt `text-align: center` uzun paraqraf üçün. Mərkəzləmə yalnız qısa CTA blokunda.

---

## 4. Spacing və Grid

```css
--space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
--space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;
--space-7: 3rem;     --space-8: 4rem;     --space-9: 6rem;
--space-10: 8rem;    --space-11: 12rem;

--space-section: clamp(5rem, 11vw, 11rem);  /* bölmələr arası şaquli ritm */
--gutter:        clamp(1.25rem, 4vw, 3rem); /* səhifə kənarı */
--container-max: 1440px;
--content-max:   1180px;
--measure:       68ch;
```

**Grid:** 12 sütun, `gap: var(--gutter)`. Editorial asimmetriya məcburidir — heç bir əsas blok 12 sütunun hamısını mərkəzləşdirilmiş şəkildə tutmur.
Nümunə: hero copy `col 1-7`, media `col 8-12`. Case mətni `col 4-10`. Numeral sütunu `col 1-2` sticky.

Breakpoint-lər: `480` (large mobile), `768` (tablet), `1024` (desktop), `1440` (large desktop). Mobile-first yazılır.

---

## 5. Forma və Səth

```css
--radius-xs: 2px;   /* tag */
--radius-sm: 4px;   /* button */
--radius-md: 10px;  /* kart, media frame */
--radius-pill: 999px;

--border-hairline: 1px solid var(--line-hairline);

--shadow-lift: 0 24px 60px -30px rgba(0,0,0,0.9);
--shadow-media: 0 40px 90px -50px rgba(0,0,0,1);
```

Böyük radius yoxdur — premium hiss kəskin, nizamlı formalardan gəlir. Kölgə yalnız media və kartda, heç vaxt mətndə. Glassmorphism, neon glow, gradient border **qadağandır**.

---

## 6. Motion Token-ları

```css
--dur-instant: 120ms;
--dur-fast:    240ms;
--dur-base:    420ms;
--dur-slow:    720ms;
--dur-scene:   1200ms;

--ease-out:      cubic-bezier(0.16, 1, 0.30, 1);   /* standart çıxış */
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);
--ease-entrance: cubic-bezier(0.22, 1, 0.36, 1);   /* reveal */
```

- Hover keçidləri `--dur-fast` + `--ease-out`.
- Reveal: `opacity 0→1`, `translateY 24px→0`, `--dur-base`, stagger `80ms`.
- Scroll scrub səhnələri `--dur-scene` hissini verməlidir, amma faktiki müddət scroll-dan asılıdır.
- `prefers-reduced-motion: reduce` → yalnız `opacity` keçidi, `--dur-fast`, translate yoxdur, scrub və pin yoxdur.

---

## 7. Komponent Standartları

### Button
İki variant, üçüncüsü yoxdur.
- **Primary:** ivory fon, `--text-inverse` mətn, `--radius-sm`, padding `0.875rem 1.75rem`, hover-də `--accent-gold` fona keçid (`--dur-fast`).
- **Ghost:** şəffaf fon, `--border-hairline`, hover-də border `--line-strong` + mətn `--accent-signal`.
- Hər ikisində: `font-family: var(--font-body)`, `font-weight: 500`, `letter-spacing: 0.01em`. Ox işarəsi (`↗`) `aria-hidden`.
- Minimum toxunma sahəsi 44×44px.

### Card (project)
`--surface-graphite` fon, `--border-hairline`, `--radius-md`, daxili padding `--space-5`.
Struktur: cover media → mono index + status → title (`--type-heading`) → summary (1 sətir) → stack tag-ları.
Hover (yalnız pointer cihazda): border `--line-medium`, cover `scale(1.03)`, `--dur-fast`. Bütün kart tək linkdir (`<a>` başlığı sarır, kart `position: relative` + `::after` overlay).

### Tag
`--type-label`, mono, `--radius-xs`, `--border-hairline`, padding `0.25rem 0.6rem`, `--text-tertiary`. Aktiv halda `--accent-signal` mətn + `--accent-signal-dim` fon.

### Media frame
`--radius-md`, `overflow: hidden`, `--shadow-media`, `aspect-ratio` həmişə təyin olunur (CLS = 0). Yüklənənədək `--surface-graphite` placeholder.

### Rule (hairline)
1px, `--line-hairline`. Bölmələri ayırmaq üçün. Bölmə başlığının üstündə mono label ilə birlikdə istifadə olunur.

### Focus
```css
:where(a, button, [tabindex]):focus-visible {
  outline: 2px solid var(--accent-signal);
  outline-offset: 3px;
  border-radius: var(--radius-xs);
}
```
`outline: none` heç bir yerdə tək başına yazılmır.

---

## 8. Səhifə Ritmi

Hər bölmə eyni skeleti izləyir:

```
[mono label — bölmənin nə olduğu]
[hairline]
[böyük başlıq — bir fikir]
[opsional dəstək cümləsi, max 68ch]
[məzmun]
```

Bölmələr arası: `--space-section`. Bölmə daxilində başlıq → məzmun: `--space-7`.

---

## 9. Şəkil Direksiyası

- Bütün şəkillər eyni işıq dünyasında: qaranlıq fon, isti tək mənbəli işıq, qrafit səthlər.
- Ekran görüntüləri həmişə çərçivə daxilində (cihaz mockup və ya media frame), heç vaxt çılpaq PNG.
- Stok fotoqrafiya hissi verən şəkil işlədilmir.
- Hər şəkil üçün mənalı, locale-aware `alt` mətn.

---

## 10. Qadağan Olunanlar

- Gradient mətn, neon glow, glassmorphism
- Emoji (UI-də və copy-də)
- Dairəvi avatar üzərində rəngli halqa
- 3-dən çox aksent rəngi
- Auto-play video və səs
- Parallax 8%-dən çox yerdəyişmə
- Hover-a bağlı kritik məlumat
- "AI-powered", "cutting-edge", "next-level" tipli boş marketinq dili
