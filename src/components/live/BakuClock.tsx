'use client';

import { useEffect, useState } from 'react';

type Props = {
  seconds?: boolean;
  /** 'baku' shows Asia/Baku time, 'local' shows the visitor's own clock */
  zone?: 'baku' | 'local';
  prefix?: string;
};

const PLACEHOLDER = '--:--';

export function BakuClock({ seconds = false, zone = 'baku', prefix = '' }: Props) {
  // Rendered empty on the server and filled after mount, so markup never mismatches
  const [time, setTime] = useState(PLACEHOLDER);

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        ...(seconds && { second: '2-digit' }),
        ...(zone === 'baku' && { timeZone: 'Asia/Baku' }),
      });
    const tick = () => setTime(format());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [seconds, zone]);

  return (
    <span suppressHydrationWarning>
      {prefix}
      {time}
    </span>
  );
}
