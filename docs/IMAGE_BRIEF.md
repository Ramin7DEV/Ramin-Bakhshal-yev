# IMAGE BRIEF — vizual materiallar

Bu sənəd saytın bütün şəkilləri üçün mənbədir. Məqsəd: hər şəkil eyni işıq dünyasından gəlsin — sayt bir sistem kimi hiss olunsun, şəkil kolleksiyası kimi yox.

---

## 0. Qızıl qayda: nə AI ilə, nə AI ilə YOX

| Şəkil | Mənbə | Səbəb |
|---|---|---|
| Hero atmosferi | **AI** ✓ | Atmosfer yaradır, heç nə iddia etmir |
| Bölmə fonları / doku | **AI** ✓ | Dekorativ |
| Layihə cover-ləri | **AI** ✓ (abstrakt natürmort) | Redaksiya obyekti kimi, ekran görüntüsü kimi yox |
| **Tətbiq ekran görüntüləri** | **REAL** — simulyatordan/cihazdan | Bu, işinin sübutudur. Uydurma ekran = uydurma iş |
| **Portret** | **REAL foto** | Founder üz görmək istəyir. AI avatar etibarı azaldır |
| Logo / monoqram | Kod (`RB`) | Şrift ilə yazılır, şəkil lazım deyil |
| OG şəkillər | Kod (`next/og`) | Phase 7-də avtomatik yaranır |

> Ekran görüntüsü AI ilə yaradılsa və founder tətbiqi App Store-da tapıb fərqi görsə — bütün saytın etibarı gedir. Bu risk heç bir vizual qazancına dəyməz.

---

## 1. Ümumi üslub bloku (hər prompt-un əvvəlinə əlavə et)

```
Editorial still-life photograph in a dark studio. Single warm key light
from the upper left, deep falloff into near-black. Background is charcoal
to true black (#08090A to #121316). Highlights are warm ivory (#EDE9DF).
Exactly one muted gold accent (#D3AA69) somewhere in the frame. Matte
graphite and paper surfaces, no gloss. Shallow depth of field, 50mm lens,
fine film grain, calm and precise. Museum catalogue aesthetic.
Photographic realism, high detail. No text, no logos, no watermarks,
no user interface elements with readable words.
```

**Negative prompt (hər dəfə):**
```
neon, teal and orange grading, lens flare, HDR glow, RGB lighting,
gaming aesthetic, cluttered desk, stock photo, smiling person,
text, letters, numbers, watermark, logo, oversaturated, plastic look,
fisheye, tilted horizon, extra fingers, distorted hands
```

---

## 2. Texniki tələblər

| Şəkil | Ölçü (piksel) | Nisbət | Fayl adı |
|---|---|---|---|
| Hero | 2400 × 1350 | 16:9 | `public/images/hero-studio.png` |
| Layihə cover ×3 | 1600 × 1200 | 4:3 | `public/images/project-<slug>.png` |
| Case atmosfer ×3 | 2400 × 1350 | 16:9 | `public/images/case-<slug>-atmosphere.png` |
| About portret | 1200 × 1600 | 3:4 | `public/images/portrait.jpg` |
| Contact fonu | 2400 × 1000 | 12:5 | `public/images/contact-field.png` |

Qaydalar:
- PNG və ya yüksək keyfiyyətli JPG olaraq yarat, **sıxma** — sıxılma Phase 8-də edilir.
- Hər şəkil qaranlıq fonlu olmalıdır ki, saytın fonuna qarışsın; ağ və ya açıq fonlu şəkil işlətmirik.
- Şəkildə heç bir oxunaqlı mətn olmamalıdır (AI mətni həmişə pozuq çıxır və ucuz görünür).
- Yaradılan şəkli `public/images/` içinə at, sonra faktiki ölçüsünü `src/content/projects/*.ts`-dəki `width`/`height` sahələrinə yaz.

---

## 3. Prompt-lar

### 3.1 Hero — "workstation 01"

Ana səhifənin ən böyük vizual elementidir. **Sağ tərəfdə boşluq lazımdır** — solda mətn oturacaq.

```
[ÜMUMİ ÜSLUB BLOKU]

Subject: a quiet workstation seen from a low three-quarter angle. A matte
black smartphone standing upright on a small brass stand, its screen dark
and reflective. Beside it a closed graphite notebook and a single thin
pencil aligned precisely. A shallow ceramic dish holding one small brass
object. The desk is dark oiled wood. A single warm lamp pool of light
falls from the upper left across the phone and notebook, everything else
sinks into darkness. The right third of the frame is almost empty dark
space. Composition is calm, deliberate, architectural.
```

### 3.2 Layihə cover-ləri (seriya — üçü də eyni dildə olmalıdır)

Üçü **eyni sessiyada** yaradılmalıdır ki, seriya kimi görünsün. Hər birində eyni işıq, eyni səth, fərqli obyekt.

**Mirrorly** (AI / mobile):
```
[ÜMUMİ ÜSLUB BLOKU]

Subject: a single matte black smartphone lying face up on a graphite
surface, its screen showing only a soft abstract gradient of dark teal
light with no interface elements. Above it floats a thin brass ring
casting a precise shadow. Reflection of the ring appears faintly on the
screen. Symmetrical, centered composition. Silence and focus.
```

**Azerbaijan Otur** (local platform):
```
[ÜMUMİ ÜSLUB BLOKU]

Subject: a folded paper map on a graphite surface, its creases catching
warm light. A small brass compass rests on it, needle visible. A matte
black smartphone lies at the edge of the frame, screen dark. The map's
printed detail is abstract and unreadable, no place names. Warm, calm,
navigational.
```

**Beauty App** (concept / UI system):
```
[ÜMUMİ ÜSLUB BLOKU]

Subject: a translucent oval glass panel standing upright on a graphite
surface, catching a warm rim of light along one edge. Behind it a soft
ivory paper sheet. A single small amber glass bottle sits to the side.
Minimal, editorial, quiet luxury. No cosmetics branding, no labels.
```

### 3.3 Case study atmosfer şəkilləri

Hər case səhifəsində bir tam enli atmosfer şəkli. Layihə cover-lərindən daha geniş və daha abstraktdır.

```
[ÜMUMİ ÜSLUB BLOKU]

Subject: an extreme close-up of a matte graphite surface with a single
hairline groove running across it, catching one thin line of warm gold
light. Dust particles visible in the light beam. Almost abstract, more
texture than object. Wide cinematic framing.
```

Variant üçün `groove` sözünü dəyişdir: `a shallow circular indentation`, `three parallel grooves`, `a soft fold in dark paper`.

### 3.4 Contact bölməsi fonu

```
[ÜMUMİ ÜSLUB BLOKU]

Subject: a wide horizontal field of dark textured paper, one edge lit by
a warm light source outside the frame, creating a slow gradient from
ivory-touched grey into pure black. No objects. Pure atmosphere and grain.
```

---

## 4. Portret — AI YOX, real foto

Bu, saytın ən vacib etibar elementidir. Telefonla da çəkmək olar, şərtlər sadədir:

- **İşıq:** pəncərənin yanında, üzün yan tərəfdən işıqlansın. Günəş birbaşa üzə düşməsin. Axşamüstü ideal.
- **Fon:** sadə, tünd divar. Səliqəsiz otaq olmasın.
- **Kadr:** bel-yuxarı və ya çiyin-yuxarı, şaquli (3:4).
- **Poza:** oturmuş və ya dayanmış, kameraya sakit baxış. Gülüş məcburi deyil — ciddi və rahat ifadə brendin tonuna daha uyğundur.
- **Geyim:** sadə, tək rəngli, qara/boz/tünd yaşıl. Naxışlı köynək yox.
- **Telefonla:** portret rejimi, arxa kamera, gözlərə fokus. Bir neçə kadr çək, sonra seçərik.

Post-emal: sayta qoyulanda rəngi bir az soyudub kontrastı artıracağıq ki, qalan şəkillərlə eyni dünyada olsun.

---

## 5. Tətbiq ekran görüntüləri — real, simulyatordan

Case study səhifələrinin əsas sübutu budur.

- iOS Simulator-da tətbiqi aç, `Cmd+S` ilə ekran görüntüsü götür (retina keyfiyyət).
- Hər layihə üçün 2-3 ekran: əsas axın, fərqləndirici funksiya, nəticə ekranı.
- Şəxsi məlumat (real ad, telefon, email) görünürsə əvvəlcədən dəyiş.
- Çılpaq PNG kimi qoymuruq — sayt onları qaranlıq cihaz çərçivəsi içində göstərəcək (`MediaFrame` komponenti bunun üçün hazırdır).

---

## 6. Yoxlama siyahısı

Şəkil hazır sayılır, əgər:

- [ ] Fon qaranlıqdır və saytın `--surface-void` rəngi ilə qarışır
- [ ] Yalnız bir isti işıq mənbəyi var
- [ ] Qızıl aksent kadrda bir yerdədir, ikidən çox deyil
- [ ] Heç bir oxunaqlı mətn və ya logo yoxdur
- [ ] Neon, parıltı, HDR effekti yoxdur
- [ ] Seriyanın digər şəkilləri ilə yan-yana qoyulanda eyni dünyadan görünür
- [ ] Ölçü cədvəldəki nisbətə uyğundur
