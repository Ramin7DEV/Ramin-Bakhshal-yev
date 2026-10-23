import type { Project } from '../types';

export const mirrorly = {
  slug: 'mirrorly',
  index: '01',
  categories: ['ai', 'mobile'],
  title: 'Mirrorly',
  summary: {
    az: 'Mirrorly istifadəçinin öz şəklində geyimi, aksesuarı və ya hazır outfit-i sınamağa imkan verən iOS tətbiqidir.',
    en: 'Mirrorly is an iOS app that lets people try on garments, accessories or full outfits on their own photo.',
    ru: 'Mirrorly — iOS-приложение, в котором можно примерить одежду, аксессуары или готовый образ на собственном фото.',
  },
  statement: {
    az: 'Mirrorly-də istifadəçi öz şəklini və geyim şəklini yükləyir, nəticəni AI modeli yaradır. Tətbiq SwiftUI ilə yazılıb, backend Supabase üzərindədir, ödəniş kredit paketləri ilə işləyir. Məhsulun ətrafında admin panel, cihaz yoxlaması və server tərəfli limitlər də qurulub.',
    en: 'In Mirrorly the user uploads their photo and a garment image, and an AI model generates the result. The app is written in SwiftUI, the backend runs on Supabase, and usage is paid through credit packs. Around the product sit an admin panel, device verification and server-side limits.',
    ru: 'В Mirrorly пользователь загружает своё фото и изображение одежды, а результат генерирует AI-модель. Приложение написано на SwiftUI, бэкенд работает на Supabase, оплата устроена через пакеты кредитов. Вокруг продукта построены админ-панель, проверка устройства и серверные лимиты.',
  },
  role: {
    az: [
      'Məhsul ideyası və dizayn',
      'iOS tətbiqi (SwiftUI)',
      'Supabase backend, Edge Function-lar və SQL miqrasiyaları',
      'Admin panel',
      'Ödəniş, cihaz yoxlaması və təhlükəsizlik qatı',
    ],
    en: [
      'Product idea and design',
      'iOS app (SwiftUI)',
      'Supabase backend, Edge Functions and SQL migrations',
      'Admin panel',
      'Payments, device verification and the security layer',
    ],
    ru: [
      'Идея продукта и дизайн',
      'iOS-приложение (SwiftUI)',
      'Бэкенд на Supabase, Edge Functions и SQL-миграции',
      'Админ-панель',
      'Платежи, проверка устройства и слой безопасности',
    ],
  },
  stack: ['Swift', 'SwiftUI', 'Supabase (Postgres, Edge Functions, Storage, Auth)', 'Nano Banana 2 (EachLabs API)', 'RevenueCat', 'Apple App Attest / DeviceCheck', 'Next.js (admin panel)', 'TypeScript'],
  year: '2026',
  status: 'live',
  outcome: {
    az: [
      'App Store-da yayımlanıb, iPhone və iPad üçün, iOS 16 və yuxarı',
      'Üç dildə interfeys: Azərbaycan, ingilis, rus',
      '10 Edge Function, 6 SQL miqrasiya və ayrıca admin panel',
      'Kredit paketləri ilə ödəniş, qonaq rejimi və hesabın silinməsi',
    ],
    en: [
      'Released on the App Store for iPhone and iPad, iOS 16 and later',
      'Interface in three languages: Azerbaijani, English, Russian',
      '10 Edge Functions, 6 SQL migrations and a separate admin panel',
      'Credit-pack payments, guest mode and account deletion',
    ],
    ru: [
      'Выпущено в App Store для iPhone и iPad, iOS 16 и новее',
      'Интерфейс на трёх языках: азербайджанский, английский, русский',
      '10 Edge Functions, 6 SQL-миграций и отдельная админ-панель',
      'Оплата пакетами кредитов, гостевой режим и удаление аккаунта',
    ],
  },
  cover: {
    src: '/images/project-mirrorly-editorial.jpg',
    alt: {
      az: 'AI əlaqələrini təmsil edən abstrakt canlı diaqram',
      en: 'Abstract animated diagram representing AI connections',
      ru: 'Абстрактная анимированная схема связей ИИ',
    },
    width: 1448,
    height: 1086,
  },
  preview: {
    webm: '/videos/mirrorly-preview.webm',
    mp4: '/videos/mirrorly-preview.mp4',
    poster: '/videos/mirrorly-preview-poster.jpg',
    width: 1920,
    height: 1080,
    alt: {
      az: 'Mirrorly tətbiq ikonu açılır və tətbiqin real ekranları görünür: ana səhifə, geyim seçimi və emal mərhələsi',
      en: 'The Mirrorly app icon opens into the real screens of the app: home, choosing an outfit and processing',
      ru: 'Иконка Mirrorly раскрывается в реальные экраны приложения: главный экран, выбор образа и обработка',
    },
  },
  chapters: [
    {
      id: 'problem',
      eyebrow: {
        az: 'Problem',
        en: 'Problem',
        ru: 'Проблема',
      },
      title: {
        az: 'Paltarı almadan əvvəl necə oturduğunu görmək',
        en: 'Seeing how a garment fits before buying it',
        ru: 'Увидеть, как сидит одежда, до покупки',
      },
      body: {
        az: [
          'Onlayn alış-verişdə geyimin üzərində necə görünəcəyini bilmək çətindir; mağazada isə sınaq otağında növbə gözləmək və soyunub-geyinmək lazımdır.',
          'Mirrorly bu boşluğu istifadəçinin öz şəkli üzərində vizual nəticə ilə doldurmağa çalışır.',
        ],
        en: [
          'When shopping online it is hard to know how a garment will look on you, and in a store it means queuing for a fitting room and changing.',
          'Mirrorly tries to close that gap with a visual result on the user\'s own photo.',
        ],
        ru: [
          'При онлайн-покупках трудно понять, как вещь будет смотреться на вас, а в магазине нужно ждать примерочную и переодеваться.',
          'Mirrorly пытается закрыть этот разрыв: показывает результат на собственном фото пользователя.',
        ],
      },
    },
    {
      id: 'role',
      eyebrow: {
        az: 'Rol',
        en: 'Role',
        ru: 'Роль',
      },
      title: {
        az: 'Ideyadan App Store-a qədər tək',
        en: 'From idea to App Store, alone',
        ru: 'От идеи до App Store в одиночку',
      },
      body: {
        az: [
          'Layihəni tək hazırlamışam: məhsul ideyası, dizayn, iOS tətbiqi, backend və admin panel mənimdir.',
          'Nəticədə tətbiq App Store-da yayımlanıb.',
        ],
        en: [
          'I built the project alone: the product idea, design, iOS app, backend and admin panel are all mine.',
          'The result is an app released on the App Store.',
        ],
        ru: [
          'Проект я сделал один: идея продукта, дизайн, iOS-приложение, бэкенд и админ-панель — всё моё.',
          'В итоге приложение вышло в App Store.',
        ],
      },
    },
    {
      id: 'ai-workflow',
      eyebrow: {
        az: 'AI İş Prosesi',
        en: 'AI Workflow',
        ru: 'AI-процесс',
      },
      title: {
        az: 'AI həm məhsulda, həm iş prosesində',
        en: 'AI in the product and in the process',
        ru: 'AI в продукте и в процессе работы',
      },
      body: {
        az: [
          'Məhsulda AI cihazda işləmir: Supabase Edge Function EachLabs API-si ilə Nano Banana 2 modelini çağırır, paltar, aksesuar və outfit üçün ayrı prompt-lar var. Əvvəl GPT Image modeli işləyirdi; yenisi eyni işi xeyli ucuz gördüyü üçün ona keçdim.',
          'İş prosesində ekran dizaynlarını Google Stitch ilə hazırladım. Kodu isə Codex, Claude və Gemini ilə bir qrup kimi, paralel yazdım.',
        ],
        en: [
          'In the product, AI does not run on the device: a Supabase Edge Function calls the Nano Banana 2 model through the EachLabs API, with separate prompts for garments, accessories and outfits. It started on a GPT Image model; I switched because the newer model did the same job much cheaper.',
          'In the process, I designed the screens with Google Stitch and wrote the code with Codex, Claude and Gemini running in parallel as a group.',
        ],
        ru: [
          'В продукте AI работает не на устройстве: Edge Function в Supabase вызывает модель Nano Banana 2 через API EachLabs, с отдельными промптами для одежды, аксессуаров и образов. Сначала стояла модель GPT Image; я перешёл на новую, потому что она делает ту же работу заметно дешевле.',
          'В процессе работы экраны я проектировал в Google Stitch, а код писал с помощью Codex, Claude и Gemini, запущенных параллельно как группа.',
        ],
      },
    },
    {
      id: 'system',
      eyebrow: {
        az: 'Sistem',
        en: 'System',
        ru: 'Система',
      },
      title: {
        az: 'İstifadəçi şəkli, kredit və cihaz yoxlaması',
        en: 'User photos, credits and device verification',
        ru: 'Фото пользователя, кредиты и проверка устройства',
      },
      body: {
        az: [
          'SwiftUI tətbiqi Supabase ilə danışır. Try-on sorğusu Edge Function-a gedir: o, JWT-ni yoxlayır, rate limit tətbiq edir, krediti atomik çıxır və AI sorğusunu başladır. Uğursuz sorğuda kredit geri qaytarılır, ilişmiş sorğuları ayrıca bir iş uzlaşdırır.',
          'İstifadəçi şəkilləri private bucket-dədir və qısa ömürlü signed URL ilə verilir, 30 gündən sonra avtomatik silinir. Qonaq rejimində hesab lazım deyil, kredit sui-istifadəsi Apple DeviceCheck / App Attest ilə məhdudlaşdırılır.',
          'Ödəniş RevenueCat vasitəsilə gedir, kreditlər webhook ilə əlavə olunur. Next.js admin paneldə istifadəçilər, try-on-lar, tranzaksiyalar və yoxlama log-ları görünür.',
        ],
        en: [
          'The SwiftUI app talks to Supabase. A try-on request goes to an Edge Function that verifies the JWT, applies a rate limit, deducts the credit atomically and starts the AI request. On failure the credit is refunded, and a separate job reconciles stuck requests.',
          'User images live in private buckets served through short-lived signed URLs and are deleted automatically after 30 days. Guest mode needs no account, and credit abuse is limited with Apple DeviceCheck / App Attest.',
          'Payments go through RevenueCat and credits are added by webhook. A Next.js admin panel shows users, try-ons, transactions and verification logs.',
        ],
        ru: [
          'Приложение на SwiftUI работает с Supabase. Запрос на примерку уходит в Edge Function: она проверяет JWT, применяет лимит запросов, атомарно списывает кредит и запускает AI-запрос. При сбое кредит возвращается, а зависшие запросы сверяет отдельная задача.',
          'Изображения пользователей хранятся в приватных бакетах, отдаются по короткоживущим signed URL и автоматически удаляются через 30 дней. Гостевой режим не требует аккаунта, а злоупотребление кредитами ограничено через Apple DeviceCheck / App Attest.',
          'Оплата идёт через RevenueCat, кредиты начисляются вебхуком. Админ-панель на Next.js показывает пользователей, примерки, транзакции и логи проверок.',
        ],
      },
    },
  ],
  links: [
    {
      kind: 'app-store',
      href: 'https://apps.apple.com/az/app/mirrorly-ai/id6759640031',
      label: {
        az: 'App Store',
        en: 'App Store',
        ru: 'App Store',
      },
    },
  ],
  accent: 'gold',
} satisfies Project;
