import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { profile } from '@/content/profile';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/content/types';
import { BuildIntro } from '@/components/live/BuildIntro';
import { BakuClock } from '@/components/live/BakuClock';
import { KineticText } from '@/components/live/KineticText';
import { Brand } from '@/components/primitives/Brand';
import { PageMotion } from '@/components/live/PageMotion';
import { GlyphField } from '@/components/home/GlyphField';
import { BriefBuilder, type BriefLabels } from '@/components/contact/BriefBuilder';
import { CopyButton } from '@/components/contact/CopyButton';
import styles from '@/components/contact/Contact.module.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale: locale as Locale,
    path: '/contact',
    title: t('contact.title'),
    description: t('contact.description'),
  });
}

/** "Let's *build* it together." -> words, the starred one in italics */
function emphasise(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => (part.startsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part));
}

// Contact: a short hero, every direct way to reach Ramin, then the brief builder that drafts the first email
export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const loc = locale as Locale;
  const [user, domain] = profile.email.split('@');

  return (
    <>
      <section id="hero" className={styles.hero} data-build="<ContactHero />" data-build-manual="" data-no-trail="">
        <GlyphField code={t('live.fieldCode')} />
        <div data-quiet="">
          <BuildIntro sectionId="hero" prompt={t('contact.prompt')} compileId="contact" logs={[t('contact.log')]} />
        </div>
        <h1 className={styles.title} data-reveal="" data-quiet="">
          {emphasise(t('contact.title'))}
        </h1>
        <p className={styles.intro} data-reveal="2" data-quiet="">
          {t('contact.intro')}
        </p>
      </section>

      <section id="reach" className={styles.block} data-build="<Reach />" data-log={t('contact.log')}>
        <span className="live-label" data-reveal="">
          {t('contact.sections.reach')}
        </span>
        <div className={styles.mailRow} data-reveal="2">
          <a className={`live-mail ${styles.mail}`} href={`mailto:${profile.email}`} aria-label={profile.email} data-mail="">
            <KineticText as="span" lines={[user ?? profile.email, `@${domain}`]} label={profile.email} />
          </a>
          <CopyButton text={profile.email} label={t('contact.copy')} copiedLabel={t('contact.copied')} />
        </div>
        <dl className={styles.details} data-reveal="3" data-climb="">
          <div>
            <dt>{t('contact.phoneLabel')}</dt>
            <dd>
              <a href={`tel:${profile.phone.tel}`}>{profile.phone.display}</a>
            </dd>
          </div>
          <div>
            <dt>{t('contact.linksLabel')}</dt>
            <dd className={styles.links}>
              {profile.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                  <Brand>{s.label[loc]}</Brand> ↗
                </a>
              ))}
            </dd>
          </div>
          <div>
            <dt>{t('contact.baseLabel')}</dt>
            <dd>
              {profile.location[loc]}
              <span className={styles.clock}>
                <BakuClock prefix={`${t('live.clockCity')} `} />
              </span>
            </dd>
          </div>
          <div>
            <dt>{t('contact.statusLabel')}</dt>
            <dd>
              {profile.availability[loc]}
              <span className={styles.response}>{t('contact.responseTime')}</span>
            </dd>
          </div>
        </dl>
      </section>

      <section id="brief" className={styles.block} data-build="<Brief />" data-log={t('contact.log')}>
        <span className="live-label" data-reveal="">
          {t('contact.sections.brief')}
        </span>
        <div data-reveal="2">
          <BriefBuilder
            email={profile.email}
            labels={{
              ...(t.raw('contact.brief') as Omit<BriefLabels, 'copied'>),
              copied: t('contact.copied'),
            }}
          />
        </div>
      </section>
      <PageMotion page="contact" />
    </>
  );
}
