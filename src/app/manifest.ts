import type { MetadataRoute } from 'next';
import { THEME_COLOR } from '@/lib/theme';
import { profile } from '@/content/profile';
import { routing } from '@/i18n/routing';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Mobile & AI Product Builder`,
    short_name: profile.name,
    description: `Personal portfolio of ${profile.name}.`,
    start_url: `/${routing.defaultLocale}`,
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
