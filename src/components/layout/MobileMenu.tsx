'use client';

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { live } from '@/lib/live';
import { prefersReducedMotion } from '@/lib/motion';
import { getSmoother, scrollToTarget } from '@/lib/scroll';
import { BakuClock } from '@/components/live/BakuClock';
import { Brand } from '@/components/primitives/Brand';
import styles from './MobileMenu.module.css';

type Props = {
  labels: {
    menu: string;
    close: string;
    dialog: string;
    projects: string;
    clockCity: string;
    github: string;
  };
  /** Sections with an href open that page instead of scrolling to an anchor on the home page */
  sections: { id: string; label: string; href?: string }[];
  /** Separate pages (About, Contact) listed under the home sections */
  pages: { href: string; label: string }[];
  projects: { slug: string; index: string; title: string; transitionLabel: string }[];
  locales: Record<Locale, string>;
  email: string;
  githubHref?: string;
  monogram: string;
};

type Phase = 'closed' | 'open' | 'closing';
const CLOSE_MS = 450;
const FOCUSABLE = 'a[href], button:not([disabled])';

// Phone navigation: a full-screen ink panel that drops from the top.
// Rendered into <body> through a portal, because the header blends with the page (mix-blend-mode)
// and anything inside it would be colour-inverted.
export function MobileMenu({ labels, sections, pages, projects, locales, email, githubHref, monogram }: Props) {
  const [phase, setPhase] = useState<Phase>('closed');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const close = useCallback((after?: () => void) => {
    setPhase((p) => (p === 'open' ? 'closing' : p));
    window.setTimeout(
      () => {
        setPhase('closed');
        after?.();
      },
      prefersReducedMotion() ? 0 : CLOSE_MS,
    );
  }, []);

  // While open: freeze the page behind, trap focus, close on Escape, give focus back on close
  useEffect(() => {
    if (phase !== 'open') return;
    const smoother = getSmoother();
    smoother?.paused(true);
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const button = buttonRef.current;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      smoother?.paused(false);
      root.style.overflow = prevOverflow;
      button?.focus({ preventScroll: true });
    };
  }, [phase, close]);

  // Section links: on the home page glide to the section, elsewhere go home and land on it
  const goToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    close(() => {
      const target = document.getElementById(id);
      if (target && pathname === '/') scrollToTarget(target);
      else live.emit('navigate', { href: `/#${id}` });
    });
  };

  const goToPage = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    close(() => live.emit('navigate', { href }));
  };

  const goToProject = (e: MouseEvent<HTMLAnchorElement>, slug: string, label: string) => {
    e.preventDefault();
    close(() => live.emit('navigate', { href: `/work/${slug}`, label }));
  };

  const switchLocale = (code: Locale) => {
    if (code === locale) return;
    close(() => router.replace(pathname, { locale: code }));
  };

  const open = phase === 'open';

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setPhase('open')}
      >
        <span className={styles.bars} aria-hidden="true" />
        {labels.menu}
      </button>

      {phase !== 'closed' &&
        createPortal(
          <div
            ref={panelRef}
            className={`${styles.panel} ${phase === 'closing' ? styles.closing : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-no-trail=""
            data-scroll-inside=""
          >
            <div className={styles.top}>
              <span id={titleId} className={styles.mark}>
                {monogram}
                <span className="visually-hidden"> — {labels.dialog}</span>
              </span>
              <button type="button" className={styles.close} onClick={() => close()}>
                {labels.close}
                <span className={styles.x} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label={labels.dialog}>
              <ol className={styles.sections}>
                {sections.map((s, i) => (
                  <li key={s.id} style={{ '--i': i } as CSSProperties}>
                    <a
                      href={s.href ? `/${locale}${s.href}` : `/${locale}#${s.id}`}
                      onClick={(e) => (s.href ? goToPage(e, s.href) : goToSection(e, s.id))}
                    >
                      <span className={styles.no}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.label}>{s.label.replace(/^\(\d+\)\s*/, '')}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <ul className={styles.projects} style={{ '--i': sections.length } as CSSProperties}>
                {pages.map((p) => (
                  <li key={p.href}>
                    <a href={`/${locale}${p.href}`} onClick={(e) => goToPage(e, p.href)}>
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.block} style={{ '--i': sections.length } as CSSProperties}>
              <span className={styles.heading}>{labels.projects}</span>
              <ul className={styles.projects}>
                {projects.map((p) => (
                  <li key={p.slug}>
                    <a href={`/${locale}/work/${p.slug}`} lang="en" onClick={(e) => goToProject(e, p.slug, p.transitionLabel)}>
                      <span>{p.index}</span>
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.foot} style={{ '--i': sections.length + 1 } as CSSProperties}>
              <a className={styles.mail} href={`mailto:${email}`}>
                {email}
              </a>
              <div className={styles.row}>
                <ul className={styles.locales}>
                  {routing.locales.map((code) => (
                    <li key={code}>
                      <button type="button" lang={code} aria-current={code === locale ? 'true' : undefined} onClick={() => switchLocale(code)}>
                        {locales[code]}
                      </button>
                    </li>
                  ))}
                </ul>
                <span className={styles.clock}>
                  <BakuClock prefix={`${labels.clockCity} `} />
                </span>
              </div>
              {githubHref && (
                <a className={styles.github} href={githubHref} target="_blank" rel="noreferrer">
                  <Brand>{labels.github}</Brand> ↗
                </a>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
