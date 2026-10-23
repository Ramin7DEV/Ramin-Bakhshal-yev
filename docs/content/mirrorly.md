# Mirrorly — case study content draft

Mənbə: https://github.com/Ramin7DEV/MirrorlyApp (public, read-only klon, kod icra edilməyib). Etiketlər: **[verified]** = repodan birbaşa; **[inferred]** = koddan çıxarış, Ramin təsdiqləməlidir.

## 1. Facts found

- Repo yaradılıb 2026-01-08, son push 2026-04-13 (`gh repo view`). 106 commit, hamısı müəllif `Ramin7DEV`, 0 tag, 0 release. İlk commit 2026-01-08 "Initial commit: Project structure, models, services, UI designs"; son commit 2026-04-13 "fix: correct ready-made outfit image selection" (`git log`).
- Commit paylanması: 2026-01 — 49, 2026-02 — 41, 2026-03 — 6, 2026-04 — 10 (`git log`).
- Nə olduğu: "AI-Powered Virtual Try-On iOS App" — istifadəçi öz şəklini və geyim şəklini yükləyir, AI nəticə şəkli yaradır (`README.md` About/Features).
- Auditoriya: PRD-də 13+, "əsasən qadınlar", coğrafiya Azərbaycan, Rusiya, dünya; online alış-veriş edənlər və moda həvəskarları (`PRD.md` §2). PRD problem bəndi: sınaq otağında növbə, onlayn alışda oturuşu bilməmək, geri qaytarma (`PRD.md` §1.2). PRD-nin son yenilənməsi 2026-01-08 (plan sənədidir, nəticə sübutu deyil).
- Platforma: iOS (iPhone + iPad, `TARGETED_DEVICE_FAMILY = "1,2"`), SwiftUI, README-də iOS 16+ (`project.pbxproj`-də `IPHONEOS_DEPLOYMENT_TARGET` 16.0 və 26.2 dəyərləri var — uyğunsuzluq, bax §4). Bundle ID `com.raminbakhshaliyev.mirrorly.Mirrorly`, `MARKETING_VERSION = 1.0.2` (`Mirrorly/Mirrorly.xcodeproj/project.pbxproj`).
- Dillər (GitHub): Swift 378 KB, TypeScript 299 KB, HTML 267 KB (Stitch dizayn eksportları), PLpgSQL 9 KB. Swift mənbə ~10 800 sətir (`Mirrorly/Mirrorly/**/*.swift`).
- iOS asılılıqları (`Package.resolved`): supabase-swift 2.39.0, purchases-ios (RevenueCat) 5.53.0, Kingfisher 8.6.2, lottie-ios 4.6.0, KeychainAccess.
- Backend: Supabase (Postgres, Storage, Edge Functions, Anonymous Auth, RLS). 10 Edge Function qovluğu: `create-tryon`, `create-accessory-tryon`, `create-outfit-tryon`, `check-tryon`, `auth-link-device`, `delete-account`, `get-signed-urls`, `migrate-signed-urls`, `handle-revenuecat-webhook`, `reconcile-stale-tryons` (+ `_shared/` köməkçi qovluğu) (`supabase/functions/`). 6 SQL miqrasiya, 2026-02-09 – 2026-04-12 (`supabase/migrations/`). README "9 functions" yazır, repo-da daha çoxdur.
- AI: API ilə, cihazda deyil. Edge Function `fetch("https://api.eachlabs.ai/v1/prediction/")` ilə EachLabs vasitəsilə `model: "nano-banana-2-edit"` (Gemini 3.1 Flash Image) çağırır; paltar/aksesuar/outfit üçün ayrı prompt-lar (`supabase/functions/create-tryon/index.ts` sətir 2–4, 39, 277–286; `README.md` Tech Stack). Model tarixçəsi: 2026-02-18 commit-də `gpt-image-v1-5-edit`-ə keçid; sonra kodun başlığına görə Nano Banana 2 Edit-ə keçid (`create-tryon/index.ts` sətir 4; `docs/GPT_IMAGE_EDIT_API.md` "legacy"). `check-tryon` nəticəni sorğulayır, şəkli private bucket-ə yazır (README).
- Funksiyalar: paltar try-on, aksesuar try-on, outfit (ready-made 1 və ya piece-by-piece 4-ə qədər geyim), öz geyimini yükləmə, hazır kataloq, kredit sistemi, qonaq rejimi (Anonymous Auth), Closet/wardrobe tarixçəsi və favorilər, profil, hesabın silinməsi, onboarding, 3 dil (az/en/ru, `Localizable.xcstrings`), dark/light (`README.md` Features; `Features/` qovluğu: Closet, Home, Onboarding, Profile, TryOn — UploadPhoto, SelectGarment, SelectOutfit, DataConsent, Processing, Result, Purchase).
- Ödəniş: RevenueCat + Apple IAP; StoreKit konfiqurasiyasında 3 kredit paketi `mirrorly_credits_5/15/50` (`Config/Mirrorly.storekit`); webhook `handle-revenuecat-webhook`.
- Təhlükəsizlik/etibarlılıq işi: Apple DeviceCheck/App Attest (kredit farming-ə qarşı), Postgres əsaslı rate limit (5 sorğu/dəq), eyni anda 1 aktiv try-on, private bucket + signed URL, RLS, RPC-lərin `service_role`-a kilidlənməsi, 30 günlük şəkil təmizləmə cron-u, ilişmiş try-on-ları uzlaşdıran sweeper və refund (`README.md` Security; `supabase/migrations/*`, `docs/SECURITY_AUDIT.md`).
- Admin panel: Next.js 14 (App Router), shadcn/ui, Tailwind, Supabase Auth; dashboard, users (kredit əlavə, ban), try-ons, transactions, integrity logs, settings (`admin/`, `README.md`).
- AI prosesdə: `.agent/rules/rules.md` ("trigger: always_on", "Senior iOS Architect" rolu, "ULTRATHINK" protokolu, SwiftUI qaydaları) — AI kod agenti üçün qayda faylı. `docs/STITCH_PROMPTS.md` və `ui/*/code.html` — Stitch (AI dizayn aləti) ekran prompt-ları və HTML eksportları. Commit mesajları AI alətlərini adı ilə anmır. CLAUDE.md, AGENTS.md, .cursor yoxdur.
- Status sübutları: App Store/TestFlight URL-i repoda yoxdur. Lakin: build nömrəsi 7-yə qədər artıb (`chore: bump project version to 1.0.1 and build number to 7`, 2026-04-08), `MARKETING_VERSION 1.0.2`, "Request App Store review after onboarding" (2026-03-01), Privacy Policy "Last Updated: April 5, 2026", əlaqə e-poçtu `appmirrorlyapp@gmail.com` (`docs/privacy-policy.md`), "remove unused restore purchases button" (2026-04-07). Bunlar App Store-a göndərmə hazırlığına işarədir, yayımlanmanın sübutu deyil.
- GitHub `homepageUrl`: https://mirrorly-app-rho.vercel.app — HTTP 307 yönləndirir; repoda Vercel yalnız admin panel üçün göstərilib (`admin/DEPLOYMENT.md`), yəni çox güman admin paneldir, ictimai sayt deyil [inferred]. Ramin-in saytında link kimi istifadə etmək məsləhət deyil.

## 2. Proposed content

Qeyd: "Year" = **2026** [verified: ilk commit 2026-01-08, son 2026-04-13]. Status: **TODO(content)** — sübut yoxdur (aşağıda sual 1). Links: boş qalsın; yalnız Ramin App Store linki versə əlavə olunsun. GitHub repo public-dir (https://github.com/Ramin7DEV/MirrorlyApp) — link kimi əlavə etmək Ramin-in qərarıdır (sual 2).

### stack (hamısı [verified], mənbə §1)
`Swift`, `SwiftUI`, `Supabase (Postgres, Edge Functions, Storage, Auth)`, `Nano Banana 2 Edit (EachLabs API)`, `RevenueCat`, `Apple App Attest / DeviceCheck`, `Next.js (admin panel)`, `TypeScript`

### summary
- az: Mirrorly istifadəçinin şəklində geyimi, aksesuarı və ya hazır outfit-i sınamağa imkan verən iOS tətbiqidir. [verified]
- en: Mirrorly is an iOS app that lets people try on garments, accessories or full outfits on their own photo. [verified]
- ru: Mirrorly — iOS-приложение, в котором можно примерить одежду, аксессуары или готовый образ на собственном фото. [verified]

### statement
- az: Mirrorly-də istifadəçi öz şəklini və geyim şəklini yükləyir, nəticəni AI modeli yaradır. [verified] Tətbiq SwiftUI ilə yazılıb, backend Supabase üzərindədir, ödəniş kredit paketləri ilə işləyir. [verified] Məhsulun ətrafında admin panel, cihaz yoxlaması və server tərəfli limitlər də qurulub. [verified]
- en: In Mirrorly the user uploads their photo and a garment image, and an AI model generates the result. [verified] The app is written in SwiftUI, the backend runs on Supabase, and usage is paid through credit packs. [verified] Around the product sit an admin panel, device verification and server-side limits. [verified]
- ru: В Mirrorly пользователь загружает своё фото и изображение одежды, а результат генерирует AI-модель. [verified] Приложение написано на SwiftUI, бэкенд работает на Supabase, оплата устроена через пакеты кредитов. [verified] Вокруг продукта построены админ-панель, проверка устройства и серверные лимиты. [verified]

### role
Ramin-in dəqiq rolu repoda yazılmayıb; bütün commit-lər onun hesabındandır [verified], lakin "solo" yazmaq üçün təsdiq lazımdır (sual 3). Təklif (təsdiq gözləyir):
- az: Məhsul ideyası və PRD [inferred: `PRD.md` AZ dilində, müəllif Ramin]. / iOS tətbiqinin SwiftUI ilə hazırlanması [verified]. / Supabase backend, Edge Function-lar və SQL miqrasiyaları [verified]. / Admin panelin hazırlanması [verified]. / Ödəniş, cihaz yoxlaması və təhlükəsizlik qatı [verified].
- en: Product idea and PRD [inferred]. / Building the iOS app in SwiftUI [verified]. / Supabase backend, Edge Functions and SQL migrations [verified]. / Building the admin panel [verified]. / Payments, device verification and the security layer [verified].
- ru: Идея продукта и PRD [inferred]. / Разработка iOS-приложения на SwiftUI [verified]. / Бэкенд на Supabase, Edge Functions и SQL-миграции [verified]. / Разработка админ-панели [verified]. / Платежи, проверка устройства и слой безопасности [verified].

### outcome
- az: TODO(content): real nəticələr (yükləmə sayı, istifadəçi, reytinq, gəlir) repoda yoxdur. Uydurma rəqəm yazılmır.
- en: TODO(content): real outcomes (downloads, users, rating, revenue) are not in the repo. No numbers are invented.
- ru: TODO(content): реальные результаты (загрузки, пользователи, рейтинг, выручка) в репозитории отсутствуют. Цифры не выдумываются.
- Yoxlanıla bilən, rəqəm olmayan nəticə variantları [verified]: az — "10 Edge Function qovluğu, 6 SQL miqrasiya, 3 dildə interfeys, 106 commit 2026-01-08 – 2026-04-13." en — "10 Edge Function folders, 6 SQL migrations, a 3-language interface, 106 commits between 2026-01-08 and 2026-04-13." ru — "10 папок Edge Functions, 6 SQL-миграций, интерфейс на 3 языках, 106 коммитов с 2026-01-08 по 2026-04-13." (Edge Function sayı: README 9 deyir, repo-da 10 funksiya qovluğu var; sual 7.) Bunlar "nəticə" yox, "əhatə" faktıdır; Ramin qərar versin.

### chapter: problem
- title — az: Paltarı almadan əvvəl necə oturduğunu görmək | en: Seeing how a garment fits before buying it | ru: Увидеть, как сидит одежда, до покупки
- az: Onlayn alış-verişdə geyimin üzərində necə görünəcəyini bilmək çətindir; mağazada isə sınaq otağında növbə və soyunub-geyinmək lazımdır. [verified: `PRD.md` §1.2] Mirrorly bu boşluğu istifadəçinin öz şəkli üzərində vizual nəticə ilə doldurmağa çalışır. [inferred]
- en: When shopping online it is hard to know how a garment will look on you, and in a store it means queuing for a fitting room and changing. [verified: `PRD.md` §1.2] Mirrorly tries to close that gap with a visual result on the user's own photo. [inferred]
- ru: При онлайн-покупках трудно понять, как вещь будет смотреться на вас, а в магазине нужно ждать примерочную и переодеваться. [verified: `PRD.md` §1.2] Mirrorly пытается закрыть этот разрыв визуальным результатом на собственном фото пользователя. [inferred]
- (PRD rəqib analizi: App Store-da oxşar tətbiqlər var; fərq — az/ru/en dəstəyi, sadə UX [verified: `PRD.md` §1.4].)

### chapter: role
- title — az: Ürün ideyasından App Store hazırlığına qədər | en: From product idea to App Store readiness | ru: От идеи продукта до подготовки к App Store
- az: TODO(content): Ramin-in dəqiq rolu və kimlərlə işləməsi (sual 3). Repoda görünən: PRD, iOS tətbiqi, backend və admin panel bir hesabdan commit olunub (106 commit). [verified] Versiya 1.0.2-yə və build 7-yə çatıb. [verified]
- en: TODO(content): Ramin's exact role and collaborators (question 3). Visible in the repo: PRD, iOS app, backend and admin panel committed from a single account (106 commits). [verified] The project reached version 1.0.2 and build 7. [verified]
- ru: TODO(content): точная роль Рамина и участники (вопрос 3). В репозитории видно: PRD, iOS-приложение, бэкенд и админ-панель закоммичены с одного аккаунта (106 коммитов). [verified] Проект дошёл до версии 1.0.2 и сборки 7. [verified]

### chapter: ai-workflow
- title — az: AI həm məhsulda, həm iş prosesində | en: AI in the product and in the process | ru: AI в продукте и в процессе работы
- az: Məhsulda AI cihazda yox, Supabase Edge Function-dan EachLabs API-si ilə çağırılan Nano Banana 2 Edit modelidir; paltar, aksesuar və outfit üçün ayrı prompt-lar var. [verified: `create-tryon/index.ts`] Model dəyişib: əvvəl `gpt-image-v1-5-edit`, sonra Nano Banana 2 Edit. [verified: commit 2026-02-18, `create-tryon/index.ts`] Hər sorğu kredit çıxır, uğursuz olduqda geri qaytarılır, ilişmiş sorğular ayrıca sweeper ilə uzlaşdırılır. [verified: README RPC cədvəli, `reconcile-stale-tryons`, migrasiya 20260410] İş prosesində repoda AI kod agenti üçün qayda faylı (`.agent/rules/rules.md`) və Stitch ilə yaradılmış ekran dizaynları (`ui/`, `docs/STITCH_PROMPTS.md`) var. [verified] Kodun nə qədərinin AI ilə yazıldığı repodan görünmür. TODO(content): Ramin hansı alətləri istifadə edib (sual 4).
- en: In the product, AI is not on-device: a Supabase Edge Function calls the Nano Banana 2 Edit model through the EachLabs API, with separate prompts for garments, accessories and outfits. [verified: `create-tryon/index.ts`] The model changed over time, from `gpt-image-v1-5-edit` to Nano Banana 2 Edit. [verified: commit 2026-02-18, `create-tryon/index.ts`] Each request spends a credit, refunds it on failure, and stuck requests are reconciled by a separate sweeper. [verified: README RPC table, `reconcile-stale-tryons`, migration 20260410] In the process, the repo contains a rules file for an AI coding agent (`.agent/rules/rules.md`) and screen designs generated with Stitch (`ui/`, `docs/STITCH_PROMPTS.md`). [verified] How much of the code was written with AI is not visible from the repo. TODO(content): which tools Ramin used (question 4).
- ru: В продукте AI работает не на устройстве: Edge Function в Supabase вызывает модель Nano Banana 2 Edit через API EachLabs, с отдельными промптами для одежды, аксессуаров и образов. [verified: `create-tryon/index.ts`] Модель менялась: сначала `gpt-image-v1-5-edit`, затем Nano Banana 2 Edit. [verified: коммит 2026-02-18, `create-tryon/index.ts`] Каждый запрос списывает кредит, при сбое возвращает его, а зависшие запросы сверяет отдельный sweeper. [verified: таблица RPC в README, `reconcile-stale-tryons`, миграция 20260410] В процессе работы в репозитории есть файл правил для AI-агента (`.agent/rules/rules.md`) и экраны, сгенерированные в Stitch (`ui/`, `docs/STITCH_PROMPTS.md`). [verified] Сколько кода написано с помощью AI, по репозиторию не видно. TODO(content): какие инструменты использовал Рамин (вопрос 4).

### chapter: system
- title — az: İstifadəçi şəkli, kredit və cihaz yoxlaması | en: User photos, credits and device verification | ru: Фото пользователя, кредиты и проверка устройства
- az: iOS tətbiqi (SwiftUI) Supabase ilə danışır; try-on sorğusu Edge Function-a gedir, o isə JWT yoxlayır, rate limit tətbiq edir, krediti atomik çıxır və AI sorğusunu başladır. [verified: README Security, `check_rate_limit`/`use_credit` RPC] İstifadəçi şəkilləri private bucket-dədir və qısa ömürlü signed URL ilə verilir, şəkillər 30 gündən sonra cron ilə təmizlənir. [verified: README, migrasiya 20260407] Qonaq rejimi var: hesab tələb olunmur, kredit "farming"-in qarşısı Apple DeviceCheck / App Attest ilə alınır. [verified: README, commit 2026-02-09] Ödəniş RevenueCat vasitəsilə, kredit əlavəsi webhook ilə edilir; Next.js admin paneldə istifadəçilər, try-on-lar, tranzaksiyalar və integrity log-ları görünür. [verified]
- en: The SwiftUI iOS app talks to Supabase; a try-on request goes to an Edge Function that verifies the JWT, applies a rate limit, deducts the credit atomically and starts the AI request. [verified: README Security, `check_rate_limit`/`use_credit` RPCs] User images live in private buckets served through short-lived signed URLs, and are cleaned up by a cron job after 30 days. [verified: README, migration 20260407] A guest mode needs no account, and credit farming is limited with Apple DeviceCheck / App Attest. [verified: README, commit 2026-02-09] Payments go through RevenueCat, credits are added by webhook, and a Next.js admin panel shows users, try-ons, transactions and integrity logs. [verified]
- ru: iOS-приложение на SwiftUI работает с Supabase; запрос на примерку уходит в Edge Function, которая проверяет JWT, применяет лимит запросов, атомарно списывает кредит и запускает AI-запрос. [verified: раздел Security в README, RPC `check_rate_limit`/`use_credit`] Изображения пользователей хранятся в приватных бакетах и отдаются по короткоживущим signed URL, через 30 дней их удаляет cron. [verified: README, миграция 20260407] Есть гостевой режим без аккаунта, а накрутка кредитов ограничена через Apple DeviceCheck / App Attest. [verified: README, коммит 2026-02-09] Оплата идёт через RevenueCat, кредиты начисляются вебхуком, а админ-панель на Next.js показывает пользователей, примерки, транзакции и логи проверки устройств. [verified]

## 3. Visual assets

Repo-da **real tətbiq screenshot-u yoxdur**. `ui/` qovluğundakılar Stitch (AI dizayn aləti) ilə yaradılmış **dizayn mockup-larıdır** (hər PNG-nin yanında `code.html`; `docs/STITCH_PROMPTS.md`) — real UI kimi təqdim etmək olmaz; ancaq "dizayn mərhələsi" kimi, etiketlə göstərmək olar.
- App icon: `Mirrorly/Mirrorly/Assets.xcassets/AppIcon.appiconset/logo.png` — 1024x1024 PNG (real ikon; mənbə fayl).
- Mockup-lar (`ui/`, hamısı 1600 hündürlük; en 393–706): `home_screen_(dark_mode).png` (393x1600), `home_screen_(light_mode).png` (399x1600), `closet_screen_(dark|light_mode)_mirrorly.png` (579 / 672 x1600), `result_screen_(dark|light_mode)_mirrorly.png` (706x1600), `processing_screen_*` (706x1600), `select_garment_*` (706 / 457x1600), `upload_photo_screen_(dark|light).png` (706x1600), `purchase_credits_*` (706x1600), `profile_screen_*` (429 / 414x1600), `settings_screen_*`, `sign_in_screen_*`, `onboarding:_{welcome,how_it_works,get_started}_(dark|light).png` (706x1600), `screen.png`, `screen_light.png`. Fayl adlarında iki nöqtə var (`onboarding:_...`) — köçürərkən adı dəyişmək lazımdır.
- Video/demo: yoxdur. Lottie animasiyaları (`Resources/Animations/loading.json`, `sparkles.json`, `welcome.json`) UI daxilindədir, marketinq materialı deyil.
- Real build-dən çəkilməsi tövsiyə olunan ekranlar (Xcode simulyatorunda, iPhone Pro ölçüsü): (1) Home (hero carousel + wardrobe), (2) Upload Photo, (3) Select Garment / Select Outfit, (4) Processing, (5) Result (ən güclü kadr, əvvəl/sonra), (6) Closet, (7) Purchase credits. Nəticə şəkli üçün Ramin-in razılaşdırdığı test şəkli lazımdır (özünün və ya model icazəli).

## 4. Questions for Ramin

1. Mirrorly hazırda App Store-dadır, TestFlight-dadır, yoxsa hələ inkişaf mərhələsindədir? Repoda yalnız 1.0.2 / build 7 və App Store review sorğusu kodu görünür. Varsa App Store linkini ver.
2. GitHub repo-nu (public) saytda link kimi göstərək? Repoda API açarı yoxdur amma `mirrorly-legal-temp` kimi müvəqqəti fayl və admin konfiqurasiyası var — public qalmalıdır?
3. Layihədə dəqiq rolun nədir: tək özün hazırlamısan, yoxsa dizayner/tester/başqa developer olub? Məhsul ideyası və PRD-ni özün yazmısan?
4. Prosesdə hansı AI alətlərindən istifadə etmisən (Claude, Gemini, Cursor, Antigravity və s.) və hansı mərhələdə? `.agent/rules/rules.md` hansı alət üçündür? Ekran dizaynları Stitch ilə çıxıb — düzdür?
5. Real nəticə varmı: yükləmə sayı, aktiv istifadəçi, reytinq, gəlir, yaradılmış try-on sayı? Yoxdursa "outcome" hissəsində yalnız texniki əhatə yazırıq.
6. Real simulyator screenshot-ları çəkimi üçün hansı test şəklini istifadə edək (öz şəklin)? `ui/` mockup-larını "dizayn mərhələsi" etiketi ilə göstərməyə razısan?
7. Edge Function sayı: README 9 yazır, repo-da 10 funksiya qovluğu var; hansı rəqəmi göstərək? Və minimum iOS versiyası 16 yoxsa 26.2 (pbxproj-də ikisi də var)?
8. `mirrorly-app-rho.vercel.app` ünvanı admin paneldir? İctimai demo kimi göstərmək olarmı (çox güman olmaz)?
9. Model seçimi (GPT Image -> Nano Banana 2) niyə dəyişdi (keyfiyyət, qiymət, sürət)? Bu, "AI iş prosesi" hissəsi üçün güclü məzmun olardı.

## 5. Ramin's answers (2026-10-23)

Bu cavablar yuxarıdakı qaralamanı üstələyir (authoritative). Final məzmun `src/content/projects/mirrorly.ts`-dədir.

- Status: App Store-da yayımlanıb. Link: https://apps.apple.com/az/app/mirrorly-ai/id6759640031
- GitHub repo artıq private: saytda repo linki göstərilmir.
- Rol: bütün layihəni tək özü hazırlayıb: məhsul ideyası, dizayn, iOS tətbiqi, backend, admin panel.
- Prosesdə AI: UI dizaynı üçün Google Stitch; kodlaşdırma üçün Codex, Claude və Gemini paralel, qrup şəklində.
- Real nəticə: yoxdur, tətbiq istifadəçi cəlb etməyib. İstifadəçi/yükləmə/gəlir/reytinq yazılmır; ictimai səhifədə mənfi də yazılmır. Outcome yalnız çatdırılmış faktları deyir (App Store, texniki əhatə).
- Edge Function sayı: 10 (repodakı say).
- Minimum iOS: 16.
- Admin panel URL-i göstərilmir.
- Model dəyişikliyi (GPT Image -> Nano Banana 2, EachLabs): yeni model eyni işi xeyli ucuz gördüyü üçün. `ai-workflow` fəslində xərc-şüurlu qərar kimi verilib.
- Real screenshot-lar ayrıca əlavə olunacaq; Stitch `ui/` mockup-ları istifadə edilmir.
