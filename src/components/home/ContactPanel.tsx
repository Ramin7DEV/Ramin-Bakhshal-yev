'use client';

import { useEffect, useState } from 'react';
import { BakuClock } from '@/components/live/BakuClock';
import { Brand } from '@/components/primitives/Brand';
import styles from './ContactPanel.module.css';

type Props = {
  command: string;
  labels: { status: string; base: string; time: string; email: string; copy: string; copied: string };
  status: string;
  base: string;
  email: string;
  links: { href: string; label: string }[];
  className?: string;
};

const RESET_MS = 1800;

// A small terminal panel next to the closing call to action: the facts a visitor needs, one line each
export function ContactPanel({ command, labels, status, base, email, links, className }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), RESET_MS);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <div className={`${styles.panel} ${className ?? ''}`} data-reveal="3">
      <p className={styles.prompt}>
        <span aria-hidden="true">›</span> {command}
      </p>
      <dl className={styles.rows}>
        <div>
          <dt>{labels.status}</dt>
          <dd>{status}</dd>
        </div>
        <div>
          <dt>{labels.base}</dt>
          <dd>{base}</dd>
        </div>
        <div>
          <dt>{labels.time}</dt>
          <dd>
            <BakuClock seconds />
          </dd>
        </div>
        <div>
          <dt>{labels.email}</dt>
          <dd>
            <button
              type="button"
              className={styles.copy}
              onClick={() => {
                navigator.clipboard.writeText(email).then(() => setCopied(true), () => undefined);
              }}
            >
              <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
            </button>
          </dd>
        </div>
        {links.map((link) => (
          <div key={link.href}>
            <dt>
              <Brand>{link.label}</Brand>
            </dt>
            <dd>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.href.split('/').filter(Boolean).pop()} ↗
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
