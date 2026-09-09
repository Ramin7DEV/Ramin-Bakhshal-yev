import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { projects } from '@/content/projects';
import { getSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date('2026-09-08T12:00:00.000Z');

  // Static routes (styleguide is strictly excluded per spec)
  const staticPaths = ['', '/work', '/about', '/contact'];

  // Project case studies
  const projectPaths = projects.map((p) => `/work/${p.slug}`);

  const allPaths = [...staticPaths, ...projectPaths];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    const alternatesLanguages: Record<string, string> = {};
    for (const l of routing.locales) {
      alternatesLanguages[l] = `${siteUrl}/${l}${path}`;
    }
    alternatesLanguages['x-default'] = `${siteUrl}/${routing.defaultLocale}${path}`;

    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : path.startsWith('/work/') ? 0.8 : 0.7,
        alternates: {
          languages: alternatesLanguages,
        },
      });
    }
  }

  return entries;
}
