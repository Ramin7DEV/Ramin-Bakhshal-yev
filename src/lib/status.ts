import type { ProjectStatus } from '@/content/types';

/** Message key for each project status label */
export const STATUS_KEY = {
  live: 'proof.statusLive',
  'in-development': 'proof.statusDev',
  prototype: 'proof.statusPrototype',
  concept: 'proof.statusConcept',
} as const satisfies Record<ProjectStatus, string>;
