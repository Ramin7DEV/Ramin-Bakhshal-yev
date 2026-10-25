'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { live, useLiveState, wait } from '@/lib/live';
import { scrollToTarget, getSmoother } from '@/lib/scroll';
import { buildSection } from './BuildObserver';
import styles from './LiveDock.module.css';

type Props = {
  placeholder: string;
  hint: string;
  toggleLabel: string;
  inputLabel: string;
  slugs: string[];
};

// Words a visitor might type, in three languages, mapped to section ids on the page
const SECTIONS: [RegExp, string][] = [
  [/work|project|case|portfolio|layih|işlər|проект|работ/, 'work'],
  [/method|process|how|metod|proses|метод|процесс/, 'method'],
  [/contact|hire|email|talk|əlaqə|elaqe|контакт|связ/, 'contact'],
  [/home|top|who|about|haqq|о себе/, 'hero'],
  [/problem|проблем/, 'ch-problem'],
  [/role|rol|роль/, 'ch-role'],
  [/\bai\b|workflow|prompt/, 'ch-ai-workflow'],
  [/system|sistem|архит/, 'ch-system'],
  [/outcome|result|nəticə|результат/, 'ch-outcome'],
];

// The floating console: shows the build log and takes typed commands
export function LiveDock({ placeholder, hint, toggleLabel, inputLabel, slugs }: Props) {
  const { log, logStart, busy } = useLiveState();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [value, setValue] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const entries = log.filter((entry) => entry.id > logStart);
  const last = entries.at(-1);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [entries.length]);

  // Step aside while a dark contact block fills the screen, so it never covers the email
  useEffect(() => {
    const blocks = document.querySelectorAll('[data-dock-hide]');
    const io = new IntersectionObserver((list) => setHidden(list.some((e) => e.intersectionRatio > 0.5)), {
      threshold: [0, 0.5, 1],
    });
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [pathname]);

  const go = (href: string, label?: string) => live.emit('navigate', { href, label });

  const run = async (raw: string) => {
    const v = raw.trim().toLowerCase();
    if (!v) return;
    live.log(v, 'you');

    if ((routing.locales as readonly string[]).includes(v) && v !== locale) {
      router.replace(pathname, { locale: v as Locale });
      return;
    }
    const slug = slugs.find((s) => v.includes(s.split('-')[0] ?? s));
    if (slug) return go(`/work/${slug}`, slug);

    const nextLink = document.querySelector<HTMLElement>('[data-next-href]');
    if (nextLink && /next|növbəti|след/.test(v)) return go(nextLink.dataset.nextHref ?? '/', nextLink.dataset.nextLabel);
    if (/back|geri|назад/.test(v)) return go('/#work');

    for (const [re, id] of SECTIONS) {
      if (!re.test(v)) continue;
      const target = document.getElementById(id);
      if (!target) {
        if (!id.startsWith('ch-')) go(`/#${id}`);
        return;
      }
      scrollToTarget(target);
      await wait(getSmoother() ? 1200 : 600);
      if (target.hasAttribute('data-build') && !target.hasAttribute('data-build-manual')) void buildSection(target);
      return;
    }
    live.log(hint, 'ok');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void run(value);
    setValue('');
  };

  return (
    <div className={`${styles.dock} ${open ? styles.open : ''} ${hidden ? styles.hidden : ''} ${busy ? styles.busy : ''}`}>
      <div className={styles.log} ref={logRef} aria-live="polite" data-scroll-inside="">
        {entries.map((entry) => (
          <div key={entry.id} className={styles[entry.kind]}>
            {entry.text}
          </div>
        ))}
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <span className={styles.status} aria-hidden="true" />
        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label={inputLabel}
          autoComplete="off"
        />
        <span className={styles.last}>{last?.text}</span>
        <button type="button" className={styles.toggle} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {toggleLabel}
        </button>
      </form>
    </div>
  );
}
