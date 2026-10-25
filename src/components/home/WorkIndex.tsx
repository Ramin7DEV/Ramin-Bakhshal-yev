'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ProjectCategory } from '@/content/types';
import { live } from '@/lib/live';
import { prefersReducedMotion } from '@/lib/motion';
import { gsap, registerScroll } from '@/lib/scroll';
import { TransitionLink } from '@/components/live/TransitionLink';
import styles from './WorkIndex.module.css';

export type WorkIndexItem = {
  slug: string;
  index: string;
  title: string;
  categories: ProjectCategory[];
  /** Where the project stands (live, prototype), already translated */
  status?: string;
  cover: { src: string; alt: string };
  transitionLabel: string;
};

type Labels = {
  section: string;
  filterAria: string;
  all: string;
  categories: Record<ProjectCategory, string>;
  no: string;
  project: string;
  field: string;
  open: string;
  case: string;
  empty: string;
  /** "filter → {filter} ({count})" */
  filterLog: string;
};

type Props = {
  items: WorkIndexItem[];
  labels: Labels;
};

type Filter = 'all' | ProjectCategory;
const FILTERS: Filter[] = ['all', 'ai', 'mobile', 'product-design'];
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*';

function scramble(el: HTMLElement, final: string) {
  let frame = 0;
  const id = setInterval(() => {
    el.textContent = [...final]
      .map((c, i) => (c === ' ' || i < frame / 2 ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join('');
    if (++frame > final.length * 2) {
      clearInterval(id);
      el.textContent = final;
    }
  }, 28);
}

export function WorkIndex({ items, labels }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [hovered, setHovered] = useState<number | null>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const visible = items.filter((p) => filter === 'all' || p.categories.includes(filter));

  const choose = (f: Filter) => {
    setFilter(f);
    const count = items.filter((p) => f === 'all' || p.categories.includes(f)).length;
    live.log(labels.filterLog.replace('{filter}', f).replace('{count}', String(count)));
  };

  // The cover follows the pointer with a little lag and tilt while a row is hovered
  useEffect(() => {
    const peek = peekRef.current;
    if (!peek || prefersReducedMotion() || !matchMedia('(hover: hover)').matches) return;
    let px = 0, py = 0, tx = 0, ty = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX + 24;
      ty = e.clientY - 120;
    };
    const follow = () => {
      raf = requestAnimationFrame(follow);
      if (hovered === null && Math.abs(tx - px) + Math.abs(ty - py) < 0.5) return;
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;
      peek.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${(tx - px) * 0.04}deg)`;
    };
    addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(follow);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onMove);
    };
  }, [hovered]);

  // Rows slide up one after another as they arrive
  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    registerScroll();
    const ctx = gsap.context(() => {
      list.querySelectorAll(`.${styles.row}`).forEach((row) => {
        gsap.from(row, { yPercent: 70, opacity: 0, ease: 'power3.out', duration: 0.8, scrollTrigger: { trigger: row, start: 'top bottom' } });
      });
      // Title skew comes from the page choreography via [data-skew]; a second tween here would fight it
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className={styles.top} data-reveal="">
        <h2 className="live-label">{labels.section}</h2>
        <div className={styles.filters} role="group" aria-label={labels.filterAria}>
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => choose(f)}>
              {f === 'all' ? labels.all : labels.categories[f]}
              <sup>{f === 'all' ? items.length : items.filter((p) => p.categories.includes(f)).length}</sup>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.head} data-reveal="2" aria-hidden="true">
        <span>{labels.no}</span>
        <span>{labels.project}</span>
        <span>{labels.field}</span>
        <span>{labels.open}</span>
      </div>

      <div ref={listRef} data-reveal="3">
        {items.map((p, i) => {
          const shown = visible.includes(p);
          return (
            <div key={p.slug} className={`${styles.wrap} ${shown ? '' : styles.out}`}>
              <div>
                <TransitionLink
                  href={`/work/${p.slug}`}
                  transitionLabel={p.transitionLabel}
                  className={styles.row}
                  tabIndex={shown ? undefined : -1}
                  aria-hidden={shown ? undefined : true}
                  onPointerEnter={(e) => {
                    setHovered(i);
                    const h3 = e.currentTarget.querySelector('h3');
                    if (h3 && !prefersReducedMotion()) scramble(h3, p.title);
                  }}
                  onPointerLeave={() => setHovered(null)}
                >
                  <span className={styles.n}>{p.index}</span>
                  <h3 lang="en" data-skew="">
                    {p.title}
                  </h3>
                  <span className={styles.tags}>
                    {p.categories.map((c) => labels.categories[c]).join(' · ')}
                    {p.status && <span className={styles.status}>{p.status}</span>}
                  </span>
                  <span className={styles.go}>{labels.case}</span>
                </TransitionLink>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && <p className={styles.empty}>{labels.empty}</p>}
      </div>

      <div ref={peekRef} className={`${styles.peek} ${hovered !== null ? styles.peekOn : ''}`} aria-hidden="true">
        {items.map((p, i) => (
          <Image
            key={p.slug}
            src={p.cover.src}
            alt=""
            fill
            sizes="340px"
            // Three small images: fetch and decode them up front so nothing decodes mid-scroll
            loading="eager"
            className={hovered === i ? styles.imgOn : undefined}
          />
        ))}
        {hovered !== null && <span className={styles.cap}>{`${items[hovered]?.index} / ${items[hovered]?.title}`}</span>}
      </div>
    </>
  );
}
