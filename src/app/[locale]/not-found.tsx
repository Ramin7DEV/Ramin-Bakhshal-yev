import Link from 'next/link';
import az from '@/messages/az.json';
import { fontClassName } from '@/app/[locale]/fonts';

export default function NotFound() {
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
