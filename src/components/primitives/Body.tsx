import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Body.module.css';

type BodySize = 'l' | 'm' | 's';
type BodyTone = 'primary' | 'secondary' | 'tertiary';

type BodyProps<T extends ElementType = 'p'> = {
  as?: T;
  size?: BodySize;
  tone?: BodyTone;
  measured?: boolean;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Body<T extends ElementType = 'p'>({
  as,
  size = 'm',
  tone = 'secondary',
  measured = true,
  children,
  className,
  ...rest
}: BodyProps<T>) {
  const Component = as || 'p';

  return (
    <Component
      className={cn(
        styles.bodyBase,
        styles[size],
        tone !== 'secondary' && styles[tone],
        measured && styles.measured,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
