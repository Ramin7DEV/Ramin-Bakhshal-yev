import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { profile } from '@/content/profile';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/content/types';
import { PageShell } from '@/components/live/PageShell';

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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const loc = locale as Locale;

  return (
    <PageShell>
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.intro')}</p>
      <dl>
        <dt>{t('contact.emailLabel')}</dt>
        <dd>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </dd>
        <dt>{t('contact.responseTime')}</dt>
        <dd>{profile.availability[loc]}</dd>
        <dt>{t('contact.location')}</dt>
        <dd>{profile.location[loc]}</dd>
      </dl>
      <section>
        <h2>{t('contact.socialTitle')}</h2>
        <ul>
          {profile.social.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label[loc]}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
