import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata, personJsonLd } from '@/lib/seo';
import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { Statement } from '@/components/home/Statement';
import { WorkSection } from '@/components/home/WorkSection';
import { Method } from '@/components/home/Method';
import { LiveStats } from '@/components/home/LiveStats';
import { ContactBlock } from '@/components/home/ContactBlock';
import { HomeMotion } from '@/components/home/HomeMotion';
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
  const jsonLd = personJsonLd(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero locale={locale} />
      <Marquee words={t.raw('live.marquee') as string[]} />
      <Statement label={t('live.sections.statement')} text={t('hero.description')} />
      <WorkSection locale={locale} />
      <Method locale={locale} />
      <LiveStats
        label={t('live.sections.stats')}
        log={t('live.log.stats')}
        labels={{
          components: t('live.stats.components'),
          time: t('live.stats.time'),
          you: t('live.stats.you'),
          baku: t('live.stats.baku'),
        }}
      />
      <ContactBlock locale={locale} />
      <HomeMotion />
    </>
  );
}
