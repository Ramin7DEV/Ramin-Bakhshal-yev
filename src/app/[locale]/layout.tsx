import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { fontClassName } from './fonts';
import { THEME_COLOR } from '@/lib/theme';
import { getSiteUrl } from '@/lib/seo';
import { SkipLink } from '@/components/layout/SkipLink';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('defaultTitle'),
      template: t('titleTemplate'),
    },
    description: t('defaultDescription'),
  };
}

export const viewport = {
  themeColor: THEME_COLOR,
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await getMessages()) as Record<string, unknown>;

  // Pass only namespaces required by client components to keep client bundle minimal
  const clientMessages = {
    nav: messages.nav,
    locale: messages.locale,
    common: messages.common,
  };

  return (
    <html lang={locale} className={fontClassName}>
      <body>
        <NextIntlClientProvider messages={clientMessages}>
          <SkipLink locale={locale} />
          <SiteHeader locale={locale} />
          <main id="main-content">
            {children}
          </main>
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
