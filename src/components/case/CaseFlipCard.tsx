import Image from 'next/image';
import type { MediaAsset, Locale } from '@/content/types';
import styles from './CaseFlipCard.module.css';
import { Brand } from '@/components/primitives/Brand';

type Props = {
  icon: MediaAsset;
  title: string;
  field: string;
  locale: Locale;
  facts: { label: string; value: string }[];
};

// A card beside the pitch: the real app icon on the front, the key facts on the back.
// PageMotion turns it over while the pitch scrolls through; under reduced motion both faces simply stack.
export function CaseFlipCard({ icon, title, field, locale, facts }: Props) {
  return (
    <div className={styles.card} data-flip="">
      <div className={styles.inner} data-flip-inner="">
        <div className={styles.front}>
          <Image src={icon.src} alt={icon.alt[locale]} width={icon.width} height={icon.height} sizes="112px" />
          <strong lang="en">{title}</strong>
          <span>{field}</span>
        </div>
        <dl className={styles.back}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>
                <Brand>{f.value}</Brand>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
