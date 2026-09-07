# REVIEW PROTOCOL — Lead (Claude) üçün

Hər faza təhvil veriləndə bu protokol icra olunur. Nəticə iki formadan biridir: **PASS** və ya **FIX** (nömrələnmiş düzəliş siyahısı ilə).

---

## 0. Avtomatik yoxlamalar (hər fazada)

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Üçü də təmiz olmadan review başlamır. Əlavə:

```bash
# Hardcode edilmiş dizayn dəyərləri (tokens.css xaric)
grep -rnE '#[0-9a-fA-F]{6}|[0-9]+px|[0-9]+ms' src --include='*.tsx' --include='*.ts' | grep -v 'tokens.css'

# Komponentlərdə literal UI mətni
grep -rnE '>[A-ZА-ЯƏÖÜÇŞĞİ][a-zа-яəöüçşğı ]{3,}<' src/components src/app --include='*.tsx'

# Yasaq nümunələr
grep -rn 'any\|@ts-ignore\|@ts-expect-error\|console\.log' src --include='*.ts' --include='*.tsx'

# Client komponent sayı və yeri
grep -rln 'use client' src

# Message açar ağaclarının eyniliyi
node -e "const a=require('./src/messages/az.json'),e=require('./src/messages/en.json'),r=require('./src/messages/ru.json');
const k=o=>Object.entries(o).flatMap(([x,v])=>v&&typeof v==='object'?k(v).map(s=>x+'.'+s):[x]).sort();
const A=k(a),E=k(e),R=k(r);
console.log('az',A.length,'en',E.length,'ru',R.length);
console.log('en-də yox:',A.filter(x=>!E.includes(x)));
console.log('ru-da yox:',A.filter(x=>!R.includes(x)));"
```

---

## 1. Hər fazada yoxlanılan universal meyarlar

| # | Meyar |
|---|---|
| 1 | Scope pozulmayıb — yalnız icazə verilən fayllara toxunulub |
| 2 | Yeni dependency yoxdur (və ya soruşulub və təsdiqlənib) |
| 3 | `any`, `@ts-ignore`, `console.log` yoxdur |
| 4 | Hardcode dizayn dəyəri yoxdur |
| 5 | Komponentdə literal UI mətni yoxdur |
| 6 | `"use client"` yalnız zəruri yerdə və leaf səviyyədə |
| 7 | Semantik HTML + heading iyerarxiyası düzgün |
| 8 | Fokus vəziyyəti görünür, klaviatura ilə hər şey əlçatandır |
| 9 | 320px-də horizontal scroll yoxdur |
| 10 | Uydurma content yoxdur; çatışmayanlar `TODO(content)` kimi bildirilib |

---

## 2. Faza-spesifik review fokusu

**Phase 0** — Token tamlığı (`DESIGN_SYSTEM.md` ilə sətir-sətir tutuşdurma), font subset-lərində `cyrillic` var, strict flag-lar aktiv.

**Phase 1** — Locale fallback davranışı (`/`, naməlum dil, cookie), `generateStaticParams` bütün kombinasiyaları verir, content tipləri `satisfies` ilə bağlıdır, 3 message faylı eyni ağac.

**Phase 2** — Primitivlərin API-si sadə və ardıcıldır; `Heading` semantik səviyyəni vizual ölçüdən ayırır; mobil menyu focus idarəsi; locale switcher eyni səhifədə qalır; `NextIntlClientProvider`-ə ötürülən messages daraldılıb.

**Phase 3** — Vizual iyerarxiya (ekranda tək dominant element), copy tonu (boş marketinq dili yoxdur), hero LCP elementi düzgün optimallaşdırılıb, boş badge yoxdur.

**Phase 4** — Üç case eyni skeleti izləyir; `ai-workflow` bölməsi konkretdir; filter URL ilə sinxrondur və geri düyməsi işləyir; xarici linklər `rel="noreferrer"`.

**Phase 5** — Ton dürüstdür, klişe yoxdur; kopyalama düyməsi fallback ilə; boş bölmə render olunmur.

**Phase 6** — JS söndürüləndə kontent görünür; `ScrollTrigger.getAll()` route keçidində artmır; reduced-motion tam işləyir; yalnız `transform`/`opacity` animasiya olunur; hero animasiyası LCP-ni gecikdirmir.

**Phase 7** — hreflang qarşılıqlıdır; canonical doğrudur; JSON-LD validdir; OG şəkil kiçik ölçüdə oxunur.

**Phase 8** — Lighthouse rəqəmləri iddia deyil, ekran görüntüsü/çıxışla təsdiqlənib; bundle ölçüsü büdcədədir; funksional dəyişiklik edilməyib.

**Phase 9** — QA matrisi tam doldurulub; heç bir `TODO` qalmayıb; production URL-lər real yoxlanılıb.

---

## 3. Review çıxış formatı

```
## Phase N Review — PASS | FIX

Avtomatik yoxlamalar: lint ✓ / tsc ✓ / build ✓
Scope: təmiz | pozulub (<fayllar>)

### Bloklayıcı (düzəldilmədən keçmir)
1. <fayl:sətir> — <problem> — <gözlənilən>

### Bloklamayan (növbəti fazada və ya sonra)
1. ...

### Yaxşı olan
- ...

Qərar: <PASS və commit mesajı> | <FIX və yenidən təhvil>
```

---

## 4. Qırmızı bayraqlar (dərhal FIX)

- Faza scope-undan kənar fayl dəyişikliyi
- Soruşulmadan quraşdırılmış dependency
- Uydurma metrik, uydurma link, mövcud olmayan App Store URL-i
- `outline: none` fokus əvəzləyicisi olmadan
- Hardcode edilmiş rəng və ya spacing
- Komponent daxilində tərcümə olunmamış mətn
- `dangerouslySetInnerHTML` — JSON-LD-dən başqa yerdə
- Client komponentə çevrilmiş böyük səhifə ağacı
