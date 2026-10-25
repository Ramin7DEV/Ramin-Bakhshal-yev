'use client';

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { live } from '@/lib/live';
import { prefersReducedMotion } from '@/lib/motion';
import { applyTheme, readStoredTheme, readTheme, storeTheme, syncThemeColor, type Theme } from '@/lib/theme';
import styles from './ThemeToggle.module.css';

type Props = {
  /** Accessible name; aria-pressed says whether the dark theme is on */
  label: string;
  /** Lines written to the live console when the theme changes */
  logDark: string;
  logLight: string;
};

// The inline head script owns data-theme before hydration; this store only mirrors it into React
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};
const getServerTheme = (): Theme | null => null;

// "800ms" or "0.8s" from a duration token
const toMs = (value: string) => {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return 0;
  return value.trim().endsWith('ms') ? n : n * 1000;
};

// Two frames: the browser has painted the new theme with transitions off, so nothing eases afterwards
const afterPaint = (fn: () => void) => requestAnimationFrame(() => requestAnimationFrame(fn));

export function ThemeToggle({ label, logDark, logLight }: Props) {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerTheme);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // A client-side navigation can hand React a fresh <html> without data-theme or live-js (a locale switch swaps the
  // whole layout), and the head script only runs on a full page load. Put the theme back before paint.
  useLayoutEffect(() => {
    const root = document.documentElement;
    // The head script also adds live-js, which gates the reveal animations; it is lost the same way
    root.classList.add('live-js');
    if (root.dataset.theme) return;
    root.dataset.theme = readStoredTheme() ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    syncThemeColor();
  }, [pathname]);

  // Next re-renders the theme-color metas on navigation; point them back at the active theme
  useEffect(() => {
    syncThemeColor();
  }, [pathname]);

  // Until the visitor picks a theme, the page keeps following the system setting live
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const onSystem = () => {
      if (readStoredTheme()) return;
      const root = document.documentElement;
      root.classList.add('theme-swap');
      applyTheme(media.matches ? 'dark' : 'light');
      afterPaint(() => root.classList.remove('theme-swap'));
    };
    media.addEventListener('change', onSystem);
    return () => media.removeEventListener('change', onSystem);
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    storeTheme(next);
    live.log(next === 'dark' ? logDark : logLight, 'ok');

    const swap = () => {
      root.classList.add('theme-swap');
      applyTheme(next);
    };

    // No View Transitions, or the visitor asked for less motion: the theme changes in place, at once
    if (!('startViewTransition' in document) || prefersReducedMotion()) {
      swap();
      afterPaint(() => root.classList.remove('theme-swap'));
      return;
    }

    // The new theme opens as a circle from the toggle and grows until it covers the farthest corner.
    // Only a screenshot pair is animated, so ScrollSmoother, GSAP and the scroll position are untouched.
    const box = buttonRef.current?.getBoundingClientRect();
    const x = box ? box.left + box.width / 2 : innerWidth;
    const y = box ? box.top + box.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add('theme-reveal');
    const transition = document.startViewTransition(swap);
    transition.ready
      .then(() => {
        const tokens = getComputedStyle(root);
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: toMs(tokens.getPropertyValue('--live-dur-theme')),
            easing: tokens.getPropertyValue('--live-ease-theme').trim() || 'ease',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {
        // Skipped transition (another one started, tab hidden): the theme is already applied
      });
    transition.finished.finally(() => {
      root.classList.remove('theme-reveal', 'theme-swap');
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.toggle}
      aria-label={label}
      aria-pressed={theme === null ? undefined : theme === 'dark'}
      onClick={toggle}
    >
      {/* A disc, half filled: the filled half turns to the other side with the theme */}
      <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <circle cx="8" cy="8" r="6.25" />
        <path className={styles.half} d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" />
      </svg>
    </button>
  );
}
