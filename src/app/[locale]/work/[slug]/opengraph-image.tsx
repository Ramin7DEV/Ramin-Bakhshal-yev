import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getProject, getAllSlugs, projects } from '@/content/projects';
import { profile } from '@/content/profile';
import type { Locale, ProjectCategory } from '@/content/types';
import { STATUS_KEY } from '@/lib/status';
import { OG_COLORS as C, OG_FONTS, OG_SIZE, glyphs, loadOgFonts } from '@/lib/og';

export const alt = 'Case Study — Ramin Bakhshalıyev';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

const CATEGORY_KEY = { ai: 'filterAi', mobile: 'filterMobile', 'product-design': 'filterDesign' } as const satisfies Record<
  ProjectCategory,
  string
>;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale });
  const summary = project.summary[loc];
  const hasSummary = Boolean(summary) && !summary.includes('TODO');
  const categories = project.categories.map((c) => t(`work.${CATEGORY_KEY[c]}`)).join(' · ');
  const status = project.status ? t(STATUS_KEY[project.status]) : '';
  const position = `${project.index} / ${String(projects.length).padStart(2, '0')}`;
  const name = loc === 'ru' ? 'Рамин Бахшалиев' : profile.name;
  const role = profile.role[loc];
  const domain = 'raminbakhshaliyev.com';

  // Long titles drop a size step so they stay on two lines at most
  const titleSize = project.title.length <= 12 ? 132 : project.title.length <= 20 ? 108 : 88;

  const serif = glyphs(project.title, summary);
  const mono = glyphs('R.B.', position, categories.toUpperCase(), status.toUpperCase(), domain.toUpperCase(), `${name} ${role}`.toUpperCase());
  const fonts = await loadOgFonts([
    { name: OG_FONTS.serif, family: 'Source Serif 4', axes: 'wght@300', weight: 300, style: 'normal', text: serif },
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
          <span style={{ ...label, color: C.muted }}>{position}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ ...label, color: C.hotText }}>{categories}</span>
          <span
            style={{
              marginTop: 20,
              fontFamily: OG_FONTS.serif,
              fontWeight: 300,
              fontSize: titleSize,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {project.title}
          </span>
          {hasSummary ? (
            <span
              style={{
                marginTop: 28,
                maxWidth: 940,
                fontFamily: OG_FONTS.serif,
                fontWeight: 300,
                fontSize: 28,
                lineHeight: 1.4,
                color: C.inkSoft,
              }}
            >
              {summary}
            </span>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ height: 1, backgroundColor: C.ink }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: C.muted }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {status ? <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: C.hot }} /> : null}
              <span style={label}>{status || domain}</span>
            </div>
            <span style={label}>{`${name} · ${role}`}</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
