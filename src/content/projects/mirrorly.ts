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
    az: 'Mirrorly-də istifadəçi öz şəklini və geyim şəklini yükləyir, nəticəni AI modeli yaradır. Tətbiq SwiftUI ilə yazılıb, backend Supabase üzərindədir, ödəniş kredit paketləri ilə işləyir. Tətbiqin arxasında admin panel, cihaz yoxlaması və serverdə işləyən limitlər də var.',
    en: 'In Mirrorly the user uploads their photo and a garment image, and an AI model generates the result. The app is written in SwiftUI, the backend runs on Supabase, and usage is paid through credit packs. Behind the app there is also an admin panel, device verification and limits enforced on the server.',
    ru: 'В Mirrorly пользователь загружает своё фото и изображение одежды, а результат генерирует AI-модель. Приложение написано на SwiftUI, бэкенд работает на Supabase, оплата устроена через пакеты кредитов. За приложением стоят ещё админ-панель, проверка устройства и лимиты на сервере.',
  },
  pitch: {
    az: 'Alış-verişdən əvvəl geyimi öz şəklinizdə görün. Mirrorly — iPhone və iPad üçün AI ilə virtual geyim sınağı tətbiqidir, App Store-da mövcuddur.',
    en: 'See a garment on your own photo before you buy it. Mirrorly is an AI virtual try-on app for iPhone and iPad, available on the App Store.',
    ru: 'Увидьте вещь на своём фото ещё до покупки. Mirrorly — AI-приложение для виртуальной примерки на iPhone и iPad, доступно в App Store.',
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
  roleShort: {
    az: 'Dizayn, iOS, backend, ödəniş və təhlükəsizlik',
    en: 'Design, iOS, backend, payments and security',
    ru: 'Дизайн, iOS, бэкенд, платежи и безопасность',
  },
  stack: ['Swift', 'SwiftUI', 'Supabase (Postgres, Edge Functions, Storage, Auth)', 'Nano Banana 2 (EachLabs API)', 'RevenueCat', 'Apple App Attest / DeviceCheck', 'Next.js (admin panel)', 'TypeScript'],
  year: '2026',
  status: 'live',
  outcome: {
    az: ['App Store-da: iPhone və iPad, iOS 16+', 'Kredit paketləri ilə ödəniş və qonaq rejimi', 'Ayrıca Next.js admin panel'],
    en: ['Live on the App Store: iPhone and iPad, iOS 16+', 'Credit-pack payments and guest mode', 'A separate Next.js admin panel'],
    ru: ['В App Store: iPhone и iPad, iOS 16+', 'Оплата пакетами кредитов и гостевой режим', 'Отдельная админ-панель на Next.js'],
  },
  // First frame of the preview video: real screens, used wherever a still is needed (home peek, next-project card)
  cover: {
    src: '/videos/mirrorly-preview-v2-poster.jpg',
    alt: {
      az: 'Mirrorly-nin real ekranları: ana səhifə, geyim seçimi və AI emalı',
      en: 'Real screens of Mirrorly: home, choosing an outfit and AI processing',
      ru: 'Реальные экраны Mirrorly: главный экран, выбор образа и обработка AI',
    },
    width: 2560,
    height: 1440,
  },
  preview: {
    webm: '/videos/mirrorly-preview-v2.webm',
    mp4: '/videos/mirrorly-preview-v2.mp4',
    poster: '/videos/mirrorly-preview-v2-poster.jpg',
    width: 2560,
    height: 1440,
    alt: {
      az: 'Mirrorly-nin real ekranları: ana səhifə, geyim seçimi və AI emalı',
      en: 'Real screens of Mirrorly: home, choosing an outfit and AI processing',
      ru: 'Реальные экраны Mirrorly: главный экран, выбор образа и обработка AI',
    },
  },
  icon: {
    src: '/images/mirrorly/icon.png',
    alt: {
      az: 'Mirrorly tətbiq ikonu: tünd fonda qızılı asılqan və M hərfi',
      en: 'The Mirrorly app icon: a gold hanger with an M on a dark background',
      ru: 'Иконка Mirrorly: золотая вешалка с буквой M на тёмном фоне',
    },
    width: 512,
    height: 512,
  },
  manifest: [
    { key: 'platform', value: { az: 'iOS 16+ · iPhone, iPad', en: 'iOS 16+ · iPhone, iPad', ru: 'iOS 16+ · iPhone, iPad' } },
    { key: 'client', value: { az: 'Swift · SwiftUI', en: 'Swift · SwiftUI', ru: 'Swift · SwiftUI' } },
    { key: 'backend', value: { az: 'Supabase · 10 Edge Function', en: 'Supabase · 10 Edge Functions', ru: 'Supabase · 10 Edge Functions' } },
    { key: 'ai', value: { az: 'Nano Banana 2 · EachLabs API', en: 'Nano Banana 2 · EachLabs API', ru: 'Nano Banana 2 · EachLabs API' } },
    { key: 'payments', value: { az: 'RevenueCat · kredit paketləri', en: 'RevenueCat · credit packs', ru: 'RevenueCat · пакеты кредитов' } },
    { key: 'integrity', value: { az: 'App Attest / DeviceCheck', en: 'App Attest / DeviceCheck', ru: 'App Attest / DeviceCheck' } },
    { key: 'admin', value: { az: 'Next.js · TypeScript', en: 'Next.js · TypeScript', ru: 'Next.js · TypeScript' } },
    { key: 'languages', value: { az: 'az · en · ru', en: 'az · en · ru', ru: 'az · en · ru' } },
  ],
  // Read from `git log` of the Mirrorly repo: 106 commits, all by Ramin7DEV
  activity: {
    source: 'git log',
    weekStart: '2026-01-05',
    first: '2026-01-08',
    last: '2026-04-13',
    weekly: [7, 23, 11, 11, 13, 8, 14, 7, 2, 0, 0, 0, 3, 6, 1],
  },
  chapters: [
    {
      id: 'problem',
      eyebrow: { az: 'Problem', en: 'Problem', ru: 'Проблема' },
      title: {
        az: 'Onlayn mağazada sınaq otağı yoxdur',
        en: 'Online shops have no fitting room',
        ru: 'В интернет-магазине нет примерочной',
      },
      body: {
        az: ['Onlayn alınan geyimin üzərinizdə necə görünəcəyini bilmək çətindir. Mirrorly nəticəni istifadəçinin öz şəklində göstərir.'],
        en: ['It is hard to know how a garment bought online will look on you. Mirrorly shows the result on the user\'s own photo.'],
        ru: ['Сложно понять, как вещь из интернет-магазина будет смотреться на вас. Mirrorly показывает результат на собственном фото.'],
      },
    },
    {
      id: 'ai-workflow',
      eyebrow: { az: 'AI', en: 'AI', ru: 'AI' },
      title: {
        az: 'Daha ucuz model, eyni nəticə',
        en: 'Cheaper model, same result',
        ru: 'Модель дешевле, результат тот же',
      },
      body: {
        az: ['Try-on-u Nano Banana 2 yaradır: GPT Image-dən ona keçdim, çünki eyni işi xeyli ucuz görür. Ekranları Google Stitch-də, kodu Codex, Claude və Gemini ilə paralel yazdım.'],
        en: ['Try-ons are generated by Nano Banana 2: I moved off GPT Image because it does the same job much cheaper. Screens designed in Google Stitch, code written with Codex, Claude and Gemini in parallel.'],
        ru: ['Примерку генерирует Nano Banana 2: я ушёл с GPT Image, потому что новая модель делает то же заметно дешевле. Экраны — в Google Stitch, код — с Codex, Claude и Gemini параллельно.'],
      },
    },
    {
      id: 'system',
      eyebrow: { az: 'Sistem', en: 'System', ru: 'Система' },
      title: {
        az: 'Alınmasa, kredit geri qayıdır',
        en: 'If it fails, the credit comes back',
        ru: 'Не вышло — кредит возвращается',
      },
      body: {
        az: ['Hər sorğu serverdə yoxlanır, kredit atomik çıxılır və uğursuz olsa geri qaytarılır. Şəkillər private saxlanır, 30 gündən sonra silinir.'],
        en: ['Every request is checked on the server, the credit is deducted atomically and refunded if the try-on fails. Photos are stored privately and deleted after 30 days.'],
        ru: ['Каждый запрос проверяется на сервере, кредит списывается атомарно и возвращается при сбое. Фото хранятся приватно и удаляются через 30 дней.'],
      },
    },
  ],
  // Real screens from one try-on, in order; the last two are the result screen before and after
  screens: [
    {
      src: '/images/mirrorly/tryon-upload.webp',
      width: 739,
      height: 1600,
      label: { az: 'Şəklini yüklə', en: 'Upload your photo', ru: 'Загрузите фото' },
      note: { az: 'Tam boy şəkil ən yaxşı nəticə verir.', en: 'A full-body photo works best.', ru: 'Лучше всего работает фото в полный рост.' },
    },
    {
      src: '/images/mirrorly/tryon-outfit.webp',
      width: 739,
      height: 1600,
      label: { az: 'Geyimi seç', en: 'Choose the outfit', ru: 'Выберите образ' },
      note: { az: 'Hazır outfit və ya ayrı-ayrı geyimlər.', en: 'A ready outfit, or mix and match pieces.', ru: 'Готовый образ или отдельные вещи.' },
    },
    {
      src: '/images/mirrorly/screen-04.webp',
      width: 739,
      height: 1600,
      label: { az: 'AI emal edir', en: 'AI at work', ru: 'AI обрабатывает' },
      note: { az: 'Adətən 30–60 saniyə çəkir.', en: 'Usually takes 30–60 seconds.', ru: 'Обычно занимает 30–60 секунд.' },
    },
    {
      src: '/images/mirrorly/tryon-before.webp',
      width: 739,
      height: 1600,
      label: { az: 'Öncə', en: 'Before', ru: 'До' },
      note: { az: 'İstifadəçinin öz şəkli.', en: 'The user\'s own photo.', ru: 'Собственное фото пользователя.' },
    },
    {
      src: '/images/mirrorly/tryon-after.webp',
      width: 739,
      height: 1600,
      label: { az: 'Sonra', en: 'After', ru: 'После' },
      note: { az: 'Eyni şəkil, seçilmiş geyimdə.', en: 'The same photo, in the chosen outfit.', ru: 'То же фото, в выбранном образе.' },
    },
  ],
  flow: {
    steps: {
      az: ['Sorğu', 'JWT yoxlanışı', 'Rate limit', 'Kredit çıxılır', 'Nano Banana 2', 'Nəticə'],
      en: ['Request', 'JWT check', 'Rate limit', 'Credit deducted', 'Nano Banana 2', 'Result'],
      ru: ['Запрос', 'Проверка JWT', 'Лимит запросов', 'Списание кредита', 'Nano Banana 2', 'Результат'],
    },
    fallback: {
      az: 'Uğursuz olsa → kredit geri qaytarılır',
      en: 'On failure → the credit is refunded',
      ru: 'При сбое → кредит возвращается',
    },
    fallbackFrom: 3,
  },
  marquee: ['SwiftUI', 'Supabase', 'Nano Banana 2', 'RevenueCat', 'App Attest', 'Next.js'],
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
    {
      kind: 'github',
      href: 'https://github.com/Ramin7DEV/mirrorly-ios',
      label: {
        az: 'iOS tətbiqinin mənbə kodu',
        en: 'iOS app source code',
        ru: 'Исходный код iOS-приложения',
      },
    },
  ],
  accent: 'gold',
} satisfies Project;
