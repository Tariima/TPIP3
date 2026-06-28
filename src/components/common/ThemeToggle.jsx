// boton para cambiar entre modo claro y oscuro
import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

const THEME_KEY = "tpip3-theme";

function ThemeToggle() {
  // arranco con el tema guardado en localStorage, sino queda claro por defecto
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "light");

  // aplico el tema al html y lo guardo para que quede al recargar
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}>
      {theme === "dark" ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}

export default ThemeToggle;
