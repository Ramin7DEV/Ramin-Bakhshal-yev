import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import type { Locale, Project } from '@/content/types';
import { BuildIntro } from '@/components/live/BuildIntro';
import { KineticText } from '@/components/live/KineticText';
import { TransitionLink } from '@/components/live/TransitionLink';
import { ChapterRail } from './ChapterRail';
import { CaseMotion } from './CaseMotion';
import styles from './CaseStudy.module.css';

type Props = {
  project: Project;
  locale: string;
};

const isPending = (text: string | undefined) => !text || text.startsWith('TODO(content)');
const PENDING_BARS = [[92, 64], [80, 52], [88, 70], [76, 58]] as const;

// A case study told as a build session: hero, cover, chapters with a pinned rail, outcome, next project
export async function CaseStudy({ project, locale }: Props) {
  const t = await getTranslations({ locale });
  const loc = locale as Locale;
  const pos = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(pos + 1) % projects.length] ?? project;
  const field = project.categories
    .map((c) => (c === 'ai' ? t('work.filterAi') : c === 'mobile' ? t('work.filterMobile') : t('work.filterDesign')))
    .join(' · ');
  const role = project.role[loc][0];
  const contentPending = project.chapters.every((c) => isPending(c.body[loc][0]));

  const chapters = [
    ...project.chapters.map((c) => ({ id: c.id, label: c.eyebrow[loc] })),
    { id: 'outcome', label: t('caseStudy.outcomeTitle') },
  ];
  const facts = [
    { label: t('caseStudy.factStack'), value: project.stack.join(', ') || 'TODO', pending: project.stack.length === 0 },
    { label: t('caseStudy.factYear'), value: project.year ?? 'TODO', pending: !project.year },
    { label: t('caseStudy.factStatus'), value: project.status ?? 'TODO', pending: !project.status },
  ];

  return (
    <>
      <section id="hero" className={styles.hero} data-build="<CaseHero />" data-build-manual="">
        <div data-case-intro="">
          <BuildIntro
            sectionId="hero"
            prompt={t('live.casePrompt', { slug: project.slug })}
            compileId="case-title"
            logs={[t('live.log.caseHero', { slug: project.slug })]}
            finalLog={contentPending ? t('live.log.casePending') : undefined}
          />
        </div>
        <p className={styles.idx} data-case-intro="">
          {project.index} / {String(projects.length).padStart(2, '0')}
        </p>
        <KineticText lines={project.title.split(' ')} id="title" label={project.title} fill maxHeight={0.3} compileId="case-title" compileStep={55} />
        <dl className="live-meta-grid">
          <div data-reveal="">
            <dt>{t('live.work.field')}</dt>
            <dd>{field}</dd>
          </div>
          <div data-reveal="2">
            <dt>{t('caseStudy.factRole')}</dt>
            <dd className={isPending(role) ? styles.todo : undefined}>{isPending(role) ? 'TODO(content)' : role}</dd>
          </div>
          <div data-reveal="3">
            <dt>{t('caseStudy.factYear')}</dt>
            <dd className={project.year ? undefined : styles.todo}>{project.year ?? 'TODO(content)'}</dd>
          </div>
          <div data-reveal="4">
            <dt>{t('caseStudy.factStatus')}</dt>
            <dd className={project.status ? undefined : styles.todo}>{project.status ?? 'TODO(content)'}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.cover} data-build="<Cover />" data-log={t('live.log.cover')}>
        <figure>
          <Image src={project.cover.src} alt={project.cover.alt[loc]} fill priority sizes="100vw" data-cover-img="" />
        </figure>
        <figcaption data-reveal="">
          <span>
            {project.title} — {field}
          </span>
          <span>{t('live.case.fig')}</span>
        </figcaption>
      </section>

      <div className={styles.session}>
        <ChapterRail title={t('live.case.log')} ariaLabel={t('live.a11y.chapters')} chapters={chapters} facts={facts} />

        <div className={styles.chapters} data-chapters="">
          {project.chapters.map((chapter, i) => {
            const n = String(i + 1).padStart(2, '0');
            const title = chapter.title[loc];
            const body = chapter.body[loc];
            const bars = PENDING_BARS[i % PENDING_BARS.length] ?? PENDING_BARS[0];
            return (
              <section
                key={chapter.id}
                id={`ch-${chapter.id}`}
                className={styles.chapter}
                data-build={`<Chapter id="${chapter.id}" />`}
                data-log={t('live.log.chapter', { n, id: chapter.id })}
              >
                <span className="live-label" data-reveal="">
                  <b className={styles.chNo}>ch/{n}</b> — {chapter.eyebrow[loc]}
                </span>
                <h2 data-reveal="2" data-skew="">
                  {isPending(title) ? chapter.eyebrow[loc] : title}
                </h2>
                {isPending(body[0]) ? (
                  <>
                    <div className={styles.bars} data-reveal="3" aria-hidden="true">
                      {bars.map((w) => (
                        <div key={w} className="live-pending-bar" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                    <p className="live-pending-text" data-reveal="4">
                      {t('caseStudy.pending')}
                    </p>
                  </>
                ) : (
                  <div className={styles.body} data-reveal="3">
                    {body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                )}
                {chapter.id === 'ai-workflow' && (
                  <div className={styles.pair} data-reveal="4">
                    <div className={styles.prompt}>
                      <span>› {t('live.case.prompt')}</span>
                      <div className="live-pending-bar" style={{ width: '90%' }} />
                      <div className="live-pending-bar" style={{ width: '72%' }} />
                      <div className="live-pending-bar" style={{ width: '40%' }} />
                    </div>
                    <div className={styles.decision}>
                      <span>✓ {t('live.case.decision')}</span>
                      <div className="live-pending-bar" style={{ width: '85%' }} />
                      <div className="live-pending-bar" style={{ width: '60%' }} />
                    </div>
                  </div>
                )}
              </section>
            );
          })}

          <section
            id="ch-outcome"
            className={styles.chapter}
            data-build="<Outcome />"
            data-log={t('live.log.chapter', { n: String(project.chapters.length + 1).padStart(2, '0'), id: 'outcome' })}
          >
            <span className="live-label" data-reveal="">
              <b className={styles.chNo}>ch/{String(project.chapters.length + 1).padStart(2, '0')}</b> — {t('caseStudy.outcomeTitle')}
            </span>
            <h2 data-reveal="2" data-skew="">
              {t('caseStudy.outcomeTitle')}
            </h2>
            <ul className={styles.outcome} data-reveal="3">
              {project.outcome[loc].map((item, i) =>
                isPending(item) ? (
                  [0, 1, 2].map((k) => (
                    <li key={`${i}-${k}`}>
                      <strong>—</strong>
                      <span>TODO(content): {t('live.case.metric')}</span>
                    </li>
                  ))
                ) : (
                  <li key={i}>
                    <span className={styles.outcomeText}>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>
      </div>

      <TransitionLink
        href={`/work/${next.slug}`}
        transitionLabel={`› ${t('live.casePrompt', { slug: next.slug })}`}
        className={styles.next}
        data-next-href={`/work/${next.slug}`}
        data-next-label={`› ${t('live.casePrompt', { slug: next.slug })}`}
        data-dock-hide=""
      >
        <Image src={next.cover.src} alt="" fill sizes="100vw" />
        <span className="live-label">{t('caseStudy.nextProject')}</span>
        <span className={styles.nextTitle} lang="en" data-skew="" data-next-title="">
          {next.title}
        </span>
        <span className={styles.nextGo}>
          {next.index} / {next.title} →
        </span>
      </TransitionLink>
      <footer className={styles.foot}>
        <span>{t('footer.builtIn')}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <span>
          © {new Date().getFullYear()} {t('footer.copyright')}
        </span>
      </footer>
      <CaseMotion />
    </>
  );
}
