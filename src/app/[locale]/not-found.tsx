import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations();

  return (
    <main>
      <h1>404</h1>
      <p>{t('common.states.empty')}</p>
      <Link href="/">{t('common.actions.backToWork')}</Link>
    </main>
  );
}
