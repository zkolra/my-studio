/* =====================================================================
   DEV/22 — CONTENT (три языка: ru / en / es)
   ---------------------------------------------------------------------
   shared — то, что одинаково на всех языках (контакты, ссылки, цвета).
   ru / en / es — все тексты сайта. Меняйте фразу во всех трёх языках.
   Цвета и шрифты — в начале src/styles/global.css.

   РАБОТЫ: превью — src/assets/<slug>.jpg; по клику сайт по ссылке url
   открывается прямо на странице.
   ===================================================================== */

export const languages = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];
export const defaultLang = "en"; // если язык браузера не ru/en/es

/* ---------- Общее для всех языков ---------- */

export const shared = {
  brand: {
    name: "DEV",
    number: "22",
    domain: "dev22.es",
    email: "hello@dev22.es",
    timezone: "Europe/Madrid", // для живых часов в шапке
    socials: [
      { label: "Instagram @dev22.es", url: "https://instagram.com/dev22.es" },
      { label: "Telegram @zkolra_bcn", url: "https://t.me/zkolra_bcn" },
    ],
  },
  stack: ["React", "Vite", "GSAP", "Three.js", "WebGL", "Canvas", "Lenis", "Figma", "Vercel", "Motion design", "Responsive", "SEO"],
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
  // работы: slug — имя кадра в src/assets, url — живой сайт
  work: [
    { slug: "miga", name: "MIGA", year: "2026", color: "#d0502a", url: "https://miga-ruddy-eta.vercel.app/" },
    { slug: "nova-fintech-template", name: "NOVA", year: "2026", color: "#a855f7", url: "https://nova-fintech-template.vercel.app/" },
    { slug: "ava-noir", name: "AVA NOIR", year: "2026", color: "#d40019", url: "https://ava-noir.vercel.app/" },
    { slug: "nor-studio", name: "NØR", year: "2026", color: "#b5542c", url: "https://nor-studio.vercel.app/" },
    { slug: "mateo-vega", name: "MATEO VEGA", year: "2026", color: "#b3162c", url: "https://mateo-vega.vercel.app/" },
  ],
  processHashes: ["a1f2c3d", "b7e9f01", "c4d8a22", "d22e0ff"],
};

/* ---------- Русский ---------- */

const ru = {
  city: "Испания",
  nav: ["Работы", "Услуги", "Процесс", "Контакт"],
  cta: "Обсудить проект",
  hero: {
    status: "Доступна для новых проектов",
    title: ["Разрабатываю сайты,", "которые"],
    accent: "работают.",
    lead: "Дизайн и разработка современных сайтов для бизнеса и людей с идеями. Чисто, быстро, с характером и анимацией, которую запоминают.",
    buttons: ["Смотреть работы", "Стоимость и сроки"],
    stats: [
      { value: 98, label: "Lighthouse" },
      { value: 5, label: "шаблонов готово" },
      { value: 7, label: "дней — лендинг" },
    ],
  },
  work: {
    label: "Работы",
    title: ["Избранные", "проекты"],
    text: "Каждый проект — отдельная система со своей логикой, ритмом и характером. Нажмите на карточку — живой сайт откроется прямо здесь, листайте и нажимайте.",
    open: "▶ Открыть сайт здесь",
    watch: "▶ Смотреть сайт",
    newTab: "В новой вкладке ↗",
    cursor: "▶ Открыть",
    items: [
      { tag: "Пекарня / Кафе", text: "Тёплый сайт пекарни: хрустящая типографика, горизонтальный процесс выпечки и карусель витрины." },
      { tag: "Финтех / SaaS", text: "Неоновый финтех: живой график, частицы-нейросеть, вращающаяся рамка тарифа и блок, который раскрывается на весь экран." },
      { tag: "Стилист / Мода", text: "3D-штора из стеклянных трубочек на входе, горизонтальная галерея и портфолио услуг, которое пролетает при прокрутке." },
      { tag: "Архитектура", text: "Облёт домов при прокрутке, каркас дома, который чертится сам, и фото «день / ночь» под курсором." },
      { tag: "Танцор / Артист", text: "Ритм во всём: счёт «5-6-7-8», танцующие буквы, сцена и светлый кэмп с днём, который сменяется видео." },
    ],
  },
  player: {
    connecting: "connecting to",
    loading: "loading",
    full: "⤢ На весь экран",
    small: "⤡ Свернуть",
    close: "Закрыть",
    hint: "Это живой сайт — листайте и нажимайте. Esc — закрыть.",
  },
  services: {
    label: "Услуги",
    title: ["Стоимость", "и сроки"],
    badge: "5 шаблонов на выбор",
    items: [
      { title: "Сайт по шаблону", price: "€150", time: "быстрый старт", text: "Выберите один из 5 шаблонов выше. Я заменю фото и тексты на ваши — сайт будет выглядеть так же, со всеми анимациями, только с вашим контентом.", list: ["Ваши фото и тексты", "Все анимации шаблона", "Адаптив для телефонов", "Публикация на вашем домене"] },
      { title: "Лендинг на заказ", price: "€300", time: "по договорённости", text: "Индивидуальный одностраничный сайт с нуля: свой дизайн, свои эффекты, под вашу задачу и ваш стиль.", list: ["Уникальный дизайн", "Анимации и эффекты", "Адаптив и базовое SEO", "Публикация на вашем домене"] },
      { title: "Многостраничный сайт", price: "€300 + от €150", time: "по договорённости", text: "Первая страница — €300, каждая следующая — от €150 в зависимости от сложности. Единый стиль и понятная навигация.", list: ["Первая страница €300", "Следующие от €150 / стр.", "Единая система дизайна", "Место для роста"] },
    ],
    note: "Сайт на заказ начинается с обсуждения: созваниваться не обязательно — напишите в Instagram или Telegram, расскажите, что хотите, и обсудим детали.",
  },
  process: {
    label: "Процесс",
    title: ["Как мы", "работаем"],
    steps: [
      { title: "Бриф", text: "Связываемся как вам удобно — сообщением или созвоном. Обсуждаем задачу и примеры, которые нравятся.", time: "день 1" },
      { title: "Дизайн", text: "Собираю стиль, структуру и первый экран. Правим, пока не скажете «вау».", time: "дни 2–3" },
      { title: "Разработка", text: "Вёрстка, анимации, адаптив. Вы видите живую ссылку и следите за процессом.", time: "дни 4–6" },
      { title: "Запуск", text: "Проверяю скорость и мобильные, подключаю домен и публикую сайт.", time: "день 7" },
    ],
  },
  contact: {
    label: "Контакт",
    title: ["Давайте", "запустим", "ваш проект"],
    text: "Расскажите об идее — отвечу в течение дня.",
    copy: "Нажмите, чтобы скопировать",
    copied: "Скопировано ✓",
    terminal: {
      hint: "Попробуйте: help",
      commands: {
        help: "Команды: about · services · contact · hire · clear",
        about: "DEV/22 — дизайн и разработка сайтов с характером. Испания, работаю по всему миру.",
        services: "Сайт по шаблону €150 · Лендинг на заказ €300 · Многостраничный €300 + от €150/стр.",
        contact: "Instagram @dev22.es · Telegram @zkolra_bcn",
        hire: "Отлично! Пишите в Telegram @zkolra_bcn или Instagram @dev22.es — начнём на этой неделе 🚀",
      },
      unknown: "Команда не найдена. Наберите help",
    },
  },
};

/* ---------- English ---------- */

const en = {
  city: "Spain",
  nav: ["Work", "Services", "Process", "Contact"],
  cta: "Start a project",
  hero: {
    status: "Available for new projects",
    title: ["I build websites", "that"],
    accent: "work.",
    lead: "Design and development of modern websites for businesses and people with ideas. Clean, fast, full of character — with motion people remember.",
    buttons: ["See the work", "Pricing & timing"],
    stats: [
      { value: 98, label: "Lighthouse" },
      { value: 5, label: "templates ready" },
      { value: 7, label: "days — landing page" },
    ],
  },
  work: {
    label: "Work",
    title: ["Selected", "projects"],
    text: "Every project is its own system with its own logic, rhythm and character. Click a card — the live site opens right here. Scroll it, click around.",
    open: "▶ Open the site here",
    watch: "▶ View site",
    newTab: "New tab ↗",
    cursor: "▶ Open",
    items: [
      { tag: "Bakery / Café", text: "A warm bakery site: crisp typography, a horizontal baking timeline and a showcase carousel." },
      { tag: "Fintech / SaaS", text: "Neon fintech: a live chart, a particle network, a spinning pricing border and a block that opens to full screen." },
      { tag: "Stylist / Fashion", text: "A 3D curtain of glass tubes at the entrance, a horizontal gallery and service portfolios that fly by as you scroll." },
      { tag: "Architecture", text: "House orbits on scroll, a wireframe house that draws itself and a day / night photo under the cursor." },
      { tag: "Dancer / Artist", text: "Rhythm everywhere: a 5-6-7-8 count, dancing letters, the stage — and a bright camp with a day told in video." },
    ],
  },
  player: {
    connecting: "connecting to",
    loading: "loading",
    full: "⤢ Full screen",
    small: "⤡ Exit full screen",
    close: "Close",
    hint: "This is the live site — scroll and click. Esc to close.",
  },
  services: {
    label: "Services",
    title: ["Pricing", "& timing"],
    badge: "5 templates to choose from",
    items: [
      { title: "Template website", price: "€150", time: "quick start", text: "Pick one of the 5 templates above. I replace the photos and texts with yours — the site looks just the same, with every animation, only with your content.", list: ["Your photos and texts", "All template animations", "Mobile-friendly", "Published on your domain"] },
      { title: "Custom landing page", price: "€300", time: "to be agreed", text: "A one-page website built from scratch: your own design and effects, made for your goal and your style.", list: ["Unique design", "Animations and effects", "Responsive + basic SEO", "Published on your domain"] },
      { title: "Multi-page website", price: "€300 + from €150", time: "to be agreed", text: "The first page is €300, each next page from €150 depending on complexity. One consistent style and clear navigation.", list: ["First page €300", "Next pages from €150", "One design system", "Room to grow"] },
    ],
    note: "A custom site starts with a conversation — no call needed. Message me on Instagram or Telegram, tell me what you want, and we'll work out the details.",
  },
  process: {
    label: "Process",
    title: ["How we", "work"],
    steps: [
      { title: "Brief", text: "We talk however suits you — messages or a call. We go through the goal and examples you like.", time: "day 1" },
      { title: "Design", text: "I build the style, structure and first screen. We refine it until you say “wow”.", time: "days 2–3" },
      { title: "Development", text: "Layout, animations, mobile. You get a live link and watch it come together.", time: "days 4–6" },
      { title: "Launch", text: "I check speed and mobile, connect your domain and publish the site.", time: "day 7" },
    ],
  },
  contact: {
    label: "Contact",
    title: ["Let's", "launch", "your project"],
    text: "Tell me about your idea — I reply within a day.",
    copy: "Click to copy",
    copied: "Copied ✓",
    terminal: {
      hint: "Try: help",
      commands: {
        help: "Commands: about · services · contact · hire · clear",
        about: "DEV/22 — design and development of websites with character. Based in Spain, working worldwide.",
        services: "Template site €150 · Custom landing €300 · Multi-page €300 + from €150/page",
        contact: "Instagram @dev22.es · Telegram @zkolra_bcn",
        hire: "Great! Message me on Telegram @zkolra_bcn or Instagram @dev22.es — we can start this week 🚀",
      },
      unknown: "Command not found. Type help",
    },
  },
};

/* ---------- Español ---------- */

const es = {
  city: "España",
  nav: ["Proyectos", "Servicios", "Proceso", "Contacto"],
  cta: "Hablemos",
  hero: {
    status: "Disponible para nuevos proyectos",
    title: ["Creo webs", "que"],
    accent: "funcionan.",
    lead: "Diseño y desarrollo de webs modernas para negocios y personas con ideas. Limpias, rápidas, con carácter y animaciones que se recuerdan.",
    buttons: ["Ver proyectos", "Precios y plazos"],
    stats: [
      { value: 98, label: "Lighthouse" },
      { value: 5, label: "plantillas listas" },
      { value: 7, label: "días — landing" },
    ],
  },
  work: {
    label: "Proyectos",
    title: ["Proyectos", "destacados"],
    text: "Cada proyecto es un sistema propio, con su lógica, su ritmo y su carácter. Pulsa una tarjeta y la web real se abre aquí mismo: desplázate y haz clic.",
    open: "▶ Abrir la web aquí",
    watch: "▶ Ver la web",
    newTab: "Nueva pestaña ↗",
    cursor: "▶ Abrir",
    items: [
      { tag: "Panadería / Café", text: "Una web cálida para una panadería: tipografía crujiente, el proceso de horneado en horizontal y un carrusel de vitrina." },
      { tag: "Fintech / SaaS", text: "Fintech de neón: gráfico en vivo, red de partículas, borde giratorio en el precio y un bloque que se abre a pantalla completa." },
      { tag: "Estilista / Moda", text: "Una cortina 3D de tubos de cristal en la entrada, galería horizontal y portafolios de servicios que pasan al hacer scroll." },
      { tag: "Arquitectura", text: "Vuelos alrededor de las casas al hacer scroll, una maqueta que se dibuja sola y una foto día / noche bajo el cursor." },
      { tag: "Bailarín / Artista", text: "Ritmo en todo: la cuenta 5-6-7-8, letras que bailan, el escenario y un campamento luminoso con un día contado en vídeo." },
    ],
  },
  player: {
    connecting: "connecting to",
    loading: "loading",
    full: "⤢ Pantalla completa",
    small: "⤡ Salir",
    close: "Cerrar",
    hint: "Es la web real: desplázate y haz clic. Esc para cerrar.",
  },
  services: {
    label: "Servicios",
    title: ["Precios", "y plazos"],
    badge: "5 plantillas a elegir",
    items: [
      { title: "Web con plantilla", price: "€150", time: "inicio rápido", text: "Elige una de las 5 plantillas de arriba. Cambio las fotos y los textos por los tuyos: la web se ve igual, con todas las animaciones, pero con tu contenido.", list: ["Tus fotos y textos", "Todas las animaciones", "Adaptada al móvil", "Publicada en tu dominio"] },
      { title: "Landing a medida", price: "€300", time: "a convenir", text: "Una web de una página creada desde cero: diseño y efectos propios, pensados para tu objetivo y tu estilo.", list: ["Diseño único", "Animaciones y efectos", "Responsive + SEO básico", "Publicada en tu dominio"] },
      { title: "Web multipágina", price: "€300 + desde €150", time: "a convenir", text: "La primera página cuesta €300 y cada página extra desde €150, según la complejidad. Un estilo coherente y navegación clara.", list: ["Primera página €300", "Siguientes desde €150", "Un sistema de diseño", "Espacio para crecer"] },
    ],
    note: "Una web a medida empieza con una conversación, sin necesidad de llamada: escríbeme por Instagram o Telegram, cuéntame qué quieres y vemos los detalles.",
  },
  process: {
    label: "Proceso",
    title: ["Cómo", "trabajamos"],
    steps: [
      { title: "Briefing", text: "Hablamos como te venga mejor, por mensajes o llamada. Vemos el objetivo y ejemplos que te gustan.", time: "día 1" },
      { title: "Diseño", text: "Defino el estilo, la estructura y la primera pantalla. Ajustamos hasta que digas «wow».", time: "días 2–3" },
      { title: "Desarrollo", text: "Maquetación, animaciones, móvil. Tienes un enlace en vivo para seguir el avance.", time: "días 4–6" },
      { title: "Lanzamiento", text: "Reviso la velocidad y el móvil, conecto tu dominio y publico la web.", time: "día 7" },
    ],
  },
  contact: {
    label: "Contacto",
    title: ["Lancemos", "tu", "proyecto"],
    text: "Cuéntame tu idea: respondo en menos de un día.",
    copy: "Haz clic para copiar",
    copied: "Copiado ✓",
    terminal: {
      hint: "Prueba: help",
      commands: {
        help: "Comandos: about · services · contact · hire · clear",
        about: "DEV/22: diseño y desarrollo de webs con carácter. Desde España, para todo el mundo.",
        services: "Web con plantilla €150 · Landing a medida €300 · Multipágina €300 + desde €150/pág.",
        contact: "Instagram @dev22.es · Telegram @zkolra_bcn",
        hire: "¡Genial! Escríbeme por Telegram @zkolra_bcn o Instagram @dev22.es y empezamos esta semana 🚀",
      },
      unknown: "Comando no encontrado. Escribe help",
    },
  },
};

export const texts = { ru, en, es };
