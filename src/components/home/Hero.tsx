import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Heading } from '@/components/primitives/Heading';
import { Body } from '@/components/primitives/Body';
import { Button } from '@/components/primitives/Button';
import { MediaFrame } from '@/components/primitives/MediaFrame';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import styles from './Hero.module.css';

type HeroProps = {
  locale: Locale;
};

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale });

  return (
    <section className={styles.heroSection} aria-label={t('hero.eyebrow')}>
      <Container className={styles.heroContent}>
        <div className={styles.grid}>
          <div className={styles.copyColumn}>
            <Eyebrow tone="signal" className={styles.eyebrow}>
              {t('hero.eyebrow')}
            </Eyebrow>

            <Heading level={1} size="display-xl" className={styles.title}>
              {t.rich('hero.title', {
                br: () => <br />,
                em: (chunks) => <em>{chunks}</em>,
              })}
            </Heading>

            <Body size="l" tone="secondary" className={styles.description}>
              {t('hero.description')}
            </Body>

            <div className={styles.ctaGroup}>
              <Button as="link" href="/work" variant="primary">
                {t('hero.ctaPrimary')}
              </Button>
              <Button as="link" href={`mailto:${profile.email}`} variant="ghost" arrow>
                {t('hero.ctaSecondary')}
              </Button>
            </div>
          </div>

          <div className={styles.mediaColumn}>
            <MediaFrame
              src="/images/hero-studio.png"
              alt={t('hero.mediaAlt')}
              aspectRatio="16/9"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 560px"
              className={styles.heroFrame}
            />
          </div>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.metaLeft}>
            <span>{t('hero.metaLocation')}</span>
            <span className={styles.metaDot} aria-hidden="true">·</span>
            <span>{t('nav.status')}</span>
            <span className={styles.metaDot} aria-hidden="true">·</span>
            <span className={styles.metaIndex}>01 / 05</span>
          </div>
          <div className={styles.scrollIndicator} aria-hidden="true">
            <span>{t('hero.scroll')}</span>
            <span>↓</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
