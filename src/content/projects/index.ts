import type { Project } from '../types';
import { mirrorly } from './mirrorly';
import { azerbaijanTourGuide } from './azerbaijan-tour-guide';
import { beautyApp } from './beauty-app';

export const projects: Project[] = [mirrorly, azerbaijanTourGuide, beautyApp];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): Project['slug'][] {
  return projects.map((p) => p.slug);
}
