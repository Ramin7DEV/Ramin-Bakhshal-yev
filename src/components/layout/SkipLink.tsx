import { getTranslations } from 'next-intl/server';
import styles from './SkipLink.module.css';

type SkipLinkProps = {
  locale: string;
};

export async function SkipLink({ locale }: SkipLinkProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <a href="#main-content" className={styles.skipLink}>
      {t('skipToContent')}
    </a>
  );
}
