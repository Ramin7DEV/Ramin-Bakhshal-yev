import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Heading.module.css';

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = 'display-xl' | 'display-l' | 'display-m' | 'heading';

type HeadingProps = {
  level: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4'>;

export function Heading({
  level,
  size,
  children,
  className,
  ...rest
}: HeadingProps) {
  const Component = `h${level}` as const;
  const resolvedSize: HeadingSize =
    size || (level === 1 ? 'display-xl' : level === 2 ? 'display-l' : level === 3 ? 'display-m' : 'heading');

  return (
    <Component
      className={cn(styles.headingBase, styles[resolvedSize], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
