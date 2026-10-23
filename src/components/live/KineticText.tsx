'use client';

import { useEffect, useRef } from 'react';
import { live, wait } from '@/lib/live';
import { prefersReducedMotion } from '@/lib/motion';

type Props = {
  lines: string[];
  as?: 'h1' | 'h2' | 'p';
  id?: string;
  className?: string;
  label: string;
  /** Size every line to the full width, capped to this share of the viewport height */
  fill?: boolean;
  maxHeight?: number;
  /** The letters stay hidden until live.emit('compile', compileId) */
  compileId?: string;
  compileStep?: number;
};

const REACH = 420; // px around the pointer that letters respond to
const STEPS = 20; // weight is quantised so untouched letters cost nothing

// Big variable-font type: letters gain weight and narrow as the pointer approaches
export function KineticText({ lines, as = 'h1', id, className, label, fill = false, maxHeight = 0.56, compileId, compileStep = 35 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lineEls = [...el.querySelectorAll<HTMLElement>('.kinetic-line')];
    const chars = [...el.querySelectorAll<HTMLElement>('.kinetic-ch')];
    const reduce = prefersReducedMotion();

    const fit = () => {
      if (!fill) return;
      const avail = el.clientWidth;
      const sizes = lineEls.map((l) => {
        l.style.fontSize = '100px';
        return ((100 * avail) / l.scrollWidth) * 0.995;
      });
      const total = sizes.reduce((a, b) => a + b, 0) * 0.8;
      const cap = innerHeight * maxHeight;
      const k = total > cap ? cap / total : 1;
      lineEls.forEach((l, i) => {
        l.style.fontSize = `${(sizes[i] ?? 0) * k}px`;
      });
    };

    // Letter centres relative to the block, measured once per layout instead of on every move
    let centers: [number, number][] = [];
    const measure = () => {
      const r = el.getBoundingClientRect();
      centers = chars.map((c) => {
        const b = c.getBoundingClientRect();
        return [b.left - r.left + b.width / 2, b.top - r.top + b.height / 2];
      });
    };
    const refit = () => {
      fit();
      requestAnimationFrame(measure);
    };
    void document.fonts.ready.then(refit);
    // Refit once a window drag settles, not on every resize event
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refit, 150);
    };
    addEventListener('resize', onResize);

    const reveal = async () => {
      for (const c of chars) {
        delete c.dataset.pending;
        if (!reduce) await wait(compileStep);
      }
      await wait(500);
      measure();
    };
    const offCompile = compileId ? live.on('compile', (target) => target === compileId && void reveal()) : undefined;
    if (!compileId || live.wasCompiled(compileId)) void reveal();

    let mx = -1e4, my = -1e4, queued = false, onScreen = true, raf = 0;
    const last = chars.map(() => -1);
    const io = new IntersectionObserver(([e]) => {
      onScreen = Boolean(e?.isIntersecting);
    });
    io.observe(el);
    const update = () => {
      queued = false;
      if (!onScreen) return;
      if (!centers.length) measure();
      const r = el.getBoundingClientRect();
      chars.forEach((c, i) => {
        const [cx, cy] = centers[i] ?? [0, 0];
        const d = Math.hypot(mx - r.left - cx, my - r.top - cy);
        const k = Math.round(Math.max(0, 1 - d / REACH) * STEPS) / STEPS;
        if (k === last[i]) return;
        last[i] = k;
        c.style.fontVariationSettings = `"wght" ${300 + k * 500}, "wdth" ${100 - k * 25}, "opsz" 96`;
        c.classList.toggle('is-hot', k > 0.82);
      });
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(update);
      }
    };
    const interactive = !reduce && matchMedia('(hover: hover)').matches;
    if (interactive) addEventListener('pointermove', onMove, { passive: true });

    return () => {
      offCompile?.();
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      removeEventListener('resize', onResize);
      removeEventListener('pointermove', onMove);
    };
  }, [fill, maxHeight, compileId, compileStep]);

  const Tag = as;
  return (
    <Tag ref={ref} id={id} className={`kinetic ${className ?? ''}`} aria-label={label} lang="en">
      {lines.map((line) => (
        <span className="kinetic-line" key={line} aria-hidden="true">
          {[...line].map((ch, i) => (
            <span className="kinetic-ch" data-pending="" key={i}>
              {ch === ' ' ? '\u00a0' : ch}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
