# DİZAYN TƏNQİDİ VƏ İSTİQAMƏT DƏYİŞİKLİYİ

Tarix: 2026-09-23
Səbəb: sahib (Ramin) hazırkı dizaynı bəyənmir — "çox sadə, junior işinə oxşayır".
Status: müzakirə üçün sənəd. Kod dəyişikliyi edilməyib.

---

## 1. Diaqnoz — nə üçün "sadə" görünür

Qiymətləndirmə production build üzərində, 1512px enində aparılıb.

### 1.1. Hər bölmə eyni kalıbdadır
Bütün səhifə bir ritmi təkrarlayır: `mono etiket → böyük başlıq → mətn → məzmun`, hamısı eyni konteyner eninin içində, hamısı sola düzülmüş. Heç bir element konteyner sərhədini keçmir, heç nə üst-üstə düşmür, heç nə tam enli deyil. Bu, "təmiz" deyil — **proqnozlaşdırıla bilən**dir. Template hissi buradan gəlir.

### 1.2. Düymələr ən güclü "junior" siqnalıdır
Ağ dolu pill + kənarlıqlı pill — bu, hər Tailwind şablonunda olan standart düymə cütüdür. Redaksiya dilində olan saytlarda düymə çox vaxt ümumiyyətlə düymə kimi görünmür: altdan cızılan xətt, dəqiq düzbucaqlı, və ya kiçik mono etiket + ox.

### 1.3. Dərinlik və doku yoxdur
Fon tam düz `#08090A`. Nə film dənəsi, nə vinyet, nə incə qradient, nə görünən grid xətləri, nə qatlaşma. Premium qaranlıq saytlar demək olar ki, həmişə görünməz bir doku qatı daşıyır — o olmayanda ekran "boş qara" kimi oxunur.

### 1.4. Tipografiyada gərginlik çatmır
Başlıqlar böyükdür, amma **nisbət** mühafizəkardır. Redaksiya hissi böyük/kiçik arasındakı kəskin fərqdən doğur: nəhəng display + çox kiçik mono. Hazırda aralıq ölçülər çoxdur, kəskinlik yoxdur. Həmçinin redaksiya detalları yoxdur: şaquli mətn, nəhəng "kölgə" rəqəmlər, şəkil üzərinə düşən başlıq, caption-lar.

### 1.5. Proses bölməsi yarımçıq görünür
İki addım iki sütunda oturur, altında böyük boşluq qalır. Bu, "geniş nəfəs" kimi yox, "tamamlanmamış" kimi oxunur. (Üçüncü addım content gözləyir — amma dizayn iki elementlə də bitmiş görünməlidir.)

### 1.6. Şəkillər generikdir
Hero şəkli — masa arxasında oturan adam. Bu, "AI-first engineer" demir, "hansısa developer" deyir. Layihə şəkilləri bir-birinə daha yaxındır, amma onlar da stok render hissi verir.

### 1.7. Hərəkət yoxdur
Phase 6 (motion) hələ qurulmayıb. Premium saytların təsirinin təxminən yarısı hərəkət xoreoqrafiyasındadır: scroll ilə açılan mətn, pin olunan səhnələr, şəkil maskaları, keçidlər. Hazırda sayt statik sənəd kimi oxunur.

### 1.8. Kartlar UI kartıdır, eksponat deyil
Yuvarlaq künc + kənarlıq + daxili padding = idarəetmə paneli kartı. "Rəqəmsal muzey" dilində kart çərçivə deyil: tam enli şəkil, üstündə və ya kənarında nömrə, altında serif başlıq, ayırıcı kimi yalnız saç qalınlığında xətt.

---

## 2. Vacib etiraf

Bu vəziyyətin bir hissəsi **planlaşdırılmışdı**: fazalara böldük və "wow" yaradan qatları (motion, doku, şəkillər) sona saxladıq. Yəni sayt hazırda qəsdən "skelet + dizayn sistemi" vəziyyətindədir.

Amma bu, tam müdafiə deyil. Kompozisiya özü də mühafizəkardır — hətta hərəkətsiz halda belə daha cəsarətli ola bilərdi. Bu, mənim (lead) qərarımın nəticəsidir: `docs/DESIGN_SYSTEM.md`-də "sakit, nizamlı, dekorativ element yoxdur" prinsipini qoydum və Gemini onu hərfi icra etdi. Nəticə: təhlükəsiz, amma yaddaqalmayan.

---

## 3. İki fərqli "premium" lane

Qarışdırılmaması vacibdir:

| | **A. Redaksiya premium** | **B. Eksperimental / award** |
|---|---|---|
| Nümunə hiss | yüksək səviyyəli jurnal, sənət kataloqu | WebGL, 3D, custom cursor, scroll-jacking |
| Güc mənbəyi | tipografiya, ritm, doku, ölçülü hərəkət | texniki effekt, interaktivlik |
| Risk | cəsarətsiz olsa darıxdırıcı görünür | performans, mobil, əlçatanlıq zərbə alır |
| Kimə yaraşır | məhsul mühəndisi, studiya | kreativ agentlik, 3D artist |
| SEO/performans | əla | çətin |

Master planda seçilən **A**-dır. Problem A-nın özündə deyil — problem A-nın **zəif icra olunmasındadır**. A cəsarətlə icra olunanda heç də sadə görünmür.

Əgər sən əslində **B** istəyirsənsə, bunu indi deməliyik — çünki bu, stack və büdcə qərarıdır (WebGL, ağır motion kitabxanaları, daha uzun iş).

---

## 4. Təklif olunan dəyişiklik — "Art Direction Pass"

Motion-dan **əvvəl** ayrıca bir faza. Konkret dəyişikliklər:

### 4.1. Doku və dərinlik qatı
- Bütün səhifəyə incə film dənəsi (SVG noise, ~3% opacity, `pointer-events: none`)
- Hero arxasında radial işıq yayılması (mərkəzdən yuxarı-soldan, çox zəif)
- Konteyner kənarlarında görünən şaquli saç xətləri (grid strukturunu göstərən)
- Bölmə keçidlərində incə vinyet

### 4.2. Kompozisiya sərhədlərinin qırılması
- Hero başlığı daha da böyük: `clamp(4rem, 12vw, 11rem)`, demək olar ki, tam enə qədər
- Hero şəkli sağ kənardan **kənara çıxsın** (konteyneri kəssin, ekranın kənarına qədər getsin)
- Bölmə nömrələri nəhəng "kölgə" rəqəm kimi arxa planda (`01`, `02`, `03` — 20rem, 4% opacity)
- Ən azı bir bölmə tam enli (full-bleed) olsun

### 4.3. Düymələrin yenidən dizaynı
Pill formasından imtina. Əvəzinə:
- Əsas CTA: dəqiq düzbucaqlı, ivory fon, kiçik radius (2px), mono uppercase mətn
- İkincil: mətn + altından hover-də soldan sağa cızılan xətt
- Hər ikisində ox işarəsi hover-də 4px sürüşsün

### 4.4. Layihə kartları → eksponatlar
- Çərçivə və yuvarlaq künclər silinir
- Şəkil tam enli, üstündə gradient wash
- Index nömrəsi şəklin küncünə düşür (mix-blend-mode)
- Başlıq şəklin altında, display serif, böyük
- Ayırıcı yalnız saç xətti

### 4.5. Proses bölməsinin yenidən qurulması
- Üç addım üfüqi ardıcıllıqla, aralarında progress xətti
- Hər addımda nəhəng nömrə
- İki addımla da tarazlı görünən layout (boş yer qalmasın)

### 4.6. Mikro-detallar
- Sol kənarda sabit mono "rail": cari bölmənin adı və nömrəsi
- Şəkillərdə kursor yaxınlaşanda çox zəif parallaks
- Bölmə etiketləri scroll zamanı sticky qalsın
- Link hover-lərində rəng yox, hərəkət dəyişsin

### 4.7. Şəkillərin əvəzlənməsi
`docs/IMAGE_BRIEF.md`-dəki natürmort prompt-ları ilə. Hero-da adam yox, obyekt olmalıdır.

### 4.8. Sonra Phase 6 — motion
Yuxarıdakılar hazır olandan sonra hərəkət qatı əlavə olunur. Motion boş kompozisiyanı xilas etmir; güclü kompozisiyanı isə ikiqat gücləndirir.

---

## 5. Ən vacib çatışmayan məlumat: REFERANSLAR

Bu, indiyə qədər buraxdığımız ən böyük boşluqdur. "Premium" subyektiv sözdür. Sənin başındakı obraz ilə mənim başımdakı obraz fərqlidir — ona görə hədəfə dəymirik.

**Lazımdır: 3-5 sayt linki**, sənin "professional frontend işi" saydığın. Hər biri üçün bir cümlə: tam olaraq nəyi xoşuna gəlir (tipografiya? hərəkət? rəng? struktur?).

Eyni dərəcədə faydalı: 1-2 sayt ki, **xoşuna gəlmir** — və niyə.

Referanslar olmadan növbəti versiya da təxmin olacaq.

---

## 6. GPT ilə müzakirə üçün sual dəsti

Bu sənədi (və ya aşağıdakı sualları) başqa modelə vermək üçün:

1. Bu diaqnozla razısan? Hansı bəndi əlavə edərdin?
2. "Redaksiya premium" (A) yoxsa "eksperimental" (B) lane — bir məhsul mühəndisinin portfoliosu üçün hansı daha effektivdir və niyə?
3. §4-dəki Art Direction siyahısında hansı 3 dəyişiklik ən böyük təsiri verəcək? Hansılar vaxt itkisidir?
4. Bir portfolio saytını "junior" göstərən ən tez-tez rast gəlinən 5 əlamət nədir?
5. Motion-dan əvvəl kompozisiyanı düzəltmək doğru sıralamadır, yoxsa əksi?
6. Bu istiqamət üçün hansı 5 real sayt ən yaxşı referansdır? (ad və link)
