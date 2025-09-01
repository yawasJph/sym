import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center transition">
      {/* Logo */}
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        BottleCode
      </h1>

      {/* Menú */}
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-800 dark:text-gray-200 hover:underline">
          Inicio
        </a>
        <a href="#" className="text-gray-800 dark:text-gray-200 hover:underline">
          Productos
        </a>
        <a href="#" className="text-gray-800 dark:text-gray-200 hover:underline">
          Contacto
        </a>
      </nav>

      {/* Botón Toggle Dark/Light */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center space-x-2"
      >
        {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
        <span className="text-sm">{darkMode ? "Claro" : "Oscuro"}</span>
      </button>
    </header>
  );
}
