export type Locale = 'az' | 'en' | 'ru';
export type Localized<T> = Record<Locale, T>;

export type ProjectStatus = 'live' | 'in-development' | 'prototype' | 'concept';
export type ProjectCategory = 'ai' | 'mobile' | 'product-design';

export interface ProjectLink {
  kind: 'app-store' | 'google-play' | 'github' | 'linkedin' | 'website' | 'video';
  href: string;
  label: Localized<string>;
}

export interface MediaAsset {
  src: string;
  alt: Localized<string>;
  width: number;
  height: number;
  poster?: string;
}

export interface PreviewVideo {
  webm: string;
  mp4: string;
  poster: string;
  width: number;
  height: number;
  alt: Localized<string>;
}

/** Commit activity read from the project's git history, one bar per calendar week */
export interface BuildActivity {
  /** Where the numbers come from, shown as a source line */
  source: string;
  /** Monday (ISO date) of the week that holds the first commit */
  weekStart: string;
  /** ISO dates of the first and last commit */
  first: string;
  last: string;
  /** Commits per week, Monday to Sunday, from weekStart on */
  weekly: number[];
}

export type ManifestKey = 'platform' | 'client' | 'backend' | 'ai' | 'payments' | 'integrity' | 'admin' | 'data' | 'apps' | 'languages';

/** One line of the case hero's build manifest; the label comes from the messages */
export interface ManifestRow {
  key: ManifestKey;
  value: Localized<string>;
}

export interface CaseChapter {
  id: string;
  eyebrow: Localized<string>;
  title: Localized<string>;
  body: Localized<string[]>;
  media?: MediaAsset;
}

/** One real app screen in the case study's try-on walkthrough */
export interface ScreenShot {
  src: string;
  width: number;
  height: number;
  label: Localized<string>;
  /** One short line under the step label */
  note: Localized<string>;
}

/** One request through the product, told as a row of steps; `fallback` is the failure branch */
export interface RequestFlow {
  steps: Localized<string[]>;
  fallback: Localized<string>;
  /** Index of the first step the failure branch undoes; the branch is drawn under it */
  fallbackFrom: number;
}

export interface Project {
  slug: 'mirrorly' | 'azerbaijan-tour-guide' | 'beauty-app';
  index: '01' | '02' | '03';
  status?: ProjectStatus;
  categories: ProjectCategory[];
  year?: string;
  title: string;
  summary: Localized<string>;
  statement: Localized<string>;
  /** One or two sentences that open the case study, lit word by word */
  pitch?: Localized<string>;
  role: Localized<string[]>;
  stack: string[];
  outcome: Localized<string[]>;
  cover: MediaAsset;
  preview?: PreviewVideo;
  /** The real app icon, shown as an object in the case hero */
  icon?: MediaAsset;
  manifest?: ManifestRow[];
  activity?: BuildActivity;
  chapters: CaseChapter[];
  screens?: ScreenShot[];
  flow?: RequestFlow;
  /** Technology names for the moving band; not translated */
  marquee?: string[];
  links: ProjectLink[];
  accent: 'gold' | 'signal' | 'ivory';
}

/** One job. Dates are 'YYYY-MM'; no end means it is ongoing. Dates are optional until Ramin confirms them */
export interface Experience {
  company: string;
  href: string;
  role: Localized<string>;
  mode: Localized<string>;
  start?: string;
  end?: string;
  summary: Localized<string[]>;
}

/** One area of work, the technology used for it and the projects where it is used */
export interface Capability {
  area: Localized<string>;
  tech: Localized<string>;
  projects: Project['slug'][];
}

export interface Profile {
  name: string;
  role: Localized<string>;
  positioning: Localized<string>;
  bio: Localized<string[]>;
  location: Localized<string>;
  availability: Localized<string>;
  /** What the work is about right now, one short line */
  focus: Localized<string>;
  email: string;
  /** Shown as written; dialled as `tel` */
  phone: { display: string; tel: string };
  /** Jobs, newest first */
  experience: Experience[];
  /** What Ramin builds, each area tied to the projects that show it */
  capabilities: Capability[];
  social: ProjectLink[];
  portrait?: { src: string; alt: Localized<string> };
}
