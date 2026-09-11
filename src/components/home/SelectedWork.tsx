import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Heading } from '@/components/primitives/Heading';
import { Body } from '@/components/primitives/Body';
import { Button } from '@/components/primitives/Button';
import { WorkCard } from '@/components/work/WorkCard';
import { projects } from '@/content/projects';
import type { Locale } from '@/content/types';
import styles from './SelectedWork.module.css';

type SelectedWorkProps = {
  locale: Locale;
};

export async function SelectedWork({ locale }: SelectedWorkProps) {
  const t = await getTranslations({ locale });
  const intro = t('work.intro');
  const hasValidIntro = intro && !intro.includes('TODO');

  const [firstProject, secondProject, thirdProject] = projects;

  return (
    <section className={styles.section} aria-labelledby="selected-work-heading">
      <Container>
        <div className={styles.header}>
          <Eyebrow tone="tertiary" className={styles.eyebrow}>
            {t('work.eyebrow')}
          </Eyebrow>
          <Heading level={2} size="display-m" id="selected-work-heading" className={styles.title}>
            {t('work.title')}
          </Heading>
          {hasValidIntro ? (
            <Body size="l" tone="secondary" className={styles.intro}>
              {intro}
            </Body>
          ) : null}
        </div>

        <div className={styles.grid}>
          {firstProject ? (
            <div className={styles.itemFeatured}>
              <WorkCard project={firstProject} locale={locale} />
            </div>
          ) : null}
          {secondProject ? (
            <div className={styles.itemStacked1}>
              <WorkCard project={secondProject} locale={locale} />
            </div>
          ) : null}
          {thirdProject ? (
            <div className={styles.itemStacked2}>
              <WorkCard project={thirdProject} locale={locale} />
            </div>
          ) : null}
        </div>

        <div className={styles.footerCta}>
          <Button as="link" href="/work" variant="ghost" arrow>
            {t('work.allProjects')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
