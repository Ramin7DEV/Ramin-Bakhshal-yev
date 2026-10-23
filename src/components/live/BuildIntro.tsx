'use client';

import { useEffect, useState } from 'react';
import { live, useLiveState, wait } from '@/lib/live';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './BuildIntro.module.css';

type Props = {
  /** id of the [data-build-manual] section this intro builds */
  sectionId: string;
  prompt: string;
  /** Log lines written while the letters compile */
  logs: string[];
  /** Last line, pointing the visitor onwards */
  finalLog?: string;
  /** compile event that reveals the kinetic title */
  compileId: string;
  /** Show the running log under the prompt (home hero) */
  showLog?: boolean;
};

const VISIBLE_LOG = 6;
// The full typed intro plays once per visit; later arrivals see the finished page at once
let introPlayed = false;

export function BuildIntro({ sectionId, prompt, logs, finalLog, compileId, showLog = false }: Props) {
  const [typed, setTyped] = useState('');
  const [typing, setTyping] = useState(true);
  const { log, logStart } = useLiveState();

  useEffect(() => {
    let cancelled = false;
    const section = document.getElementById(sectionId);
    live.reset();

    const finish = () => {
      section?.classList.add('is-built');
      live.markBuilt();
    };

    void (async () => {
      const instant = prefersReducedMotion() || introPlayed || Boolean(location.hash);
      if (instant) {
        setTyped(prompt);
        setTyping(false);
        live.emit('compile', compileId);
        finish();
        return;
      }
      section?.classList.add('is-building');
      live.setBusy(true);
      const typeIt = (async () => {
        for (let i = 0; i <= prompt.length && !cancelled; i++) {
          setTyped(prompt.slice(0, i));
          await wait(20 + Math.random() * 24);
        }
        setTyping(false);
      })();
      // The message lands right away; the build story plays alongside it, never before it
      await wait(650);
      if (cancelled) return;
      live.emit('compile', compileId);
      await typeIt;
      if (cancelled) return;
      // Marked only once it really finished (React dev mode mounts effects twice)
      introPlayed = true;
      logs.forEach((line) => live.log(line, 'add'));
      finish();
      await wait(500);
      section?.classList.remove('is-building');
      live.setBusy(false);
      if (finalLog) live.log(finalLog, 'ok');
    })();

    return () => {
      cancelled = true;
    };
  }, [sectionId, prompt, logs, finalLog, compileId]);

  const visible = log.filter((entry) => entry.id > logStart).slice(-VISIBLE_LOG);

  return (
    <div className={styles.intro}>
      <p className="live-prompt">
        <b>›</b> {typed}
        {typing && <span className="live-caret" aria-hidden="true" />}
      </p>
      {showLog && (
        <ol className={styles.log} aria-hidden="true">
          {visible.map((entry) => (
            <li key={entry.id} className={styles[entry.kind]}>
              {entry.text}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
