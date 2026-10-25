import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { WorkSection } from '@/components/home/WorkSection';
import { ContactBlock } from '@/components/home/ContactBlock';
import { PageShell } from '@/components/live/PageShell';
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

  return (
    <>
      <PageShell>
        <h1>{t('work.title')}</h1>
        <WorkSection locale={locale} />
      </PageShell>
      <ContactBlock locale={locale} label={t('nav.contact')} />
    </>
  );
}
