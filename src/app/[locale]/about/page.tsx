import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { profile } from '@/content/profile';
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
    path: '/about',
    title: t('about.title'),
    description: t('about.description'),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const loc = locale as Locale;

  return (
    <main>
      <h1>{t('about.title')}</h1>
      <p>{profile.positioning[loc]}</p>
      <section>
        <h2>{t('about.principlesTitle')}</h2>
        <ul>
          {profile.bio[loc].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{t('about.toolsTitle')}</h2>
        <p>{profile.role[loc]}</p>
      </section>
      <section>
        <h2>{t('about.aiWorkflowTitle')}</h2>
        <p>{t('process.title')}</p>
      </section>
    </main>
  );
}
