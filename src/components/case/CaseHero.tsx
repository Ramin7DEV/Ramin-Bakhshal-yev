import Image from 'next/image';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import type { BuildActivity, Locale, Project } from '@/content/types';
import { BuildIntro } from '@/components/live/BuildIntro';
import { KineticText } from '@/components/live/KineticText';
import { IconTilt } from './IconTilt';
import styles from './CaseHero.module.css';

type Props = {
  project: Project;
  locale: Locale;
  total: number;
  field: string;
  role?: string;
  statusLabel?: string;
  contentPending: boolean;
};

const isPending = (text: string | undefined) => !text || text.startsWith('TODO(content)');
const PENDING_LEDE = [94, 82, 58] as const;
const PENDING_ROWS = [72, 54, 66, 40] as const;
const DAY = 86_400_000;

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Week columns with a month label wherever a new month begins */
function weekTicks(activity: BuildActivity, locale: Locale) {
  const month = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const start = toDate(activity.weekStart).getTime();
  let prev = -1;
  return activity.weekly.flatMap((_, i) => {
    const d = new Date(start + i * 7 * DAY);
    if (d.getUTCMonth() === prev) return [];
    prev = d.getUTCMonth();
    return [{ col: i + 1, label: month.format(d) }];
  });
}

// First screen of a case study. Left: prompt, kinetic title, lede. Right: the build manifest with the
// real app icon and commit activity from the repo. Meta and links close the screen.
export async function CaseHero({ project, locale, total, field, role, statusLabel, contentPending }: Props) {
  const t = await getTranslations({ locale });
  const summary = project.summary[locale];
  const rows = project.manifest
    ? project.manifest.map((r) => ({ key: r.key, label: t(`caseStudy.hero.keys.${r.key}`), value: r.value[locale] }))
    : project.stack.length > 0
      ? [{ key: 'stack', label: t('caseStudy.hero.keys.stack'), value: project.stack.join(', ') }]
      : [];
  const activity = project.activity;
  const max = activity ? Math.max(1, ...activity.weekly) : 1;
  const peakAt = activity ? activity.weekly.indexOf(max) : -1;
  const day = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

  return (
    <section id="hero" className={styles.hero} data-build="<CaseHero />" data-build-manual="">
      <div className={styles.intro} data-case-intro="">
        <BuildIntro
          sectionId="hero"
          prompt={t('live.casePrompt', { slug: project.slug })}
          compileId="case-title"
          logs={[t('live.log.caseHero', { slug: project.slug })]}
          finalLog={contentPending ? t('live.log.casePending') : undefined}
        />
      </div>
      <KineticText
        lines={project.title.split(' ')}
        id="title"
        className={styles.title}
        label={project.title}
        fill
        maxHeight={0.3}
        compileId="case-title"
        compileStep={55}
      />

      <div className={styles.lede} data-case-drift="">
        {isPending(summary) ? (
          <div className={styles.ledePending} data-reveal="" aria-hidden="true">
            {PENDING_LEDE.map((w) => (
              <div key={w} className="live-pending-bar" style={{ width: `${w}%` }} />
            ))}
          </div>
        ) : (
          <p data-reveal="">{summary}</p>
        )}
      </div>

      <div className={styles.sheet} data-case-drift="">
        <div data-reveal="2">
          <header className={styles.sheetHead}>
            <span>
              <b className={styles.idx}>
                {project.index} / {String(total).padStart(2, '0')}
              </b>{' '}
              — {t('caseStudy.hero.manifest')}
            </span>
            {statusLabel && <span className={styles.status}>{statusLabel}</span>}
          </header>

          <div className={project.icon ? styles.spec : undefined}>
            {project.icon && (
              <div className={styles.tileBox}>
                <span className={styles.tileLabel} aria-hidden="true">
                  {t('caseStudy.hero.iconLabel')}
                </span>
                <IconTilt className={styles.tile}>
                  <Image src={project.icon.src} alt={project.icon.alt[locale]} width={project.icon.width} height={project.icon.height} sizes="(max-width: 900px) 88px, 136px" priority />
                  <span className={styles.glare} data-glare="" aria-hidden="true" />
                </IconTilt>
              </div>
            )}

            {rows.length > 0 ? (
              <dl className={styles.manifest}>
                {rows.map((row, i) => (
                  <div key={row.key} style={vars({ '--i': i })}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className={styles.manifestPending}>
                {PENDING_ROWS.map((w) => (
                  <div key={w} className="live-pending-bar" style={{ width: `${w}%` }} aria-hidden="true" />
                ))}
                <p className="live-pending-text">{t('caseStudy.hero.pending')}</p>
              </div>
            )}
          </div>

          {activity && (
            <figure className={styles.activity}>
              <div className={styles.activityHead}>
                <span>{t('caseStudy.hero.activity')}</span>
                <span>{t('caseStudy.hero.source', { source: activity.source })}</span>
              </div>
              <ol className={styles.bars} style={vars({ '--n': activity.weekly.length })} aria-hidden="true">
                {activity.weekly.map((n, i) => (
                  <li
                    key={i}
                    className={i === peakAt ? styles.peak : n === 0 ? styles.zero : undefined}
                    style={vars({ '--v': n / max, '--i': i })}
                  >
                    {i === peakAt && <span className={styles.peakLabel}>{t('caseStudy.hero.peak', { count: n })}</span>}
                  </li>
                ))}
              </ol>
              <div className={styles.ticks} style={vars({ '--n': activity.weekly.length })} aria-hidden="true">
                {weekTicks(activity, locale).map((tick) => (
                  <span key={tick.col} style={{ gridColumn: tick.col }}>
                    {tick.label}
                  </span>
                ))}
              </div>
              <figcaption>
                {t('caseStudy.hero.activitySummary', {
                  total: activity.weekly.reduce((a, b) => a + b, 0),
                  weeks: activity.weekly.length,
                  peak: max,
                  from: day.format(toDate(activity.first)),
                  to: day.format(toDate(activity.last)),
                })}
              </figcaption>
            </figure>
          )}
        </div>
      </div>

      <dl className={`live-meta-grid ${styles.meta}`}>
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
          <dd className={project.status ? undefined : styles.todo}>{statusLabel ?? 'TODO(content)'}</dd>
        </div>
      </dl>

      {project.links.length > 0 && (
        <nav className={styles.links} aria-label={t('caseStudy.linksTitle')} data-reveal="4">
          <span>{t('caseStudy.linksTitle')}</span>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label[locale]} (${t('a11y.externalLink')})`}>
              {link.label[locale]} ↗
            </a>
          ))}
        </nav>
      )}
    </section>
  );
}
