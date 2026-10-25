import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import type { Locale } from '@/content/types';
import { BuildIntro } from '@/components/live/BuildIntro';
import { KineticText } from '@/components/live/KineticText';
import { GlyphField } from '@/components/home/GlyphField';
import styles from './About.module.css';

// First screen of the About page: the name compiles in over the glyph field, the positioning line and four facts follow
export async function AboutHero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const [first, ...rest] = profile.name.split(' ');
  const meta = [
    { label: t('about.meta.role'), value: profile.role[locale] },
    { label: t('about.meta.focus'), value: profile.focus[locale] },
    { label: t('about.meta.base'), value: profile.location[locale] },
    { label: t('about.meta.status'), value: profile.availability[locale] },
  ];

  return (
    <section id="hero" className={styles.hero} data-build="<AboutHero />" data-build-manual="" data-no-trail="">
      <GlyphField code={t('live.fieldCode')} />
      <div data-quiet="">
        <BuildIntro sectionId="hero" prompt={t('about.prompt')} compileId="about-name" logs={[t('about.log')]} />
      </div>
      <KineticText
        lines={[first ?? profile.name, rest.join(' ')].filter(Boolean)}
        id="title"
        className={styles.title}
        label={profile.name}
        compileId="about-name"
        compileStep={45}
        quiet
      />
      <p className={styles.lede} data-reveal="" data-quiet="">
        {profile.positioning[locale]}
      </p>
      <dl className={`live-meta-grid ${styles.meta}`} data-quiet="">
        {meta.map((m, i) => (
          <div key={m.label} data-reveal={i ? String(i + 1) : ''}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
