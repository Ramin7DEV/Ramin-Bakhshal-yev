// Shared pieces for the generated social-preview images (opengraph-image routes).
// Image routes cannot read CSS custom properties, so the colours repeat the light-theme tokens in
// src/styles/tokens.css (bone, ink, ink-soft, muted, hot, hot-text, rule). Keep the two in step.
export const OG_COLORS = {
  bone: '#EBE7DD',
  ink: '#11100E',
  inkSoft: '#3C3A35',
  muted: '#5F5A50',
  hot: '#FF4A1C',
  hotText: '#BA3010',
  rule: '#CFC9BB',
} as const;

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_FONTS = { serif: 'Source Serif 4', mono: 'JetBrains Mono' } as const;

type FontSpec = {
  name: string;
  family: string;
  /** Google Fonts axis list, e.g. "wght@300" or "ital,wght@1,300" */
  axes: string;
  weight: 300 | 500;
  style: 'normal' | 'italic';
  /** Every character the image will draw with this font; only these glyphs are downloaded */
  text: string;
};

const cache = new Map<string, Promise<ArrayBuffer>>();

// Same fonts as the site (src/app/[locale]/fonts.ts). Google serves a TrueType file, which the renderer needs,
// to a client that does not ask for woff2.
function loadFont({ family, axes, text }: Pick<FontSpec, 'family' | 'axes' | 'text'>): Promise<ArrayBuffer> {
  const key = `${family}|${axes}|${text}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const promise = (async () => {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:${axes}&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(css)?.[1];
    if (!url) throw new Error(`No font file for ${family} ${axes}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${family} for the preview image`);
    return res.arrayBuffer();
  })();
  cache.set(key, promise);
  return promise;
}

export async function loadOgFonts(specs: FontSpec[]) {
  return Promise.all(
    specs.map(async (s) => ({ name: s.name, data: await loadFont(s), weight: s.weight, style: s.style })),
  );
}

// The characters of a string plus the digits and punctuation the layout adds around it
export const glyphs = (...parts: string[]) => `${parts.join('')} 0123456789/·.,—-:&`;
