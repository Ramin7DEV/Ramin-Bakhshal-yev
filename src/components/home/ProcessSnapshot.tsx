import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Heading } from '@/components/primitives/Heading';
import { Body } from '@/components/primitives/Body';
import styles from './ProcessSnapshot.module.css';

type Step = {
  number: string;
  tag: string;
  title: string;
  body: string;
};

export async function ProcessSnapshot() {
  const t = await getTranslations();
  const rawSteps = t.raw('process.steps') as Step[];

  // Render only confirmed, non-TODO steps (01 Signal, 02 System).
  // Step 03 is pending AI workflow definition and omitted per spec.
  const steps = rawSteps.filter(
    (step) => step.body && !step.body.includes('TODO')
  );

  return (
    <section className={styles.section} aria-labelledby="process-heading">
      <Container>
        <div className={styles.header}>
          <Eyebrow tone="tertiary" className={styles.eyebrow}>
            {t('process.eyebrow')}
          </Eyebrow>
          <Heading level={2} size="display-m" id="process-heading" className={styles.title}>
            {t('process.title')}
          </Heading>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <article key={step.number} className={styles.stepItem}>
              <div className={styles.stepMeta}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.stepDot} aria-hidden="true">·</span>
                <span className={styles.stepTag}>{step.tag}</span>
              </div>
              <Heading level={3} size="heading" className={styles.stepTitle}>
                {step.title}
              </Heading>
              <Body size="m" tone="secondary" className={styles.stepDescription}>
                {step.body}
              </Body>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
