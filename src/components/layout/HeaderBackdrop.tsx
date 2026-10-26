'use client';

import { useEffect } from 'react';
import styles from './HeaderBackdrop.module.css';

const THRESHOLD = 24; // px scrolled before the bar gets its backdrop

// A soft backdrop behind the fixed header once the page has moved, so the header text stays readable over big type.
// It is a sibling of the header, not part of it: the header blends with what is behind it (mix-blend-mode: difference)
// and a background inside it would be inverted too. The scroll state goes on <html> so no React render happens per scroll.
export function HeaderBackdrop() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      if (window.scrollY > THRESHOLD) root.setAttribute('data-scrolled', '');
      else root.removeAttribute('data-scrolled');
    };
    update();
    addEventListener('scroll', update, { passive: true });
    return () => {
      removeEventListener('scroll', update);
      root.removeAttribute('data-scrolled');
    };
  }, []);

  return <div className={styles.backdrop} aria-hidden="true" />;
}
