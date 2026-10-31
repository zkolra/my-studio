import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;

/* Плавная прокрутка всего сайта, синхронизированная с GSAP */
export function startSmoothScroll() {
  if (reducedMotion()) return null;

  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Якорные ссылки (#menu и т.п.) — тоже плавно
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: 0, duration: 1.6 });
  });

  return lenis;
}

export const getLenis = () => lenis;
