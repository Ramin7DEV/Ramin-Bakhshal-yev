# Scroll-Driven Portfolio Transition Architecture

Tarix: 2026-07-29  
Layihə: Ramin Bakhshalıyev portfolio  
Status: Araşdırma və implementasiya planı  
Kod dəyişikliyi: Edilməyib

## Executive Summary

Mövcud dizaynın əsas problemi vizual üslub deyil, hərəkət arxitekturasıdır. Giriş ekranı ayrıca bir overlay kimi yalnız düymə ilə bağlanır, əsas səhifədə isə `sticky` bloklar olsa da scroll progress konkret animasiya timeline-na bağlanmayıb. Nəticədə istifadəçi yaradıcı bir təcrübə deyil, uzun bir səhifədə ardıcıl bloklar görür.

Tövsiyə edilən həll:

1. Giriş ekranını klik, wheel, trackpad swipe, touch swipe və klaviatura ilə idarə olunan interaktiv `IntroGate` səhnəsinə çevirmək.
2. Swipe zamanı əsas səhifəni ekranın mərkəzindən böyüyən dairəvi portal vasitəsilə real vaxtda göstərmək.
3. Əsas səhifədə native scroll-u saxlamaq, lakin bölmələri `GSAP ScrollTrigger` ilə pin edilmiş, scrub olunan səhnələrə çevirmək.
4. Bütün keçidlərdə təsadüfi fərqli effektlər əvəzinə vahid vizual dil istifadə etmək: portal, shared image, editorial typography və dərinlik.
5. Desktop və mobil üçün ayrı motion choreography qurmaq; mobil versiyada qısa və yüngül keçidlərdən istifadə etmək.
6. `prefers-reduced-motion` aktiv olduqda animasiyaları sadə fade və ani keçidlə əvəz etmək.

Əsas texniki seçim: `gsap`, `ScrollTrigger`, `Observer` və `@gsap/react`. İlk mərhələdə Lenis əlavə edilməməlidir. Native scroll ilə təcrübə qurulduqdan və real cihazlarda ölçüldükdən sonra Lenis yalnız əlavə yumşaqlıq həqiqətən lazım olarsa ikinci mərhələdə qiymətləndirilməlidir.

Confidence: High

## Mövcud Implementasiyanın Diaqnozu

Mövcud `src/app/page.tsx` və `src/app/globals.css` strukturu aşağıdakı məhdudiyyətlərə malikdir:

- `introDismissed` yalnız boolean state-dir.
- `dismissIntro()` giriş ekranını yalnız düymə klikindən sonra çıxarır.
- Intro üçün gesture progress, threshold, velocity və reverse davranışı yoxdur.
- Case bölmələri uzun `min-height` və `position: sticky` istifadə edir, amma scroll progress transform, opacity, mask və ya timeline-a bağlı deyil.
- Layihələr ayrı bloklar kimi görünür; bir layihədən digərinə vizual davamlılıq yoxdur.
- Hazırda GSAP, Motion və ya Lenis dependency-si yoxdur.

Bu səbəbdən sadəcə daha çox CSS transition əlavə etmək problemi həll etməyəcək. Səhifəyə scene controller arxitekturası lazımdır.

Confidence: High

## Araşdırılan Texniki Yanaşmalar

| Yanaşma | Üstünlük | Risk | Qərar |
| --- | --- | --- | --- |
| Full-page mandatory scroll snap | Güclü slayd hissi, sadə bölmə keçidi | Kontenti kilidləyir, müxtəlif hündürlüklərdə narahatdır, browser animasiya fizikasını özü seçir | Rədd edildi |
| Pure CSS scroll-driven animation | Az JavaScript, scroll timeline brauzerdə işləyir | Çoxelementli timeline, pinning və React lifecycle idarəsi daha məhduddur | Progressive enhancement |
| Native scroll + GSAP ScrollTrigger | Native davranış qalır, `pin`, `scrub`, `snap`, responsive timeline və velocity nəzarəti verir | Düzgün cleanup və scene discipline tələb edir | Tövsiyə edilir |
| Lenis + GSAP | Daha yumşaq scroll, WebGL və parallax sinxronizasiyası rahatdır | Safari, iframe, nested scroll və iOS touch edge-case-ləri; əlavə komplekslik | İkinci mərhələ, opsional |
| View Transition API | DOM state və route keçidlərində shared-element animasiyasını asanlaşdırır | Scroll daxilində davamlı timeline üçün əsas mexanizm deyil; köhnə browser fallback lazımdır | Route/project detail üçün sonrakı mərhələ |

GSAP `ScrollTrigger` native scroll-u hijack etmədən animasiyanı scrollbar-a bağlamaq, elementləri pin etmək və timeline progressini `scrub` etmək üçün nəzərdə tutulub. `Observer` isə wheel, touch, scroll və pointer girişlərini vahid gesture qatında birləşdirir, tolerance və velocity verir.

Mənbələr:

- [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP Observer documentation](https://gsap.com/docs/v3/Plugins/Observer/)
- [MDN CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [MDN scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type)
- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

Confidence: High

## Tövsiyə Edilən Motion Konsepti

Konsept adı: `The Living Aperture`

Saytın hazırkı dairəvi/radial intro motivi əsas motion sisteminə çevrilir. Mərkəzi aperture yalnız giriş effekti olmur; layihə şəkillərinin açılması, bölmə fonlarının dəyişməsi və final CTA üçün təkrarlanan vizual imza rolunu oynayır.

Bu yanaşmanın üstünlüyü:

- Saytın hər hissəsi fərqli effekt demosuna çevrilmir.
- İstifadəçi hər keçiddə eyni vizual qrammatikanı tanıyır.
- Portfolio daha çox rejissorluğu olan rəqəmsal təcrübə kimi görünür.
- Mövcud qaranlıq editorial dizayn tamamilə atılmadan daha canlı olur.

## Səhnə 0: Gesture-Driven Intro

### Davranış

- `Enter the atelier` düyməsi qalır.
- Mouse wheel aşağı, trackpad swipe, touch swipe yuxarı, `ArrowDown`, `PageDown`, `Space` və `Enter` eyni `requestEnter()` əməliyyatına bağlanır.
- Swipe başlayan kimi intro dərhal yox olmur.
- Gesture məsafəsi `0..1` progress-ə çevrilir.
- Mərkəzdəki portal həmin progress ilə böyüyür və arxadakı əsas hero görünür.
- Progress threshold-u təxminən `0.3` olduqda və ya gesture velocity kifayət qədər yüksək olduqda timeline tamamlanır.
- Threshold keçilməyibsə aperture yumşaq şəkildə başlanğıc vəziyyətinə qayıdır.
- Kiçik wheel hərəkəti yanlış giriş yaratmamalıdır; tolerance və qısa debounce istifadə olunur.

### Vizual keçid

1. Dairəvi ring nəfəs alır.
2. Swipe zamanı ring mərkəzdən böyüyür.
3. “MAKE THE SYSTEM THINK.” sözləri eyni anda az miqdarda radial istiqamətdə ayrılır.
4. Main hero arxada kiçik scale və blur vəziyyətindən fokuslanır.
5. Aperture viewport-u tam örtəndə intro DOM-dan çıxarılır, body scroll açılır və hero normal scroll mövqeyində qalır.

### Gesture siyasəti

- Custom gesture yalnız intro aktiv olduğu müddətdə işləyir.
- Intro bağlandıqdan sonra wheel/touch hadisələri native browser scroll-a qaytarılır.
- `touch-action: none` bütün səhifəyə tətbiq edilmir. Yalnız aktiv intro gesture səthində və qısa müddət üçün istifadə olunur.
- Browser zoom imkanını daimi söndürmək olmaz.

MDN qeyd edir ki, `touch-action: none` browser zoom davranışını məhdudlaşdıra və zəif görən istifadəçilərə mane ola bilər. Buna görə gesture capture lokal və müvəqqəti olmalıdır.

Mənbələr:

- [GSAP Observer input and tolerance controls](https://gsap.com/docs/v3/Plugins/Observer/)
- [MDN touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action)

Confidence: High

## Səhnə 1: Introdan Hero-ya

Intro və hero ayrı səhifələr kimi deyil, eyni kompozisiyanın iki vəziyyəti kimi qurulmalıdır:

- Intro aperture hero-da əsas visual frame-ə çevrilir.
- Mərkəzdə açılan hero vizualı tədricən asimmetrik editorial grid-ə yerləşir.
- Intro koordinatları və hero əsas şəkli arasında vizual davamlılıq saxlanır.
- Header yalnız aperture təxminən 70 faiz açıldıqdan sonra görünür.
- Hero başlığı söz-söz deyil, 2-3 böyük tipografik blok kimi açılır; çoxlu xırda text stagger istifadə edilmir.

Bu keçid istifadəçiyə “overlay bağlandı” hissi yox, “sistemin içinə daxil oldum” hissi verməlidir.

## Səhnə 2: Hero-dan Project Navigator-a

Keçid sadə aşağı scroll deyil:

- Hero vizualı pin edilmiş vəziyyətdə qalır.
- Scroll progress artdıqca vizual frame bir qədər uzaqlaşır və navigatorun əsas stage frame-i olur.
- Hero heading yuxarı yox olmaq əvəzinə kənarlara parçalanır.
- Arxa fon qaranlıqdan isti paper tone-a aperture/wipe ilə dəyişir.
- Layihə adları sağ və ya alt rail-də aktiv olur.
- Aktiv layihə dəyişdikcə bir əsas vizual səhnədə şəkil dəyişir; üç ayrı kart stack göstərilmir.

## Səhnə 3: Navigator-dan Case Study-yə

Burada shared-element illüziyası istifadə edilir:

- Navigator daxilində seçilmiş şəkil viewport mərkəzinə gəlir.
- Eyni DOM element və ya koordinatları ölçülmüş clone fullscreen case visual-a transform olunur.
- Layihə nömrəsi, adı və qısa descriptor böyük editorial bloklara çevrilir.
- Keçid zamanı istifadəçi vizualın “yeni blokda təkrar göründüyünü” yox, “öz yerindən böyüdüyünü” hiss edir.

İlk versiyada bunu GSAP transform timeline ilə qurmaq daha etibarlıdır. View Transition API sonradan ayrıca project detail route-ları yarandıqda progressive enhancement kimi istifadə oluna bilər.

## Səhnə 4: Project Story

Üç layihəni üç uzun müstəqil sticky blok kimi saxlamaq əvəzinə bir ümumi `ProjectStory` stage tövsiyə edilir:

- Stage viewport-da pin olunur.
- Vertical scroll stage timeline-ını idarə edir.
- Project 01, 02 və 03 timeline label-ları olur.
- Şəkillər tam dəyişmək əvəzinə mask, depth və shared frame vasitəsilə bir-birinə çevrilir.
- Sol və ya sağ progress rail istifadəçinin hansı layihədə olduğunu göstərir.
- Hər layihə üçün maksimum bir əsas heading, bir cümlə və bir vizual prioritetdir.
- Əlavə mətn scroll bitdikdən sonra normal axında və ya detail səhifədə verilir.

Bu struktur mətni azaldır və layihələri “kart siyahısı” yox, rejissorluğu olan portfolio reel kimi təqdim edir.

## Səhnə 5: Method

Desktop:

- Vertical scroll pin edilmiş horizontal method rail-i idarə edir.
- Addımlar böyük tipografiya, diaqram və seçilmiş vizual nümunələrlə keçir.
- Hərəkət `containerAnimation` və ya bir əsas horizontal tween vasitəsilə qurulur.

Mobil:

- Horizontal scroll simulyasiyası istifadə olunmur.
- Addımlar normal vertikal axında daha qısa reveal ilə göstərilir.
- Mobil istifadəçi uzun müddət pin edilmiş səhnədə saxlanmır.

## Səhnə 6: Contact Final

- Project stage aperture vasitəsilə yığılır və açıq rəngli contact field-ə çevrilir.
- CTA viewport-un mərkəzində tək dominant hərəkət olur.
- Cursor/parallax yalnız desktop pointer cihazlarında və kiçik amplituda ilə işləyir.
- Final ekran saytın açılış dairəsinə vizual olaraq cavab verir və loop hissi yaradır.

## Texniki Arxitektura

Tövsiyə edilən dependency-lər:

```text
gsap
@gsap/react
```

İlk mərhələdə əlavə edilməməli:

```text
lenis
fullpage.js
scroll-snap mandatory
three.js
```

Tövsiyə edilən komponent strukturu:

```text
src/
  components/
    motion/
      IntroGate.tsx
      MotionProvider.tsx
      SceneProgress.tsx
    scenes/
      HeroScene.tsx
      ProjectNavigatorScene.tsx
      ProjectStoryScene.tsx
      MethodScene.tsx
      ContactScene.tsx
  hooks/
    useIntroGesture.ts
    useReducedMotion.ts
  lib/
    gsap.ts
    motion-config.ts
```

### `IntroGate`

- Overlay refs
- Aperture ref
- Intro text refs
- `Observer` lifecycle
- Click, gesture və keyboard üçün vahid `requestEnter()`
- Completion-dan sonra focus-un hero daxilində mənalı elementə ötürülməsi

### `MotionProvider`

- GSAP plugin registration
- Reduced motion media query
- Desktop/mobile motion profile
- Motion constants və easing

### Scene komponentləri

- Hər scene öz root ref-inə sahib olur.
- `useGSAP()` və `scope` ilə selector-lar lokallaşdırılır.
- Hər scene cleanup zamanı bütün tween və ScrollTrigger obyektlərini revert edir.
- React state hər animation frame-də yenilənmir; GSAP refs və CSS custom property-lər istifadə olunur.

GSAP-ın React guide-ı `useGSAP()` hook-unun ScrollTrigger daxil olmaqla animasiya obyektlərini component unmount zamanı avtomatik revert etdiyini və Next.js client component-lərində istifadə oluna bildiyini təsdiqləyir.

Mənbə:

- [GSAP React guide](https://gsap.com/resources/React/)

Confidence: High

## Niyə Lenis İlk Mərhələdə Yoxdur

Lenis keyfiyyətli və native scroll üzərində işləyən smooth-scroll qatıdır. GSAP ilə rəsmi inteqrasiya nümunəsi də var. Buna baxmayaraq əvvəlcə əlavə edilməməsinin səbəbləri:

- Əsas problem scroll-un “sərt” olması deyil, səhnələr arasında choreography olmamasıdır.
- Native scroll + ScrollTrigger problemi daha az dəyişənlə həll edir.
- Lenis Safari frame cap, iframe wheel, köhnə iOS touch və nested scroll üçün ayrıca məhdudiyyətlər sənədləşdirir.
- Motion design təsdiqlənmədən smooth-scroll əlavə etmək problemi kosmetik olaraq gizlədə bilər.

Qərar: Scene choreography tamamlandıqdan sonra desktop trackpad testində ehtiyac qalarsa Lenis ayrıca A/B yoxlanmalıdır.

Mənbə:

- [Lenis official repository and limitations](https://github.com/darkroomengineering/lenis)

Confidence: High

## Accessibility və İdarəetmə

- Intro button həmişə görünən və fokuslana bilən qalır.
- Gesture yeganə giriş yolu deyil.
- `ArrowDown`, `PageDown`, `Space`, `Enter` və `Escape/Skip` dəstəyi olur.
- Intro daxilində semantik button istifadə edilir.
- `prefers-reduced-motion: reduce` zamanı:
  - swipe progress izlənmir;
  - aperture scale animasiyası sadə, qısa opacity keçidi ilə əvəz olunur;
  - pinned scrub scene-lər normal document flow-a keçir;
  - böyük parallax və rotation deaktiv edilir.
- Intro yalnız cari session-da bir dəfə tam göstərilə bilər. Təkrar girişdə 300-400 ms qısa transition və görünən “Replay opening” control tövsiyə edilir.
- Browser zoom və pinch behavior bütün səhifə üzrə bağlanmır.

Mənbələr:

- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [MDN touch-action accessibility notes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action)

Confidence: High

## Performans Siyasəti

Əsas qayda: scroll frame-lərində layout hesablayan property-lər yox, compositor-friendly property-lər prioritet olmalıdır.

Prioritet:

- `transform`
- `opacity`
- məhdud sayda `clip-path`
- raster şəkillərdə düzgün ölçü və `object-fit`

Məhdudlaşdırılmalı:

- hər frame-də `width`, `height`, `top`, `left`
- böyük fullscreen blur/filter
- çoxlu paralel mask
- bütün səhifədə daimi `will-change`
- React state-in `onUpdate` daxilində hər frame dəyişməsi

Portal üçün `clip-path` istifadə oluna bilər, amma eyni vaxtda yalnız bir böyük aperture animasiyası işləməlidir. Alternativ olaraq daha yaxşı performans tələb olunarsa dairəvi element `transform: scale()` ilə viewport-u örtəcək ölçüyə gətirilə bilər.

web.dev performans guide transform və opacity-ni əsas compositor-friendly seçimlər kimi tövsiyə edir və layout/paint yaradan property-lərin diqqətlə ölçülməsini bildirir.

Mənbə:

- [web.dev Animations and performance](https://web.dev/articles/animations-and-performance)

Confidence: High

## Implementasiya Planı

### Phase 1: Motion Foundation

- `gsap` və `@gsap/react` əlavə etmək.
- GSAP registration və motion config yaratmaq.
- `useReducedMotion` qurmaq.
- Mövcud monolit `page.tsx`-i səhnə komponentlərinə bölmək.
- Hazırkı görünüşü pozmadan struktur refactor-u tamamlamaq.

Exit criteria:

- Görünüş regressiyası yoxdur.
- Bütün scene-lər unmount/refresh zamanı düzgün cleanup olur.
- Reduced motion profile işləyir.

### Phase 2: Interactive Intro

- `IntroGate` və `useIntroGesture`.
- Button, wheel, touch, pointer və keyboard vahid enter timeline.
- Mərkəzdən aperture reveal.
- Threshold, cancel/reverse və fast-swipe completion.
- Body scroll lock yalnız intro aktiv olarkən.
- Session davranışı və replay control.

Exit criteria:

- Button və swipe eyni nəticəni verir.
- Kiçik wheel delta intro-nu səhvən bağlamır.
- Gesture yarıda buraxıldıqda səhnə geri qayıdır.
- iOS Safari və Android Chrome-da scroll lock ilişmir.

### Phase 3: Hero and Navigator Story

- Intro-to-hero shared aperture.
- Hero pin timeline.
- Hero visual-dan navigator stage-ə transform.
- Active project state və visual stage.
- Persistent chapter/progress rail.

Exit criteria:

- Introdan sonra jump yoxdur.
- Fast scroll timeline-ı qırmır.
- Header və anchor navigation düzgün mövqeyə gedir.

### Phase 4: Unified Project Story

- Ayrı sticky case bloklarını bir `ProjectStory` stage-ə çevirmək.
- Project timeline labels.
- Shared visual transitions.
- Project 01/02/03 üçün fərqli, amma eyni sistemə aid choreography.
- Mobil üçün normal stacked fallback.

Exit criteria:

- Hər layihənin başlanğıcı və sonu aydın hiss olunur.
- İstifadəçi pin daxilində ilişmir.
- Mətn oxunaqlılığı hər progress nöqtəsində qorunur.

### Phase 5: Method and Contact

- Desktop horizontal method rail.
- Mobile vertical method fallback.
- Contact final aperture.
- Motion polish və timing.

### Phase 6: QA and Performance

- Chrome/macOS mouse wheel.
- Chrome/macOS trackpad.
- Safari/macOS.
- iPhone Safari.
- Android Chrome.
- Keyboard-only.
- Reduced motion.
- 1280, 1440, ultrawide və mobil viewport-lar.
- Chrome Performance panelində long task, layout və paint yoxlaması.
- Lighthouse accessibility və performance yoxlaması.

Lenis yalnız bu mərhələdən sonra ayrıca branch-də sınanmalıdır.

## Qəbul Meyarları

1. Intro həm klik, həm swipe, həm wheel, həm də klaviatura ilə keçilir.
2. Swipe reveal ekranın mərkəzindən real gesture progress ilə açılır.
3. İstifadəçi gesture-ni yarıda saxladıqda animation təhlükəsiz geri qayıdır.
4. Intro bitdikdən sonra native page scroll tam bərpa olunur.
5. Əsas səhifədə heç bir keçid sadəcə blokun aşağıdan görünməsi ilə məhdudlaşmır.
6. Hər scene əvvəlki scene-dən vizual element daşıyır.
7. Project case-lər vahid pinned story daxilində aydın fərqlənir.
8. Mobil versiya desktop timeline-ın sıxılmış surəti deyil, ayrıca yüngül choreography-dir.
9. Reduced motion istifadəçiyə bütün kontenti animasiyasız və maneəsiz göstərir.
10. Sürətli scroll, resize və orientation change zamanı pin və layout qırılmır.
11. Əsas scroll native və geri çevrilə biləndir; full-page hijack yoxdur.
12. Motion dizayn kontentdən daha dominant olmur.

## Risklər və Qarşısının Alınması

| Risk | Qarşı tədbir |
| --- | --- |
| Həddindən artıq motion məzmunu kölgədə qoyur | Vahid aperture sistemi, az effekt növü, aydın typography |
| Pin səhnələri istifadəçini saxlayır | Qısa scroll məsafəsi, mobil fallback, mandatory snap yoxdur |
| Safari-də frame drop | Transform/opacity prioriteti, blur məhdudiyyəti, real cihaz testi |
| Gesture native scroll ilə konflikt yaradır | Observer yalnız intro aktivkən, düzgün cleanup, lokal touch-action |
| React Strict Mode duplicate trigger yaradır | `useGSAP`, scoped refs, automatic revert |
| Resize zamanı trigger mövqeləri pozulur | Top-down trigger creation, `ScrollTrigger.refresh()`, image dimensions |
| Scroll-driven effekt unsupported olur | GSAP əsas sistem, CSS timeline yalnız progressive enhancement |

## Yekun Qərar

Portfolio üçün ən professional istiqamət full-page scroll hijack və ya hər bölmədə təsadüfi effektlər deyil. Tövsiyə olunan sistem native scroll üzərində qurulan, istifadəçi gesture-ni real progress-ə çevirən və bütün səhifəni bir mərkəzi aperture motivi ilə birləşdirən scene-based arxitekturadır.

İlk implementasiya hədəfi bütün səhifəni eyni anda dəyişmək yox, əvvəlcə motion foundation və intro prototype hazırlamaqdır. Intro desktop və mobil real cihazlarda təsdiqləndikdən sonra eyni motion qrammatikası hero, navigator və project story-yə daşınmalıdır.

Overall confidence: High
