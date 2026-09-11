# PHASE 3 — FIX (review nəticəsi: FIX)

Kompozisiya, ritm və komponent quruluşu yaxşıdır. Selected work-un asimmetrik grid-i, proses bölməsi, final CTA və footer dizayn sisteminə uyğun görünür. Bloklanmış bölmələr düzgün gizlədilib, `TODO` mətn kimi heç yerdə görünmür, heading iyerarxiyası düzgündür, CLS sıfırdır.

İki bloklayıcı var. Hər ikisi işlək production server-də ölçülüb.

---

## B1. `<br/>` hero başlığında **mətn kimi** görünür — hər üç dildə

Saytın ən böyük yazısı hazırda belədir:

```
AZ: Fikri işləyən<br/>məhsula çevirirəm.
EN: I turn ideas into<br/>products that ship.
RU: Превращаю идею<br/>в работающий продукт.
```

**Ölçmə** (`/az`, production build):
```js
h1.innerHTML   // "Fikri işləyən&lt;br/&gt;<em>məhsula</em> çevirirəm."
h1.querySelectorAll('br').length   // 0
```
`&lt;br/&gt;` — yəni teq escape olunub və hərfi mətn kimi çap olunur. `<em>` işləyir, `<br/>` yox.

**Səbəb:** `next-intl`-in `t.rich` funksiyası **self-closing teqləri tanımır**. Mesaj faylında `<br/>` yazılıbsa, o adi mətn sayılır. next-intl sənədi bu hal üçün **cütlənmiş** forma tələb edir: `<br></br>`.

**Düzəliş:** hər üç `messages/*.json` faylında hero başlığındakı `<br/>` → `<br></br>`:
```json
"title": "Fikri işləyən<br></br><em>məhsula</em> çevirirəm."
```
Komponentdəki `t.rich('hero.title', { br: () => <br />, em: (c) => <em>{c}</em> })` çağırışı olduğu kimi qalır.

**Yoxlama:**
```js
document.querySelector('h1').querySelectorAll('br').length === 1   // hər üç locale-də
/<br|&lt;/.test(document.querySelector('h1').innerText) === false
```

> Qeyd: `docs/HOME_COPY_APPROVED.md` bu mətni `hero.titleLines` **massivi** kimi təyin etmişdi (Phase 1 message strukturunda da belədir). Sən onu tək `hero.title` sətrinə çevirmisən. Hesabatda "Deviations: yoxdur" yazılıb — halbuki bu, struktur dəyişikliyidir. Rich-text yanaşması qəbul edilir (daha çevikdir), amma belə dəyişikliklər hesabatda göstərilməlidir.

---

## B2. 320px enində 154px horizontal daşma

**Ölçmə** (`/az`, CSS viewport 320px-ə sabitlənmiş halda):
```
viewportWidth (clientWidth): 320
scrollWidth:                 474
daşma:                       154px
```

Daşan elementlər (soldan sağa ilk 5): `HEADER` → `Container` → `SiteHeader inner` → `SiteHeader right` → `MobileMenu menuButton`.

Header daxilindəki elementlərin faktiki mövqeyi 320px-də:
| Element | En | Sağ kənar |
|---|---|---|
| `RB` | 29px | 49px |
| `Ramin Bakhshalıyev` | 129px | 190px |
| `Menyu` düyməsi | 62px | **454px** ← ekrandan kənarda |

Yəni mobil ekranda başlıq mətni və şəkil sağ tərəfdən kəsilir, səhifə yana sürüşür.

**Ehtimal olunan səbəb:** header-də tam ad (`Ramin Bakhshalıyev`) kiçik ekranlarda da göstərilir və `right` bölməsi ilə birlikdə 320px-ə sığmır. `<768px`-də yalnız `RB` monoqramı qalmalıdır. Həmçinin `right` bölməsindəki status mətni və/və ya locale switcher-in mobil görünüşünü yoxla — birində `display: none` çatmır və ya `min-width` qalıb.

**Yoxlama (məcburi):**
```js
// CSS viewport 320px-ə sabitlənmiş halda:
document.documentElement.clientWidth        // 320 olmalıdır
document.documentElement.scrollWidth        // 320 olmalıdır
```

### Ölçmə metodu haqqında — vacib

Hesabatda bu yazılıb:
```
Viewport 320px | scrollWidth: 474px | innerWidth: 474px | overflow: false
```

Diqqət et: viewport 320px təyin edilib, amma `innerWidth` 474 çıxıb. Səbəb: `Emulation.setDeviceMetricsOverride` + `mobile: true` halında brauzer məzmuna sığmaq üçün layout viewport-u genişləndirir. Nəticədə `scrollWidth > innerWidth` müqayisəsi **həmişə false** verir — daşma olsa belə. 474 rəqəminin hər iki sütunda eyni olması məhz bunun əlamətidir.

Düzgün yoxlama: `document.documentElement.clientWidth`-in **faktiki 320 olduğunu əvvəlcə təsdiqlə**, sonra `scrollWidth` ilə müqayisə et. Əks halda test heç nə yoxlamır.

---

## Bloklamayan qeydlər

**N1.** 1440px-də hero başlığı sağdakı şəkil sütunu ilə toqquşur — `<br/>` mətn kimi render olunduğu üçün sətir gözləniləndən uzundur. B1 düzəldiləndən sonra **yenidən yoxla**; problem qalarsa `copyColumn` grid sahəsini və `display-xl` ölçüsünü tarazla.

**N2.** Proses bölməsi hazırda 2 addımla 2 sütunlu grid-dədir və yaxşı görünür. Üçüncü addım gələndə grid `repeat(3, 1fr)`-ə keçməlidir — indi dəyişiklik lazım deyil, sadəcə nəzərə al.

---

## Qəbul Meyarları (FIX üçün)

Hər bənd üçün faktiki çıxış yaz.

1. `npm run check` təmiz.
2. Hər üç locale-də: `h1.querySelectorAll('br').length === 1` və `h1.innerText`-də `<br` yoxdur.
3. CSS viewport 320px-də: `clientWidth === 320` **və** `scrollWidth === 320`.
4. Eyni yoxlama 375px və 768px-də.
5. 1440px-də hero başlığı şəkil sütununa girmir (`h1.getBoundingClientRect().right` media sütununun `left` dəyərindən kiçikdir).
6. `/az`, `/en`, `/ru` səhifələrində `TODO` mətn kimi görünmür.

## Hesabat
`AGENTS.md` formatında. Struktur dəyişikliyi edilibsə (mesaj açarı, komponent API-si) `Deviations` bölməsində göstər.
