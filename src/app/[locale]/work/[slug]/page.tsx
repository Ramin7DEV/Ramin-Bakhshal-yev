import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getProject, getAllSlugs } from '@/content/projects';
import { Link } from '@/i18n/navigation';
import { buildMetadata, creativeWorkJsonLd } from '@/lib/seo';
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
  const t = await getTranslations({ locale });
  const loc = locale as Locale;
  const jsonLd = creativeWorkJsonLd(project, loc);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Link href="/work">{t('common.actions.backToWork')}</Link>
      <h1>
        {project.index} {project.title}
      </h1>
      <p>{project.statement[loc]}</p>
      <dl>
        {project.year ? (
          <>
            <dt>{t('caseStudy.factYear')}</dt>
            <dd>{project.year}</dd>
          </>
        ) : null}
        {project.status ? (
          <>
            <dt>{t('caseStudy.factStatus')}</dt>
            <dd>{project.status}</dd>
          </>
        ) : null}
        {project.stack.length > 0 ? (
          <>
            <dt>{t('caseStudy.factStack')}</dt>
            <dd>{project.stack.join(', ')}</dd>
          </>
        ) : null}
      </dl>
      <section>
        <h2>{t('caseStudy.chapterProblem')}</h2>
        <ul>
          {project.chapters.map((chapter) => (
            <li key={chapter.id}>
              <h3>{chapter.title[loc]}</h3>
              {chapter.body[loc].map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
