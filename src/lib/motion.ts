export const DURATION = {
  instant: 0.12,
  fast: 0.24,
  base: 0.42,
  slow: 0.72,
  scene: 1.2,
} as const;

export const EASE = {
  out: "cubic-bezier(0.16, 1, 0.30, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  entrance: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
