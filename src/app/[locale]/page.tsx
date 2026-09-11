import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata, personJsonLd } from '@/lib/seo';
import { Hero } from '@/components/home/Hero';
import { ProofStrip } from '@/components/home/ProofStrip';
import { SelectedWork } from '@/components/home/SelectedWork';
import { ProcessSnapshot } from '@/components/home/ProcessSnapshot';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { FinalCta } from '@/components/home/FinalCta';
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
  const loc = locale as Locale;
  const jsonLd = personJsonLd(loc);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero locale={loc} />
      <ProofStrip />
      <SelectedWork locale={loc} />
      <ProcessSnapshot />
      <AboutTeaser />
      <FinalCta />
    </>
  );
}

