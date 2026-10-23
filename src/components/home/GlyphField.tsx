'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { scrollVelocity } from '@/lib/scroll';
import styles from './GlyphField.module.css';

type Props = {
  /** The code the noise compiles into under the cursor */
  code: string;
};

const RAMP = '  ..·:;-=+*'; // density ramp; two spaces keep calm empty patches
// Colours baked into the sprite atlas: noise (normal, quiet), code ink x4, hot x3
const LEVELS = [
  'rgba(17,16,14,.16)', 'rgba(17,16,14,.06)',
  'rgba(17,16,14,.2)', 'rgba(17,16,14,.32)', 'rgba(17,16,14,.45)', 'rgba(17,16,14,.6)',
  'rgba(255,74,28,.7)', 'rgba(255,74,28,.85)', 'rgba(255,74,28,1)',
];
const HEADER_BAND = 64; // px under the fixed header that stays calm
const DECAY = 0.9; // afterglow per 60fps frame: short, so the blob sits on the cursor
const IDLE_MS = 2500; // after this, a ghost cursor wanders so the idea stays visible
const SCROLLING = 40; // px/s: above this the page counts as moving
const ACTIVE_MS = 1200; // pointer moved this recently: the visitor is playing with the field
const FLOW = 0.48; // noise drift per second (time-based, so the speed is the same at 30 or 60fps)
const RESIZE_DEBOUNCE = 150; // ms: rebuild the canvas once a window drag has settled
const EXIT_STOP = 0.5; // share of the hero scrolled away after which the (faded) field stops drawing

// Hero background: noise (ideas) that compiles into code wherever the cursor passes.
// Each glyph is drawn once into an atlas; every frame only copies sprites (drawImage is far cheaper than fillText).
export function GlyphField({ code }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const hero = canvas?.parentElement?.parentElement;
    if (!canvas || !ctx || !hero || prefersReducedMotion()) return;

    const glyphs = [...new Set([...RAMP.replace(/ /g, ''), ...code])];
    const index = new Map(glyphs.map((g, i) => [g, i]));
    const rampIdx = [...RAMP].map((c) => (c === ' ' ? -1 : (index.get(c) ?? -1)));
    const codeIdx = [...code].map((c) => index.get(c) ?? 0);
    // 1.5x is visually identical for 10px glyphs and has ~44% fewer pixels to push than 2x
    const dpr = Math.min(1.5, devicePixelRatio || 1);
    const atlas = document.createElement('canvas');

    let W = 0, H = 0, cols = 0, rows = 0, cell = 16, cs = 32;
    let heat = new Float32Array(0);
    let quiet = new Uint8Array(0);

    const buildAtlas = () => {
      cs = Math.round(cell * dpr);
      atlas.width = glyphs.length * cs;
      atlas.height = LEVELS.length * cs;
      const a = atlas.getContext('2d');
      if (!a) return;
      // Canvas cannot resolve CSS variables, so borrow the computed family from a mono element
      const monoEl = hero.querySelector('.live-prompt');
      a.font = `${cs * 0.72}px ${monoEl ? getComputedStyle(monoEl).fontFamily : 'monospace'}`;
      a.textAlign = 'center';
      a.textBaseline = 'middle';
      LEVELS.forEach((colour, l) => {
        a.fillStyle = colour;
        glyphs.forEach((g, i) => a.fillText(g, i * cs + cs / 2, l * cs + cs / 2));
      });
    };

    const quietEls = [...hero.querySelectorAll<HTMLElement>('[data-quiet]')];

    // Position inside the hero from layout offsets, so scroll transforms on these blocks never skew it
    const offsetIn = (el: HTMLElement) => {
      let x = 0, y = 0;
      let node: HTMLElement | null = el;
      while (node && node !== hero) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight };
    };

    // Cells behind text, the menu and the header are drawn fainter so everything stays readable
    const computeQuiet = () => {
      quiet = new Uint8Array(cols * rows);
      const mark = (x0: number, y0: number, x1: number, y1: number) => {
        for (let j = Math.max(0, y0); j < Math.min(rows, y1); j++)
          for (let i = Math.max(0, x0); i < Math.min(cols, x1); i++) quiet[j * cols + i] = 1;
      };
      quietEls.forEach((el) => {
        const q = offsetIn(el);
        if (!q.w) return;
        mark(Math.floor(q.x / cell), Math.floor(q.y / cell), Math.ceil((q.x + q.w) / cell), Math.ceil((q.y + q.h) / cell));
      });
      mark(0, 0, cols, Math.ceil(HEADER_BAND / cell));
    };

    const size = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      cell = W < 700 ? 13 : 16;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      cols = Math.ceil(W / cell);
      rows = Math.ceil(H / cell);
      heat = new Float32Array(cols * rows);
      computeQuiet();
      buildAtlas();
    };
    void document.fonts.ready.then(size);
    size();

    // Window drags fire resize dozens of times a second; rebuild once it settles
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(size, RESIZE_DEBOUNCE);
    };
    addEventListener('resize', onResize);

    // The build log grows after load: keep its calm zone in step with it
    const ro = new ResizeObserver(() => computeQuiet());
    quietEls.forEach((el) => ro.observe(el));

    let px = -999, py = -999, lastMove = -1e9, visible = true;
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      lastMove = performance.now();
    };
    addEventListener('pointermove', onMove, { passive: true });
    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
    });
    io.observe(canvas);

    let t = 0, raf = 0, odd = false, lastDraw = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const rect = canvas.getBoundingClientRect();
      // Leaving the hero, the field is fading out anyway: stop paying for it
      if (-rect.top / rect.height > EXIT_STOP) return;
      const v = Math.abs(scrollVelocity());
      // Adaptive frame rate: full 60fps only while the pointer is playing with the field.
      // Reading (idle) or gliding past (scrolling), 30fps looks identical for a slow texture and halves the cost.
      const playing = now - lastMove < ACTIVE_MS && v <= SCROLLING;
      odd = !odd;
      if (!playing && odd) return;
      const dt = Math.min(0.1, (now - (lastDraw || now)) / 1000);
      lastDraw = now;
      t += dt * FLOW * (1 + Math.min(v / 500, 4)); // scrolling stirs the field

      let cx = px - rect.left, cy = py - rect.top;
      if (now - lastMove > IDLE_MS) {
        cx = W * (0.55 + 0.35 * Math.sin(now / 2300));
        cy = H * (0.45 + 0.3 * Math.sin(now / 1700 + 1));
      }
      const R = Math.max(56, W * 0.045), R2 = R * R;
      const decay = Math.pow(DECAY, dt * 60); // same afterglow length at 30 or 60fps
      const shift = Math.floor(t * 4);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let j = 0; j < rows; j++) {
        const y = j * cell + cell / 2, dy = y - cy, dy2 = dy * dy;
        const cj = Math.cos(j * 0.17 - t * 0.8);
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const x = i * cell + cell / 2, dx = x - cx, d2 = dx * dx + dy2;
          let h = heat[k] ?? 0;
          if (d2 < R2) h = Math.max(h, 1 - Math.sqrt(d2) / R);
          h *= decay;
          heat[k] = h;
          const calm = quiet[k] === 1;

          let glyph: number, level: number;
          if (h > 0.12) {
            glyph = codeIdx[(k + shift) % codeIdx.length] ?? 0;
            // Calm zones never get the bright orange code, only soft ink
            level = calm ? 2 + Math.min(1, Math.floor(h / 0.5))
              : h > 0.6 ? 6 + Math.min(2, Math.floor((h - 0.6) / 0.14)) : 2 + Math.min(3, Math.floor(h / 0.15));
          } else {
            const n = (Math.sin(i * 0.11 + t) * cj + Math.sin((i + j) * 0.06 + t * 0.6) + 2) / 4;
            glyph = rampIdx[Math.floor(n * rampIdx.length) % rampIdx.length] ?? -1;
            if (glyph < 0) continue;
            level = calm ? 1 : 0;
          }
          ctx.drawImage(atlas, glyph * cs, level * cs, cs, cs, Math.round(i * cell * dpr), Math.round(j * cell * dpr), cs, cs);
        }
      }
    };
    raf = requestAnimationFrame(frame);
    canvas.dataset.on = '';

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      removeEventListener('resize', onResize);
      removeEventListener('pointermove', onMove);
    };
  }, [code]);

  // The wrapper is what the scroll choreography fades; the canvas keeps its own fade-in
  return (
    <div className={styles.wrap} data-field="" aria-hidden="true">
      <canvas ref={ref} className={styles.field} />
    </div>
  );
}
