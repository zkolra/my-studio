import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/motion";

/* Курсор-прицел: лаймовая точка и четыре уголка.
   Над ссылками уголки расходятся, над data-cursor="…" появляется подпись. */
function Cursor() {
  const root = useRef(null);
  const label = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const el = root.current;
      const fx = gsap.quickTo(el, "x", { duration: 0.22, ease: "power3" });
      const fy = gsap.quickTo(el, "y", { duration: 0.22, ease: "power3" });
      let last = { x: -100, y: -100 };
      const update = (t) => {
        const lab = t?.closest?.("[data-cursor]");
        el.classList.toggle("has-label", !!lab);
        el.classList.toggle("is-hot", !!t?.closest?.("a, button, input, [data-cursor]"));
        if (lab && label.current) label.current.textContent = lab.dataset.cursor;
      };
      const move = (e) => {
        last = { x: e.clientX, y: e.clientY };
        fx(e.clientX);
        fy(e.clientY);
        gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
        update(e.target);
      };
      const scroll = () => update(document.elementFromPoint(last.x, last.y));
      window.addEventListener("pointermove", move);
      window.addEventListener("scroll", scroll, { passive: true });
      return () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("scroll", scroll);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <span className="cursor__frame">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="cursor__dot" />
      <span className="cursor__label" ref={label} />
    </div>
  );
}

export default Cursor;
