'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import styles from './LocaleSwitcher.module.css';

export function LocaleSwitcher() {
  const t = useTranslations('locale');
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ul className={styles.list} aria-label={t('switcherLabel')}>
      {routing.locales.map((code) => (
        <li key={code}>
          <button
            type="button"
            lang={code}
            className={styles.button}
            aria-label={t(code)}
            aria-current={code === current ? 'true' : undefined}
            onClick={() => code !== current && router.replace(pathname, { locale: code })}
          >
            {code}
          </button>
        </li>
      ))}
    </ul>
  );
}
