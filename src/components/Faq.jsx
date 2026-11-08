import { useContent } from "../i18n";
import "../styles/faq.css";

/* «После запуска»: три варианта поддержки и вопросы-ответы.
   Вопросы раскрываются по клику (<details> — работает и без скриптов).
   Тексты — раздел faq в src/data/ru|en|es.json (в админке: «Тексты и цены»). */
function Faq() {
  const { faq } = useContent();
  if (!faq) return null;

  return (
    <section className="faq" id="faq">
      <div className="faq__head">
        <span className="label">
          <b>04</b> // {faq.label}
        </span>
        <h2 className="faq__title display js-lines">
          {faq.title.map((t, i) => (
            <span className="split-line" key={t}>
              <span className={i ? "lime" : ""}>{t}</span>
            </span>
          ))}
        </h2>
        <p className="faq__lead js-fade">{faq.lead}</p>
      </div>

      <div className="faq__plans">
        {faq.plans.map((p, i) => (
          <article className="plan js-fade" key={p.title}>
            <span className="plan__num mono">0{i + 1}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <strong className="plan__price display">{p.price}</strong>
          </article>
        ))}
      </div>

      <div className="faq__list">
        {faq.items.map((it) => (
          <details className="qa js-fade" key={it.q}>
            <summary>
              <span>{it.q}</span>
              <i aria-hidden="true" />
            </summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default Faq;
