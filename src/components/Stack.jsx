import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "../lib/motion";
import { stack } from "../content";
import "../styles/stack.css";

/* Бегущая строка технологий: слова в виде тегов &lt;React /&gt;,
   ускоряется и наклоняется, когда листаешь. */
function Stack() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const track = root.current.querySelector(".stack__track");
    const tw = gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    const skew = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" });
    let idle;
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        gsap.to(tw, { timeScale: (1 + Math.min(5, Math.abs(v) / 300)) * (v < 0 ? -1 : 1), duration: 0.3, overwrite: true });
        skew(gsap.utils.clamp(-10, 10, v / -150));
        clearTimeout(idle);
        idle = setTimeout(() => {
          gsap.to(tw, { timeScale: 1, duration: 0.8 });
          skew(0);
        }, 150);
      },
    });
    return () => {
      tw.kill();
      st.kill();
    };
  }, []);

  const items = [...stack, ...stack];

  return (
    <div className="stack" ref={root} aria-hidden="true">
      <div className="stack__track mono">
        {[...items, ...items].map((s, i) => (
          <span key={i}>
            <i>&lt;</i>
            {s}
            <i> /&gt;</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Stack;
