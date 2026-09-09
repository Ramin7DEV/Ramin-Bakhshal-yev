import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Tag.module.css';

type TagProps<T extends ElementType = 'span'> = {
  as?: T;
  active?: boolean;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Tag<T extends ElementType = 'span'>({
  as,
  active = false,
  children,
  className,
  ...rest
}: TagProps<T>) {
  const Component = as || 'span';

  return (
    <Component
      className={cn(styles.tag, active && styles.active, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
