/* =====================================================================
   DEV/22 — CONTENT
   ---------------------------------------------------------------------
   Все тексты, цены, контакты и работы теперь лежат в папке src/data
   и редактируются через админку (Pages CMS, файл .pages.yml):

   src/data/site.json — контакты, бегущая строка технологий, работы
   src/data/ru.json   — тексты на русском
   src/data/en.json   — тексты на английском
   src/data/es.json   — тексты на испанском

   Картинки работ — public/images/work/ (в админке: «Медиа»).
   Здесь остаются только технические вещи, которые клиенту менять
   не нужно (код в редакторе на первом экране, заставка-терминал).
   ===================================================================== */

import site from "./data/site.json";
import ru from "./data/ru.json";
import en from "./data/en.json";
import es from "./data/es.json";

export const languages = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];
export const defaultLang = "en"; // если язык браузера не ru/en/es

const projects = site.projects || [];

/* ---------- Общее для всех языков ---------- */

export const shared = {
  brand: site.brand,
  stack: site.stack,
  preloader: ["npm create dev22@latest", "installing ideas", "compiling design", "optimizing performance"],
  preloaderReady: "ready in 22ms",
  // код, который «печатается» в редакторе на первом экране
  code: [
    ["const", " project = {"],
    ["  idea:", ' "your vision",'],
    ["  design:", ' "distinctive",'],
    ["  motion:", ' "wow",'],
    ["  code:", ' "clean",'],
    ["  result:", ' "impact"'],
    ["};", ""],
    ["", ""],
    ["export default", " launch(project);"],
  ],
  // работы: name, year, color, url, image (без текстов — они по языкам ниже)
  work: projects.map(({ tag, text, ...p }) => ({ ...p, url: p.url || "" })),
  processHashes: ["a1f2c3d", "b7e9f01", "c4d8a22", "d22e0ff"],
};

/* ---------- Тексты по языкам ---------- */

const withWork = (t, lang) => ({
  ...t,
  work: {
    ...t.work,
    items: projects.map((p) => ({ tag: p.tag?.[lang] || "", text: p.text?.[lang] || "" })),
  },
});

export const texts = { ru: withWork(ru, "ru"), en: withWork(en, "en"), es: withWork(es, "es") };
