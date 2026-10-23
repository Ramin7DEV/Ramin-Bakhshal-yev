import { getTranslations } from 'next-intl/server';
import styles from './Method.module.css';

type Step = { tag: string; title: string; body: string; agent: boolean };

// Four steps, each labelled with who does it: the honest version of "AI-first"
export async function Method({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'live' });
  const steps = t.raw('method.steps') as Step[];

  return (
    <section id="method" className={styles.method} data-build="<Method />" data-log={t('log.method')}>
      <h2 className="live-label" data-reveal="">
        {t('sections.method')}
      </h2>
      <div className={styles.grid} data-reveal="2">
        {steps.map((step, i) => (
          <article key={step.tag} className={step.agent ? styles.agent : undefined} data-method-step="">
            <b>{String(i + 1).padStart(2, '0')}</b>
            <h3 lang="en" data-skew="">
              {step.tag}
            </h3>
            <h4>{step.title}</h4>
            <p>{step.body}</p>
            <span className={`${styles.who} ${step.agent ? styles.whoAgent : ''}`}>
              {step.agent ? t('method.both') : t('method.human')}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
