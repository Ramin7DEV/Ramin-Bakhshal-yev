import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { profile } from '@/content/profile';
import { BakuClock } from '@/components/live/BakuClock';
import { LocaleSwitcher } from './LocaleSwitcher';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
  locale: string;
};

const initials = profile.name
  .split(' ')
  .map((part) => `${part[0]}.`)
  .join('');

// Fixed, transparent, inverts over whatever is underneath (mix-blend-mode: difference)
export async function SiteHeader({ locale }: SiteHeaderProps) {
  const t = await getTranslations({ locale });

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.mark} aria-label={profile.name}>
        {initials}
      </Link>
      <span className={styles.clock}>
        <BakuClock seconds prefix={`${t('live.clockCity')} `} />
      </span>
      <div className={styles.right}>
        <nav aria-label={t('nav.primaryLabel')} className={styles.nav}>
          <Link href="/#work">{t('nav.work')}</Link>
          <Link href="/#method">{t('live.navMethod')}</Link>
          <Link href="/#contact">{t('nav.contact')}</Link>
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
