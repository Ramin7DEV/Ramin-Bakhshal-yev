'use client';

import type { ComponentProps, MouseEvent } from 'react';
import { Link } from '@/i18n/navigation';
import { live } from '@/lib/live';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  /** Short label shown on the curtain while the next page loads */
  transitionLabel?: string;
};

// A Link that plays the page curtain before navigating. Modified clicks (new tab etc.) behave normally.
export function TransitionLink({ href, transitionLabel, onClick, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    live.emit('navigate', { href, label: transitionLabel });
  };
  return <Link href={href} onClick={handleClick} {...rest} />;
}
