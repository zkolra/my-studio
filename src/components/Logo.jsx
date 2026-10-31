import { brand } from "../content";

/* DEV/22 — косая черта рисуется тонкой лаймовой линией */
function Logo({ className = "" }) {
  return (
    <span className={`logo ${className}`} aria-label={`${brand.name}/${brand.number}`}>
      {brand.name}
      <i />
      {brand.number}
    </span>
  );
}

export default Logo;
