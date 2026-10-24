'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { gsap, getSmoother, registerScroll, ScrollTrigger } from '@/lib/scroll';

// The smoother already eases the page, so scrubs stay short: a second long ease would only add lag
const SCRUB = 0.3;
const CLIMB_Y = 160; // px a [data-climb] child rises through as its block arrives
const CLIMB_STAGGER = 0.12;
const SKEW_MAX = 5; // deg
const SKEW_PER = 320; // px/s of visible scroll per degree of lean
const SKEW_FOLLOW = 0.35; // share of the remaining lean covered per frame: a light filter, not a second ease
const WALK_STEP = 70; // % of a screen height of scrolling per screen in the try-on walkthrough
const STEP_DIM = 0.25; // opacity of the steps that are not current
const WIDE = '(min-width: 901px)';
const FLIP_LEAN = -4; // deg the pitch card tilts halfway through its turn

type Page = 'home' | 'case';

// Scroll choreography for every page. Each tween is tied to the scroll position, not to time.
// Shared: [data-climb] blocks rise in a staggered wave, [data-skew] headings lean with the glide.
// Page-specific extras live in CHOREO.
export function PageMotion({ page }: { page: Page }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerScroll();
    const ctx = gsap.context(() => {
      const undoPage = CHOREO[page]();
      climb();
      const undoSkew = skewWithScroll();
      return () => {
        undoPage?.();
        undoSkew?.();
      };
    });
    return () => ctx.revert();
  }, [page]);

  return null;
}

// Each entry may return a cleanup for anything gsap.context does not revert on its own (matchMedia, tickers)
const CHOREO: Record<Page, () => (() => void) | void> = {
  home() {
    // Leaving the hero: the headline lifts, the field fades, the menu drifts away
    gsap
      .timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: SCRUB } })
      .to('#hero [data-quiet]', { yPercent: -35, ease: 'none' }, 0)
      .to('#hero [data-field]', { opacity: 0, ease: 'none' }, 0)
      .to('#name', { xPercent: 4, ease: 'none' }, 0);

    // Stats rise out of their cells
    gsap.from('[data-stat]', {
      yPercent: 100,
      ease: 'none',
      stagger: 0.08,
      scrollTrigger: { trigger: '#stats', start: 'top bottom', end: 'top 50%', scrub: SCRUB },
    });

    // The email grows into place as the dark block arrives
    gsap.from('[data-mail]', {
      scale: 0.8,
      transformOrigin: '0% 50%',
      ease: 'none',
      scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'top 35%', scrub: SCRUB },
    });
  },

  case() {
    // Leaving the hero: title lines drift apart, the prompt lifts away, lede and manifest rise a little
    gsap
      .timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: SCRUB } })
      .to('#title .kinetic-line', { xPercent: (i: number) => (i % 2 ? 6 : -6), ease: 'none' }, 0)
      .to('[data-case-intro]', { yPercent: -200, opacity: 0, ease: 'none' }, 0)
      .to('[data-case-drift]', { yPercent: -12, ease: 'none' }, 0)
      .to('#hero [data-field]', { opacity: 0, ease: 'none' }, 0);

    // A still cover zooms out slowly across its whole pass through the screen (the video stays put)
    gsap.utils.toArray<HTMLElement>('[data-cover-img]').forEach((img) => {
      gsap.fromTo(img, { scale: 1.15 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // The pitch card turns over as the pitch scrolls through, leaning a little while it is side-on
    if (document.querySelector('[data-flip]')) {
      gsap
        .timeline({ scrollTrigger: { trigger: '[data-flip]', start: 'top 85%', end: 'center 45%', scrub: SCRUB } })
        .fromTo('[data-flip-inner]', { rotateY: 0 }, { rotateY: 180, ease: 'power2.inOut', duration: 1 }, 0)
        .to('[data-flip-inner]', { rotateZ: FLIP_LEAN, ease: 'sine.inOut', duration: 0.5, yoyo: true, repeat: 1 }, 0);
    }

    // The request flow: the line draws itself, each step lights in turn, the failure branch arrives last
    if (document.querySelector('[data-flow]')) {
      gsap
        .timeline({ scrollTrigger: { trigger: '[data-flow]', start: 'top 75%', end: 'bottom 55%', scrub: SCRUB } })
        .from('[data-flow-line]', { scaleX: 0, ease: 'none', duration: 1 }, 0)
        .from('[data-flow-step]', { opacity: 0.15, y: 24, ease: 'none', stagger: 0.16, duration: 0.2 }, 0)
        .from('[data-flow-fallback]', { opacity: 0, x: -40, ease: 'none', duration: 0.2 }, 0.9);
    }

    gsap.from('[data-next-title]', {
      yPercent: 40,
      ease: 'none',
      scrollTrigger: { trigger: '[data-next-title]', start: 'top bottom', end: 'top 30%', scrub: SCRUB },
    });

    // Wide screens: the try-on walkthrough is pinned and each screen wipes over the last inside the phone frame,
    // while the step list moves its highlight along. Phones get a swipe carousel instead (CSS only).
    const mm = gsap.matchMedia();
    mm.add(WIDE, () => {
      const section = document.querySelector<HTMLElement>('[data-walk]');
      if (!section) return;
      const layers = gsap.utils.toArray<HTMLElement>('[data-walk-layer]', section);
      const steps = gsap.utils.toArray<HTMLElement>('[data-walk-step]', section);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: `+=${(layers.length - 1) * WALK_STEP}%`, pin: true, scrub: SCRUB },
      });
      tl.fromTo(steps.slice(1), { opacity: STEP_DIM }, { opacity: STEP_DIM, duration: 0 }, 0);
      layers.slice(1).forEach((layer, k) => {
        const inner = layer.querySelector('[data-walk-inner]');
        const edge = layer.querySelector('[data-walk-edge]');
        tl.fromTo(layer, { x: 0, xPercent: 101 }, { xPercent: 0, ease: 'power2.inOut', duration: 1 }, k)
          .fromTo(inner, { x: 0, xPercent: -101 }, { xPercent: 0, ease: 'power2.inOut', duration: 1 }, k)
          // The edge line only marks the wipe while it moves; it fades as the screen lands at the frame's left side
          .fromTo(edge ?? [], { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.15 }, k + 0.85)
          .to(steps[k] ?? [], { opacity: STEP_DIM, ease: 'none', duration: 0.5 }, k + 0.25)
          .to(steps[k + 1] ?? [], { opacity: 1, ease: 'none', duration: 0.5 }, k + 0.25);
      });
      // A short hold on the last screen before the pin lets go
      tl.to({}, { duration: 0.4 });
    });
    return () => mm.revert();
  },
};

// The children of every [data-climb] block climb in a staggered wave while the block enters the screen
function climb() {
  gsap.utils.toArray<HTMLElement>('[data-climb]').forEach((block) => {
    gsap.from(block.children, {
      y: CLIMB_Y,
      ease: 'none',
      stagger: CLIMB_STAGGER,
      scrollTrigger: { trigger: block, start: 'top bottom', end: 'top 35%', scrub: SCRUB },
    });
  });
}

// Big type leans into fast scrolling and settles when it stops.
// The lean follows the smoother's velocity: the speed of the page you see, not of the native scroll position that
// runs ahead of it. So headings straighten together with the glide instead of after it.
// Short headings only: skewing a multi-line paragraph repaints all of it on every frame.
function skewWithScroll() {
  const skewed = gsap.utils.toArray<HTMLElement>('[data-skew]');
  if (!skewed.length) return undefined;
  const set = gsap.quickSetter(skewed, 'skewY', 'deg');
  const native = ScrollTrigger.create({}); // touch devices without the smoother
  let lean = 0;
  const tick = () => {
    const smoother = getSmoother();
    const velocity = smoother ? smoother.getVelocity() : native.getVelocity();
    const target = gsap.utils.clamp(-SKEW_MAX, SKEW_MAX, velocity / -SKEW_PER);
    const next = lean + (target - lean) * SKEW_FOLLOW;
    const settled = Math.abs(next) < 0.01 && Math.abs(target) < 0.01;
    if (settled && lean === 0) return; // at rest: no style writes
    lean = settled ? 0 : next;
    set(lean);
  };
  gsap.ticker.add(tick);
  return () => {
    gsap.ticker.remove(tick);
    set(0);
  };
}
