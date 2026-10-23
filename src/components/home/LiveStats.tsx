'use client';

import { useLiveState } from '@/lib/live';
import { BakuClock } from '@/components/live/BakuClock';
import styles from './LiveStats.module.css';

type Props = {
  label: string;
  log: string;
  labels: { components: string; time: string; you: string; baku: string };
};

// Numbers measured in the visitor's own browser during this visit; nothing here is invented
export function LiveStats({ label, log, labels }: Props) {
  const { built, startedAt, lastBuiltAt } = useLiveState();
  const seconds = startedAt ? ((lastBuiltAt - startedAt) / 1000).toFixed(1) : '0.0';

  return (
    <section id="stats" className={styles.stats} data-build="<Stats live />" data-log={log}>
      <h2 className="live-label" data-reveal="">
        {label}
      </h2>
      <div className={styles.grid} data-reveal="2">
        <div>
          <strong data-stat="">{built}</strong>
          <span>{labels.components}</span>
        </div>
        <div>
          <strong data-stat="">{seconds}s</strong>
          <span>{labels.time}</span>
        </div>
        <div>
          <strong data-stat="">
            <BakuClock zone="local" />
          </strong>
          <span>{labels.you}</span>
        </div>
        <div>
          <strong data-stat="">
            <BakuClock />
          </strong>
          <span>{labels.baku}</span>
        </div>
      </div>
    </section>
  );
}
