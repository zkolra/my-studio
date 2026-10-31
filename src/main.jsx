import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LangProvider } from "./i18n";

/* Шрифты лежат внутри сайта — одинаковые везде */
import "@fontsource/anton"; // логотип DEV/22
import "@fontsource-variable/oswald"; // заголовки (есть кириллица)
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
