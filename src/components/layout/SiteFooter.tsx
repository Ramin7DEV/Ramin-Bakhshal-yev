import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { profile } from '@/content/profile';
import styles from './SiteFooter.module.css';

type SiteFooterProps = {
  locale: string;
};

export async function SiteFooter({ locale }: SiteFooterProps) {
  const t = await getTranslations({ locale });

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Column 1: Brand & editorial positioning */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.brandTitle}>
              {profile.name}
            </Link>
            <p className={styles.brandTagline}>
              {t('hero.eyebrow')} — {t('meta.defaultDescription')}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className={styles.navColumn}>
            <p className={styles.columnHeading}>{t('nav.work')}</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/work" className={styles.link}>
                  {t('common.actions.allProjects')}
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Networks */}
          <div className={styles.contactColumn}>
            <p className={styles.columnHeading}>{t('contact.socialTitle')}</p>
            <ul className={styles.linkList}>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className={styles.link}
                >
                  {profile.email}
                </a>
              </li>
              {profile.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    {item.label[locale as 'az' | 'en' | 'ru']} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className={styles.bottomBar}>
          <p className={styles.metaText}>{t('footer.copyright')}</p>
          <p className={styles.metaText}>{t('footer.builtIn')}</p>
          <a href="#main-content" className={styles.backToTop}>
            {t('footer.backToTop')} ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
