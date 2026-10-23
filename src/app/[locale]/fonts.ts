import { Bricolage_Grotesque, Roboto_Flex, Source_Serif_4, JetBrains_Mono } from 'next/font/google';

// Display face. Width and optical-size axes drive the kinetic type.
const display = Bricolage_Grotesque({
  variable: '--font-display-sans',
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz', 'wdth'],
  display: 'swap',
  preload: true,
});

// Bricolage has no Cyrillic and no schwa (U+0259 / U+018F, the Azerbaijani e-schwa letters). Roboto Flex shares its
// width and weight axes, so it fills in for those glyphs only: Bricolage comes first in the stack and the browser
// asks Roboto Flex solely for characters Bricolage lacks (it is fetched through unicode-range, so en pages skip it).
// latin-ext is required for the schwa; without it the browser falls back to an unrelated system-ui font.
const displayCyrillic = Roboto_Flex({
  variable: '--font-display-cyrillic',
  subsets: ['latin-ext', 'cyrillic', 'cyrillic-ext'],
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
