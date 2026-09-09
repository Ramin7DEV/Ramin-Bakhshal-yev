'use client';

import { usePathname, Link } from '@/i18n/navigation';
import styles from './PrimaryNav.module.css';

export type NavItem = {
  href: string;
  label: string;
};

type PrimaryNavProps = {
  items: NavItem[];
  ariaLabel: string;
};

export function PrimaryNav({ items, ariaLabel }: PrimaryNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel}>
      <ul className={styles.navList}>
        {items.map(({ href, label }) => {
          const isExact = pathname === href;
          const isSub = href !== '/' && pathname.startsWith(href);
          const isActive = isExact || isSub;

          return (
            <li key={href}>
              <Link
                href={href}
                className={styles.navLink}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
