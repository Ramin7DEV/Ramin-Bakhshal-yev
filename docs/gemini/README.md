# Gemini Prompt-ları — istifadə qaydası

Bu qovluqdakı hər fayl bir fazanın tam prompt-udur.

## Necə istifadə olunur

1. **Bir fazanı** kopyalayıb Gemini-yə ver. Eyni anda iki faza vermə.
2. Gemini işi bitirəndə `AGENTS.md`-dəki hesabat formatını istə.
3. Hesabatı və dəyişiklikləri Claude-a (lead) gətir — review olunur.
4. Review `PASS` verəndə commit olunur və növbəti fazaya keçilir.
5. Review `FIX` verirsə, düzəliş siyahısı yenidən Gemini-yə verilir.

## Hər prompt-un əvvəlinə bunu əlavə et

> Bu layihədə sən implementer-sən. `AGENTS.md`, `docs/BUILD_PLAN.md` və `docs/DESIGN_SYSTEM.md` fayllarını oxu və onlara tam riayət et. Yalnız bu fazanın scope-unda işlə. Plandan kənara çıxma; sual yaranarsa kod yazmaq əvəzinə hesabatın `Open questions` bölməsində soruş. Content uydurma — çatışmayan yerdə `TODO(content)` yaz.

## Fazalar

| # | Fayl | Ad | Ön şərt |
|---|---|---|---|
| 0 | `PHASE-0.md` | Foundation & tokens | — |
| 1 | `PHASE-1.md` | i18n & content layer | 0 qəbul |
| 2 | `PHASE-2.md` | Design system & chrome | 1 qəbul |
| 3 | `PHASE-3.md` | Home (statik) | 2 qəbul |
| 4 | `PHASE-4.md` | Work & case studies | 3 qəbul + content |
| 5 | `PHASE-5.md` | About & Contact | 4 qəbul + content |
| 6 | `PHASE-6.md` | Motion layer | 5 qəbul |
| 7 | `PHASE-7.md` | SEO & metadata | 6 qəbul |
| 8 | `PHASE-8.md` | Performance & a11y | 7 qəbul |
| 9 | `PHASE-9.md` | QA & deploy | 8 qəbul |
