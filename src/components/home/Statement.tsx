'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { registerScroll, ScrollTrigger } from '@/lib/scroll';
import styles from './Statement.module.css';

type Props = {
  label: string;
  text: string;
};

// A paragraph that lights up word by word as it scrolls through the screen
export function Statement({ label, text }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = [...el.querySelectorAll<HTMLElement>('span')];
    const light = (n: number) => spans.forEach((s, i) => s.classList.toggle(styles.on ?? '', i < n));
    if (prefersReducedMotion()) {
      light(spans.length);
      return;
    }
    registerScroll();
    let lit = -1;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'bottom 50%',
      onUpdate: (self) => {
        const n = Math.round(self.progress * spans.length);
        if (n === lit) return; // only touch the DOM when the count changes
        lit = n;
        light(n);
      },
    });
    return () => trigger.kill();
  }, [text]);

  return (
    <section id="statement" className={styles.statement}>
      <span className="live-label" data-speed="1.25">
        {label}
      </span>
      <h2 ref={ref} className={styles.text}>
        {words.map((w, i) => (
          <span key={i}>{w} </span>
        ))}
      </h2>
    </section>
  );
}
