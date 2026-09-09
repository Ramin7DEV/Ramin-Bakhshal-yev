import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { profile } from '@/content/profile';
import { PrimaryNav } from './PrimaryNav';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenu } from './MobileMenu';
import { HeaderShell } from './HeaderShell';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
  locale: string;
};

export async function SiteHeader({ locale }: SiteHeaderProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });

  const navItems = [
    { href: '/work', label: t('work') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <HeaderShell>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.left} aria-label={profile.name}>
            <span className={styles.monogram}>RB</span>
            <span className={styles.fullName}>{profile.name}</span>
          </Link>

          <div className={styles.navWrapper}>
            <PrimaryNav items={navItems} ariaLabel={t('primaryLabel')} />
          </div>

          <div className={styles.right}>
            <span className={styles.statusText}>{t('status')}</span>
            <div className={styles.desktopSwitcher}>
              <LocaleSwitcher variant="desktop" />
            </div>
            <MobileMenu email={profile.email} />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}
