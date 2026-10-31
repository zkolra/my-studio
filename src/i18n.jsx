import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLang, languages, shared, texts } from "./content";

/* Язык сайта: берётся из сохранённого выбора, иначе из языка браузера.
   useContent() отдаёт все тексты на текущем языке. */
const LangContext = createContext(null);
const HREFS = ["#work", "#services", "#process", "#contact"];

function detect() {
  try {
    const saved = localStorage.getItem("dev22-lang");
    if (saved && texts[saved]) return saved;
  } catch {
    /* хранилище недоступно — не страшно */
  }
  const nav = (navigator.languages || [navigator.language || ""]).map((l) => l.slice(0, 2).toLowerCase());
  return nav.find((l) => texts[l]) || defaultLang;
}

function build(lang) {
  const t = texts[lang];
  return {
    lang,
    languages,
    brand: { ...shared.brand, city: t.city },
    nav: t.nav.map((label, i) => ({ label, href: HREFS[i] })),
    cta: t.cta,
    preloader: { lines: shared.preloader, ready: shared.preloaderReady },
    hero: {
      ...t.hero,
      code: shared.code,
      buttons: t.hero.buttons.map((label, i) => ({ label, href: i ? "#services" : "#work" })),
    },
    stack: shared.stack,
    work: { ...t.work, items: shared.work.map((w, i) => ({ ...w, ...t.work.items[i] })) },
    player: t.player,
    services: t.services,
    process: { ...t.process, steps: t.process.steps.map((s, i) => ({ ...s, hash: shared.processHashes[i] })) },
    contact: t.contact,
  };
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detect);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("dev22-lang", lang);
    } catch {
      /* ничего */
    }
  }, [lang]);
  const value = useMemo(() => ({ ...build(lang), setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useContent = () => useContext(LangContext);
