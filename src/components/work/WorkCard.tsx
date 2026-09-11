import { Link } from '@/i18n/navigation';
import { MediaFrame } from '@/components/primitives/MediaFrame';
import { Heading } from '@/components/primitives/Heading';
import { Body } from '@/components/primitives/Body';
import { Tag } from '@/components/primitives/Tag';
import { cn } from '@/lib/cn';
import type { Project, Locale } from '@/content/types';
import styles from './WorkCard.module.css';

type WorkCardProps = {
  project: Project;
  locale: Locale;
  priority?: boolean;
  className?: string;
};

export function WorkCard({
  project,
  locale,
  priority = false,
  className,
}: WorkCardProps) {
  const summary = project.summary[locale];
  const hasValidSummary = summary && !summary.includes('TODO');
  const hasValidStatus = project.status && !project.status.includes('TODO');
  const hasStack =
    project.stack &&
    project.stack.length > 0 &&
    !project.stack.some((item) => item.includes('TODO'));

  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.mediaWrap}>
        <MediaFrame
          src={project.cover.src}
          alt={project.cover.alt[locale]}
          aspectRatio="4/3"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className={styles.mediaFrame}
        />
      </div>

      <div className={styles.metaRow}>
        <span className={styles.index}>{project.index}</span>
        {hasValidStatus ? (
          <span className={styles.status}>{project.status}</span>
        ) : null}
      </div>

      <Heading level={3} size="heading" className={styles.titleHeading}>
        <Link
          href={`/work/${project.slug}`}
          className={styles.titleLink}
          aria-label={`${project.index} ${project.title}`}
        >
          {project.title}
        </Link>
      </Heading>

      {hasValidSummary ? (
        <Body size="s" tone="secondary" className={styles.summary}>
          {summary}
        </Body>
      ) : null}

      {hasStack ? (
        <ul className={styles.tags} aria-label="Tech stack">
          {project.stack.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
