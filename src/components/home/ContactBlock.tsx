import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import styles from './ContactBlock.module.css';

// Dark closing block: the email is the call to action
export async function ContactBlock({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const [user, domain] = profile.email.split('@');
  const github = profile.social.find((s) => s.kind === 'github');

  return (
    <section id="contact" className={styles.contact} data-build="<Contact />" data-log={t('live.log.contact')} data-dock-hide="">
      <h2 className="live-label" data-reveal="">
        {t('live.sections.contact')}
      </h2>
      <p className={styles.desc} data-reveal="2">
        <span className={styles.title}>{t.rich('finalCta.title', { em: (chunks) => <em>{chunks}</em> })}</span>{' '}
        {t('finalCta.description')}
      </p>
      <a className={styles.mail} href={`mailto:${profile.email}`} data-reveal="3" data-mail="">
        {user}
        <br />@{domain}
      </a>
      <div className={styles.foot} data-reveal="4">
        <span>{t('footer.builtIn')}</span>
        {github && (
          <a href={github.href} target="_blank" rel="noreferrer">
            {t('finalCta.githubLabel')} ↗
          </a>
        )}
        <span>
          © {new Date().getFullYear()} {t('footer.copyright')}
        </span>
      </div>
    </section>
  );
}
