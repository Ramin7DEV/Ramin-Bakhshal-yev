import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import { buildMetadata, personJsonLd } from '@/lib/seo';
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
    path: '/',
    title: t('home.title'),
    description: t('home.description'),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const loc = locale as Locale;
  const jsonLd = personJsonLd(loc);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
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
