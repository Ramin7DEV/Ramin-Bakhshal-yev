import { Bricolage_Grotesque, Roboto_Flex, Source_Serif_4, JetBrains_Mono } from 'next/font/google';

// Display face. Width and optical-size axes drive the kinetic type.
const display = Bricolage_Grotesque({
  variable: '--font-display-sans',
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz', 'wdth'],
  display: 'swap',
  preload: true,
});

// Bricolage has no Cyrillic. Roboto Flex shares its width axis and fills in for Russian glyphs only
// (the browser fetches it through unicode-range, so az/en pages never download it).
const displayCyrillic = Roboto_Flex({
  variable: '--font-display-cyrillic',
  subsets: ['cyrillic', 'cyrillic-ext'],
  axes: ['opsz', 'wdth'],
  display: 'swap',
  preload: false,
});

const serif = Source_Serif_4({
  variable: '--font-display-face',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  preload: false,
});

const mono = JetBrains_Mono({
  variable: '--font-mono-face',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
});

export const fontClassName = `${display.variable} ${displayCyrillic.variable} ${serif.variable} ${mono.variable}`;
