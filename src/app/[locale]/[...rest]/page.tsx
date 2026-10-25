import { notFound } from 'next/navigation';

// Any unknown address inside a locale lands on the locale's own 404, which keeps the header and theme
export default function CatchAll() {
  notFound();
}
