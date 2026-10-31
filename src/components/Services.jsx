import { useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { services } from "../content";
import "../styles/services.css";

/* Услуги: три карточки. За курсором внутри карточки ходит лаймовое свечение,
   рамка подсвечивается, карточка чуть наклоняется. */
function Services() {
  const move = (e) => {
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();
    const x = e.clientX - b.left;
    const y = e.clientY - b.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    if (!reducedMotion()) gsap.to(el, { rotationY: (x / b.width - 0.5) * 8, rotationX: -(y / b.height - 0.5) * 8, duration: 0.6, ease: "power3" });
  };
  const leave = (e) => gsap.to(e.currentTarget, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3" });
  const ref = useRef(null);

  return (
    <section className="services" id="services" ref={ref}>
      <div className="services__head">
        <span className="label">
          <b>02</b> // {services.label}
        </span>
        <h2 className="services__title display js-lines">
          {services.title.map((t, i) => (
            <span className="split-line" key={t}>
              <span className={i ? "lime" : ""}>{t}</span>
            </span>
          ))}
        </h2>
      </div>
      <div className="services__grid">
        {services.items.map((s, i) => (
          <article className="svc js-fade" key={s.title} onPointerMove={move} onPointerLeave={leave}>
            <span className="svc__num mono">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul className="svc__list mono">
              {s.list.map((l) => (
                <li key={l}>
                  <span className="lime">✓</span> {l}
                </li>
              ))}
            </ul>
            <div className="svc__foot">
              <strong className="display">{s.price}</strong>
              <span className="mono">{s.time}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="services__note mono js-fade">
        <span className="lime">//</span> {services.note}
      </p>
    </section>
  );
}

export default Services;
