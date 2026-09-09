import type { MetadataRoute } from 'next';
import { THEME_COLOR } from '@/lib/theme';
import { profile } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — AI-first Engineer`,
    short_name: profile.name,
    description: `Personal portfolio of ${profile.name}.`,
    start_url: '/az',
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
