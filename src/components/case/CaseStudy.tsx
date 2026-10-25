import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import type { Locale, ManifestKey, Project } from '@/content/types';
import { STATUS_KEY } from '@/lib/status';
import { PageMotion } from '@/components/live/PageMotion';
import { TransitionLink } from '@/components/live/TransitionLink';
import { CaseHero } from './CaseHero';
import { Marquee } from '@/components/home/Marquee';
import { Statement } from '@/components/home/Statement';
import { CaseFlipCard } from './CaseFlipCard';
import { CaseFlow } from './CaseFlow';
import { CaseScreens } from './CaseScreens';
import { NextPreview } from './NextPreview';
import { PreviewVideo } from './PreviewVideo';
import styles from './CaseStudy.module.css';

type Props = {
  project: Project;
  locale: string;
};

const isPending = (text: string | undefined) => !text || text.startsWith('TODO(content)');
const CARD_KEYS: ManifestKey[] = ['platform', 'ai', 'languages'];
const PENDING_BARS = [[92, 64], [80, 52], [88, 70], [76, 58]] as const;

// A case study told as a build session: hero, cover, pitch, story cards, the try-on walkthrough, the request flow, outcome, next
export async function CaseStudy({ project, locale }: Props) {
  const t = await getTranslations({ locale });
  const loc = locale as Locale;
  const pos = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(pos + 1) % projects.length] ?? project;
  const field = project.categories
    .map((c) => (c === 'ai' ? t('work.filterAi') : c === 'mobile' ? t('work.filterMobile') : t('work.filterDesign')))
    .join(' · ');
  const role = project.roleShort?.[loc] ?? project.role[loc][0];
  const statusLabel = project.status ? t(STATUS_KEY[project.status]) : undefined;
  const contentPending = project.chapters.every((c) => isPending(c.body[loc][0]));

  const pitch = project.pitch?.[loc];
  // The back of the pitch card: where it runs, what powers it, who can read it
  const cardFacts = (project.manifest ?? [])
    .filter((r) => CARD_KEYS.includes(r.key))
    .map((r) => ({ label: t(`caseStudy.hero.keys.${r.key}`), value: r.value[loc] }));
  const store = project.links.find((l) => l.kind === 'app-store');

  return (
    <>
      <CaseHero
        project={project}
        locale={loc}
        total={projects.length}
        field={field}
        role={role}
        statusLabel={statusLabel}
        contentPending={contentPending}
      />

      <section className={styles.cover} data-build="<Cover />" data-log={t(project.preview ? 'live.log.coverVideo' : 'live.log.cover')}>
        <figure className={project.preview ? styles.coverVideo : undefined}>
          {project.preview ? (
            <PreviewVideo preview={project.preview} alt={project.preview.alt[loc]} />
          ) : (
            <Image src={project.cover.src} alt={project.cover.alt[loc]} fill priority sizes="100vw" data-cover-img="" />
          )}
        </figure>
        <figcaption data-reveal="">
          <span>
            {project.title} — {field}
          </span>
          <span>{t('live.case.fig')}</span>
        </figcaption>
      </section>

      {pitch && (
        <Statement
          label={t('caseStudy.sections.pitch')}
          text={pitch}
          aside={
            project.icon && cardFacts.length > 0 ? (
              <CaseFlipCard icon={project.icon} title={project.title} field={field} locale={loc} facts={cardFacts} />
            ) : undefined
          }
        />
      )}

      <section
        id="story"
        className={styles.story}
        data-build="<Story />"
        data-log={t('live.log.story', { count: project.chapters.length })}
      >
        <span className="live-label" data-reveal="">
          {t('caseStudy.sections.story')}
        </span>
        <div className={styles.storyGrid} data-reveal="2" data-climb="">
          {project.chapters.map((chapter, i) => {
            const title = chapter.title[loc];
            const body = chapter.body[loc];
            const bars = PENDING_BARS[i % PENDING_BARS.length] ?? PENDING_BARS[0];
            return (
              <article key={chapter.id} id={`ch-${chapter.id}`}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <h3 data-skew="">{chapter.eyebrow[loc]}</h3>
                {isPending(title) ? null : <h4>{title}</h4>}
                {isPending(body[0]) ? (
                  <div className={styles.bars} aria-hidden="true">
                    {bars.map((w) => (
                      <div key={w} className="live-pending-bar" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                ) : (
                  body.map((p, j) => <p key={j}>{p}</p>)
                )}
              </article>
            );
          })}
        </div>
        {contentPending && (
          <p className="live-pending-text" data-reveal="3">
            {t('caseStudy.pending')}
          </p>
        )}
      </section>

      {project.screens && (
        <CaseScreens
          screens={project.screens}
          locale={loc}
          label={t('caseStudy.sections.screens')}
          hint={t('caseStudy.screensHint')}
          log={t('live.log.screens')}
        />
      )}

      {project.marquee && <Marquee words={project.marquee.flatMap((w) => [w, '+'])} lang="en" />}

      {project.flow && (
        <CaseFlow flow={project.flow} locale={loc} label={t('caseStudy.sections.flow')} log={t('live.log.flow')} />
      )}

      <section id="outcome" className={styles.outcome} data-build="<Outcome />" data-log={t('live.log.outcome')}>
        <span className="live-label" data-reveal="">
          {t('caseStudy.sections.outcome')}
        </span>
        <ul className={styles.outcomeList} data-reveal="3" data-climb="">
          {project.outcome[loc].map((item, i) =>
            isPending(item) ? (
              <li key={i} className="live-pending-text">
                TODO(content)
              </li>
            ) : (
              <li key={i}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                {item}
              </li>
            ),
          )}
        </ul>
        {store && (
          <a className={styles.cta} href={store.href} target="_blank" rel="noreferrer" data-reveal="4">
            <span>{t('caseStudy.cta', { store: store.label[loc] })}</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>

      <TransitionLink
        href={`/work/${next.slug}`}
        transitionLabel={`› ${t('live.casePrompt', { slug: next.slug })}`}
        className={styles.next}
        data-next-href={`/work/${next.slug}`}
        data-next-label={`› ${t('live.casePrompt', { slug: next.slug })}`}
        data-dock-hide=""
      >
        {next.preview && <NextPreview preview={next.preview} />}
        <span className="live-label">{t('caseStudy.nextProject')}</span>
        <span className={styles.nextTitle} lang="en" data-skew="" data-next-title="">
          {next.title}
        </span>
        <span className={styles.nextGo}>
          {next.index} / <span lang="en">{next.title}</span> →
        </span>
      </TransitionLink>
      <footer className={styles.foot}>
        <span>{t('footer.builtIn')}</span>
        <a href={`mailto:${profile.email}`} lang="en">
          {profile.email}
        </a>
        <span>
          © {new Date().getFullYear()} {t('footer.copyright')}
        </span>
      </footer>
      <PageMotion page="case" />
    </>
  );
}
