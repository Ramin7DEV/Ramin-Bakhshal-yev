import type { Project } from '../types';

export const beautyApp = {
  slug: 'beauty-app',
  index: '03',
  categories: ['ai', 'product-design'],
  title: 'Beauty App',
  summary: {
    az: 'TODO(content): Beauty App kart üçün 1 cümləlik xülasə (AZ)',
    en: 'TODO(content): Beauty App 1-sentence card summary (EN)',
    ru: 'TODO(content): Beauty App 1-sentence card summary (RU)',
  },
  statement: {
    az: 'TODO(content): Beauty App hero üçün 2-3 cümləlik bəyanat (AZ)',
    en: 'TODO(content): Beauty App 2-3 sentence hero statement (EN)',
    ru: 'TODO(content): Beauty App 2-3 sentence hero statement (RU)',
  },
  role: {
    az: ['TODO(content): Beauty App rol bəndləri (AZ)'],
    en: ['TODO(content): Beauty App role bullet points (EN)'],
    ru: ['TODO(content): Beauty App role bullet points (RU)'],
  },
  stack: [],
  outcome: {
    az: ['TODO(content): Beauty App real nəticələr (AZ)'],
    en: ['TODO(content): Beauty App real outcomes (EN)'],
    ru: ['TODO(content): Beauty App real outcomes (RU)'],
  },
  cover: {
    src: '/images/project-beauty-app-editorial.jpg',
    alt: {
      az: 'İnterfeys quruluşunu təmsil edən abstrakt canlı diaqram',
      en: 'Abstract animated diagram representing interface structure',
      ru: 'Абстрактная анимированная схема структуры интерфейса',
    },
    width: 1448,
    height: 1086,
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
        az: 'TODO(content): Beauty App problem başlığı (AZ)',
        en: 'TODO(content): Beauty App problem title (EN)',
        ru: 'TODO(content): Beauty App problem title (RU)',
      },
      body: {
        az: ['TODO(content): Beauty App problem paraqrafı (AZ)'],
        en: ['TODO(content): Beauty App problem paragraph (EN)'],
        ru: ['TODO(content): Beauty App problem paragraph (RU)'],
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
        az: 'TODO(content): Beauty App rol başlığı (AZ)',
        en: 'TODO(content): Beauty App role title (EN)',
        ru: 'TODO(content): Beauty App role title (RU)',
      },
      body: {
        az: ['TODO(content): Beauty App rol paraqrafı (AZ)'],
        en: ['TODO(content): Beauty App role paragraph (EN)'],
        ru: ['TODO(content): Beauty App role paragraph (RU)'],
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
        az: 'TODO(content): Beauty App AI iş prosesi başlığı (AZ)',
        en: 'TODO(content): Beauty App AI workflow title (EN)',
        ru: 'TODO(content): Beauty App AI workflow title (RU)',
      },
      body: {
        az: ['TODO(content): Beauty App AI iş prosesi paraqrafı (AZ)'],
        en: ['TODO(content): Beauty App AI workflow paragraph (EN)'],
        ru: ['TODO(content): Beauty App AI workflow paragraph (RU)'],
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
        az: 'TODO(content): Beauty App sistem memarlığı başlığı (AZ)',
        en: 'TODO(content): Beauty App system architecture title (EN)',
        ru: 'TODO(content): Beauty App system architecture title (RU)',
      },
      body: {
        az: ['TODO(content): Beauty App sistem paraqrafı (AZ)'],
        en: ['TODO(content): Beauty App system paragraph (EN)'],
        ru: ['TODO(content): Beauty App system paragraph (RU)'],
      },
    },
  ],
  links: [],
  accent: 'ivory',
} satisfies Project;
