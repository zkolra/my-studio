import { useCallback, useEffect, useRef } from "react";
import { gsap, reducedMotion, getLenis } from "../lib/motion";
import { scramble } from "../lib/scramble";
import "../styles/player.css";

/* Окно браузера на весь экран: адрес «печатается», сайт прокручивается
   (видео), внизу полоса прогресса. Когда видео заканчивается — окно закрывается само. */
function Player({ item, src, poster, onClose }) {
  const root = useRef(null);
  const video = useRef(null);
  const bar = useRef(null);
  const url = useRef(null);
  const closing = useRef(false);
  const still = reducedMotion();

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    gsap.timeline({ onComplete: onClose })
      .to(".player__window", { scale: 0.9, opacity: 0, duration: still ? 0 : 0.45, ease: "power3.in" })
      .to(root.current, { opacity: 0, duration: still ? 0 : 0.3 }, "-=0.15");
  }, [onClose, still]);

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add("no-scroll");
    const ctx = gsap.context(() => {
      gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: still ? 0 : 0.35 });
      gsap.fromTo(".player__window", { scale: 0.86, y: 40, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: still ? 0 : 0.8, ease: "expo.out", delay: 0.05 });
    }, root);
    scramble(url.current, `https://${item.host}.dev22.es`, { duration: 0.7 });
    const v = video.current;
    const onTime = () => bar.current && (bar.current.style.transform = `scaleX(${v.currentTime / (v.duration || 1)})`);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", close);
    v.play().catch(() => {});
    const key = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", key);
    return () => {
      ctx.revert();
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", close);
      window.removeEventListener("keydown", key);
      document.documentElement.classList.remove("no-scroll");
      lenis?.start();
    };
  }, [item, close, still]);

  return (
    <div className="player" ref={root} role="dialog" aria-modal="true" aria-label={item.name} onClick={(e) => e.target === root.current && close()}>
      <div className="player__window" style={{ "--c": item.color }}>
        <div className="player__chrome mono">
          <span className="player__dots">
            <button onClick={close} aria-label="Close" />
            <i />
            <i />
          </span>
          <span className="player__url">
            <b>🔒</b> <span ref={url} />
          </span>
          <span className="player__name">{item.name}</span>
        </div>
        <div className="player__screen">
          <video ref={video} src={src} poster={poster} muted playsInline preload="auto" />
        </div>
        <div className="player__bar">
          <i ref={bar} />
        </div>
      </div>
      <div className="player__actions">
        {item.url && (
          <a className="btn btn--lime" href={item.url} target="_blank" rel="noreferrer">
            Открыть сайт ↗
          </a>
        )}
        <button className="btn btn--ghost" onClick={close}>
          Закрыть ✕
        </button>
      </div>
    </div>
  );
}

export default Player;
