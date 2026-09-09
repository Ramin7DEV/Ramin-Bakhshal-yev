import Image from 'next/image';
import { cn } from '@/lib/cn';
import styles from './MediaFrame.module.css';

type MediaFrameProps = {
  src: string;
  alt: string;
  aspectRatio: string | number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function MediaFrame({
  src,
  alt,
  aspectRatio,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
}: MediaFrameProps) {
  return (
    <div
      className={cn(styles.frame, className)}
      style={{ aspectRatio: typeof aspectRatio === 'number' ? `${aspectRatio}` : aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={styles.image}
      />
    </div>
  );
}
