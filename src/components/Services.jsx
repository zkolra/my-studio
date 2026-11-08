import { useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { useContent } from "../i18n";
import "../styles/services.css";

/* Услуги: три карточки. За курсором внутри карточки ходит лаймовое свечение,
   рамка подсвечивается, карточка чуть наклоняется. */
function Services() {
  const { services } = useContent();
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
        {services.promo && (
          <p className="services__promo mono js-fade">
            <span className="services__dot" /> {services.promo}
          </p>
        )}
      </div>
      <div className="services__grid">
        {services.items.map((s, i) => (
          <article className="svc js-fade" key={s.title} onPointerMove={move} onPointerLeave={leave}>
            <span className="svc__num mono">0{i + 1}</span>
            {i === 0 && <span className="svc__badge mono">{services.badge}</span>}
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
              <div className="svc__price">
                <strong className="display">{s.price}</strong>
                {s.oldPrice && <s className="display">{s.oldPrice}</s>}
              </div>
              <span className="mono">{s.time}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="services__note mono js-fade">
        <span className="lime">//</span> {services.note}
      </p>
      {services.after && (
        <a className="services__after mono js-fade" href="#faq">
          <span className="lime">→</span> {services.after}
        </a>
      )}
    </section>
  );
}

export default Services;
