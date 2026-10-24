import type { CSSProperties } from 'react';
import type { Locale, RequestFlow } from '@/content/types';
import styles from './CaseFlow.module.css';

type Props = {
  flow: RequestFlow;
  locale: Locale;
  label: string;
  log: string;
};

// One request through the product as a row of steps. PageMotion draws the line and lights each step in turn
// as the section scrolls through; the failure branch arrives last.
export function CaseFlow({ flow, locale, label, log }: Props) {
  const steps = flow.steps[locale];
  return (
    <section id="flow" className={styles.flow} data-build="<Flow />" data-log={log} data-flow="" style={{ '--steps': steps.length, '--from': flow.fallbackFrom } as CSSProperties}>
      <span className="live-label" data-reveal="">
        {label}
      </span>
      <div className={styles.track}>
        <span className={styles.line} data-flow-line="" aria-hidden="true" />
        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <li key={step} data-flow-step="">
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className={styles.fallback} data-flow-fallback="">
        {flow.fallback[locale]}
      </p>
    </section>
  );
}
