# HOME COPY — TƏSDİQLƏNMİŞ MƏTNLƏR

Status: qismən hazır. Bu fayl Phase 3 üçün mətn mənbəyidir — Gemini buradan `src/messages/*.json`-a köçürür.

Təsdiq: hero variantı **A** seçilib (Ramin, 2026-09-09).
Gözləyir: proses addımı 03 (AI iş axını), about teaser, cavab müddəti, proof strip.

---

## 1. Hero

### Eyebrow — `hero.eyebrow`
| AZ | EN | RU |
|---|---|---|
| AI-first mühəndis | AI-first engineer | AI-first инженер |

### Başlıq — `hero.titleLines` (massiv, ikinci sətirdə vurğulanan söz `<em>` ilə)
| Dil | Sətir 1 | Sətir 2 | Vurğu |
|---|---|---|---|
| AZ | `Fikri işləyən` | `məhsula çevirirəm.` | `məhsula` |
| EN | `I turn ideas into` | `products that ship.` | `ship` |
| RU | `Превращаю идею` | `в работающий продукт.` | `работающий` |

### Dəstək paraqrafı — `hero.description`

**AZ:**
> iOS və veb üçün məhsullar qururam — ideyadan buraxılışa qədər. AI iş prosesimin real hissəsidir: sürəti dəyişir, keyfiyyət standartı yox.

**EN:**
> I build products for iOS and the web, from the first sketch to release. AI is a working part of my process — it changes how fast I get there, not what I ship.

**RU:**
> Создаю продукты для iOS и веба — от идеи до релиза. ИИ — рабочая часть процесса: он меняет скорость, а не планку качества.

### CTA-lar
| Açar | AZ | EN | RU |
|---|---|---|---|
| `hero.ctaPrimary` | İşlərimə bax | View work | Смотреть работы |
| `hero.ctaSecondary` | Əlaqə saxla | Get in touch | Связаться |

### Meta sətri
`Bakı, Azərbaycan` · `nav.status` (mövcud dəyər saxlanılır, launch-dan əvvəl təsdiqlənəcək)

---

## 2. Proses

Bölmə başlığı — `process.title`:
| AZ | EN | RU |
|---|---|---|
| Necə işləyirəm | How I work | Как я работаю |

### 01 · Signal
**Başlıq:** `Əvvəlcə problem` / `Problem first` / `Сначала задача`

**AZ:** Hər iş sualla başlayır: istifadəçi burada hansı qərarı verməlidir? Cavab aydın olmayana qədər heç nə qurulmur.

**EN:** Every project starts with a question: what decision is the user making here? Nothing gets built until that answer is clear.

**RU:** Каждый проект начинается с вопроса: какое решение здесь принимает пользователь? Пока нет ответа, ничего не строится.

### 02 · System
**Başlıq:** `Sonra sistem` / `Then the system` / `Затем система`

**AZ:** Ekranları tək-tək deyil, sistem kimi qururam — tipografiya, aralıq və hərəkət eyni qaydalara tabe olur. Bu, sonradan əlavə edilən hər funksiyanı ucuzlaşdırır.

**EN:** Screens are built as a system, not one at a time — type, spacing and motion follow the same rules. Every feature added later costs less because of it.

**RU:** Экраны собираются как система, а не поодиночке — типографика, отступы и движение подчиняются одним правилам. Каждая следующая функция обходится дешевле.

### 03 · Ship
**STATUS: `TODO(content)` — Ramin cavab verir.**

Bu addım hazır olmayana qədər **render olunmur**. Bölmə iki addımla göstərilir. Boş və ya ümumi mətn yazılmır.

---

## 3. Final CTA

**Başlıq — `contact.title`:**
| AZ | EN | RU |
|---|---|---|
| Qurmağa dəyər bir `məhsulun` var? | Have a product worth `building`? | Есть продукт, который стоит `создать`? |

*(vurğulanan söz `<em>` ilə)*

**Alt mətn — `contact.intro`:**

**AZ:** Yeni layihələr, əməkdaşlıq və texniki məsləhət üçün yaz.
**EN:** Write for new projects, collaboration or a technical second opinion.
**RU:** Пишите по новым проектам, сотрудничеству или за техническим мнением.

> Cavab müddəti cümləsi (`contact.responseTime`) hələ `TODO(content)` — Ramin cavab verəndə əlavə olunur.

---

## 4. Hələ hazır olmayan bloklar

Bunlar Phase 3-də **render olunmur** (boş blok göstərilmir):

| Blok | Nə gözləyir |
|---|---|
| Proof strip | Real App Store / GitHub linkləri və dəqiq stack (`QUESTIONS.md` A6) |
| Process 03 | AI iş axını (`QUESTIONS.md` A3) |
| About teaser | Bir cümləlik təqdimat (`QUESTIONS.md` A4) |
| Selected work — kart mətnləri | Layihə xülasələri (`QUESTIONS.md` B7) — kartlar ad, index və cover ilə göstərilir |
