# PHASE 9 — QA & Production Deploy

## Kontekst
Son faza. Kod dəyişikliyi minimumdur — bu faza yoxlama, sənədləşdirmə və yayımdır.

## 1. QA matrisi
Hər xanaya baxılır və nəticə hesabatda qeyd olunur.

| | Chrome desktop | Safari desktop | iOS Safari | Android Chrome |
|---|---|---|---|---|
| Home | | | | |
| Work + filter | | | | |
| Case study | | | | |
| About | | | | |
| Contact + copy | | | | |
| Mobil menyu | | | | |
| Locale switcher | | | | |

Ayrıca yoxlanılır:
- 320px, 375px, 768px, 1024px, 1440px, 1920px
- Reduced motion aktiv
- Klaviatura-only gəzinti
- Yavaş 3G-də ilk yüklənmə (mətn şəkildən əvvəl görünür?)
- Dark mode məcburi olduğu üçün sistem light theme-də problem yoxdur

## 2. Content son yoxlaması
- Hər 3 dildə orfoqrafiya və qrammatika.
- Heç bir `TODO(content)`, `Lorem`, placeholder mətn qalmayıb.
- Bütün xarici linklər açılır və doğru yerə aparır (App Store, GitHub, LinkedIn, video).
- Email ünvanı doğrudur.
- Heç bir uydurma metrik yoxdur.

## 3. Deploy (Vercel)
- Vercel-də layihə yaradılır, GitHub repo bağlanır.
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://raminbakhshaliyev.com`.
- Production branch: `main`.
- Domain: `raminbakhshaliyev.com` + `www` → apex redirect.
  **Qeyd:** domen əvvəllər GitHub Pages-ə yönləndirilmişdi (`CNAME` faylı). DNS Vercel-ə keçirilir: apex üçün A record `76.76.21.21` (və ya Vercel-in verdiyi dəyər), `www` üçün CNAME `cname.vercel-dns.com`. Köhnə GitHub Pages konfiqurasiyası söndürülür.
- HTTPS və avtomatik sertifikat təsdiqlənir.
- Deploy sonrası: `/`, `/az`, `/en`, `/ru`, `/sitemap.xml`, `/robots.txt`, bir OG şəkil URL-i yoxlanılır.

## 4. Sənədləşdirmə
- `README.md` yenidən yazılır: layihə təsviri, stack, quraşdırma, script-lər, qovluq strukturu, content necə əlavə olunur, deploy prosesi.
- `docs/BUILD_PLAN.md`-də V2 backlog bölməsi əlavə olunur (AI bot, Lab, blog, light theme).

## 5. Launch sonrası
- Google Search Console-a sayt və sitemap əlavə olunur.
- Vercel Analytics (pulsuz tier) aktivləşdirilir — üçüncü tərəf skript əlavə edilmir.

## Qəbul Meyarları
1. QA matrisində hər xana keçib.
2. Production URL 3 dildə işləyir.
3. `raminbakhshaliyev.com` doğru saytı göstərir, HTTPS işləyir, `www` redirect olunur.
4. Sitemap və robots production-da doğrudur.
5. Sosial paylaşımda (Twitter/X, LinkedIn, Telegram, WhatsApp) OG kartı düzgün görünür.
6. `docs/BUILD_PLAN.md` §12 Definition of Done siyahısındakı 10 bəndin hamısı `✓`.

## Hesabat
`AGENTS.md` formatında + doldurulmuş QA matrisi + production URL-lər.
