'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  email: string;
};

export function MobileMenu({ email }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('nav');

  const openMenu = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    dialogRef.current?.close();
    document.body.style.overflow = '';
    triggerRef.current?.focus();
  };

  // Close when Esc is pressed inside dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCancel = (e: Event) => {
      e.preventDefault();
      closeMenu();
    };

    dialog.addEventListener('cancel', onCancel);
    return () => dialog.removeEventListener('cancel', onCancel);
  }, []);

  // Cleanup body scroll if unmounted while open
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.menuButton}
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={t('menu')}
      >
        {t('menu')}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="mobile-menu-title"
      >
        <div className={styles.topBar}>
          <span id="mobile-menu-title" className={styles.brand}>
            RB
          </span>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label={t('close')}
          >
            {t('close')}
          </button>
        </div>

        <nav aria-label={t('mobileLabel')}>
          <ul className={styles.navList}>
            <li>
              <Link href="/work" className={styles.navLink} onClick={closeMenu}>
                {t('work')}
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.navLink} onClick={closeMenu}>
                {t('about')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navLink} onClick={closeMenu}>
                {t('contact')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.bottomSection}>
          <LocaleSwitcher variant="mobile" onSelect={closeMenu} />
          <a href={`mailto:${email}`} className={styles.email}>
            {email}
          </a>
        </div>
      </dialog>
    </>
  );
}
