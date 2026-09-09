'use client';

import { useState, useEffect, type ReactNode } from 'react';
import styles from './SiteHeader.module.css';

type HeaderShellProps = {
  children: ReactNode;
};

export function HeaderShell({ children }: HeaderShellProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="site-header"
      className={styles.header}
      data-scrolled={isScrolled ? 'true' : undefined}
    >
      {children}
    </header>
  );
}
