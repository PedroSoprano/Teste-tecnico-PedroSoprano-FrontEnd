import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PageProvider } from "./Providers/handlePage";
import { PolicyProvider } from "./Providers/policyProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PageProvider>
      <PolicyProvider>
        <App />
      </PolicyProvider>
    </PageProvider>
  </React.StrictMode>
);
