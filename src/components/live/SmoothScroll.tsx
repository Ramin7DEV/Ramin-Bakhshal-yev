'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';
import { prefersReducedMotion } from '@/lib/motion';
import { gsap, registerScroll, getSmoother, scrollToTarget, ScrollSmoother, ScrollTrigger } from '@/lib/scroll';

// Two layers make the scroll feel heavy:
// 1. A wheel governor decides where the page may be: it eases toward the wheel input
//    and never travels faster than MAX_SPEED, however hard the wheel or trackpad is flicked.
// 2. ScrollSmoother then glides the visible page after that position over SMOOTH seconds.
const SMOOTH = 1.0;
const SMOOTH_TOUCH = 0.2;
const WHEEL_GAIN = 0.8; // page distance per unit of wheel distance
const FOLLOW = 0.1; // share of the remaining distance covered per frame
const MAX_SPEED = 22; // px per frame (~1300px/s at 60fps): the speed limit
const MAX_BACKLOG = 0.8; // screens of pending scroll; a harder flick does not queue more
const LINE_PX = 16; // wheel events in "lines" (some mice, Firefox)

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (prefersReducedMotion()) return;
    registerScroll();
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: SMOOTH,
      ease: 'expo', // fast start, long soft settle: the "heavy" glide
      effects: true,
      smoothTouch: SMOOTH_TOUCH,
    });

    // ---- Wheel governor ----
    let target = smoother.scrollTop();
    let pos = target;
    let lastSet = target;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom on trackpads
      const inner = (e.target as Element | null)?.closest?.('[data-scroll-inside]');
      if (inner && inner.scrollHeight > inner.clientHeight) return; // let small scroll boxes (the dock log) scroll
      e.preventDefault();
      const delta = e.deltaY * (e.deltaMode === 1 ? LINE_PX : e.deltaMode === 2 ? innerHeight : 1);
      const backlog = innerHeight * MAX_BACKLOG;
      const max = ScrollTrigger.maxScroll(window);
      target = gsap.utils.clamp(0, max, gsap.utils.clamp(pos - backlog, pos + backlog, target + delta * WHEEL_GAIN));
    };
    addEventListener('wheel', onWheel, { passive: false });
    const govern = () => {
      const y = smoother.scrollTop();
      // Moved by something else (keyboard, scrollbar, an anchor link): adopt that position
      if (Math.abs(y - lastSet) > 2) {
        target = pos = lastSet = y;
        return;
      }
      const diff = target - pos;
      if (Math.abs(diff) < 0.5) return;
      pos += gsap.utils.clamp(-MAX_SPEED, MAX_SPEED, diff * FOLLOW);
      smoother.scrollTop(pos);
      lastSet = pos;
    };
    gsap.ticker.add(govern);

    // A #hash makes the browser scroll the clipped wrapper behind the smoother's back; keep it at 0
    const wrapper = document.getElementById('smooth-wrapper');
    const pin = () => {
      if (wrapper && (wrapper.scrollTop || wrapper.scrollLeft)) {
        wrapper.scrollTop = 0;
        wrapper.scrollLeft = 0;
      }
    };
    pin();
    wrapper?.addEventListener('scroll', pin, { passive: true });

    // Same-page anchor links scroll through the smoother instead of jumping
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.('a[href*="#"]');
      if (!(anchor instanceof HTMLAnchorElement) || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(anchor.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
    };
    document.addEventListener('click', onClick);

    return () => {
      gsap.ticker.remove(govern);
      removeEventListener('wheel', onWheel);
      document.removeEventListener('click', onClick);
      wrapper?.removeEventListener('scroll', pin);
      smoother.kill();
    };
  }, []);

  // Every route starts at the top (or at its #hash) and re-measures its triggers
  useEffect(() => {
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (target) scrollToTarget(target, false);
      else getSmoother()?.scrollTop(0);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
