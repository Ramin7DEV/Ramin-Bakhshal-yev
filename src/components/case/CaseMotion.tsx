'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { gsap, registerScroll, ScrollTrigger } from '@/lib/scroll';

const SCRUB = 0.3;

// Scroll choreography for a case study page
export function CaseMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerScroll();
    const ctx = gsap.context(() => {
      // Leaving the hero: title lines drift apart, the prompt lifts away
      gsap
        .timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: SCRUB } })
        .to('#title .kinetic-line', { xPercent: (i: number) => (i % 2 ? 6 : -6), ease: 'none' }, 0)
        .to('[data-case-intro]', { yPercent: -200, opacity: 0, ease: 'none' }, 0);

      // Cover zooms out slowly across its whole pass through the screen
      gsap.fromTo('[data-cover-img]', { scale: 1.15 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '[data-cover-img]', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.from('[data-next-title]', {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: { trigger: '[data-next-title]', start: 'top bottom', end: 'top 30%', scrub: SCRUB },
      });

      const skewed = document.querySelectorAll('[data-skew]');
      const skew = gsap.quickTo(skewed, 'skewY', { duration: 0.7, ease: 'power3.out' });
      ScrollTrigger.create({ onUpdate: (self) => skew(gsap.utils.clamp(-5, 5, self.getVelocity() / -320)) });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
