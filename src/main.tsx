import React from "react";
import ReactDOM from "react-dom/client";
import { inject } from "@vercel/analytics";

import "./i18n";
import App from "./App";
inject();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
