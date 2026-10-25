import Link from 'next/link';
import en from '@/messages/en.json';
import { fontClassName } from '@/app/[locale]/fonts';
import { THEME_SCRIPT } from '@/lib/theme';

export const metadata = {
  title: `${en.notFound.title} — ${en.meta.siteName}`,
  description: en.notFound.description,
};

export default function RootNotFound() {
  return (
    // data-theme is set by the inline script before React hydrates, so <html> legitimately differs
    <html lang="en" className={fontClassName} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <main>
          <h1>{en.notFound.title}</h1>
          <p>{en.notFound.description}</p>
          <Link href="/en">{en.notFound.back}</Link>
        </main>
      </body>
    </html>
  );
}
