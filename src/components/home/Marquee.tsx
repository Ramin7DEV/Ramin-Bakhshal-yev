'use client';

import { useEffect, useRef, useState } from 'react';
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
const MIN_SETS = 2; // the CSS fallback loop slides by -50%, so the number of sets stays even

// Drifts on its own, speeds up with scroll velocity and turns around with scroll direction
export function Marquee({ words, lang }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  // How many times the words are repeated: enough to cover the screen plus one loop, whatever the screen width
  const [sets, setSets] = useState(MIN_SETS);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;
    track.dataset.driven = '';

    // One loop = the distance from the start of the first set to the start of the second, gap included.
    // Sets are wrapped in display: contents, so the first real item is what has a position.
    let period = 0;
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const second = (track.children[words.length] as HTMLElement | undefined)?.firstElementChild as HTMLElement | undefined;
      if (!first || !second) return;
      const next = second.offsetLeft - first.offsetLeft;
      if (next <= 0) return;
      period = next;
      const needed = Math.ceil(innerWidth / period) + 1;
      setSets(Math.max(MIN_SETS, needed + (needed % 2)));
    };
    measure();
    // Fonts arriving, a language switch and window resizes all change the width of the words
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    void document.fonts.ready.then(measure);

    let x = 0, dir = 1;
    let onScreen = true;
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true;
    });
    visibility.observe(track.parentElement ?? track);

    const tick = () => {
      if (!onScreen || period === 0) return;
      const raw = scrollVelocity();
      const v = Number.isFinite(raw) ? raw : 0;
      if (Math.abs(v) > 20) dir = v > 0 ? 1 : -1;
      x -= (BASE_SPEED + Math.min(Math.abs(v) / 180, MAX_BOOST)) * dir;
      while (x <= -period) x += period;
      while (x > 0) x -= period;
      track.style.transform = `translate3d(${x}px, 0, 0) skewX(${gsap.utils.clamp(-12, 12, v / -260)}deg)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      visibility.disconnect();
    };
  }, [words]);

  const renderItems = (prefix: string) =>
    words.map((w, i) => (i % 2 ? <i key={`${prefix}${i}`}>{w}</i> : <span key={`${prefix}${i}`}>{w}</span>));

  return (
    <div className={styles.marquee} aria-hidden="true" lang={lang}>
      <div ref={trackRef} className={styles.track}>
        {renderItems('')}
        {Array.from({ length: sets - 1 }, (_, copy) => (
          <span key={copy} className={styles.copy}>
            {renderItems(`${copy}-`)}
          </span>
        ))}
      </div>
    </div>
  );
}
