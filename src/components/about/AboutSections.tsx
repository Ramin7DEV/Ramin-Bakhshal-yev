import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import type { Locale } from '@/content/types';
import { STATUS_KEY } from '@/lib/status';
import { TransitionLink } from '@/components/live/TransitionLink';
import styles from './About.module.css';

type Principle = { tag: string; title: string; body: string };

// How the work is done: four short principles in the Method grid style
export async function AboutPrinciples({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const principles = t.raw('about.principles') as Principle[];
  return (
    <section id="principles" className={styles.block} data-build="<Principles />" data-log={t('about.log')}>
      <span className="live-label" data-reveal="">
        {t('about.sections.principles')}
      </span>
      <div className={styles.grid} data-reveal="2" data-climb="">
        {principles.map((p, i) => (
          <article key={p.tag}>
            <b>{String(i + 1).padStart(2, '0')}</b>
            <h3 lang="en" data-skew="">
              {p.tag}
            </h3>
            <h4>{p.title}</h4>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// Jobs, newest first: when, where and in what role, then one or two plain lines about the work
export async function AboutExperience({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const month = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const date = (ym: string) => month.format(new Date(`${ym}-01T00:00:00Z`));
  return (
    <section id="experience" className={styles.block} data-build="<Experience />" data-log={t('about.log')}>
      <span className="live-label" data-reveal="">
        {t('about.sections.experience')}
      </span>
      <ol className={styles.jobs} data-reveal="2" data-climb="">
        {profile.experience.map((job) => (
          <li key={`${job.company}-${job.start ?? job.role.en}`}>
            <span className={styles.period}>
              {job.start ? `${date(job.start)} — ${job.end ? date(job.end) : t('about.present')}` : null}
            </span>
            <div>
              <a className={styles.company} href={job.href} target="_blank" rel="noreferrer" lang="en">
                {job.company} <span aria-hidden="true">↗</span>
              </a>
              <span className={styles.role}>{job.role[locale]}</span>
              {job.summary[locale].map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <span className={styles.mode}>{job.mode[locale]}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// What Ramin builds: one row per area, its technology, and the case studies where it is used
export async function AboutCapabilities({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  return (
    <section id="capabilities" className={styles.block} data-build="<Capabilities />" data-log={t('about.log')}>
      <div className={styles.head}>
        <span className="live-label" data-reveal="">
          {t('about.sections.tools')}
        </span>
        <span className="live-label" data-reveal="2">
          {t('about.capNote')}
        </span>
      </div>
      <table className={styles.caps} data-reveal="2">
        <thead>
          <tr>
            <th scope="col">{t('about.capArea')}</th>
            <th scope="col">{t('about.capTech')}</th>
            <th scope="col">{t('about.capProjects')}</th>
          </tr>
        </thead>
        <tbody data-climb="">
          {profile.capabilities.map((c) => (
            <tr key={c.area.en}>
              <th scope="row">{c.area[locale]}</th>
              <td className={styles.tech}>{c.tech[locale]}</td>
              <td className={styles.used}>
                {c.projects.map((slug) => {
                  const p = bySlug.get(slug);
                  return p ? (
                    <TransitionLink
                      key={slug}
                      href={`/work/${slug}`}
                      transitionLabel={`› ${t('live.casePrompt', { slug })}`}
                      lang="en"
                    >
                      {p.title}
                    </TransitionLink>
                  ) : null;
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// The projects in the order they were started, dated by their first commit
export async function AboutTimeline({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const month = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const rows = projects
    .filter((p) => p.activity)
    .sort((a, b) => (a.activity?.first ?? '').localeCompare(b.activity?.first ?? ''))
    .map((p) => ({
      project: p,
      date: month.format(new Date(`${p.activity?.first}T00:00:00Z`)),
      commits: (p.activity?.weekly ?? []).reduce((sum, n) => sum + n, 0),
    }));

  return (
    <section id="timeline" className={styles.block} data-build="<Timeline />" data-log={t('about.log')}>
      <div className={styles.head}>
        <span className="live-label" data-reveal="">
          {t('about.sections.timeline')}
        </span>
        <span className="live-label" data-reveal="2">
          {t('about.timelineNote')}
        </span>
      </div>
      <ol className={styles.timeline} data-reveal="2" data-climb="">
        {rows.map(({ project, date, commits }) => (
          <li key={project.slug}>
            <TransitionLink
              href={`/work/${project.slug}`}
              transitionLabel={`› ${t('live.casePrompt', { slug: project.slug })}`}
              className={styles.row}
            >
              <span className={styles.date}>{date}</span>
              <span className={styles.name} lang="en">
                {project.title}
              </span>
              <span className={styles.facts}>
                {project.status ? t(STATUS_KEY[project.status]) : ''} · {t('about.timelineCommits', { count: commits })}
              </span>
              <span className={styles.go} aria-hidden="true">
                →
              </span>
            </TransitionLink>
          </li>
        ))}
      </ol>
    </section>
  );
}
