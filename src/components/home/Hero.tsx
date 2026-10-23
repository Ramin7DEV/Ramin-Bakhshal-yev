import { Fragment, type CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import { BuildIntro } from '@/components/live/BuildIntro';
import { KineticText } from '@/components/live/KineticText';
import { BakuClock } from '@/components/live/BakuClock';
import { GlyphField } from './GlyphField';
import styles from './Hero.module.css';

type HeroProps = {
  locale: string;
};

const SECTIONS = ['statement', 'work', 'method', 'stats', 'contact'] as const;

/** "Words with *emphasis*" -> words, each flagged when wrapped in asterisks */
function splitWords(text: string) {
  return text.split(' ').map((word) => ({ word: word.replace(/\*/g, ''), em: word.includes('*') }));
}

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale });
  const words = splitWords(t('live.headline'));

  return (
    <section id="hero" className={styles.hero} data-build="<Hero />" data-build-manual="" data-no-trail="">
      <GlyphField code={t('live.fieldCode')} />

      <div className={styles.top}>
        <div data-quiet="">
          <BuildIntro
            sectionId="hero"
            prompt={t('live.prompt')}
            compileId="hero-name"
            logs={[t('live.log.reading'), t('live.log.field'), t('live.log.hero')]}
            finalLog={t('live.log.scroll')}
            showLog
          />
        </div>
        <nav className={styles.toc} aria-label={t('live.a11y.sections')} data-quiet="" data-reveal="">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`}>
              <span>{t(`live.sections.${id}`)}</span>
              <i aria-hidden="true">↓</i>
            </a>
          ))}
        </nav>
      </div>

      <div className={styles.mid}>
        <p className={styles.headline} data-quiet="">
          {words.map(({ word, em }, i) => (
            // The space sits outside the masked word, or the inline-block would swallow it
            <Fragment key={i}>
              <span className={styles.word}>
                <span style={{ '--i': i } as CSSProperties}>{em ? <em>{word}</em> : word}</span>
              </span>{' '}
            </Fragment>
          ))}
        </p>
        <p className={styles.legend} data-reveal="">
          {t.rich('live.legend', { b: (chunks) => <b>{chunks}</b>, br: () => <br /> })}
        </p>
      </div>

      <div className={styles.sign}>
        <KineticText lines={[profile.name]} id="name" className={styles.name} label={profile.name} compileId="hero-name" />
        <span className={styles.avail} data-reveal="">
          {t('nav.status')}
        </span>
      </div>

      <dl className="live-meta-grid">
        <div data-reveal="">
          <dt>{t('live.meta.practice')}</dt>
          <dd>{t('live.meta.practiceValue')}</dd>
        </div>
        <div data-reveal="2">
          <dt>{t('live.meta.builds')}</dt>
          <dd>{t('live.meta.buildsValue')}</dd>
        </div>
        <div data-reveal="3">
          <dt>{t('live.meta.based')}</dt>
          <dd>{t('live.meta.basedValue')}</dd>
        </div>
        <div data-reveal="4">
          <dt>{t('live.meta.bakuTime')}</dt>
          <dd>
            <BakuClock />
          </dd>
        </div>
      </dl>
    </section>
  );
}
