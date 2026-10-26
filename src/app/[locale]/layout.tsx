import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { fontClassName } from './fonts';
import { THEME_COLOR, THEME_COLOR_DARK, THEME_SCRIPT } from '@/lib/theme';
import { getSiteUrl } from '@/lib/seo';
import { getAllSlugs } from '@/content/projects';
import { SkipLink } from '@/components/layout/SkipLink';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SmoothScroll } from '@/components/live/SmoothScroll';
import { CursorTrail } from '@/components/live/CursorTrail';
import { PageWipe } from '@/components/live/PageWipe';
import { BuildObserver } from '@/components/live/BuildObserver';
import { LiveDock } from '@/components/live/LiveDock';

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

// Matches the system preference on first load; ThemeToggle re-syncs it when the visitor picks a theme
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLOR },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLOR_DARK },
  ],
};

// Runs before first paint: content that animates in is only hidden when JavaScript is there to reveal it,
// and the theme is set before anything is drawn, so a dark visitor never sees a light flash
const LIVE_JS = `document.documentElement.classList.add('live-js');${THEME_SCRIPT}`;

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
  const t = await getTranslations({ locale, namespace: 'live.dock' });

  // Pass only namespaces required by client components to keep client bundle minimal
  const clientMessages = {
    locale: messages.locale,
    errorPage: messages.errorPage,
  };

  return (
    // live-js and data-theme are set by the inline script before React hydrates, so <html> legitimately differs
    <html lang={locale} className={fontClassName} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LIVE_JS }} />
      </head>
      <body>
        <NextIntlClientProvider messages={clientMessages}>
          <SkipLink locale={locale} />
          <SiteHeader locale={locale} />
          {/* Fixed chrome stays outside: ScrollSmoother moves #smooth-content with transforms */}
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <main id="main-content">{children}</main>
            </div>
          </div>
          <LiveDock
            placeholder={t('placeholder')}
            hint={t('hint')}
            toggleLabel={t('toggle')}
            inputLabel={t('label')}
            slugs={getAllSlugs()}
          />
          <PageWipe />
          <CursorTrail />
          <SmoothScroll />
          <BuildObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
