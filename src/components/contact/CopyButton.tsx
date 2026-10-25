'use client';

import { useEffect, useState } from 'react';
import styles from './Contact.module.css';

type Props = {
  text: string;
  label: string;
  copiedLabel: string;
};

const RESET_MS = 1800;

// Copies a value to the clipboard and says so for a moment (announced to screen readers through aria-live)
export function CopyButton({ text, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), RESET_MS);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className={styles.copy}
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => setCopied(true), () => undefined);
      }}
    >
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
