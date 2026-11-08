import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { scramble } from "../lib/scramble";
import { useContent } from "../i18n";
import Logo from "./Logo";
import "../styles/contact.css";

/* Контакт: заголовок, почта копируется по клику, рядом — живой терминал,
   в котором можно набирать команды (help, services, hire…).
   Внизу огромный DEV/22, косая черта светится. */
function Contact() {
  const { brand, contact } = useContent();
  const root = useRef(null);
  const mail = useRef(null);
  const inputRef = useRef(null);
  const screen = useRef(null);
  const [copied, setCopied] = useState(false);
  const [log, setLog] = useState([]);
  const [typing, setTyping] = useState("");

  /* Демо: когда терминал появляется на экране, он сам «набирает» несколько команд */
  useEffect(() => {
    const t = contact.terminal;
    const demo = ["about", "services", "contact"];
    if (reducedMotion()) {
      setLog([...demo.flatMap((c) => [{ type: "in", text: c }, { type: "out", text: t.commands[c] }]), { type: "out", text: t.hint }]);
      return;
    }
    let timers = [];
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      let at = 300;
      demo.forEach((c) => {
        [...c].forEach((_, i) => timers.push(setTimeout(() => setTyping(c.slice(0, i + 1)), at + i * 70)));
        at += c.length * 70 + 250;
        timers.push(setTimeout(() => {
          setTyping("");
          setLog((l) => [...l, { type: "in", text: c }, { type: "out", text: t.commands[c] }]);
        }, at));
        at += 500;
      });
      timers.push(setTimeout(() => setLog((l) => [...l, { type: "out", text: t.hint, hint: true }]), at));
    };
    const io = new IntersectionObserver(([e]) => e.isIntersecting && run(), { threshold: 0.4 });
    if (screen.current) io.observe(screen.current);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [contact]);
  const [cmd, setCmd] = useState("");

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact__big", { yPercent: 40, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".contact__big", start: "top 95%" } });
      gsap.fromTo(".contact__big .logo i", { opacity: 0.15 }, {
        keyframes: [{ opacity: 1, duration: 0.06 }, { opacity: 0.2, duration: 0.08 }, { opacity: 1, duration: 0.06 }, { opacity: 0.3, duration: 0.1 }, { opacity: 1, duration: 0.3 }],
        scrollTrigger: { trigger: ".contact__big", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (screen.current) screen.current.scrollTop = screen.current.scrollHeight;
  }, [log]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brand.email);
    } catch {
      /* без доступа к буферу — просто показываем почту */
    }
    setCopied(true);
    scramble(mail.current, brand.email, { duration: 0.6 });
    setTimeout(() => setCopied(false), 2200);
  };

  const run = (e) => {
    e.preventDefault();
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    if (c === "clear") {
      setLog([]);
    } else {
      const out = contact.terminal.commands[c] ?? contact.terminal.unknown;
      setLog((l) => [...l, { type: "in", text: c }, { type: "out", text: out }]);
    }
    setCmd("");
  };

  return (
    <footer className="contact" id="contact" ref={root}>
      <div className="contact__grid">
        <div>
          <span className="label">
            <b>05</b> // {contact.label}
          </span>
          <h2 className="contact__title display js-lines">
            {contact.title.map((t, i) => (
              <span className="split-line" key={t}>
                <span className={i === contact.title.length - 1 ? "lime" : ""}>{t}</span>
              </span>
            ))}
          </h2>
          <p className="contact__text js-fade">{contact.text}</p>
          <button className="contact__mail js-fade" onClick={copy} data-cursor={copied ? contact.copied : contact.copy}>
            <span ref={mail}>{brand.email}</span>
            <small className="mono">{copied ? contact.copied : "⧉ copy"}</small>
          </button>
          <div className="contact__socials mono js-fade">
            {brand.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="term js-fade" onClick={() => inputRef.current?.focus()}>
          <div className="term__top mono">
            <span className="term__dots">
              <i />
              <i />
              <i />
            </span>
            <span>zsh — dev22</span>
          </div>
          <div className="term__screen mono" ref={screen}>
            {log.map((l, i) => (
              <p key={i} className={l.type === "in" ? "term__in" : `term__out${l.hint ? " lime" : ""}`}>
                {l.type === "in" ? (
                  <>
                    <span className="lime">➜</span> <span className="term__path">~/dev22</span> {l.text}
                  </>
                ) : (
                  l.text
                )}
              </p>
            ))}
            <form onSubmit={run} className="term__form">
              <span className="lime">➜</span> <span className="term__path">~/dev22</span>
              {typing && <span>{typing}</span>}
              <input ref={inputRef} value={cmd} onChange={(e) => setCmd(e.target.value)} aria-label="Terminal command" autoComplete="off" spellCheck="false" />
            </form>
          </div>
        </div>
      </div>

      <div className="contact__big display" aria-hidden="true">
        <Logo />
      </div>

      <div className="contact__legal mono">
        <span>© {new Date().getFullYear()} {brand.domain}</span>
        <span>Made with React · GSAP · ♥</span>
      </div>
    </footer>
  );
}

export default Contact;
