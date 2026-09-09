import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Section.module.css';

type SectionProps = {
  children: ReactNode;
  surface?: 'void' | 'obsidian';
  id?: string;
  className?: string;
} & ComponentPropsWithoutRef<'section'>;

export function Section({
  children,
  surface = 'void',
  id,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(styles.section, styles[surface], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
