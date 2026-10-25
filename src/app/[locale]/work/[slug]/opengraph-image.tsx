import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getProject, getAllSlugs } from '@/content/projects';
import type { Locale } from '@/content/types';

export const alt = 'Case Study — Ramin Bakhshalıyev';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

let fontPromise: Promise<ArrayBuffer> | null = null;
async function getFont(): Promise<ArrayBuffer> {
  if (!fontPromise) {
    fontPromise = fetch(
      'https://fonts.gstatic.com/s/sourceserifpro/v18/neIXzD-0qpwxpaWvjeD0X88SAOeasasahSs.ttf'
    ).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch font for OG generation');
      return res.arrayBuffer();
    });
  }
  return fontPromise;
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const fontData = await getFont();
  const summary = project.summary[locale as Locale];
  const hasValidSummary = summary && !summary.includes('TODO');

  const categories = project.categories.join(' · ').toUpperCase();
  const title = project.title;
  const index = project.index;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#08090A',
          padding: '80px',
          fontFamily: 'Source Serif Pro',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              style={{
                color: '#D3AA69',
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              RB
            </span>
            <span
              style={{
                color: '#A8A399',
                fontSize: 16,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Case Study
            </span>
          </div>
          <span
            style={{
              color: '#D3AA69',
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: '0.16em',
            }}
          >
            {index}
          </span>
        </div>

        {/* Center content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              color: '#88DDD7',
              fontSize: 18,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {categories}
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 72,
              fontWeight: 600,
              color: '#EDE9DF',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            {title}
          </h1>
          {hasValidSummary ? (
            <p
              style={{
                margin: 0,
                fontSize: 24,
                color: '#A8A399',
                lineHeight: 1.4,
                maxWidth: '900px',
              }}
            >
              {summary}
            </p>
          ) : null}
        </div>

        {/* Bottom bar with gold hairline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(211, 170, 105, 0.4)',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 15,
              color: '#837E76',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span>raminbakhshaliyev.com</span>
            <span>Ramin Bakhshalıyev · Mobile & AI Product Builder</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Source Serif Pro',
          data: fontData,
          weight: 600,
          style: 'normal',
        },
      ],
    }
  );
}
