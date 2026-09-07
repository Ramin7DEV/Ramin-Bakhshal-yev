# PHASE 5 — About & Contact

## Scope
```
src/app/[locale]/about/page.tsx    (tam)
src/app/[locale]/contact/page.tsx  (tam)
src/components/about/*.tsx         (YENİ: Portrait, Principles, AiWorkflow, Toolkit)
src/components/contact/*.tsx       (YENİ: ContactChannels)
src/messages/*.json
src/content/profile.ts             (genişləndirilir)
```

## About səhifəsi
1. **Hero** — eyebrow + `display-l` başlıq (kim olduğun, bir cümlə) + 2 cümlə.
2. **Portrait** — real foto və ya avatar (`TODO(content)` olarsa blok gizlədilir, placeholder göstərilmir).
3. **Hekayə** — 3-4 paraqraf, max 68ch. Ton: dürüst, iddiasız, konkret. Necə başladın, nəyə fokuslanırsan, niyə.
4. **Principles** — 3-4 iş prinsipi. Hər biri: qısa başlıq + 1-2 cümlə. Klişe yox, real qərar qaydası.
5. **AI workflow** — necə işlədiyin: hansı addımda AI, hansı addımda özün. Konkret alət adları. Bu bölmə About-un mərkəzidir.
6. **Toolkit** — kateqoriyalara bölünmüş `Tag` siyahısı (Language / Framework / AI / Design / Infra). Sadə, mono, şişirdilmiş "skill bar" yoxdur.
7. CTA → Contact.

## Contact səhifəsi
1. `display-l` başlıq + aydın çağırış: **kim yazmalıdır və nə üçün**. "Let's talk" tipli boş cümlə qadağandır.
2. Email — dominant, böyük, klik edilə bilən (`mailto:` + subject placeholder). Kopyalama düyməsi (`"use client"`, `navigator.clipboard`, uğur mesajı `role="status"` ilə, fallback: `mailto` linki onsuz da var).
3. GitHub, LinkedIn (varsa) — ghost button-lar.
4. Gözləntilər: cavab müddəti, vaxt zonası (`Baku, UTC+4`), hansı işlərə açıqsan / açıq deyilsən. Dürüstlük burada dəyər yaradır.
5. **Form yoxdur** (V1 qərarı).

## Qəbul Meyarları
1. `npm run check` təmiz.
2. Hər 2 səhifə 3 dildə tam.
3. Kopyalama düyməsi klaviatura ilə işləyir və nəticəni screen reader-ə elan edir; `clipboard` API mövcud deyilsə səhifə sınmır.
4. Heading iyerarxiyası düzgün, tək `h1`.
5. Heç bir boş bölmə render olunmur.
6. Mobil oxunaqlılıq: paraqraflar 68ch-i keçmir, sətir hündürlüyü rahatdır.

## Hesabat
`AGENTS.md` formatında.
