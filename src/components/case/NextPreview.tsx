'use client';

import { useEffect, useRef } from 'react';
import type { PreviewVideo as PreviewVideoData } from '@/content/types';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './NextPreview.module.css';

type Props = {
  preview: PreviewVideoData;
};

// The next project's own preview, as a card in the next-project link. It slides in on hover (CSS) and the video only
// loads and plays while the link is hovered or focused; touch screens and reduced motion keep the still poster.
export function NextPreview({ preview }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const link = video?.closest('a');
    if (!video || !link || prefersReducedMotion() || !matchMedia('(hover: hover)').matches) return;
    const play = () => {
      video.preload = 'auto';
      video.play().catch(() => undefined);
    };
    const stop = () => video.pause();
    link.addEventListener('pointerenter', play);
    link.addEventListener('pointerleave', stop);
    link.addEventListener('focus', play);
    link.addEventListener('blur', stop);
    return () => {
      link.removeEventListener('pointerenter', play);
      link.removeEventListener('pointerleave', stop);
      link.removeEventListener('focus', play);
      link.removeEventListener('blur', stop);
      video.pause();
    };
  }, []);

  return (
    <div className={styles.card} aria-hidden="true">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        poster={preview.poster}
        width={preview.width}
        height={preview.height}
      >
        <source src={preview.webm} type="video/webm" />
        <source src={preview.mp4} type="video/mp4" />
      </video>
    </div>
  );
}
