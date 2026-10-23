'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
};

const MAX_TILT = 14; // degrees at the edge of the viewport
const GLARE_SHIFT = 35; // percent the highlight travels across the tile

// The app icon turns towards the pointer anywhere on the first screen. Position is read
// from the viewport, never from layout, so a frame costs one transform write.
export function IconTilt({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const glare = el.querySelector<HTMLElement>('[data-glare]');
    let x = 0, y = 0, raf = 0, onScreen = true;

    const apply = () => {
      raf = 0;
      el.style.transform = `rotateX(${(-y * MAX_TILT).toFixed(2)}deg) rotateY(${(x * MAX_TILT).toFixed(2)}deg)`;
      if (glare) glare.style.transform = `translate3d(${(x * GLARE_SHIFT).toFixed(1)}%, ${(y * GLARE_SHIFT).toFixed(1)}%, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      if (!onScreen) return;
      x = (e.clientX / innerWidth) * 2 - 1;
      y = (e.clientY / innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
    });
    io.observe(el);
    el.dataset.tilt = 'on';
    addEventListener('pointermove', onMove, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onMove);
      delete el.dataset.tilt;
      el.style.transform = '';
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
