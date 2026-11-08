import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, reducedMotion } from "../lib/motion";
import { useContent } from "../i18n";
import "../styles/preloader.css";

/* Заставка-терминал: команды «печатаются», справа загорается [OK],
   потом «ready in 22ms» и логотип вспыхивает, как неоновая трубка.
   Фон и логотип лежат прямо в index.html (#pre) — они видны сразу,
   ещё до загрузки скриптов. Здесь дорисовывается терминал и анимация. */
function Preloader({ onReveal }) {
  const { preloader } = useContent();
  const [host] = useState(() => document.getElementById("pre"));
  const [gone, setGone] = useState(!host);

  useLayoutEffect(() => {
    if (!host) {
      onReveal();
      return;
    }
    const finish = () => {
      document.documentElement.classList.remove("no-scroll");
      host.remove();
      setGone(true);
    };
    if (reducedMotion()) {
      finish();
      onReveal();
      return;
    }
    document.documentElement.classList.add("no-scroll");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      gsap.utils.toArray(".pre__line").forEach((line, i) => {
        const txt = line.querySelector(".pre__txt");
        const full = txt.dataset.text;
        const o = { n: 0 };
        tl.set(line, { opacity: 1 }, i * 0.36)
          .to(o, { n: full.length, duration: 0.24, ease: "none", onUpdate: () => (txt.textContent = full.slice(0, Math.round(o.n))) }, i * 0.36)
          .set(line.querySelector(".pre__ok"), { opacity: 1 }, i * 0.36 + 0.3);
      });
      const n = preloader.lines.length * 0.36;
      tl.set(".pre__ready", { opacity: 1 }, n)
        .set(".pre__logo", { opacity: 1 }, n + 0.15)
        .fromTo(".pre__logo i", { opacity: 0 }, {
          keyframes: [{ opacity: 1, duration: 0.05 }, { opacity: 0.1, duration: 0.08 }, { opacity: 1, duration: 0.05 }, { opacity: 0.2, duration: 0.1 }, { opacity: 1, duration: 0.2 }],
        }, n + 0.2)
        .from(".pre__logo", { scale: 0.92, filter: "blur(10px)", duration: 0.8, ease: "expo.out" }, n + 0.15)
        .to(".pre__term", { opacity: 0, duration: 0.3 }, n + 0.4)
        .to(host, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut", onStart: onReveal }, n + 1.2)
        .add(finish);
    }, host);
    return () => {
      ctx.revert();
      document.documentElement.classList.remove("no-scroll");
    };
  }, [onReveal, host]);

  if (gone) return null;

  return createPortal(
    <div className="pre__term mono">
      {preloader.lines.map((l) => (
        <p className="pre__line" key={l}>
          <span className="lime">&gt;</span> <span className="pre__txt" data-text={l} />
          <span className="pre__ok">[ OK ]</span>
        </p>
      ))}
      <p className="pre__ready lime">✓ {preloader.ready}</p>
    </div>,
    host
  );
}

export default Preloader;
