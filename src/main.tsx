import React from "react";
import ReactDOM from "react-dom/client";
import { inject } from "@vercel/analytics";

import "./i18n";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
inject();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
