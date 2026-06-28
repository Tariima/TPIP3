import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

const THEME_KEY = "tpip3-theme";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "light");

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
