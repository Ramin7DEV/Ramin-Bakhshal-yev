import type { Profile } from './types';

export const profile = {
  name: 'Ramin Bakhshalıyev',
  role: {
    az: 'TODO(content): Ramin rol (AZ)',
    en: 'TODO(content): Ramin role (EN)',
    ru: 'TODO(content): Ramin role (RU)',
  },
  positioning: {
    az: 'TODO(content): Positioning cümləsi (AZ)',
    en: 'TODO(content): Positioning statement (EN)',
    ru: 'TODO(content): Positioning statement (RU)',
  },
  bio: {
    az: ['TODO(content): Bio (AZ)'],
    en: ['TODO(content): Bio (EN)'],
    ru: ['TODO(content): Bio (RU)'],
  },
  location: {
    az: 'Bakı, Azərbaycan (UTC+4)',
    en: 'Baku, Azerbaijan (UTC+4)',
    ru: 'Баку, Азербайджан (UTC+4)',
  },
  availability: {
    az: 'TODO(content): İş statusu (AZ)',
    en: 'TODO(content): Availability status (EN)',
    ru: 'TODO(content): Availability status (RU)',
  },
  email: 'raminbakhshaliyev@gmail.com',
  social: [
    {
      kind: 'github',
      href: 'https://github.com/Ramin7DEV',
      label: {
        az: 'GitHub',
        en: 'GitHub',
        ru: 'GitHub',
      },
    },
  ],
} satisfies Profile;
