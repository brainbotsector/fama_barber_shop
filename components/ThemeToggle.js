import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark"); // default to 'dark'

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"; 
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button className={styles.toggle} onClick={toggleTheme}>
      <span className={styles.icon}>{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  );
};

export default ThemeToggle;
