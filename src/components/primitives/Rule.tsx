import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Rule.module.css';

type RuleProps = {
  className?: string;
} & ComponentPropsWithoutRef<'hr'>;

export function Rule({ className, ...rest }: RuleProps) {
  return (
    <hr
      role="presentation"
      className={cn(styles.rule, className)}
      {...rest}
    />
  );
}
