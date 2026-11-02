import type { Project } from '../types';

export const beautyApp = {
  slug: 'beauty-app',
  index: '03',
  categories: ['mobile', 'product-design'],
  title: 'BeautyApp',
  summary: {
    az: 'BeautyApp yaxınlıqdakı salonu tapıb onlayn randevu almaq üçün müştəri tətbiqi və salonun randevularını idarə etmək üçün ayrıca biznes tətbiqidir.',
    en: 'BeautyApp pairs a client app for finding a nearby salon and booking online with a separate business app for running the salon\'s appointments.',
    ru: 'BeautyApp — клиентское приложение для поиска ближайшего салона и онлайн-записи и отдельное бизнес-приложение для управления записями салона.',
  },
  statement: {
    az: 'Müştəri yaxınlıqdakı salonu xəritədə tapır, xidmət və ustanı seçir, boş vaxta randevu alır; salon sahibi randevuları, xidmətləri, ustaları və rəyləri öz tətbiqində idarə edir. Hər iki tətbiq React Native və Expo ilə, API isə Express və Supabase üzərində yazılıb.',
    en: 'Clients find a salon nearby on the map, pick a service and a master and book a free slot; salon owners run appointments, services, masters and reviews in their own app. Both apps are built with React Native and Expo, the API with Express on Supabase.',
    ru: 'Клиент находит салон рядом на карте, выбирает услугу и мастера и записывается на свободное время; владелец салона ведёт записи, услуги, мастеров и отзывы в своём приложении. Оба приложения написаны на React Native и Expo, API — на Express и Supabase.',
  },
  pitch: {
    az: 'Yaxındakı salonu tapın, boş vaxtı seçin və zəng etmədən randevu alın. BeautyApp — müştəri və salon sahibi üçün iki tətbiqdən ibarət mobil prototipdir.',
    en: 'Find a salon nearby, pick a free slot and book without a phone call. BeautyApp is a mobile prototype made of two apps: one for clients, one for salon owners.',
    ru: 'Найдите салон рядом, выберите свободное время и запишитесь без звонка. BeautyApp — мобильный прототип из двух приложений: для клиентов и для владельцев салонов.',
  },
  role: {
    az: ['Məhsul ideyası və dizayn', 'Müştəri və salon sahibi tətbiqləri (React Native, Expo)', 'Express API və Supabase məlumat bazası'],
    en: ['Product idea and design', 'Client and salon owner apps (React Native, Expo)', 'Express API and Supabase database'],
    ru: ['Идея продукта и дизайн', 'Приложения для клиента и владельца салона (React Native, Expo)', 'API на Express и база данных Supabase'],
  },
  roleShort: {
    az: 'Dizayn, mobil tətbiqlər, API və verilənlər bazası',
    en: 'Design, mobile apps, API and database',
    ru: 'Дизайн, мобильные приложения, API и база данных',
  },
  stack: ['JavaScript', 'React Native', 'Expo', 'Redux Toolkit', 'Node.js', 'Express', 'Supabase (Postgres, Storage)', 'JWT', 'react-native-maps', 'i18next'],
  year: '2025',
  status: 'prototype',
  outcome: {
    az: ['İki işlək tətbiq: müştəri və salon sahibi', 'Boş vaxt slotları, randevu statusları və rəylər', 'Azərbaycan, ingilis və rus dillərində interfeys'],
    en: ['Two working apps: one for clients, one for salon owners', 'Free time slots, appointment statuses and reviews', 'Interface in Azerbaijani, English and Russian'],
    ru: ['Два рабочих приложения: для клиентов и для владельцев салонов', 'Свободные слоты, статусы записей и отзывы', 'Интерфейс на азербайджанском, английском и русском'],
  },
  // First frame of the preview video: real screens, used wherever a still is needed (home peek, next-project card)
  cover: {
    src: '/videos/beauty-preview-v1-poster.jpg',
    alt: {
      az: 'BeautyApp-in real ekranları: yaxın salonlar, salon səhifəsi, vaxt seçimi və salon sahibinin paneli',
      en: 'Real screens of BeautyApp: nearby salons, a salon page, choosing a time and the owner\'s dashboard',
      ru: 'Реальные экраны BeautyApp: салоны рядом, страница салона, выбор времени и панель владельца',
    },
    width: 2560,
    height: 1440,
  },
  preview: {
    webm: '/videos/beauty-preview-v1.webm',
    mp4: '/videos/beauty-preview-v1.mp4',
    poster: '/videos/beauty-preview-v1-poster.jpg',
    width: 2560,
    height: 1440,
    alt: {
      az: 'BeautyApp-in real ekranları: yaxın salonlar, salon səhifəsi, vaxt seçimi və salon sahibinin paneli',
      en: 'Real screens of BeautyApp: nearby salons, a salon page, choosing a time and the owner\'s dashboard',
      ru: 'Реальные экраны BeautyApp: салоны рядом, страница салона, выбор времени и панель владельца',
    },
  },
  manifest: [
    { key: 'platform', value: { az: 'iOS · Android', en: 'iOS · Android', ru: 'iOS · Android' } },
    { key: 'apps', value: { az: 'Müştəri · Salon sahibi', en: 'Client · Salon owner', ru: 'Клиент · Владелец салона' } },
    { key: 'client', value: { az: 'React Native · Expo · Redux', en: 'React Native · Expo · Redux', ru: 'React Native · Expo · Redux' } },
    { key: 'backend', value: { az: 'Express · Supabase Postgres', en: 'Express · Supabase Postgres', ru: 'Express · Supabase Postgres' } },
    { key: 'languages', value: { az: 'az · en · ru', en: 'az · en · ru', ru: 'az · en · ru' } },
  ],
  // Read from `git log` of the three BeautyApp repos (backend, client app, owner app): 353 commits, all by Ramin7DEV
  activity: {
    source: 'git log · 3 repos',
    weekStart: '2025-10-06',
    first: '2025-10-08',
    last: '2026-02-09',
    weekly: [37, 54, 119, 47, 0, 0, 0, 0, 32, 0, 33, 13, 10, 0, 0, 0, 0, 6, 2],
  },
  chapters: [
    {
      id: 'problem',
      eyebrow: { az: 'Problem', en: 'Problem', ru: 'Проблема' },
      title: {
        az: 'Randevu hələ də zənglə alınır',
        en: 'Bookings still happen over the phone',
        ru: 'Запись всё ещё идёт по телефону',
      },
      body: {
        az: ['Müştəri salonun boş vaxtını bilmir, salon isə randevuları kağızda və ya mesajlarda saxlayır. BeautyApp hər iki tərəfi bir sistemdə birləşdirir.'],
        en: ['Clients cannot see when a salon is free, and salons keep bookings on paper or in messages. BeautyApp puts both sides into one system.'],
        ru: ['Клиент не видит, когда салон свободен, а салон ведёт записи на бумаге или в мессенджерах. BeautyApp объединяет обе стороны в одной системе.'],
      },
    },
    {
      id: 'product',
      eyebrow: { az: 'Məhsul', en: 'Product', ru: 'Продукт' },
      title: {
        az: 'Bir sistem, iki tətbiq',
        en: 'One system, two apps',
        ru: 'Одна система, два приложения',
      },
      body: {
        az: ['Müştəri tətbiqi axtarış, xəritə, rezervasiya və rəylər üçündür. Salon sahibi tətbiqi randevuları, xidmətləri, ustaları və rəyləri idarə edir.'],
        en: ['The client app is for search, the map, booking and reviews. The owner app runs appointments, services, masters and replies to reviews.'],
        ru: ['Клиентское приложение — для поиска, карты, записи и отзывов. Приложение владельца ведёт записи, услуги, мастеров и ответы на отзывы.'],
      },
    },
    {
      id: 'ai-workflow',
      eyebrow: { az: 'AI', en: 'AI', ru: 'AI' },
      title: {
        az: 'AI ilə yazılıb, AI-sız işləyir',
        en: 'Built with AI, runs without it',
        ru: 'Написано с AI, работает без него',
      },
      body: {
        az: ['Məhsulun özündə AI yoxdur. Üç repo-nu — backend və iki tətbiqi — Codex, Claude Code və Gemini ilə paralel yazdım.'],
        en: ['There is no AI inside the product. I wrote the three repos — the backend and both apps — with Codex, Claude Code and Gemini in parallel.'],
        ru: ['Внутри продукта AI нет. Три репозитория — бэкенд и оба приложения — я писал с Codex, Claude Code и Gemini параллельно.'],
      },
    },
    {
      id: 'system',
      eyebrow: { az: 'Sistem', en: 'System', ru: 'Система' },
      title: {
        az: 'Yalnız həqiqətən boş vaxt göstərilir',
        en: 'Only truly free time is shown',
        ru: 'Показывается только реально свободное время',
      },
      body: {
        az: ['Server iş saatlarını 30 dəqiqəlik slotlara bölür, xidmətin müddətini nəzərə alır və mövcud randevularla kəsişən vaxtı çıxarır. Məsafə GPS koordinatlarından hesablanır.'],
        en: ['The server splits working hours into 30-minute slots, accounts for the service length and drops any time that overlaps an existing booking. Distance is computed from GPS coordinates.'],
        ru: ['Сервер делит рабочие часы на слоты по 30 минут, учитывает длительность услуги и убирает время, пересекающееся с другими записями. Расстояние считается по GPS-координатам.'],
      },
    },
  ],
  // Real screens from one booking (client app) and the salon side (owner app), cleaned frames of a screen recording
  screens: [
    {
      src: '/images/beauty-app/screen-home.webp',
      width: 294,
      height: 648,
      label: { az: 'Yaxın salonlar', en: 'Salons nearby', ru: 'Салоны рядом' },
      note: { az: 'Məsafə GPS-dən hesablanır.', en: 'Distance comes from GPS.', ru: 'Расстояние считается по GPS.' },
    },
    {
      src: '/images/beauty-app/screen-detail.webp',
      width: 294,
      height: 648,
      label: { az: 'Salon səhifəsi', en: 'The salon page', ru: 'Страница салона' },
      note: { az: 'Xidmətlər, ustalar və rəylər.', en: 'Services, masters and reviews.', ru: 'Услуги, мастера и отзывы.' },
    },
    {
      src: '/images/beauty-app/screen-time.webp',
      width: 294,
      height: 648,
      label: { az: 'Boş vaxtı seç', en: 'Pick a free slot', ru: 'Выберите время' },
      note: { az: 'Yalnız boş slotlar göstərilir.', en: 'Only free slots are shown.', ru: 'Показаны только свободные слоты.' },
    },
    {
      src: '/images/beauty-app/screen-confirm.webp',
      width: 294,
      height: 648,
      label: { az: 'Təsdiq', en: 'Confirm', ru: 'Подтверждение' },
      note: { az: 'Salon, xidmət, usta, vaxt və qiymət.', en: 'Salon, service, master, time and price.', ru: 'Салон, услуга, мастер, время и цена.' },
    },
    {
      src: '/images/beauty-app/screen-dash.webp',
      width: 294,
      height: 648,
      label: { az: 'Salon paneli', en: 'The salon dashboard', ru: 'Панель салона' },
      note: { az: 'Salon sahibi bugünkü randevuları görür.', en: 'The owner sees today\'s bookings.', ru: 'Владелец видит записи на сегодня.' },
    },
    {
      src: '/images/beauty-app/screen-reviews.webp',
      width: 294,
      height: 648,
      label: { az: 'Rəylərə cavab', en: 'Replying to reviews', ru: 'Ответы на отзывы' },
      note: { az: 'Salon hər rəyə cavab yaza bilir.', en: 'The salon can answer every review.', ru: 'Салон может ответить на каждый отзыв.' },
    },
  ],
  flow: {
    steps: {
      az: ['Xidmət', 'İş saatları', '30 dəq. slotlar', 'Kəsişmə yoxlanışı', 'Randevu', 'Salon təsdiqi'],
      en: ['Service', 'Working hours', '30-min slots', 'Overlap check', 'Booking', 'Salon confirms'],
      ru: ['Услуга', 'Часы работы', 'Слоты по 30 мин', 'Проверка пересечений', 'Запись', 'Подтверждение салона'],
    },
    fallback: {
      az: 'Vaxt doludursa → həmin slot göstərilmir',
      en: 'Time already taken → that slot is not offered',
      ru: 'Время занято → этот слот не показывается',
    },
    fallbackFrom: 3,
  },
  marquee: ['React Native', 'Expo', 'Redux Toolkit', 'Express', 'Supabase', 'i18next'],
  links: [
    {
      kind: 'linkedin',
      href: 'https://lnkd.in/p/drKhRUJR',
      label: {
        az: 'LinkedIn-də video və post',
        en: 'Video and post on LinkedIn',
        ru: 'Видео и пост в LinkedIn',
      },
    },
    {
      kind: 'github',
      href: 'https://github.com/Ramin7DEV/beauty-app',
      label: {
        az: 'Mənbə kodu (iki tətbiq və API)',
        en: 'Source code (two apps and the API)',
        ru: 'Исходный код (два приложения и API)',
      },
    },
  ],
  accent: 'ivory',
} satisfies Project;
