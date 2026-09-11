import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Heading } from '@/components/primitives/Heading';
import { Body } from '@/components/primitives/Body';
import { Button } from '@/components/primitives/Button';
import { profile } from '@/content/profile';
import styles from './FinalCta.module.css';

export async function FinalCta() {
  const t = await getTranslations();

  return (
    <section className={styles.section} aria-labelledby="final-cta-heading">
      <Container className={styles.container}>
        <Eyebrow tone="signal" className={styles.eyebrow}>
          {t('finalCta.eyebrow')}
        </Eyebrow>

        <Heading level={2} size="display-l" id="final-cta-heading" className={styles.title}>
          {t.rich('finalCta.title', {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </Heading>

        <Body size="l" tone="secondary" className={styles.description}>
          {t('finalCta.description')}
        </Body>

        <div className={styles.ctaGroup}>
          <Button as="link" href={`mailto:${profile.email}`} variant="primary">
            {profile.email}
          </Button>
          <Button
            as="link"
            href="https://github.com/Ramin7DEV"
            variant="ghost"
            arrow
          >
            {t('finalCta.githubLabel')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
