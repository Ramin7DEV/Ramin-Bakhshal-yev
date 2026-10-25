import { getTranslations } from 'next-intl/server';
import { projects } from '@/content/projects';
import type { Locale } from '@/content/types';
import { STATUS_KEY } from '@/lib/status';
import { WorkIndex, type WorkIndexItem } from './WorkIndex';
import styles from './WorkSection.module.css';

// The project index, shared by the home page and /work
export async function WorkSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const loc = locale as Locale;

  const items: WorkIndexItem[] = projects.map((p) => ({
    slug: p.slug,
    index: p.index,
    title: p.title,
    categories: p.categories,
    status: p.status ? t(STATUS_KEY[p.status]) : undefined,
    cover: { src: p.cover.src, alt: p.cover.alt[loc] },
    transitionLabel: `› ${t('live.casePrompt', { slug: p.slug })}`,
  }));

  return (
    <section id="work" className={styles.work} data-build={`<Index projects={${projects.length}} />`} data-log={t('live.log.index')}>
      <WorkIndex
        items={items}
        labels={{
          section: t('live.sections.work'),
          filterAria: t('live.a11y.filter'),
          all: t('work.filterAll'),
          categories: { ai: t('work.filterAi'), mobile: t('work.filterMobile'), 'product-design': t('work.filterDesign') },
          no: t('live.work.no'),
          project: t('live.work.project'),
          field: t('live.work.field'),
          open: t('live.work.open'),
          case: t('live.work.case'),
          empty: t('work.empty'),
          filterLog: t.raw('live.log.filter') as string,
        }}
      />
    </section>
  );
}
