import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getProject, getAllSlugs } from '@/content/projects';
import { buildMetadata, creativeWorkJsonLd } from '@/lib/seo';
import { CaseStudy } from '@/components/case/CaseStudy';
import type { Locale } from '@/content/types';

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });
  const summary = project.summary[locale as Locale];
  const description =
    !summary || summary.includes('TODO')
      ? t('defaultDescription')
      : summary;

  return buildMetadata({
    locale: locale as Locale,
    path: `/work/${slug}`,
    title: project.title,
    description,
    isArticle: true,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  setRequestLocale(locale);
  const jsonLd = creativeWorkJsonLd(project, locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <CaseStudy project={project} locale={locale} />
    </>
  );
}
