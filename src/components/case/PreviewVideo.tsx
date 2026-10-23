'use client';

import { useEffect, useRef } from 'react';
import type { PreviewVideo as PreviewVideoData } from '@/content/types';

type Props = {
  preview: PreviewVideoData;
  alt: string;
};

// Muted looping product preview: plays only while visible and never under reduced motion
export function PreviewVideo({ preview, alt }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let inView = false;
    const sync = () => {
      if (inView && !document.hidden) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, []);

  return (
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
      aria-label={alt}
      data-cover-img=""
    >
      <source src={preview.webm} type="video/webm" />
      <source src={preview.mp4} type="video/mp4" />
    </video>
  );
}
