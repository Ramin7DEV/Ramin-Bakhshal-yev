'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/content/types';
import styles from './LocaleSwitcher.module.css';

const LOCALES: { code: Locale; desktopLabel: string; fullLabel: string }[] = [
  { code: 'az', desktopLabel: 'AZ', fullLabel: 'Azərbaycan' },
  { code: 'en', desktopLabel: 'EN', fullLabel: 'English' },
  { code: 'ru', desktopLabel: 'RU', fullLabel: 'Русский' },
];

type LocaleSwitcherProps = {
  variant?: 'desktop' | 'mobile';
  onSelect?: () => void;
};

export function LocaleSwitcher({
  variant = 'desktop',
  onSelect,
}: LocaleSwitcherProps) {
  const t = useTranslations('locale');
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = (newLocale: Locale) => {
    if (newLocale !== currentLocale) {
      router.replace(pathname, { locale: newLocale });
    }
    onSelect?.();
  };

  if (variant === 'mobile') {
    return (
      <ul className={styles.mobileList} aria-label={t('switcherLabel')}>
        {LOCALES.map(({ code, fullLabel }) => (
          <li key={code}>
            <button
              type="button"
              className={styles.mobileButton}
              aria-current={code === currentLocale ? 'true' : undefined}
              onClick={() => handleSwitch(code)}
            >
              <span>{fullLabel}</span>
              {code === currentLocale && <span aria-hidden="true">✓</span>}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={styles.desktopList} aria-label={t('switcherLabel')}>
      {LOCALES.map(({ code, desktopLabel }, index) => (
        <li key={code} className={styles.desktopItem}>
          {index > 0 && (
            <span className={styles.divider} aria-hidden="true">
              ·
            </span>
          )}
          <button
            type="button"
            className={styles.desktopButton}
            aria-current={code === currentLocale ? 'true' : undefined}
            onClick={() => handleSwitch(code)}
          >
            {desktopLabel}
          </button>
        </li>
      ))}
    </ul>
  );
}
