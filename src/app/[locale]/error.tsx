'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PageShell } from '@/components/live/PageShell';

const RETRY_KEY = 'error-retry';

// Any error thrown while a page renders in the browser lands here instead of on Next's blank fallback.
// A reload fixed the failures seen so far, so the first error on an address reloads it once by itself;
// a second error on the same address shows the message and a button.
export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('errorPage');

  useEffect(() => {
    console.error(error);
    try {
      const path = location.pathname;
      if (sessionStorage.getItem(RETRY_KEY) !== path) {
        sessionStorage.setItem(RETRY_KEY, path);
        location.reload();
        return;
      }
      sessionStorage.removeItem(RETRY_KEY);
    } catch {
      // Storage blocked: show the message straight away
    }
  }, [error]);

  return (
    <PageShell>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <p>
        <button type="button" onClick={reset}>
          {t('retry')}
        </button>
      </p>
      <Link href="/">{t('home')}</Link>
    </PageShell>
  );
}
