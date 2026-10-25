import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { profile } from '@/content/profile';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/content/types';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutCapabilities, AboutExperience, AboutPrinciples, AboutTimeline } from '@/components/about/AboutSections';
import { Statement } from '@/components/home/Statement';
import { ContactBlock } from '@/components/home/ContactBlock';
import { PageMotion } from '@/components/live/PageMotion';

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
    <>
      <AboutHero locale={loc} />
      <Statement label={t('about.sections.bio')} text={profile.bio[loc].join(' ')} />
      <AboutPrinciples locale={loc} />
      <AboutExperience locale={loc} />
      <AboutCapabilities locale={loc} />
      <AboutTimeline locale={loc} />
      <ContactBlock locale={locale} label={t('nav.contact')} />
      <PageMotion page="about" />
    </>
  );
}
