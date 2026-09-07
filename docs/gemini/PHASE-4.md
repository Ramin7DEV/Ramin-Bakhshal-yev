# PHASE 4 — Work Gallery & Case Studies

## Kontekst
Home hazırdır. İndi saytın **sübut qatını** qururuq. Founder Home-da maraqlanır, burada qərar verir. Case study şablonu üç layihə üçün eynidir — ardıcıllıq keyfiyyət hissi yaradır.

## Ön şərt
`docs/CONTENT_INVENTORY.md`-də layihə məlumatları doldurulub. Doldurulmayıbsa, struktur qurulur və mətn yerinə `TODO(content)` qalır — amma bu faza yalnız content tam olanda `PASS` ala bilər.

## Scope
```
src/components/work/WorkGrid.tsx      (YENİ)
src/components/work/WorkFilter.tsx    (YENİ, "use client")
src/components/case/CaseHero.tsx      (YENİ)
src/components/case/CaseChapter.tsx   (YENİ)
src/components/case/CaseFacts.tsx     (YENİ)
src/components/case/CaseMedia.tsx     (YENİ)
src/components/case/CaseLinks.tsx     (YENİ)
src/components/case/NextProject.tsx   (YENİ)
src/app/[locale]/work/page.tsx        (tam)
src/app/[locale]/work/[slug]/page.tsx (tam)
src/content/projects/*.ts             (content doldurulur)
src/messages/*.json                   (yeni açarlar)
```

## Tapşırıqlar

### 1. Work gallery
- Səhifə başlığı: eyebrow + `display-l` + 1 cümlə intro.
- `WorkFilter`: `All / AI / Mobile / Product design`. Vəziyyət URL query-də (`?filter=ai`) saxlanılır — paylaşıla bilən və geri düyməsi ilə uyğun olsun. `useSearchParams` + `router.replace` (`scroll: false`).
- Filter düymələri `role="group"` daxilində, `aria-pressed` ilə. Nəticə sayı screen reader üçün `role="status"` ilə elan olunur.
- `WorkGrid`: 2 sütun (≥1024px), 1 sütun mobil. Kartlar `WorkCard` (Phase 3-dən) — dəyişdirmə, lazım olsa `variant` prop əlavə et.
- Boş nəticə halı üçün mətn (`work.empty`).

### 2. Case study şablonu
Sıra `docs/BUILD_PLAN.md` §6.3-ə uyğun:

1. **CaseHero** — mono index (`01`), `display-l` title, statement (`body-l`, max 68ch), altında `CaseFacts` sətri: Year · Role · Stack · Status. Sonra tam enli cover (`MediaFrame`, `priority`).
2. **CaseChapter** ×4 — `problem`, `role`, `ai-workflow`, `system`. Hər biri: sol sütunda sticky mono eyebrow + nömrə (`col 1-3`), sağda mətn (`col 4-10`, max 68ch). Sticky yalnız ≥1024px; CSS `position: sticky`, JS yoxdur.
3. **ai-workflow bölməsi xüsusidir** — vizual olaraq fərqlənməlidir (`--surface-obsidian` fon və ya sol tərəfdə gold hairline). Bu, saytın əsas fərqləndirici məzmunudur.
4. **CaseMedia** — 1-3 şəkil, hər birində caption (mono, `text-tertiary`). Video varsa: poster + klik ilə yüklənən `<video controls>`, **autoplay yoxdur**, `preload="none"`.
5. **Outcome** — real nəticə siyahısı. Ölçülə bilən nəticə yoxdursa keyfiyyət təsviri; **rəqəm uydurulmur**.
6. **CaseLinks** — App Store / GitHub / video. Xarici linklər `target="_blank" rel="noreferrer"`, `aria-label`-də "(opens in a new tab)" mətni messages-dən.
7. **NextProject** — növbəti layihəyə keçid (sonuncuda birinciyə qayıdır), tam enli, cover preview ilə.

### 3. Data
- `generateStaticParams` — 3 slug × 3 locale.
- Naməlum slug → `notFound()`.
- Content `src/content/projects/*.ts`-dən; komponentdə heç bir layihə mətni hardcode edilmir.

## Qadağalar
- Animasiya, GSAP, scroll effekt — yoxdur (Phase 6).
- `WorkCard`-ı sıfırdan yenidən yazma.
- Uydurma metrik, uydurma link, mövcud olmayan App Store URL-i.

## Qəbul Meyarları
1. `npm run check` təmiz.
2. `/az/work`, `/en/work`, `/ru/work` və 9 case səhifəsi build olunur və açılır.
3. Filter: URL dəyişir, geri düyməsi işləyir, səhifə yuxarı atmır, screen reader nəticəni elan edir.
4. Üç case səhifəsi **eyni skeleti** izləyir — bölmə sırası və vizual ritm identikdir.
5. Hər case-də `ai-workflow` bölməsi konkret məlumat verir (alət adı, addım, nəticə), ümumi cümlə deyil.
6. Bütün xarici linklər yeni tabda açılır və `rel="noreferrer"` daşıyır.
7. Video autoplay etmir, `preload="none"`.
8. Mobil (375px) case səhifəsində sticky sütun söndürülüb, mətn rahat oxunur.

## Hesabat
`AGENTS.md` formatında + hər layihə üçün çatışmayan content siyahısı.
