import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, reducedMotion, getLenis } from "../lib/motion";
import { scramble } from "../lib/scramble";
import { useContent } from "../i18n";
import "../styles/player.css";

/* Живой сайт прямо на странице: окно браузера с настоящим сайтом внутри (iframe).
   Его можно листать, нажимать, смотреть все анимации. Пока грузится — терминал-загрузка.
   Кнопка «на весь экран» разворачивает окно, Esc или ✕ — закрыть. */
function Player({ item, onClose }) {
  const { player } = useContent();
  const root = useRef(null);
  const url = useRef(null);
  const closing = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [full, setFull] = useState(false);
  const still = reducedMotion();
  const host = item.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    gsap.timeline({ onComplete: onClose })
      .to(".player__window", { scale: 0.92, opacity: 0, duration: still ? 0 : 0.4, ease: "power3.in" })
      .to(root.current, { opacity: 0, duration: still ? 0 : 0.3 }, "-=0.15");
  }, [onClose, still]);

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add("no-scroll");
    const ctx = gsap.context(() => {
      gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: still ? 0 : 0.3 });
      gsap.fromTo(".player__window", { scale: 0.88, y: 40, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: still ? 0 : 0.8, ease: "expo.out" });
    }, root);
    scramble(url.current, host, { duration: 0.7 });
    const key = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", key);
    return () => {
      ctx.revert();
      window.removeEventListener("keydown", key);
      document.documentElement.classList.remove("no-scroll");
      lenis?.start();
    };
  }, [host, close, still]);

  return (
    <div className={`player${full ? " is-full" : ""}`} ref={root} role="dialog" aria-modal="true" aria-label={item.name} onClick={(e) => e.target === root.current && close()}>
      <div className="player__window" style={{ "--c": item.color }}>
        <div className="player__chrome mono">
          <span className="player__dots">
            <button onClick={close} aria-label={player.close} title={player.close} />
            <i />
            <button className="is-max" onClick={() => setFull((v) => !v)} aria-label={player.full} title={player.full} />
          </span>
          <span className="player__url">
            <b>🔒</b> <span ref={url} />
          </span>
          <span className="player__tools">
            <button onClick={() => setFull((v) => !v)}>{full ? player.small : player.full}</button>
            <a href={item.url} target="_blank" rel="noreferrer">
              ↗
            </a>
            <button onClick={close} aria-label={player.close}>
              ✕
            </button>
          </span>
        </div>
        <div className="player__screen">
          {!loaded && (
            <div className="player__loading mono">
              <p>
                <span className="lime">&gt;</span> {player.connecting} {host}
              </p>
              <p>
                <span className="lime">&gt;</span> {player.loading} {item.name}
                <span className="caret" />
              </p>
            </div>
          )}
          <iframe src={item.url} title={item.name} onLoad={() => setLoaded(true)} className={loaded ? "is-ready" : ""} allow="autoplay; fullscreen" />
        </div>
      </div>
      <p className="player__hint mono">
        <span className="lime">//</span> {player.hint}
      </p>
    </div>
  );
}

export default Player;
