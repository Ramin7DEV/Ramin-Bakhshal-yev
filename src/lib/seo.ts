import type { Metadata } from 'next';
import type { Locale, Project } from '@/content/types';
import { profile } from '@/content/profile';

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://raminbakhshaliyev.com';
  return url.replace(/\/$/, '');
}

export const OG_LOCALES: Record<Locale, string> = {
  az: 'az_AZ',
  en: 'en_US',
  ru: 'ru_RU',
};

export type BuildMetadataParams = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  isArticle?: boolean;
};

export function buildMetadata({
  locale,
  path,
  title,
  description,
  ogImage,
  isArticle = false,
}: BuildMetadataParams): Metadata {
  const siteUrl = getSiteUrl();
  const cleanPath = path === '/' || path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  const canonical = `${siteUrl}/${locale}${cleanPath}`;
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true;

  return {
    metadataBase: new URL(siteUrl),
    title: cleanPath === '' ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        az: `${siteUrl}/az${cleanPath}`,
        en: `${siteUrl}/en${cleanPath}`,
        ru: `${siteUrl}/ru${cleanPath}`,
        'x-default': `${siteUrl}/az${cleanPath}`,
      },
    },
    openGraph: {
      type: isArticle ? 'article' : 'website',
      siteName: locale === 'ru' ? 'Рамин Бахшалиев' : 'Ramin Bakhshalıyev',
      locale: OG_LOCALES[locale],
      alternateLocale: (['az', 'en', 'ru'] as Locale[])
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALES[l]),
      url: canonical,
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: {
      index: isProduction,
      follow: true,
    },
  };
}

export function personJsonLd(locale: Locale) {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role[locale],
    url: `${siteUrl}/${locale}`,
    email: `mailto:${profile.email}`,
    sameAs: profile.social.map((s) => s.href),
    address: {
      '@type': 'PostalAddress',
      // The time zone belongs in the profile text, not in a postal address
      addressLocality: profile.location[locale].replace(/\s*\(UTC[^)]*\)/, ''),
    },
  };
}

export function creativeWorkJsonLd(project: Project, locale: Locale) {
  const siteUrl = getSiteUrl();
  const summary = project.summary[locale];
  const isTodo = !summary || summary.includes('TODO');

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    url: `${siteUrl}/${locale}/work/${project.slug}`,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
  };

  if (!isTodo) {
    jsonLd.description = summary;
  }

  return jsonLd;
}
