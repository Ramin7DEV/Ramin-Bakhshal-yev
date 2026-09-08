import Link from 'next/link';
import az from '@/messages/az.json';
import { fontClassName } from '@/app/[locale]/fonts';

export const metadata = {
  title: `404 — ${az.meta.siteName}`,
  description: az.common.states.empty,
};

export default function RootNotFound() {
  return (
    <html lang="az" className={fontClassName}>
      <body>
        <main>
          <h1>404</h1>
          <p>{az.common.states.empty}</p>
          <Link href="/az">{az.common.actions.backToWork}</Link>
        </main>
      </body>
    </html>
  );
}
