export type Locale = 'az' | 'en' | 'ru';
export type Localized<T> = Record<Locale, T>;

export type ProjectStatus = 'live' | 'in-development' | 'concept';
export type ProjectCategory = 'ai' | 'mobile' | 'product-design';

export interface ProjectLink {
  kind: 'app-store' | 'google-play' | 'github' | 'website' | 'video';
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

export interface CaseChapter {
  id: string;
  eyebrow: Localized<string>;
  title: Localized<string>;
  body: Localized<string[]>;
  media?: MediaAsset;
}

export interface Project {
  slug: 'mirrorly' | 'azerbaijan-otur' | 'beauty-app';
  index: '01' | '02' | '03';
  status: ProjectStatus;
  categories: ProjectCategory[];
  year: string;
  title: string;
  summary: Localized<string>;
  statement: Localized<string>;
  role: Localized<string[]>;
  stack: string[];
  outcome: Localized<string[]>;
  cover: MediaAsset;
  chapters: CaseChapter[];
  links: ProjectLink[];
  accent: 'gold' | 'signal' | 'ivory';
}

export interface Profile {
  name: string;
  role: Localized<string>;
  positioning: Localized<string>;
  bio: Localized<string[]>;
  location: Localized<string>;
  availability: Localized<string>;
  email: string;
  social: ProjectLink[];
}
