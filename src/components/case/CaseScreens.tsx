import Image from 'next/image';
import type { Locale, ScreenShot } from '@/content/types';
import styles from './CaseScreens.module.css';

type Props = {
  screens: ScreenShot[];
  locale: Locale;
  label: string;
  hint: string;
  log: string;
};

// One real try-on, screen by screen.
// Wide screens: the section is pinned and each screen wipes over the last inside one phone frame while the step list
// on the left follows along (PageMotion). Phones: the same screens become a swipe carousel with their captions.
export function CaseScreens({ screens, locale, label, hint, log }: Props) {
  return (
    // GSAP moves the pinned <section> into a pin-spacer. Without a stable parent React would later try to remove
    // the section from <main>, where it no longer is, and the page would crash on leaving ("removeChild" error).
    <div>
      <section id="screens" className={styles.walk} data-build="<Screens />" data-log={log} data-walk="">
        <div className={styles.head}>
          <span className="live-label" data-reveal="">
            {label}
          </span>
          <span className="live-label" data-reveal="2">
            {hint}
          </span>
        </div>
        <div className={styles.body}>
          <ol className={styles.steps} aria-hidden="true">
            {screens.map((s, i) => (
              <li key={s.src} data-walk-step="">
                <b>{String(i + 1).padStart(2, '0')}</b>
                <strong>{s.label[locale]}</strong>
                <span>{s.note[locale]}</span>
              </li>
            ))}
          </ol>
          <ol className={styles.deck}>
            {screens.map((s, i) => (
              <li key={s.src} className={styles.layer} data-walk-layer="">
                {i > 0 && <span className={styles.edge} data-walk-edge="" aria-hidden="true" />}
                <div className={styles.shot} data-walk-inner="">
                  <Image
                    src={s.src}
                    alt={`${s.label[locale]}: ${s.note[locale]}`}
                    width={s.width}
                    height={s.height}
                    sizes="(max-width: 900px) 70vw, 340px"
                    // Five small screens: load them up front so no screen is still blank when it wipes in
                    loading="eager"
                  />
                </div>
                <p className={styles.cap}>
                  <b>{String(i + 1).padStart(2, '0')}</b> {s.label[locale]}
                  <span>{s.note[locale]}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
