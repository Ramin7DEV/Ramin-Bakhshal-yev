import type { Project } from '../types';

export const azerbaijanTourGuide = {
  slug: 'azerbaijan-tour-guide',
  index: '02',
  categories: ['ai', 'mobile'],
  title: 'Azerbaijan Tour Guide',
  summary: {
    az: 'Azerbaijan Tour Guide turistin maraqlarına və tarixlərinə görə AI ilə gün-gün səyahət marşrutu quran mobil tətbiqdir.',
    en: 'Azerbaijan Tour Guide is a mobile app that uses AI to plan a day-by-day trip from a traveller\'s interests and dates.',
    ru: 'Azerbaijan Tour Guide — мобильное приложение, которое с помощью AI строит маршрут по дням по интересам и датам путешественника.',
  },
  statement: {
    az: 'Turist şəhəri və tarixləri seçir, maraqlarını kartları sürüşdürərək bildirir, AI isə məkanları günlərə bölüb xəritədə marşrut qurur. Tətbiq React Native və Expo ilə yazılıb, məlumat Supabase-də saxlanılır, marşrutu serverdə Gemma 4 modeli planlaşdırır.',
    en: 'The traveller picks a city and dates, swipes through what interests them, and AI splits the places into days and draws the route on a map. The app is built with React Native and Expo, the data lives in Supabase, and the route is planned on the server by the Gemma 4 model.',
    ru: 'Путешественник выбирает город и даты, свайпом отмечает интересы, а AI распределяет места по дням и показывает маршрут на карте. Приложение написано на React Native и Expo, данные хранятся в Supabase, маршрут на сервере планирует модель Gemma 4.',
  },
  pitch: {
    az: 'Şəhəri və tarixləri seçin, maraqlarınızı sürüşdürün — AI səfəri gün-gün planlaşdırsın. Azerbaijan Tour Guide — Azərbaycanı kəşf etmək üçün iOS və Android prototipidir.',
    en: 'Pick a city and dates, swipe through what interests you, and let AI plan the trip day by day. Azerbaijan Tour Guide is an iOS and Android prototype for exploring Azerbaijan.',
    ru: 'Выберите город и даты, отметьте интересы свайпом — и AI спланирует поездку по дням. Azerbaijan Tour Guide — прототип для iOS и Android, чтобы открывать Азербайджан.',
  },
  role: {
    az: ['Məhsul ideyası və dizayn', 'Mobil tətbiq (React Native, Expo)', 'Supabase backend və Edge Function', '10 şəhər və 239 məkanın məlumat bazası'],
    en: ['Product idea and design', 'Mobile app (React Native, Expo)', 'Supabase backend and Edge Function', 'A database of 10 cities and 239 places'],
    ru: ['Идея продукта и дизайн', 'Мобильное приложение (React Native, Expo)', 'Бэкенд на Supabase и Edge Function', 'База из 10 городов и 239 мест'],
  },
  stack: ['TypeScript', 'React Native', 'Expo (EAS)', 'Supabase (Postgres, Edge Functions, RLS)', 'Gemma 4 (OpenRouter)', 'react-native-maps', 'Zustand', 'i18next', 'Sentry'],
  year: '2025',
  status: 'prototype',
  outcome: {
    az: ['iOS və Android üçün quraşdırıla bilən test build-ləri (EAS)', 'Azərbaycan və ingilis dilində interfeys; marşrut seçilmiş dildə yazılır', 'Qeydiyyat yoxdur, AI-a heç bir şəxsi məlumat göndərilmir'],
    en: ['Installable test builds for iOS and Android (EAS)', 'Interface in Azerbaijani and English; the route is written in the chosen language', 'No sign-up, and no personal data is sent to the AI'],
    ru: ['Устанавливаемые тестовые сборки для iOS и Android (EAS)', 'Интерфейс на азербайджанском и английском; маршрут пишется на выбранном языке', 'Без регистрации, личные данные в AI не отправляются'],
  },
  cover: {
    src: '/images/project-azerbaijan-tour-guide-editorial.jpg',
    alt: {
      az: 'Kəşf və əlaqələri təmsil edən abstrakt canlı diaqram',
      en: 'Abstract animated diagram representing discovery and connections',
      ru: 'Абстрактная анимированная схема поиска и связей',
    },
    width: 1448,
    height: 1086,
  },
  preview: {
    webm: '/videos/tour-guide-preview-v3.webm',
    mp4: '/videos/tour-guide-preview-v3.mp4',
    poster: '/videos/tour-guide-preview-v3-poster.jpg',
    width: 2560,
    height: 1440,
    alt: {
      az: 'Azerbaijan Tour Guide tətbiqinin real ekranları: tarix seçimi, kateqoriya kartı, xəritədə marşrut və gün-gün plan',
      en: 'Real screens of Azerbaijan Tour Guide: choosing dates, a category card, the route on a map and the day-by-day plan',
      ru: 'Реальные экраны Azerbaijan Tour Guide: выбор дат, карточка категории, маршрут на карте и план по дням',
    },
  },
  icon: {
    src: '/images/tour-guide/icon.png',
    alt: {
      az: 'Azerbaijan Tour Guide ikonu: firuzəyi fonda qızılı Alov qüllələri və kompas ulduzu',
      en: 'The Azerbaijan Tour Guide icon: gold Flame Towers and a compass star on a teal background',
      ru: 'Иконка Azerbaijan Tour Guide: золотые Пламенные башни и звезда компаса на бирюзовом фоне',
    },
    width: 512,
    height: 512,
  },
  manifest: [
    { key: 'platform', value: { az: 'iOS · Android', en: 'iOS · Android', ru: 'iOS · Android' } },
    { key: 'client', value: { az: 'React Native · Expo', en: 'React Native · Expo', ru: 'React Native · Expo' } },
    { key: 'backend', value: { az: 'Supabase · Edge Function', en: 'Supabase · Edge Function', ru: 'Supabase · Edge Function' } },
    { key: 'ai', value: { az: 'Gemma 4 · OpenRouter', en: 'Gemma 4 · OpenRouter', ru: 'Gemma 4 · OpenRouter' } },
    { key: 'data', value: { az: '10 şəhər · 239 məkan', en: '10 cities · 239 places', ru: '10 городов · 239 мест' } },
    { key: 'languages', value: { az: 'az · en', en: 'az · en', ru: 'az · en' } },
  ],
  // Read from `git log` of the Azerbaijan Tourism App repo: 94 commits, all by Ramin7DEV
  activity: {
    source: 'git log',
    weekStart: '2025-11-03',
    first: '2025-11-04',
    last: '2026-10-04',
    weekly: [49, 15, 19, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  },
  chapters: [
    {
      id: 'problem',
      eyebrow: { az: 'Problem', en: 'Problem', ru: 'Проблема' },
      title: {
        az: 'Yeni şəhərdə nəyi, hansı ardıcıllıqla görmək?',
        en: 'What to see in a new city, and in what order?',
        ru: 'Что смотреть в новом городе и в каком порядке?',
      },
      body: {
        az: ['Turist adətən məkanları ayrı-ayrı axtarır, sonra onları günlərə özü bölür. Tətbiq bunu bir axına çevirir: şəhər, tarixlər, maraqlar — və hazır marşrut.'],
        en: ['Travellers usually look places up one by one and then split them into days themselves. The app turns that into one flow: city, dates, interests — and a ready route.'],
        ru: ['Обычно туристы ищут места по одному, а потом сами раскладывают их по дням. Приложение превращает это в один поток: город, даты, интересы — и готовый маршрут.'],
      },
    },
    {
      id: 'data',
      eyebrow: { az: 'Məlumat', en: 'Data', ru: 'Данные' },
      title: {
        az: '10 şəhər, 239 məkan',
        en: '10 cities, 239 places',
        ru: '10 городов, 239 мест',
      },
      body: {
        az: ['Bakıdan Şuşaya qədər məkanlar Google Maps-dən yığılıb: ad, koordinat, kateqoriya, ziyarət müddəti. Tətbiq bazanı yalnız oxuyur.'],
        en: ['Places from Baku to Shusha were collected from Google Maps: name, coordinates, category, visit length. The app only ever reads the database.'],
        ru: ['Места от Баку до Шуши собраны из Google Maps: название, координаты, категория, время посещения. Приложение базу только читает.'],
      },
    },
    {
      id: 'ai-workflow',
      eyebrow: { az: 'AI', en: 'AI', ru: 'AI' },
      title: {
        az: 'AI planlaşdırır, faktlar bazadan gəlir',
        en: 'AI plans, the facts come from the database',
        ru: 'AI планирует, факты берутся из базы',
      },
      body: {
        az: ['Gemma 4 məkanları günlərə bölür, ardıcıllığı qurur və qısa qeydlər yazır. Ad, koordinat və yol vaxtı isə həmişə bazadan və real məsafədən gəlir.'],
        en: ['Gemma 4 splits the places into days, orders them and writes short notes. Names, coordinates and travel times always come from the database and real distances.'],
        ru: ['Gemma 4 распределяет места по дням, выстраивает порядок и пишет короткие заметки. Названия, координаты и время в пути всегда берутся из базы и реальных расстояний.'],
      },
    },
    {
      id: 'system',
      eyebrow: { az: 'Sistem', en: 'System', ru: 'Система' },
      title: {
        az: 'Modelə kor-koranə etibar edilmir',
        en: 'The model is never trusted blindly',
        ru: 'Модели не доверяют вслепую',
      },
      body: {
        az: ['Server AI cavabını yoxlayır: bazada olmayan məkanı silir, təkrarı çıxarır, unudulanı son günə əlavə edir. Model cavab verməsə, ehtiyat modelə keçilir.'],
        en: ['The server checks every AI answer: it removes places that are not in the database, drops duplicates and adds forgotten ones to the last day. If the model does not answer, a fallback takes over.'],
        ru: ['Сервер проверяет ответ AI: убирает места, которых нет в базе, удаляет повторы и добавляет забытые в последний день. Если модель не отвечает, подключается запасная.'],
      },
    },
  ],
  // Real screens from one run of the app, in order (cleaned frames of a screen recording)
  screens: [
    {
      src: '/images/tour-guide/screen-dates-2.webp',
      width: 554,
      height: 1202,
      label: { az: 'Şəhər və tarixlər', en: 'City and dates', ru: 'Город и даты' },
      note: { az: 'Ən çox 5 günlük səfər.', en: 'Trips of up to 5 days.', ru: 'Поездки до 5 дней.' },
    },
    {
      src: '/images/tour-guide/screen-categories-2.webp',
      width: 554,
      height: 1202,
      label: { az: 'Maraqlarını sürüşdür', en: 'Swipe your interests', ru: 'Свайп по интересам' },
      note: { az: 'Sağa — maraqlıdır, sola — keç.', en: 'Right to keep, left to skip.', ru: 'Вправо — интересно, влево — пропустить.' },
    },
    {
      src: '/images/tour-guide/screen-generating-2.webp',
      width: 554,
      height: 1202,
      label: { az: 'AI marşrutu qurur', en: 'AI builds the route', ru: 'AI строит маршрут' },
      note: { az: 'Adətən 30–40 saniyə çəkir.', en: 'Usually takes 30–40 seconds.', ru: 'Обычно занимает 30–40 секунд.' },
    },
    {
      src: '/images/tour-guide/screen-map-2.webp',
      width: 554,
      height: 1202,
      label: { az: 'Xəritədə marşrut', en: 'The route on a map', ru: 'Маршрут на карте' },
      note: { az: 'Markerlər kateqoriyaya görə fərqlənir.', en: 'Markers differ by category.', ru: 'Маркеры различаются по категориям.' },
    },
    {
      src: '/images/tour-guide/screen-plan-2.webp',
      width: 554,
      height: 1202,
      label: { az: 'Gün-gün plan', en: 'Day by day', ru: 'План по дням' },
      note: { az: 'Hər məkan üçün qısa qeyd.', en: 'A short note for every place.', ru: 'Короткая заметка к каждому месту.' },
    },
  ],
  flow: {
    steps: {
      az: ['Seçim', 'Ən çox 12 məkan', 'Gemma 4', 'Yoxlama', 'Yol vaxtı', 'Marşrut'],
      en: ['Selection', 'Up to 12 places', 'Gemma 4', 'Validation', 'Travel times', 'Route'],
      ru: ['Выбор', 'До 12 мест', 'Gemma 4', 'Проверка', 'Время в пути', 'Маршрут'],
    },
    fallback: {
      az: 'Model cavab verməsə → ehtiyat modellə 4 cəhdə qədər',
      en: 'No answer from the model → up to 4 tries with a fallback',
      ru: 'Модель не ответила → до 4 попыток с запасной',
    },
    fallbackFrom: 2,
  },
  marquee: ['React Native', 'Expo', 'Supabase', 'Gemma 4', 'OpenRouter', 'Zustand'],
  links: [],
  accent: 'signal',
} satisfies Project;
