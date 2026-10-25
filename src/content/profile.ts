import type { Profile } from './types';

// Facts from Ramin (LinkedIn profile and messages, Oct 2026); nothing here is invented
export const profile: Profile = {
  name: 'Ramin Bakhshalıyev',
  role: {
    az: 'Mobile & AI Product Builder',
    en: 'Mobile & AI Product Builder',
    ru: 'Mobile & AI Product Builder',
  },
  positioning: {
    az: 'Fikirləri AI ilə məhsula çevirirəm.',
    en: 'I turn ideas into products with AI.',
    ru: 'Превращаю идеи в продукты с помощью AI.',
  },
  bio: {
    az: ['İdeyaları AI ilə işləyən məhsullara və avtomatlaşdırılmış iş axınlarına çevirirəm. Karyeramın əvvəlində iOS tətbiqləri və fintech məhsulları üzərində işləmişəm. Bu gün fokusum generativ AI və coding agentlərdir.'],
    en: ['I turn ideas into AI-powered products and automated workflows. I started out on iOS apps and fintech products. Today my focus is generative AI and coding agents.'],
    ru: ['Превращаю идеи в продукты на AI и автоматизированные рабочие процессы. Начинал с iOS-приложений и финтех-продуктов. Сегодня мой фокус — генеративный AI и coding-агенты.'],
  },
  location: {
    az: 'Bakı, Azərbaycan (UTC+4)',
    en: 'Baku, Azerbaijan (UTC+4)',
    ru: 'Баку, Азербайджан (UTC+4)',
  },
  availability: {
    az: 'Freelance layihələr, tam iş və birgə məhsullar üçün açığam',
    en: 'Open to freelance projects, full-time roles and product collaborations',
    ru: 'Открыт к фриланс-проектам, работе в штате и совместным продуктам',
  },
  focus: {
    az: 'Generativ AI · coding agentlər',
    en: 'Generative AI · coding agents',
    ru: 'Генеративный AI · coding-агенты',
  },
  email: 'raminbakhshaliyev@gmail.com',
  phone: { display: '+994 10 372 14 84', tel: '+994103721484' },
  // From Ramin (LinkedIn dates, Oct 2026) and the two codebases; the Flutter start is the first commit of that repo
  experience: [
    {
      company: 'FitNest',
      href: 'https://fitnest.az/az',
      role: { az: 'iOS Developer', en: 'iOS Developer', ru: 'iOS Developer' },
      mode: { az: 'Uzaqdan · yarım ştat', en: 'Remote · part-time', ru: 'Удалённо · частичная занятость' },
      start: '2026-07',
      summary: {
        az: ['Bakıda idman zallarına bir abunə ilə QR girişi verən FitNest-in native iOS tətbiqi üzərində işləyirəm: UIKit, MVVM, üç dildə interfeys.'],
        en: ['I work on the native iOS app of FitNest, a single subscription with QR entry to gyms across Baku: UIKit, MVVM, an interface in three languages.'],
        ru: ['Работаю над нативным iOS-приложением FitNest — единой подписки с QR-входом в спортзалы Баку: UIKit, MVVM, интерфейс на трёх языках.'],
      },
    },
    {
      company: 'Portmanat',
      href: 'https://portmanat.az/',
      role: { az: 'Flutter Developer', en: 'Flutter Developer', ru: 'Flutter Developer' },
      mode: { az: 'Uzaqdan', en: 'Remote', ru: 'Удалённо' },
      start: '2026-05',
      summary: {
        az: ['Tətbiqi iOS və Android üçün Flutter-də sıfırdan yenidən yazdım: biometrik giriş, push bildirişlər, təhlükəsiz saxlama. Hazırda tətbiqin dəstəyini aparıram.'],
        en: ['Rewrote the app from scratch in Flutter for iOS and Android: biometric sign-in, push notifications, secure storage. I now maintain and support it.'],
        ru: ['Переписал приложение с нуля на Flutter для iOS и Android: биометрический вход, push-уведомления, защищённое хранение. Сейчас занимаюсь его поддержкой.'],
      },
    },
    {
      company: 'Portmanat',
      href: 'https://portmanat.az/',
      role: { az: 'iOS Developer', en: 'iOS Developer', ru: 'iOS Developer' },
      mode: { az: 'Ofis · Bakı', en: 'Office · Baku', ru: 'Офис · Баку' },
      start: '2025-01',
      end: '2025-08',
      summary: {
        az: ['Onlayn ödəniş platformasının iOS tətbiqini SwiftUI ilə sıfırdan hazırladım.'],
        en: ['Built the iOS app of the online payments platform from scratch in SwiftUI.'],
        ru: ['С нуля разработал iOS-приложение платформы онлайн-платежей на SwiftUI.'],
      },
    },
  ],
  // Every row is backed by the case studies: the technology is listed in that project's stack
  capabilities: [
    {
      area: { az: 'iOS tətbiqləri', en: 'iOS apps', ru: 'iOS-приложения' },
      tech: { az: 'Swift · SwiftUI', en: 'Swift · SwiftUI', ru: 'Swift · SwiftUI' },
      projects: ['mirrorly'],
    },
    {
      area: { az: 'Cross-platform mobil', en: 'Cross-platform mobile', ru: 'Кроссплатформенные приложения' },
      tech: { az: 'React Native · Expo · TypeScript', en: 'React Native · Expo · TypeScript', ru: 'React Native · Expo · TypeScript' },
      projects: ['azerbaijan-tour-guide', 'beauty-app'],
    },
    {
      area: { az: 'Backend və məlumat bazası', en: 'Backend and databases', ru: 'Бэкенд и базы данных' },
      tech: { az: 'Supabase · Postgres · Edge Functions · Express', en: 'Supabase · Postgres · Edge Functions · Express', ru: 'Supabase · Postgres · Edge Functions · Express' },
      projects: ['mirrorly', 'azerbaijan-tour-guide', 'beauty-app'],
    },
    {
      area: { az: 'AI inteqrasiyası', en: 'AI integration', ru: 'Интеграция AI' },
      tech: { az: 'LLM API · cavabın yoxlanması · ehtiyat model', en: 'LLM APIs · response validation · fallback models', ru: 'LLM API · проверка ответов · резервные модели' },
      projects: ['mirrorly', 'azerbaijan-tour-guide'],
    },
    {
      area: { az: 'Ödəniş və təhlükəsizlik', en: 'Payments and security', ru: 'Платежи и безопасность' },
      tech: { az: 'RevenueCat · App Attest · RLS', en: 'RevenueCat · App Attest · RLS', ru: 'RevenueCat · App Attest · RLS' },
      projects: ['mirrorly', 'azerbaijan-tour-guide'],
    },
    {
      area: { az: 'Admin panel', en: 'Admin panels', ru: 'Админ-панели' },
      tech: { az: 'Next.js · TypeScript', en: 'Next.js · TypeScript', ru: 'Next.js · TypeScript' },
      projects: ['mirrorly'],
    },
  ],
  social: [
    {
      kind: 'linkedin',
      href: 'https://www.linkedin.com/in/raminbakhshaliyev',
      label: { az: 'LinkedIn', en: 'LinkedIn', ru: 'LinkedIn' },
    },
    {
      kind: 'github',
      href: 'https://github.com/Ramin7DEV',
      label: { az: 'GitHub', en: 'GitHub', ru: 'GitHub' },
    },
  ],
};
