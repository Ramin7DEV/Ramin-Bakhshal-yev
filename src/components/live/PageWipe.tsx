'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { live } from '@/lib/live';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './PageWipe.module.css';

const COVER_MS = 560;

type Phase = 'idle' | 'in' | 'covered' | 'out';

// Ink curtain between pages: rises on the way out, lifts once the new route has rendered
export function PageWipe() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const [label, setLabel] = useState('');
  const lastPath = useRef(pathname);

  useEffect(
    () =>
      live.on('navigate', ({ href, label: nextLabel }) => {
        if (prefersReducedMotion()) {
          router.push(href);
          return;
        }
        setLabel(nextLabel ?? '');
        setPhase('in');
        setTimeout(() => {
          setPhase('covered');
          router.push(href);
        }, COVER_MS);
      }),
    [router],
  );

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    // Two frames so the new page has painted under the curtain before it lifts
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setPhase((p) => (p === 'idle' ? p : 'out')));
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      className={`${styles.wipe} ${styles[phase] ?? ''}`}
      aria-hidden="true"
      onTransitionEnd={() => phase === 'out' && setPhase('idle')}
    >
      <span>{label}</span>
    </div>
  );
}
