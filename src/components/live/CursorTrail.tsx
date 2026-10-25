'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './CursorTrail.module.css';

const LIFE = 600; // ms a point of the ribbon stays on screen
const EASE = 0.32; // how fast the ribbon head catches the pointer

type Point = { x: number; y: number; t: number };

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !dot || !ctx) return;
    if (prefersReducedMotion() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dpr = Math.min(2, devicePixelRatio || 1);
    const size = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
    };
    size();
    addEventListener('resize', size);

    // The ribbon is the hot signal colour of the active theme, read from the token (canvas cannot use var())
    let hot = '';
    const readHot = () => {
      hot = getComputedStyle(document.documentElement).getPropertyValue('--live-hot').trim();
    };
    readHot();
    const themeWatch = new MutationObserver(readHot);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const pts: Point[] = [];
    let mx = 0, my = 0, hx = 0, hy = 0, seen = false, muted = false, dirty = false;
    let box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // The dot sits exactly on the pointer; only the ribbon eases behind it
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      const target = e.target instanceof Element ? e.target : null;
      // Areas with their own cursor effect take over; the ribbon would only fight them
      muted = Boolean(target?.closest('[data-no-trail]'));
      dot.classList.toggle(styles.grow ?? '', Boolean(target?.closest('a, button, input, [data-cursor-grow]')));
      if (!seen) {
        hx = mx;
        hy = my;
        seen = true;
        dot.classList.remove(styles.hidden ?? '');
      }
    };
    const onLeave = () => dot.classList.add(styles.hidden ?? '');
    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const moving = Math.abs(mx - hx) + Math.abs(my - hy) > 0.3;
      hx += (mx - hx) * EASE;
      hy += (my - hy) * EASE;
      if (seen && moving && !muted) pts.push({ x: hx, y: hy, t: now });
      while (pts.length && now - (pts[0]?.t ?? now) > LIFE) pts.shift();
      if (!pts.length && !dirty) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Clear only the area the ribbon touched last frame and this frame
      const next = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
      for (const p of pts) {
        next.x0 = Math.min(next.x0, p.x);
        next.y0 = Math.min(next.y0, p.y);
        next.x1 = Math.max(next.x1, p.x);
        next.y1 = Math.max(next.y1, p.y);
      }
      const x0 = Math.min(box.x0, next.x0) - 8;
      const y0 = Math.min(box.y0, next.y0) - 8;
      const x1 = Math.max(box.x1, next.x1) + 8;
      const y1 = Math.max(box.y1, next.y1) + 8;
      if (Number.isFinite(x0)) ctx.clearRect(x0, y0, x1 - x0, y1 - y0);
      box = next;
      dirty = pts.length > 0;

      ctx.lineCap = 'round';
      for (let i = 2; i < pts.length; i++) {
        const a = pts[i - 2], b = pts[i - 1], c = pts[i];
        if (!a || !b || !c) continue;
        const life = 1 - (now - c.t) / LIFE;
        ctx.strokeStyle = hot;
        ctx.globalAlpha = life * 0.7;
        ctx.lineWidth = 0.5 + life * 2.5;
        ctx.beginPath();
        ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      themeWatch.disconnect();
      removeEventListener('resize', size);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.trail} aria-hidden="true" />
      <div ref={dotRef} className={`${styles.dot} ${styles.hidden}`} aria-hidden="true" />
    </>
  );
}
