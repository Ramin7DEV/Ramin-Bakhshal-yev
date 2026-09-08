import { Source_Serif_4, Manrope, IBM_Plex_Mono } from 'next/font/google';

const display = Source_Serif_4({
  variable: '--font-display-face',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
});

const body = Manrope({
  variable: '--font-body-face',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  preload: false,
});

const mono = IBM_Plex_Mono({
  variable: '--font-mono-face',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
});

export const fontClassName = `${display.variable} ${body.variable} ${mono.variable}`;
