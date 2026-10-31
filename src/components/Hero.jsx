import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { scramble } from "../lib/scramble";
import { useContent } from "../i18n";
import "../styles/hero.css";

/* Первый экран. Слева заголовок: строки выезжают, слово «работают.»
   расшифровывается из символов и загорается лаймом. Справа — редактор кода:
   строки печатаются, потом «компилируются» и внизу загорается ✓ Compiled.
   Сетка точек подсвечивается вокруг курсора, редактор наклоняется за мышью. */
function Hero({ ready }) {
  const { hero } = useContent();
  const root = useRef(null);
  const accent = useRef(null);
  const editor = useRef(null);

  // появление и печать кода
  useLayoutEffect(() => {
    const lines = root.current.querySelectorAll(".code__text");
    if (reducedMotion()) {
      lines.forEach((l) => (l.innerHTML = l.dataset.html));
      return;
    }
    const ctx = gsap.context(() => {
      if (!ready) {
        gsap.set(".hero__title .split-line > span", { yPercent: 105 });
        gsap.set(".hero__in", { opacity: 0, y: 20 });
        gsap.set(".code", { opacity: 0, y: 40, rotateX: 12 });
        lines.forEach((l) => (l.innerHTML = ""));
        return;
      }
      const tl = gsap.timeline();
      tl.to(".hero__title .split-line > span", { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 }, 0)
        .add(() => scramble(accent.current, hero.accent, { duration: 1.1 }), 0.35)
        .to(".hero__in", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.5)
        .to(".code", { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "expo.out" }, 0.3);
      // печать по строкам
      let t = 0.9;
      lines.forEach((l) => {
        const html = l.dataset.html;
        const plain = l.dataset.plain;
        const o = { n: 0 };
        tl.to(o, {
          n: plain.length,
          duration: Math.max(0.1, plain.length * 0.025),
          ease: "none",
          onUpdate: () => (l.textContent = plain.slice(0, Math.round(o.n))),
          onComplete: () => (l.innerHTML = html),
        }, t);
        t += Math.max(0.1, plain.length * 0.025) + 0.05;
      });
      tl.fromTo(".code__status", { opacity: 0.4 }, { opacity: 1, duration: 0.2 }, t)
        .add(() => root.current?.querySelector(".code")?.classList.add("is-done"), t)
        .from(".hero__stat", { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, t)
        .add(() => {
          root.current?.querySelectorAll(".hero__stat b").forEach((el) => {
            const c = { v: 0 };
            gsap.to(c, { v: +el.dataset.value, duration: 1.4, ease: "power3.out", onUpdate: () => (el.textContent = Math.round(c.v)) });
          });
        }, t);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // подсветка сетки и наклон редактора
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const el = root.current;
      const rx = gsap.quickTo(editor.current, "rotationY", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(editor.current, "rotationX", { duration: 0.8, ease: "power3" });
      const move = (e) => {
        const b = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - b.left}px`);
        el.style.setProperty("--my", `${e.clientY - b.top}px`);
        rx(((e.clientX - b.left) / b.width - 0.5) * 14);
        ry(-((e.clientY - b.top) / b.height - 0.5) * 10);
      };
      el.addEventListener("pointermove", move);
      // при прокрутке редактор уезжает вглубь
      const tw = gsap.to(editor.current, { yPercent: 18, scale: 0.92, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      return () => {
        el.removeEventListener("pointermove", move);
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    });
    return () => mm.revert();
  }, []);

  // подсветка синтаксиса для строк редактора
  const line = ([kw, rest]) => {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const r = esc(rest).replace(/("[^"]*")/g, '<span class="c-str">$1</span>').replace(/(launch|project)/g, '<span class="c-fn">$1</span>');
    const k = /^\s*(const|export default)/.test(kw) ? `<span class="c-kw">${esc(kw)}</span>` : `<span class="c-key">${esc(kw)}</span>`;
    return { html: k + r, plain: kw + rest };
  };

  return (
    <section className="hero dots-bg" id="top" ref={root}>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__copy">
        <span className="hero__status mono hero__in">
          <i /> {hero.status}
        </span>
        <h1 className="hero__title">
          {hero.title.map((t) => (
            <span className="split-line" key={t}>
              <span>{t}</span>
            </span>
          ))}
          <span className="split-line">
            <span className="hero__accent lime" ref={accent}>
              {hero.accent}
            </span>
          </span>
        </h1>
        <p className="hero__lead hero__in">{hero.lead}</p>
        <div className="hero__buttons hero__in">
          <a className="btn btn--lime" href={hero.buttons[0].href}>
            {hero.buttons[0].label} ↓
          </a>
          <a className="btn btn--ghost" href={hero.buttons[1].href}>
            {hero.buttons[1].label} ↗
          </a>
        </div>
      </div>

      <div className="hero__scene">
        <div className="code" ref={editor}>
          <div className="code__top mono">
            <span className="code__dots">
              <i />
              <i />
              <i />
            </span>
            <span>project.jsx</span>
            <span className="code__branch">⎇ main</span>
          </div>
          <pre className="code__body mono">
            {hero.code.map((c, i) => {
              const { html, plain } = line(c);
              return (
                <div className="code__row" key={i}>
                  <span className="code__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="code__text" data-html={html} data-plain={plain} />
                </div>
              );
            })}
            <span className="caret" />
          </pre>
          <div className="code__status mono">
            <span className="code__ok">✓ Compiled successfully</span>
            <span>UTF-8 · JSX</span>
          </div>
        </div>
        <div className="hero__stats">
          {hero.stats.map((s) => (
            <div className="hero__stat" key={s.label}>
              <span className="display">
                <b data-value={s.value}>{s.value}</b>
              </span>
              <small className="mono">{s.label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
