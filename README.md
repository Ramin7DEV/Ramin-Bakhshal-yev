# raminbakhshaliyev.com

Source of my personal portfolio: [raminbakhshaliyev.com](https://raminbakhshaliyev.com).

I am Ramin Bakhshalıyev, a Mobile & AI Product Builder based in Baku. The site presents my case studies (Mirrorly, Azerbaijan Tour Guide, BeautyApp), how I work with coding agents, and how to reach me.

## Highlights

- **Three languages** (English, Azerbaijani, Russian) with locale-aware routing, metadata and sitemap.
- **Content is data, not markup.** Profile and case studies live in typed files under `src/content`, UI strings in `src/messages`. Components contain no literal copy.
- **Design tokens only.** Colors, spacing, radii, durations and easing come from CSS custom properties in `src/styles/tokens.css`.
- **Motion with restraint.** GSAP ScrollTrigger for the pinned case-study walkthrough, and `prefers-reduced-motion` respected throughout.
- **Real data on the page.** Commit activity charts are read from each project's `git log`, not invented.
- **Accessibility from the first commit:** semantic HTML, visible focus states, keyboard flow, skip link.
- **Social previews** generated per page with `opengraph-image`, plus JSON-LD structured data.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · next-intl · GSAP · Vercel

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Lint, typecheck and build in one go |

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL for canonical links, sitemap, robots, Open Graph and JSON-LD |

No secrets are required to run or build the site.

## Project structure

```
src/
  app/[locale]/   routes, layouts, Open Graph images
  components/     UI components (server components by default)
  content/        typed profile and case-study data
  messages/       UI strings per locale (en, az, ru)
  styles/         design tokens and global styles
public/           images and app preview videos
```

## License

All rights reserved. The source is public so you can read how the site is built. Please do not copy the design, text, or case-study content. See [LICENSE](LICENSE).

## Contact

[raminbakhshaliyev.com](https://raminbakhshaliyev.com) · [LinkedIn](https://www.linkedin.com/in/raminbakhshaliyev) · raminbakhshaliyev@gmail.com
