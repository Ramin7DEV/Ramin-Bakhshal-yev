import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { projects } from '@/content/projects';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/content/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

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
