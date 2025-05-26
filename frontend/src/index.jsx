import React from "react";
import ReactDOM from "react-dom/client";
import App from "../app";
import "../src/index.css";
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
