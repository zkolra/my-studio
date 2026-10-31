import { useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { work } from "../content";
import Player from "./Player";
import "../styles/work.css";

const reel = (slug) => `/reels/${slug}.mp4`;
const poster = (slug) => `/reels/${slug}.jpg`;

/* Работы: карточки складываются стопкой при прокрутке — новая наезжает,
   предыдущая уменьшается и темнеет. При наведении в карточке
   начинает прокручиваться сам сайт. Клик — окно браузера на весь экран. */
function Work() {
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

  const hover = (e, on) => {
    const v = e.currentTarget.querySelector("video");
    if (!v || reducedMotion()) return;
    if (on) v.play().catch(() => {});
    else v.pause();
  };

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
                onPointerEnter={(e) => hover(e, true)}
                onPointerLeave={(e) => hover(e, false)}
                data-cursor="▶ Смотреть сайт"
                aria-label={`Смотреть ${p.name}`}
              >
                <span className="wcard__chrome mono">
                  <span className="wcard__dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="wcard__url">{p.host}.dev22.es</span>
                </span>
                <span className="wcard__screen">
                  <img src={poster(p.slug)} alt="" loading="lazy" />
                  <video src={reel(p.slug)} muted loop playsInline preload="none" />
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
                    ▶ Смотреть
                  </button>
                  {p.url && (
                    <a className="btn btn--ghost" href={p.url} target="_blank" rel="noreferrer">
                      Открыть сайт ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {open !== null && <Player item={work.items[open]} src={reel(work.items[open].slug)} poster={poster(work.items[open].slug)} onClose={() => setOpen(null)} />}
    </section>
  );
}

export default Work;
