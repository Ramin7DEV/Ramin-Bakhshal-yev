import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';

type BaseProps = {
  variant?: 'primary' | 'ghost';
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps & {
  as?: 'button';
  href?: undefined;
} & ComponentPropsWithoutRef<'button'>;

type ButtonAsLink = BaseProps & {
  as: 'link';
  href: string;
} & ComponentPropsWithoutRef<'a'>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

function isExternalLink(href: string): boolean {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export function Button({
  variant = 'primary',
  arrow = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const arrowElement = arrow ? (
    <span aria-hidden="true" className={styles.arrow}>
      ↗
    </span>
  ) : null;

  if (rest.as === 'link' || 'href' in rest) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    const combinedClassName = cn(styles.buttonBase, styles[variant], className);

    if (isExternalLink(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={combinedClassName}
          {...linkProps}
        >
          {children}
          {arrowElement}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClassName} {...linkProps}>
        {children}
        {arrowElement}
      </Link>
    );
  }

  const { as: _as, type = 'button', ...buttonProps } = rest as ButtonAsButton;
  void _as;

  return (
    <button
      type={type}
      className={cn(styles.buttonBase, styles[variant], className)}
      {...buttonProps}
    >
      {children}
      {arrowElement}
    </button>
  );
}
