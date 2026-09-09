import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Heading } from '@/components/primitives/Heading';
import { Body } from '@/components/primitives/Body';
import { Button } from '@/components/primitives/Button';
import { Tag } from '@/components/primitives/Tag';
import { Rule } from '@/components/primitives/Rule';
import { MediaFrame } from '@/components/primitives/MediaFrame';
import styles from './styleguide.module.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

// NOTE: This palette specification is manually synchronized with src/styles/tokens.css
const COLOR_SWATCHES = [
  { name: '--surface-void', hex: '#08090A', role: 'Page background', contrast: 'Base' },
  { name: '--surface-obsidian', hex: '#0D0E10', role: 'Elevated section', contrast: 'Surface' },
  { name: '--surface-graphite', hex: '#121316', role: 'Card background', contrast: 'Surface' },
  { name: '--surface-slate', hex: '#1A1C20', role: 'Hover / Input', contrast: 'Surface' },
  { name: '--line-hairline', hex: 'rgba(237, 233, 223, 0.10)', role: 'Structural lines', contrast: 'Subtle' },
  { name: '--line-medium', hex: 'rgba(237, 233, 223, 0.18)', role: 'Card borders', contrast: 'Border' },
  { name: '--line-strong', hex: 'rgba(237, 233, 223, 0.32)', role: 'Active / Focus borders', contrast: 'Focus' },
  { name: '--text-primary', hex: '#EDE9DF', role: 'Warm ivory primary text', contrast: '16.44:1 AAA on void' },
  { name: '--text-secondary', hex: '#A8A399', role: 'Secondary body text', contrast: '7.94:1 AAA on void' },
  { name: '--text-tertiary', hex: '#837E76', role: 'Meta & labels (>=14px)', contrast: '4.95:1 AA on void' },
  { name: '--accent-gold', hex: '#D3AA69', role: 'Brand & editorial emphasis', contrast: '9.23:1 AAA on void' },
  { name: '--accent-signal', hex: '#88DDD7', role: 'Interactivity & system focus', contrast: '12.69:1 AAA on void' },
  { name: '--accent-gold-dim', hex: 'rgba(211, 170, 105, 0.14)', role: 'Dim gold tint', contrast: 'Subtle' },
  { name: '--accent-signal-dim', hex: 'rgba(136, 221, 215, 0.14)', role: 'Dim signal tint', contrast: 'Subtle' },
];

const SPACING_TOKENS = [
  { name: '--space-1', value: '0.25rem' },
  { name: '--space-2', value: '0.5rem' },
  { name: '--space-3', value: '0.75rem' },
  { name: '--space-4', value: '1rem' },
  { name: '--space-5', value: '1.5rem' },
  { name: '--space-6', value: '2rem' },
  { name: '--space-7', value: '3rem' },
  { name: '--space-8', value: '4rem' },
  { name: '--space-9', value: '6rem' },
  { name: '--space-10', value: '8rem' },
  { name: '--space-11', value: '12rem' },
];

export default async function StyleguidePage({ params }: Props) {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_STYLEGUIDE !== 'true') {
    notFound();
  }

  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container>
      <div className={styles.wrapper}>
        {/* Header section */}
        <header className={styles.section}>
          <Eyebrow tone="signal">Design System</Eyebrow>
          <Heading level={1} size="display-l">
            Primitives & <em>Tokens</em>
          </Heading>
          <Body size="l">
            Design system specification and component verification gallery. All values are rendered using design tokens.
          </Body>
        </header>

        <Rule />

        {/* 1. Color Swatches */}
        <section className={styles.section}>
          <Eyebrow>01 · Color Palette & Contrast</Eyebrow>
          <Heading level={2} size="heading">
            Color Tokens
          </Heading>
          <div className={styles.swatchGrid}>
            {COLOR_SWATCHES.map((swatch) => (
              <div key={swatch.name} className={styles.swatchCard}>
                <div
                  className={styles.swatchPreview}
                  style={{ backgroundColor: `var(${swatch.name})` }}
                />
                <div className={styles.swatchMeta}>
                  <span className={styles.tokenName}>{swatch.name}</span>
                  <span className={styles.tokenValue}>{swatch.hex} · {swatch.role}</span>
                  <span className={styles.contrastBadge}>{swatch.contrast}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* 2. Typography Scale */}
        <section className={styles.section}>
          <Eyebrow>02 · Typography</Eyebrow>
          <Heading level={2} size="heading">
            Type Scale
          </Heading>
          <div className={styles.scaleList}>
            <div className={styles.scaleItem}>
              <Eyebrow>Display XL · clamp(3.25rem, 8.5vw, 8rem)</Eyebrow>
              <Heading level={1} size="display-xl">
                Display XL <em>Emphasis</em>
              </Heading>
            </div>
            <div className={styles.scaleItem}>
              <Eyebrow>Display L · clamp(2.5rem, 5.5vw, 5rem)</Eyebrow>
              <Heading level={2} size="display-l">
                Display L <em>Headline</em>
              </Heading>
            </div>
            <div className={styles.scaleItem}>
              <Eyebrow>Display M · clamp(2rem, 3.6vw, 3.25rem)</Eyebrow>
              <Heading level={3} size="display-m">
                Display M Section
              </Heading>
            </div>
            <div className={styles.scaleItem}>
              <Eyebrow>Heading · clamp(1.375rem, 2vw, 1.75rem)</Eyebrow>
              <Heading level={4} size="heading">
                Standard Section Heading
              </Heading>
            </div>
            <div className={styles.scaleItem}>
              <Eyebrow>Body L · clamp(1.0625rem, 1.15vw, 1.25rem)</Eyebrow>
              <Body size="l">
                Body L — Editorial lead paragraph text demonstrating readability and 68ch measure.
              </Body>
            </div>
            <div className={styles.scaleItem}>
              <Eyebrow>Body M · 1rem</Eyebrow>
              <Body size="m">
                Body M — Standard narrative text with <em>gold italic emphasis</em> for editorial feel.
              </Body>
            </div>
            <div className={styles.scaleItem}>
              <Eyebrow>Body S · 0.875rem</Eyebrow>
              <Body size="s">
                Body S — Secondary information, footnotes, and supporting captions.
              </Body>
            </div>
            <div className={styles.scaleItem}>
              <Eyebrow>Label · 0.75rem mono uppercase</Eyebrow>
              <Eyebrow tone="signal">Label — 0.16em letter-spacing monospace</Eyebrow>
            </div>
          </div>
        </section>

        <Rule />

        {/* 3. Spacing Scale */}
        <section className={styles.section}>
          <Eyebrow>03 · Spacing Rhythm</Eyebrow>
          <Heading level={2} size="heading">
            Spacing Tokens
          </Heading>
          <div className={styles.spacingGrid}>
            {SPACING_TOKENS.map((token) => (
              <div key={token.name} className={styles.spacingItem}>
                <span className={styles.tokenName}>{token.name}</span>
                <span className={styles.tokenValue}>{token.value}</span>
                <div
                  className={styles.spacingBar}
                  style={{ width: `var(${token.name})` }}
                />
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* 4. Button Variants */}
        <section className={styles.section}>
          <Eyebrow>04 · Actions</Eyebrow>
          <Heading level={2} size="heading">
            Button Component
          </Heading>
          <div className={styles.buttonRow}>
            <Button variant="primary" as="button">
              Primary Button
            </Button>
            <Button variant="primary" arrow as="button">
              Primary with Arrow
            </Button>
            <Button variant="ghost" as="button">
              Ghost Button
            </Button>
            <Button variant="ghost" arrow as="button">
              Ghost with Arrow
            </Button>
            <Button variant="primary" as="link" href="/work">
              Internal Link Button
            </Button>
            <Button variant="ghost" as="link" href="https://github.com/Ramin7DEV" arrow>
              External Link Button
            </Button>
          </div>
        </section>

        <Rule />

        {/* 5. Tag Component */}
        <section className={styles.section}>
          <Eyebrow>05 · Tags</Eyebrow>
          <Heading level={2} size="heading">
            Tag Component
          </Heading>
          <div className={styles.tagRow}>
            <Tag>All</Tag>
            <Tag active>AI Systems</Tag>
            <Tag>Mobile</Tag>
            <Tag>Product Design</Tag>
            <Tag active>Live</Tag>
            <Tag>Concept</Tag>
          </div>
        </section>

        <Rule />

        {/* 6. Card Demo */}
        <section className={styles.section}>
          <Eyebrow>06 · Cards</Eyebrow>
          <Heading level={2} size="heading">
            Card Pattern (Graphite Surface)
          </Heading>
          <div className={styles.cardDemo}>
            <MediaFrame
              src="/images/project-mirrorly.png"
              alt="Mirrorly project cover demo"
              aspectRatio="1448/1086"
            />
            <div className={styles.cardTop}>
              <Eyebrow tone="signal">01 · In development</Eyebrow>
              <Tag active>AI</Tag>
            </div>
            <Heading level={3} size="heading">
              Mirrorly
            </Heading>
            <Body size="s">
              AI-first mirror workstation concept with computer vision feedback.
            </Body>
            <div className={styles.tagRow}>
              <Tag>iOS</Tag>
              <Tag>SwiftUI</Tag>
              <Tag>CoreML</Tag>
            </div>
          </div>
        </section>

        <Rule />

        {/* 7. MediaFrame Demo */}
        <section className={styles.section}>
          <Eyebrow>07 · Media</Eyebrow>
          <Heading level={2} size="heading">
            MediaFrame Component
          </Heading>
          <div className={styles.mediaFrameDemo}>
            <MediaFrame
              src="/images/hero-studio.png"
              alt="Dark studio workstation visual"
              aspectRatio="16/9"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
        </section>

        <Rule />

        {/* 8. Focus State Demo */}
        <section className={styles.section}>
          <Eyebrow>08 · Accessibility</Eyebrow>
          <Heading level={2} size="heading">
            Focus Rings (:focus-visible)
          </Heading>
          <Body size="m">
            Tab through these elements to inspect the high-contrast focus ring (2px solid --accent-signal, 3px offset, radius-xs).
          </Body>
          <div className={styles.buttonRow}>
            <Button variant="primary" as="button">
              Focusable 1
            </Button>
            <Button variant="ghost" as="button">
              Focusable 2
            </Button>
            <Tag as="button" type="button">
              Focusable Tag
            </Tag>
          </div>
        </section>
      </div>
    </Container>
  );
}
