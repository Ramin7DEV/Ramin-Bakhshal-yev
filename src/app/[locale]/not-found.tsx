import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PageShell } from '@/components/live/PageShell';

export default function NotFound() {
  const t = useTranslations();

  return (
    <PageShell>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
      <Link href="/">{t('notFound.back')}</Link>
    </PageShell>
  );
}
