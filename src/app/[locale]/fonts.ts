import { Roboto_Flex, Source_Serif_4, JetBrains_Mono } from 'next/font/google';

// Display face. Width, weight and optical-size axes drive the kinetic type.
// One family covers latin, the Azerbaijani schwa (U+0259 / U+018F) and Cyrillic, so az, en and ru headings share the
// same letterforms. (Bricolage Grotesque, used before, has neither: its missing glyphs fell through to a local Arial.)
// Only latin is preloaded; latin-ext and Cyrillic files load through unicode-range on the pages that use them.
const display = Roboto_Flex({
  variable: '--font-display-sans',
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  display: 'swap',
  preload: true,
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

export const fontClassName = `${display.variable} ${serif.variable} ${mono.variable}`;
