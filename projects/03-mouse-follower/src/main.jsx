import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  //EL "React.StrictMode" es componente que se crea por defecto para advertirte de cosas,
  //(como po ejemplo, codigo antiguo, codigo incorrecto)
  //y cuando se monta el componente, ejecuta el efecto, el cleanup y otra vez el efecto.
  //Esto lo hace para asegurar que el componente y el efecto funciona correctamente
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
