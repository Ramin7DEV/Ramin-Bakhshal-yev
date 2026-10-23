'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { gsap, registerScroll, scrollToTarget, ScrollTrigger } from '@/lib/scroll';
import styles from './ChapterRail.module.css';

type Props = {
  title: string;
  ariaLabel: string;
  chapters: { id: string; label: string }[];
  facts: { label: string; value: string; pending: boolean }[];
};

// Left rail of a case study: chapter list with progress, pinned while the chapters scroll
export function ChapterRail({ title, ariaLabel, chapters, facts }: Props) {
  const railRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    const progress = progressRef.current;
    const container = rail?.parentElement?.querySelector<HTMLElement>('[data-chapters]');
    if (!rail || !progress || !container) return;
    registerScroll();

    const sections = chapters.map((c) => document.getElementById(`ch-${c.id}`)).filter((s): s is HTMLElement => Boolean(s));
    const update = (p: number) => {
      progress.style.transform = `scaleY(${p})`;
      const mid = innerHeight * 0.45;
      let current = 0;
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top < mid) current = i;
      });
      setActive(current);
    };
    const triggers = [
      ScrollTrigger.create({ trigger: container, start: 'top 45%', end: 'bottom 45%', onUpdate: (self) => update(self.progress), onRefresh: (self) => update(self.progress) }),
    ];

    // position: sticky does not survive the transformed smooth-scroll container, so the rail is pinned instead
    const mm = gsap.matchMedia();
    if (!prefersReducedMotion()) {
      mm.add('(min-width: 901px)', () => {
        ScrollTrigger.create({ trigger: rail, start: 'top 90px', endTrigger: container, end: 'bottom bottom', pin: true, pinSpacing: false });
      });
    }
    return () => {
      triggers.forEach((tr) => tr.kill());
      mm.revert();
    };
  }, [chapters]);

  return (
    <aside ref={railRef} className={styles.rail} aria-label={ariaLabel}>
      <span className="live-label">{title}</span>
      <ol className={styles.list}>
        <span ref={progressRef} className={styles.progress} aria-hidden="true" />
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#ch-${c.id}`}
              className={i === active ? styles.active : i < active ? styles.done : undefined}
              aria-current={i === active ? 'step' : undefined}
              onClick={(e) => {
                const target = document.getElementById(`ch-${c.id}`);
                if (!target) return;
                e.preventDefault();
                scrollToTarget(target);
              }}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {c.label}
            </a>
          </li>
        ))}
      </ol>
      <dl className={styles.facts}>
        {facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd className={f.pending ? styles.pending : undefined}>{f.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
