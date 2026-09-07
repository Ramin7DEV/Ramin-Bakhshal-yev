# CONTENT INVENTORY — doldurulmalı məlumatlar

Bu fayl **Raminin** doldurduğu sənəddir. Gemini buradan oxuyur, özündən heç nə uydurmur.
Boş qalan sahə → kodda `TODO(content)` → həmin blok saytda **göstərilmir**.

Status işarələri: `[ ]` boş · `[~]` qismən · `[x]` hazır

---

## 1. Profil (Phase 1-də lazımdır)

| Sahə | Dəyər | Status |
|---|---|---|
| Tam ad | Ramin Bakhshalıyev | `[x]` |
| Email | raminbakhshaliyev@gmail.com | `[x]` |
| GitHub | https://github.com/Ramin7DEV | `[x]` |
| LinkedIn | | `[ ]` |
| X / Twitter (varsa) | | `[ ]` |
| Yer | Bakı, Azərbaycan (UTC+4) | `[x]` |
| Rol (bir sətir) | | `[ ]` |
| Positioning cümləsi (AZ) | | `[ ]` |
| Positioning cümləsi (EN) | | `[ ]` |
| Positioning cümləsi (RU) | | `[ ]` |
| Hazırda işə açıqsan? | | `[ ]` |
| Cavab müddəti gözləntisi | | `[ ]` |
| Portret foto / avatar | | `[ ]` |

---

## 2. Layihələr

### 2.1 Mirrorly `[ ]`
| Sahə | Dəyər |
|---|---|
| Status (live / in-development / concept) | |
| İl | |
| App Store linki | |
| GitHub linki (varsa, public) | |
| Demo video linki | |
| Bir cümlə (kart üçün) | |
| 2-3 cümlə (hero üçün) | |
| Sənin rolun (2-4 bənd) | |
| Stack (dəqiq siyahı) | |
| **Problem:** hansı problemi həll edir (2 paraqraf) | |
| **AI workflow:** hansı addımda hansı AI aləti, konkret nə üçün, nə qazandırdı (2-3 paraqraf) | |
| **System:** əsas texniki/dizayn qərarları (2 paraqraf) | |
| Nəticə (real, ölçülə bilən və ya keyfiyyət təsviri) | |
| Ekran görüntüləri (2-3 ədəd, yüksək keyfiyyət) | |

### 2.2 Azerbaijan Otur `[ ]`
*(eyni cədvəl)*

### 2.3 Beauty App `[ ]`
*(eyni cədvəl)*

> **Vacib:** `AI workflow` bölməsi bütün saytın ən dəyərli hissəsidir. "AI istifadə etdim" kifayət deyil. Konkret olsun: *hansı addım → hansı alət → nə qazandın*. Məsələn: "SwiftUI komponent variantlarını Claude ilə 3 versiyada generasiya etdim, hər birini simulyatorda yoxladım, seçilmiş versiyanı əl ilə refactor etdim — bu, UI iterasiyasını 2 gündən 4 saata endirdi."

---

## 3. Home səhifəsi copy (Phase 3)

| Sahə | AZ | EN | RU |
|---|---|---|---|
| Hero eyebrow | | | |
| Hero başlıq (2-3 sətir, vurğulanan söz işarələnsin) | | | |
| Hero paraqraf (2 cümlə) | | | |
| Proof strip elementləri (yalnız real olanlar) | | | |
| Process addım 1 — `Signal` (başlıq + 2 cümlə) | | | |
| Process addım 2 — `System` | | | |
| Process addım 3 — `Ship` | | | |
| About teaser (2 cümlə) | | | |
| Final CTA sualı | | | |

> EN və RU sözbəsöz tərcümə olmamalıdır. Hər dil öz təbii ritmində yazılır.

---

## 4. About səhifəsi (Phase 5)

| Sahə | Status |
|---|---|
| Hekayə (3-4 paraqraf, AZ/EN/RU) | `[ ]` |
| İş prinsipləri (3-4 ədəd, başlıq + izah) | `[ ]` |
| AI workflow təsviri (necə işləyirsən) | `[ ]` |
| Toolkit — Language / Framework / AI / Design / Infra | `[ ]` |
| Portret foto | `[ ]` |

---

## 5. Bloklayıcı asılılıqlar

| Faza | Bloklanır, əgər yoxdursa |
|---|---|
| Phase 3 | Home copy (§3), positioning cümlələri |
| Phase 4 | Layihə məlumatları (§2) — **ən çox vaxt aparan hissə** |
| Phase 5 | About məzmunu (§4), portret |
| Phase 9 | Bütün linklərin təsdiqi |

**Tövsiyə:** Phase 0-2 texnikidir və content olmadan gedir. Həmin müddətdə §2 və §3 doldurulmalıdır — layihə mətnləri ən çox vaxt aparan işdir və bütün qalan işi bloklayır.
