/* «Расшифровка» текста: буквы сначала случайные символы, потом встают на место. */
const CHARS = "ABCDEF0123456789<>/{}[]#$%&*+=";

export function scramble(el, text = el.dataset.text || el.textContent, { duration = 0.9 } = {}) {
  if (!el) return;
  el.dataset.text = text;
  const start = performance.now();
  const total = duration * 1000;
  cancelAnimationFrame(el._scr);
  const tick = (now) => {
    const p = Math.min(1, (now - start) / total);
    const fixed = Math.floor(p * text.length);
    let out = text.slice(0, fixed);
    for (let i = fixed; i < text.length; i++) out += text[i] === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
    el.textContent = out;
    if (p < 1) el._scr = requestAnimationFrame(tick);
  };
  el._scr = requestAnimationFrame(tick);
}
