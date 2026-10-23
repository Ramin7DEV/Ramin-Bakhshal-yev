// GSAP scroll helpers shared by the client components. Import only from "use client" files.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

let registered = false;
export function registerScroll() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  registered = true;
}

export function getSmoother(): ScrollSmoother | undefined {
  return ScrollSmoother.get();
}

export function scrollToTarget(target: Element, smooth = true) {
  const smoother = getSmoother();
  if (smoother) smoother.scrollTo(target, smooth, 'top top');
  else target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
}

// One shared trigger is enough to read the page's scroll velocity anywhere
let velocityTrigger: ScrollTrigger | null = null;
export function scrollVelocity(): number {
  registerScroll();
  velocityTrigger ??= ScrollTrigger.create({});
  return velocityTrigger.getVelocity();
}

export { gsap, ScrollTrigger, ScrollSmoother };
