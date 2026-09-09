import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './VisuallyHidden.module.css';

type VisuallyHiddenProps<T extends ElementType = 'span'> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function VisuallyHidden<T extends ElementType = 'span'>({
  as,
  children,
  className,
  ...rest
}: VisuallyHiddenProps<T>) {
  const Component = as || 'span';

  return (
    <Component className={cn(styles.visuallyHidden, className)} {...rest}>
      {children}
    </Component>
  );
}
