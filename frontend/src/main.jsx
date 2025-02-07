import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./main.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// @ts-ignore
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
