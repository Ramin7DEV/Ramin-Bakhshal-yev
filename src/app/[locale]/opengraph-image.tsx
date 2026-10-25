import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import { OG_COLORS as C, OG_FONTS, OG_SIZE, glyphs, loadOgFonts } from '@/lib/og';

export const alt = 'Ramin Bakhshalıyev — Mobile & AI Product Builder';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const [first = '', ...rest] = (loc === 'ru' ? 'Рамин Бахшалиев' : profile.name).split(' ');
  const last = rest.join(' ');
  const role = profile.role[loc];
  const status = profile.availability[loc];
  const description = t('defaultDescription');
  const place = profile.location[loc].replace(/\s*\(UTC[^)]*\)/, '');
  const domain = 'raminbakhshaliyev.com';

  const serif = glyphs(first, last, description);
  const mono = glyphs('R.B.', role.toUpperCase(), status.toUpperCase(), place.toUpperCase(), domain.toUpperCase());
  const fonts = await loadOgFonts([
    { name: OG_FONTS.serif, family: 'Source Serif 4', axes: 'wght@300', weight: 300, style: 'normal', text: serif },
    { name: OG_FONTS.serif, family: 'Source Serif 4', axes: 'ital,wght@1,300', weight: 300, style: 'italic', text: serif },
    { name: OG_FONTS.mono, family: 'JetBrains Mono', axes: 'wght@500', weight: 500, style: 'normal', text: mono },
  ]);

  const label = {
    fontFamily: OG_FONTS.mono,
    fontWeight: 500,
    fontSize: 17,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 72px',
          backgroundColor: C.bone,
          color: C.ink,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...label, fontSize: 22, letterSpacing: '0.04em' }}>R.B.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: C.muted }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: C.hot }} />
            <span style={label}>{status}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ ...label, color: C.hotText }}>{role}</span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: 22,
              fontFamily: OG_FONTS.serif,
              fontWeight: 300,
              fontSize: 112,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            <span style={{ marginRight: 28 }}>{first}</span>
            <span style={{ fontStyle: 'italic', color: C.hotText }}>{last}</span>
          </div>
          <span
            style={{
              marginTop: 30,
              maxWidth: 900,
              fontFamily: OG_FONTS.serif,
              fontWeight: 300,
              fontSize: 30,
              lineHeight: 1.4,
              color: C.inkSoft,
            }}
          >
            {description}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ height: 1, backgroundColor: C.ink }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: C.muted }}>
            <span style={label}>{domain}</span>
            <span style={label}>{place}</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
