import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { useContent } from "../i18n";
import "../styles/process.css";

/* Процесс как история коммитов (git log): лаймовая линия ветки
   прорастает вниз при прокрутке, узлы загораются по очереди. */
function Process() {
  const { process } = useContent();
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".gitlog__line i", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".gitlog", start: "top 70%", end: "bottom 60%", scrub: true },
      });
      gsap.utils.toArray(".commit").forEach((c) => {
        gsap.from(c, { x: 40, opacity: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 78%" } });
        gsap.fromTo(c.querySelector(".commit__node"), { scale: 0.4, backgroundColor: "#161916" }, {
          scale: 1,
          backgroundColor: "#b8ff38",
          duration: 0.4,
          scrollTrigger: { trigger: c, start: "top 65%", toggleActions: "play none none reverse" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process" id="process" ref={root}>
      <div className="process__head">
        <span className="label">
          <b>03</b> // {process.label}
        </span>
        <h2 className="process__title display js-lines">
          {process.title.map((t, i) => (
            <span className="split-line" key={t}>
              <span className={i ? "lime" : ""}>{t}</span>
            </span>
          ))}
        </h2>
        <p className="mono process__cmd js-fade">
          <span className="lime">$</span> git log --oneline --graph
        </p>
      </div>

      <ol className="gitlog">
        <span className="gitlog__line" aria-hidden="true">
          <i />
        </span>
        {process.steps.map((s) => (
          <li className="commit" key={s.hash}>
            <span className="commit__node" />
            <div className="commit__meta mono">
              <span className="lime">{s.hash}</span>
              <span>{s.time}</span>
            </div>
            <h3 className="display">{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Process;
