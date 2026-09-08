import type { Project } from '../types';

export const mirrorly = {
  slug: 'mirrorly',
  index: '01',
  status: 'in-development',
  categories: ['ai', 'mobile'],
  year: '2025',
  title: 'Mirrorly',
  summary: {
    az: 'TODO(content): Mirrorly kart üçün 1 cümləlik xülasə (AZ)',
    en: 'TODO(content): Mirrorly 1-sentence card summary (EN)',
    ru: 'TODO(content): Mirrorly 1-sentence card summary (RU)',
  },
  statement: {
    az: 'TODO(content): Mirrorly hero üçün 2-3 cümləlik bəyanat (AZ)',
    en: 'TODO(content): Mirrorly 2-3 sentence hero statement (EN)',
    ru: 'TODO(content): Mirrorly 2-3 sentence hero statement (RU)',
  },
  role: {
    az: ['TODO(content): Mirrorly rol bəndləri (AZ)'],
    en: ['TODO(content): Mirrorly role bullet points (EN)'],
    ru: ['TODO(content): Mirrorly role bullet points (RU)'],
  },
  stack: ['iOS', 'SwiftUI', 'Vision AI', 'CoreML'],
  outcome: {
    az: ['TODO(content): Mirrorly real nəticələr (AZ)'],
    en: ['TODO(content): Mirrorly real outcomes (EN)'],
    ru: ['TODO(content): Mirrorly real outcomes (RU)'],
  },
  cover: {
    src: '/images/project-mirrorly.png',
    alt: {
      az: 'Mirrorly mobil tətbiqi interfeysi',
      en: 'Mirrorly mobile application interface',
      ru: 'Интерфейс мобильного приложения Mirrorly',
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
        az: 'TODO(content): Mirrorly problem başlığı (AZ)',
        en: 'TODO(content): Mirrorly problem title (EN)',
        ru: 'TODO(content): Mirrorly problem title (RU)',
      },
      body: {
        az: ['TODO(content): Mirrorly problem paraqrafı (AZ)'],
        en: ['TODO(content): Mirrorly problem paragraph (EN)'],
        ru: ['TODO(content): Mirrorly problem paragraph (RU)'],
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
        az: 'TODO(content): Mirrorly rol başlığı (AZ)',
        en: 'TODO(content): Mirrorly role title (EN)',
        ru: 'TODO(content): Mirrorly role title (RU)',
      },
      body: {
        az: ['TODO(content): Mirrorly rol paraqrafı (AZ)'],
        en: ['TODO(content): Mirrorly role paragraph (EN)'],
        ru: ['TODO(content): Mirrorly role paragraph (RU)'],
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
        az: 'TODO(content): Mirrorly AI iş prosesi başlığı (AZ)',
        en: 'TODO(content): Mirrorly AI workflow title (EN)',
        ru: 'TODO(content): Mirrorly AI workflow title (RU)',
      },
      body: {
        az: ['TODO(content): Mirrorly AI iş prosesi paraqrafı (AZ)'],
        en: ['TODO(content): Mirrorly AI workflow paragraph (EN)'],
        ru: ['TODO(content): Mirrorly AI workflow paragraph (RU)'],
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
        az: 'TODO(content): Mirrorly sistem memarlığı başlığı (AZ)',
        en: 'TODO(content): Mirrorly system architecture title (EN)',
        ru: 'TODO(content): Mirrorly system architecture title (RU)',
      },
      body: {
        az: ['TODO(content): Mirrorly sistem paraqrafı (AZ)'],
        en: ['TODO(content): Mirrorly system paragraph (EN)'],
        ru: ['TODO(content): Mirrorly system paragraph (RU)'],
      },
    },
  ],
  links: [],
  accent: 'gold',
} satisfies Project;
