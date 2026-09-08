import { Source_Serif_4, Manrope, IBM_Plex_Mono } from 'next/font/google';

// 1. Latin + Latin-ext fonts (for az and en locales)
const displayLatin = Source_Serif_4({
  variable: '--font-display-face',
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
});

const bodyLatin = Manrope({
  variable: '--font-body-face',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
});

const monoLatin = IBM_Plex_Mono({
  variable: '--font-mono-face',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
});

// 2. Cyrillic fonts (for ru locale, no latin-ext)
const displayCyrillic = Source_Serif_4({
  variable: '--font-display-face',
  subsets: ['latin', 'cyrillic'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
});

const bodyCyrillic = Manrope({
  variable: '--font-body-face',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
});

const monoCyrillic = IBM_Plex_Mono({
  variable: '--font-mono-face',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
});

export const latinFonts = `${displayLatin.variable} ${bodyLatin.variable} ${monoLatin.variable}`;
export const cyrillicFonts = `${displayCyrillic.variable} ${bodyCyrillic.variable} ${monoCyrillic.variable}`;

export function getFontClassName(locale: string): string {
  return locale === 'ru' ? cyrillicFonts : latinFonts;
}
