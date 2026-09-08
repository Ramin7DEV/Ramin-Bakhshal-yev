import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const loc = locale as Locale;

  return (
    <main>
      <h1>
        {t('hero.titleLines.0')} {t('hero.titleLines.1')}
      </h1>
      <p>{profile.positioning[loc]}</p>
      <ul>
        <li>
          {t('nav.work')}: {projects.map((p) => p.title).join(', ')}
        </li>
        <li>{t('process.title')}</li>
        <li>{t('about.title')}</li>
        <li>{t('contact.title')}</li>
      </ul>
    </main>
  );
}
