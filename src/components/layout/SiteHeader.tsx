import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { BakuClock } from '@/components/live/BakuClock';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
  locale: string;
};

const SECTIONS = ['statement', 'work', 'method', 'stats', 'contact'] as const;

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
          <Link href="/about">{t('nav.about')}</Link>
          <Link href="/contact">{t('nav.contact')}</Link>
        </nav>
        <div className={styles.locales}>
          <LocaleSwitcher />
        </div>
        <MobileMenu
          monogram={initials}
          labels={{
            menu: t('nav.menu'),
            close: t('nav.close'),
            dialog: t('nav.mobileLabel'),
            projects: t('work.title'),
            clockCity: t('live.clockCity'),
            github: t('finalCta.githubLabel'),
          }}
          sections={SECTIONS.map((id) => ({ id, label: t(`live.sections.${id}`) }))}
          pages={[
            { href: '/about', label: t('nav.about') },
            { href: '/contact', label: t('nav.contact') },
          ]}
          projects={projects.map((p) => ({
            slug: p.slug,
            index: p.index,
            title: p.title,
            transitionLabel: `› ${t('live.casePrompt', { slug: p.slug })}`,
          }))}
          locales={{ az: t('locale.az'), en: t('locale.en'), ru: t('locale.ru') }}
          email={profile.email}
          githubHref={profile.social.find((s) => s.kind === 'github')?.href}
        />
      </div>
    </header>
  );
}
