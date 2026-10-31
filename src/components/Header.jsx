import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/motion";
import { brand, nav } from "../content";
import { scramble } from "../lib/scramble";
import Logo from "./Logo";
import "../styles/header.css";

/* Шапка: логотип, пункты меню «расшифровываются» при наведении,
   живые часы Испании, кнопка. Прячется при прокрутке вниз. */
function Header() {
  const bar = useRef(null);
  const clock = useRef(null);
  const overlay = useRef(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > window.innerHeight * 0.6;
        gsap.to(bar.current, { yPercent: hide ? -130 : 0, duration: 0.5, ease: "power3.out", overwrite: true });
        bar.current.classList.toggle("is-solid", self.scroll() > 40);
      },
    });
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: brand.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => clock.current && (clock.current.textContent = fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      st.kill();
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (!overlay.current) return;
    const links = overlay.current.querySelectorAll(".mnav__link span");
    if (open) {
      gsap.timeline()
        .set(overlay.current, { visibility: "visible" })
        .fromTo(overlay.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 }, "-=0.3");
    } else {
      gsap.to(overlay.current, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "expo.inOut", onComplete: () => gsap.set(overlay.current, { visibility: "hidden" }) });
    }
  }, [open]);

  return (
    <>
      <header className={`header${open ? " is-open" : ""}`} ref={bar}>
        <a href="#top" className="header__logo">
          <Logo />
        </a>
        <nav className="header__nav mono" aria-label="Main">
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} onPointerEnter={(e) => scramble(e.currentTarget.querySelector("span"), n.label, { duration: 0.4 })}>
              <b>0{i + 1}</b>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="header__right">
          <span className="header__clock mono">
            <i /> {brand.city} <span ref={clock} />
          </span>
          <a className="btn btn--lime header__cta" href="#contact">
            Обсудить проект ↗
          </a>
          <button className="header__burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className="mnav" ref={overlay} onClick={(e) => e.target.closest("a") && setOpen(false)}>
        <nav>
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} className="mnav__link display">
              <span>
                <small className="mono lime">0{i + 1}</small>
                {n.label}
              </span>
            </a>
          ))}
        </nav>
        <a className="mnav__mail mono" href={`mailto:${brand.email}`}>
          {brand.email}
        </a>
      </div>
    </>
  );
}

export default Header;
