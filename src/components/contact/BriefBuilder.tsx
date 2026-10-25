'use client';

import { useId, useState } from 'react';
import { CopyButton } from './CopyButton';
import styles from './Contact.module.css';

export type BriefLabels = {
  hint: string;
  topicLabel: string;
  timingLabel: string;
  noteLabel: string;
  notePlaceholder: string;
  topics: string[];
  timings: string[];
  previewLabel: string;
  /** "From the site: {topic}" */
  subject: string;
  greeting: string;
  /** "Topic: {topic}" */
  topicLine: string;
  /** "Timing: {timing}" */
  timingLine: string;
  signoff: string;
  send: string;
  copyText: string;
  copied: string;
};

type Props = {
  email: string;
  labels: BriefLabels;
};

const fill = (template: string, key: string, value: string) => template.replace(`{${key}}`, value);

// A few choices turn into a ready email: the visitor's own mail app opens it (mailto), nothing is sent or stored here
export function BriefBuilder({ email, labels }: Props) {
  const [topic, setTopic] = useState(labels.topics[0] ?? '');
  const [timing, setTiming] = useState('');
  const [note, setNote] = useState('');
  const noteId = useId();

  const subject = fill(labels.subject, 'topic', topic);
  const body = [
    labels.greeting,
    '',
    fill(labels.topicLine, 'topic', topic),
    timing ? fill(labels.timingLine, 'timing', timing) : '',
    note.trim() ? `\n${note.trim()}` : '',
    '',
    labels.signoff,
  ]
    .filter((line, i, all) => line !== '' || all[i - 1] !== '')
    .join('\n');
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className={styles.brief}>
      <div className={styles.choices}>
        <p className={styles.hint}>{labels.hint}</p>
        <Chips legend={labels.topicLabel} options={labels.topics} value={topic} onChange={setTopic} />
        <Chips legend={labels.timingLabel} options={labels.timings} value={timing} onChange={(v) => setTiming(v === timing ? '' : v)} />
        <label className={styles.noteLabel} htmlFor={noteId}>
          {labels.noteLabel}
        </label>
        <textarea
          id={noteId}
          className={styles.note}
          rows={3}
          maxLength={600}
          placeholder={labels.notePlaceholder}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className={styles.preview}>
        <span className="live-label">{labels.previewLabel}</span>
        <pre aria-live="polite">
          <b>{subject}</b>
          {'\n\n'}
          {body}
        </pre>
        <div className={styles.actions}>
          <a className={styles.send} href={href}>
            <span>{labels.send}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <CopyButton text={`${subject}\n\n${body}`} label={labels.copyText} copiedLabel={labels.copied} />
        </div>
      </div>
    </div>
  );
}

type ChipsProps = {
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

// One question as a row of toggle buttons
function Chips({ legend, options, value, onChange }: ChipsProps) {
  return (
    <fieldset className={styles.chips}>
      <legend>{legend}</legend>
      {options.map((option) => (
        <button key={option} type="button" aria-pressed={option === value} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </fieldset>
  );
}
