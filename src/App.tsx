const services = [
  { number: "01", title: "Лендинг", price: "от €200", time: "≈ 1 неделя", text: "Одна точная страница для продукта, услуги или запуска. Структура, дизайн, адаптив и аккуратная сборка." },
  { number: "02", title: "Многостраничный сайт", price: "от €200 / стр.", time: "от 2 недель", text: "Продуманная система страниц для компании: единый стиль, понятная навигация и пространство для роста." },
  { number: "03", title: "Особый проект", price: "по оценке", time: "после брифа", text: "Интерактивные промо, каталоги и нестандартные идеи. Разберу задачу и предложу честный объём работ." },
];

const projects = [
  { tag: "E-commerce", title: "NØR Studio", detail: "Каталог мебели", tone: "lime" },
  { tag: "Hospitality", title: "Maison 17", detail: "Бутик-отель", tone: "violet" },
  { tag: "SaaS", title: "Metric / One", detail: "Аналитическая платформа", tone: "cyan" },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Главная навигация">
        <a className="logo" href="#top" aria-label="На главную">A<span>/</span>DEV</a>
        <div className="navLinks"><a href="#work">Работы</a><a href="#services">Услуги</a><a href="#process">Процесс</a></div>
        <a className="navCta" href="#contact">Обсудить проект <span>↗</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="heroCopy">
          <div className="eyebrow"><i /> Доступен для новых проектов</div>
          <h1>Разрабатываю сайты,<br />которые <em>работают.</em></h1>
          <p className="lead">Дизайн и разработка современных сайтов для бизнеса и людей с идеями. Чисто, быстро, без лишнего шума.</p>
          <div className="heroActions"><a className="button primary" href="#work">Смотреть работы <span>↓</span></a><a className="textLink" href="#services">Стоимость и сроки <span>↗</span></a></div>
          <div className="heroMeta"><span>DESIGN</span><span>DEVELOPMENT</span><span>LAUNCH</span></div>
        </div>

        <div className="codeScene" aria-hidden="true">
          <div className="orbit orbitOne" /><div className="orbit orbitTwo" />
          <div className="codeCard">
            <div className="codeTop"><span className="dots"><i/><i/><i/></span><span>project.tsx</span><span>⌁</span></div>
            <pre><code><span className="muted">01</span>  <span className="pink">const</span> <span className="blue">project</span> = {'{'}{`\n`}<span className="muted">02</span>    idea: <span className="green">&quot;your vision&quot;</span>,{`\n`}<span className="muted">03</span>    design: <span className="green">&quot;distinctive&quot;</span>,{`\n`}<span className="muted">04</span>    code: <span className="green">&quot;clean&quot;</span>,{`\n`}<span className="muted">05</span>    result: <span className="green">&quot;impact&quot;</span>{`\n`}<span className="muted">06</span>  {'}'};{`\n`}{`\n`}<span className="muted">08</span>  <span className="pink">export default</span> <span className="blue">launch</span>(project);<span className="cursor">▋</span></code></pre>
            <div className="codeStatus"><span>● READY TO BUILD</span><span>UTF-8&nbsp;&nbsp; TSX</span></div>
          </div>
          <div className="floatLabel labelA">&lt; clean_code /&gt;</div>
          <div className="floatLabel labelB">98<span>%</span><small>performance</small></div>
        </div>
      </section>

      <section className="work section shell" id="work">
        <div className="sectionHead"><div><span className="index">01 / РАБОТЫ</span><h2>Избранные проекты</h2></div><p>Каждый проект — отдельная система со своей логикой, ритмом и характером.</p></div>
        <div className="projectGrid">
          {projects.map((project, i) => <article className={`project project${i + 1}`} key={project.title}>
            <div className={`projectVisual ${project.tone}`}><span className="projectMark">{i === 0 ? "NØR" : i === 1 ? "M17" : "M/1"}</span><div className="miniUi"><span/><span/><span/></div></div>
            <div className="projectInfo"><div><span>{project.tag}</span><h3>{project.title}</h3><p>{project.detail}</p></div><b>↗</b></div>
          </article>)}
        </div>
      </section>

      <section className="services section" id="services"><div className="shell">
        <div className="sectionHead"><div><span className="index">02 / УСЛУГИ</span><h2>Просто о стоимости</h2></div><p>Фиксируем объём до старта. Вы всегда понимаете, за что платите и когда получите результат.</p></div>
        <div className="serviceList">{services.map((service) => <article className="service" key={service.title}>
          <span className="serviceNo">{service.number}</span><div className="serviceMain"><h3>{service.title}</h3><p>{service.text}</p></div><div className="servicePrice"><strong>{service.price}</strong><span>{service.time}</span></div><span className="arrow">↗</span>
        </article>)}</div>
        <p className="fineprint">* Финальная стоимость зависит от задачи, контента и сложности. После короткого брифа вы получите точную оценку.</p>
      </div></section>

      <section className="process section shell" id="process">
        <div className="sectionHead"><div><span className="index">03 / ПРОЦЕСС</span><h2>От идеи до запуска</h2></div><p>Без бесконечных созвонов и сюрпризов. Четыре прозрачных этапа.</p></div>
        <div className="steps">{[['01','Бриф','Понимаю задачу, аудиторию и цель.'],['02','Прототип','Собираю структуру и сценарий.'],['03','Дизайн + код','Создаю визуал и оживляю его.'],['04','Запуск','Проверяю, публикую и передаю.']].map(([n,t,d]) => <div className="step" key={n}><span>{n}</span><i/><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>

      <section className="contact shell" id="contact">
        <span className="index">04 / КОНТАКТ</span><h2>Есть идея?<br/><em>Давайте сделаем.</em></h2><p>Расскажите в двух словах о проекте — отвечу, задам нужные вопросы и предложу следующий шаг.</p>
        <a className="button primary big" href="mailto:hello@site.dev">Написать мне <span>↗</span></a><div className="contactCode">&lt; available_for_work = <b>true</b> /&gt;</div>
      </section>

      <footer className="shell"><a className="logo" href="#top">A<span>/</span>DEV</a><p>Дизайн и разработка сайтов · 2026</p><a href="#top">Наверх ↑</a></footer>
    </main>
  );
}
