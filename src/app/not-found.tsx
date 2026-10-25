import Link from 'next/link';
import az from '@/messages/az.json';
import { fontClassName } from '@/app/[locale]/fonts';
import { THEME_SCRIPT } from '@/lib/theme';

export const metadata = {
  title: `${az.notFound.title} — ${az.meta.siteName}`,
  description: az.notFound.description,
};

export default function RootNotFound() {
  return (
    // data-theme is set by the inline script before React hydrates, so <html> legitimately differs
    <html lang="az" className={fontClassName} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <main>
          <h1>{az.notFound.title}</h1>
          <p>{az.notFound.description}</p>
          <Link href="/az">{az.notFound.back}</Link>
        </main>
      </body>
    </html>
  );
}
