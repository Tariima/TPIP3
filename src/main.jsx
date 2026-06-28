// punto de entrada de la app, monta react en el div root del html
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./services/auth/AuthContextProvider";
import { MesaContextProvider } from "./services/mesa/MesaContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* envuelvo todo en los providers asi el contexto de sesion y de mesa llega a cualquier componente */}
    <AuthContextProvider>
      <MesaContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MesaContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
