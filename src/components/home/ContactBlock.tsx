import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import { KineticText } from '@/components/live/KineticText';
import { ContactPanel } from './ContactPanel';
import styles from './ContactBlock.module.css';

// Dark closing block: the email is the call to action
// The label carries a section number only on the home page; other pages pass a plain one
export async function ContactBlock({ locale, label }: { locale: string; label?: string }) {
  const t = await getTranslations({ locale });
  const [user, domain] = profile.email.split('@');
  const loc = locale as 'az' | 'en' | 'ru';

  return (
    <section id="contact" className={styles.contact} data-build="<Contact />" data-log={t('live.log.contact')} data-dock-hide="">
      <h2 className="live-label" data-reveal="">
        {label ?? t('live.sections.contact')}
      </h2>
      <p className={styles.desc} data-reveal="2">
        <span className={styles.title}>{t.rich('finalCta.title', { em: (chunks) => <em>{chunks}</em> })}</span>{' '}
        {t('finalCta.description')}
      </p>
      <a className={`live-mail ${styles.mail}`} href={`mailto:${profile.email}`} aria-label={profile.email} data-reveal="3" data-mail="">
        <KineticText as="span" lines={[user ?? profile.email, `@${domain}`]} label={profile.email} />
      </a>
      <ContactPanel
        className={styles.panel}
        command={t('finalCta.panelCommand')}
        labels={{
          status: t('contact.statusLabel'),
          base: t('contact.baseLabel'),
          time: t('live.meta.bakuTime'),
          email: t('contact.emailLabel'),
          copy: t('contact.copy'),
          copied: t('contact.copied'),
        }}
        status={profile.availability[loc]}
        base={profile.location[loc]}
        email={profile.email}
        links={profile.social.map((s) => ({ href: s.href, label: s.label[loc] }))}
      />
      <div className={styles.foot} data-reveal="4">
        <span>
          © {new Date().getFullYear()} {t('footer.copyright')}
        </span>
      </div>
    </section>
  );
}
