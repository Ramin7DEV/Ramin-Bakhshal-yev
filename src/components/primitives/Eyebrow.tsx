import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Eyebrow.module.css';

type EyebrowProps<T extends ElementType = 'span'> = {
  as?: T;
  tone?: 'tertiary' | 'signal';
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Eyebrow<T extends ElementType = 'span'>({
  as,
  tone = 'tertiary',
  children,
  className,
  ...rest
}: EyebrowProps<T>) {
  const Component = as || 'span';

  return (
    <Component
      className={cn(styles.eyebrow, styles[tone], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
