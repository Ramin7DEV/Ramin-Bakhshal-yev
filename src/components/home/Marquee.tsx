'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { gsap, scrollVelocity } from '@/lib/scroll';
import styles from './Marquee.module.css';

type Props = {
  /** Alternating words: even items are display words, odd ones are serif connectors */
  words: string[];
  /** Language of the words, when it differs from the page (tech names: "en", so az uppercase keeps "SwiftUI" as SWIFTUI) */
  lang?: string;
};

const BASE_SPEED = 0.6; // px per frame at rest
const MAX_BOOST = 14;

// Drifts on its own, speeds up with scroll velocity and turns around with scroll direction
export function Marquee({ words, lang }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;
    track.dataset.driven = '';

    let half = track.scrollWidth / 2;
    const measure = () => {
      half = track.scrollWidth / 2;
    };
    void document.fonts.ready.then(measure);
    addEventListener('resize', measure);

    let x = 0, dir = 1;
    const tick = () => {
      const v = scrollVelocity();
      if (Math.abs(v) > 20) dir = v > 0 ? 1 : -1;
      x -= (BASE_SPEED + Math.min(Math.abs(v) / 180, MAX_BOOST)) * dir;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px, 0, 0) skewX(${gsap.utils.clamp(-12, 12, v / -260)}deg)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      removeEventListener('resize', measure);
    };
  }, []);

  const items = words.map((w, i) => (i % 2 ? <i key={i}>{w}</i> : <span key={i}>{w}</span>));

  return (
    <div className={styles.marquee} aria-hidden="true" lang={lang}>
      <div ref={trackRef} className={styles.track}>
        {items}
        {items.map((item, i) => (
          <span key={`copy-${i}`} className={styles.copy}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
