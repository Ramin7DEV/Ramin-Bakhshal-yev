import type { ReactNode } from 'react';
import styles from './PageShell.module.css';

// Plain page frame for routes without their own hero: clears the fixed header, keeps the gutter
export function PageShell({ children }: { children: ReactNode }) {
  return <article className={styles.shell}>{children}</article>;
}
