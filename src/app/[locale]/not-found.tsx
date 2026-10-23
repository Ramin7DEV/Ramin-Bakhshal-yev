import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PageShell } from '@/components/live/PageShell';

export default function NotFound() {
  const t = useTranslations();

  return (
    <PageShell>
      <h1>404</h1>
      <p>{t('common.states.empty')}</p>
      <Link href="/">{t('common.actions.backToWork')}</Link>
    </PageShell>
  );
}
