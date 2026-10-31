import { useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { useContent } from "../i18n";
import Player from "./Player";
import "../styles/work.css";

// кадр первого экрана каждого сайта: src/assets/<slug>.jpg
const shots = import.meta.glob("../assets/*.jpg", { eager: true, import: "default" });
const poster = (slug) => shots[`../assets/${slug}.jpg`];

/* Работы: карточки складываются стопкой при прокрутке — новая наезжает,
   предыдущая уменьшается и темнеет. Клик — живой сайт открывается
   прямо здесь, в окне браузера: его можно листать и нажимать. */
function Work() {
  const { work } = useContent();
  const root = useRef(null);
  const [open, setOpen] = useState(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 861px)", () => {
      const cards = gsap.utils.toArray(".wcard");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card.querySelector(".wcard__inner"), {
          scale: 0.94,
          filter: "brightness(0.7)",
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top 55%", end: "top 12%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="work" id="work" ref={root}>
      <div className="work__head">
        <span className="label">
          <b>01</b> // {work.label}
        </span>
        <h2 className="work__title display js-lines">
          {work.title.map((t, i) => (
            <span className="split-line" key={t}>
              <span className={i ? "lime" : ""}>{t}</span>
            </span>
          ))}
        </h2>
        <p className="js-fade">{work.text}</p>
      </div>

      <div className="work__list">
        {work.items.map((p, i) => (
          <article className="wcard" key={p.slug} style={{ "--i": i, "--c": p.color }}>
            <div className="wcard__inner">
              <button
                className="wcard__media"
                onClick={() => setOpen(i)}
                data-cursor={work.cursor}
                aria-label={`${work.watch} ${p.name}`}
              >
                <span className="wcard__chrome mono">
                  <span className="wcard__dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="wcard__url">{p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                </span>
                <span className="wcard__screen">
                  <img src={poster(p.slug)} alt="" loading="lazy" />
                  <span className="wcard__play mono">{work.open}</span>
                </span>
              </button>
              <div className="wcard__info">
                <span className="mono wcard__num">
                  {String(i + 1).padStart(2, "0")} / {String(work.items.length).padStart(2, "0")}
                </span>
                <h3 className="display">{p.name}</h3>
                <span className="mono wcard__tag">
                  <i /> {p.tag} · {p.year}
                </span>
                <p>{p.text}</p>
                <div className="wcard__actions">
                  <button className="btn btn--lime" onClick={() => setOpen(i)}>
                    {work.watch}
                  </button>
                  {p.url && (
                    <a className="btn btn--ghost" href={p.url} target="_blank" rel="noreferrer">
                      {work.newTab}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {open !== null && <Player item={work.items[open]} onClose={() => setOpen(null)} />}
    </section>
  );
}

export default Work;
