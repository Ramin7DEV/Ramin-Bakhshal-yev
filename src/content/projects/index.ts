import type { Project } from '../types';
import { mirrorly } from './mirrorly';
import { azerbaijanOtur } from './azerbaijan-otur';
import { beautyApp } from './beauty-app';

export const projects: Project[] = [mirrorly, azerbaijanOtur, beautyApp];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): Project['slug'][] {
  return projects.map((p) => p.slug);
}
