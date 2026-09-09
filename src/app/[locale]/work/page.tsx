import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { projects } from '@/content/projects';
import { Link } from '@/i18n/navigation';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/content/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale: locale as Locale,
    path: '/work',
    title: t('work.title'),
    description: t('work.description'),
  });
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const loc = locale as Locale;

  return (
    <main>
      <h1>{t('work.title')}</h1>
      <p>{t('work.intro')}</p>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`}>
              <span>{project.index}</span> <span>{project.title}</span>
              <p>{project.summary[loc]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
