import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/bootstrap.min.css";
import "./assets/css/theme.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import App from "./App"; // 🔥 remove .jsx

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);