'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';
import { live, wait } from '@/lib/live';
import { prefersReducedMotion } from '@/lib/motion';

const OUTLINE_MS = 220;
const SETTLE_MS = 450;

/** Plays the "outline, then content" build on one section. Safe to call again to rebuild it. */
export async function buildSection(section: HTMLElement) {
  if (section.classList.contains('is-building')) return;
  section.classList.remove('is-built');
  section.classList.add('is-building');
  live.setBusy(true);
  if (section.dataset.log) live.log(section.dataset.log, 'add');
  await wait(OUTLINE_MS);
  section.classList.add('is-built');
  live.markBuilt();
  await wait(SETTLE_MS);
  section.classList.remove('is-building');
  live.setBusy(false);
}

// Builds every [data-build] section of the current page as it approaches the viewport.
// Sections marked data-build-manual (the heroes) run their own intro instead.
export function BuildObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-build]:not([data-build-manual])')];
    if (prefersReducedMotion()) {
      sections.forEach((s) => s.classList.add('is-built'));
      return;
    }
    // Start a third of a screen early, so content is ready when the eye arrives
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          void buildSection(e.target as HTMLElement);
        }),
      { threshold: 0, rootMargin: '0px 0px 35% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
