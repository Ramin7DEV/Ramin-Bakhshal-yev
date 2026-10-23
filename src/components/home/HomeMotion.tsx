'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { gsap, registerScroll, ScrollTrigger } from '@/lib/scroll';

// The smoother already eases the page, so scrubs stay short: a second long ease would only add lag
const SCRUB = 0.3;

// Scroll choreography for the home page. Every tween is tied to the scroll position, not to time.
export function HomeMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerScroll();
    const ctx = gsap.context(() => {
      // Leaving the hero: the headline lifts, the field fades, the menu drifts away
      gsap
        .timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: SCRUB } })
        .to('#hero [data-quiet]', { yPercent: -35, ease: 'none' }, 0)
        .to('#hero [data-field]', { opacity: 0, ease: 'none' }, 0)
        .to('#name', { xPercent: 4, ease: 'none' }, 0);

      // Method columns climb in a staggered wave
      gsap.from('[data-method-step]', {
        y: 160,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: '#method', start: 'top bottom', end: 'top 35%', scrub: SCRUB },
      });

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

      // Big type leans into fast scrolling and settles when it stops
      // Short headings only: skewing a multi-line paragraph repaints all of it on every frame
      const skewed = document.querySelectorAll('[data-skew]');
      const skew = gsap.quickTo(skewed, 'skewY', { duration: 0.7, ease: 'power3.out' });
      ScrollTrigger.create({ onUpdate: (self) => skew(gsap.utils.clamp(-5, 5, self.getVelocity() / -320)) });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
