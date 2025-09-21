import { Info, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import fmac from "../assets/fmac.png";
import se from "../assets/slider_enfermeria.jpg";
import sd from "../assets/slider_desarrollo.jpg";
import si from "../assets/slider_industrias.jpg";

const Login2 = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const images = [fmac, se, sd, si];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambio automático cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
       <div
      className={`${
        darkMode ? "dark" : ""
      } bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition duration-300`}
    >
      <div className="flex min-h-screen">
        {/* Slider (60%) */}
        <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
          {/* Imagen actual */}
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            ></div>
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h2 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg text-center px-6">
              Bienvenido a<span className="text-emerald-400"> YoMAC</span>
            </h2>
          </div>
        </div>

        {/* Login (40%) */}
        <div className="flex flex-col justify-center items-center w-full lg:w-2/5 p-6 relative bg-white dark:bg-gray-900 shadow-lg lg:shadow-none">
          {/* Toggle Theme */}
          <div className="absolute top-6 right-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full shadow-md bg-gray-200 dark:bg-gray-700 hover:scale-110 transition transform"
            >
              {darkMode ? (
                <Sun className="text-yellow-400" size={22} />
              ) : (
                <Moon className="text-emerald-500" size={22} />
              )}
            </button>
          </div>

          {/* Caja Login */}
          <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
              Iniciar sesión
            </h2>

            {/* Botón Google */}
            <button
              className="flex items-center justify-center gap-3 w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg 
              shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
            >
              <FcGoogle size={26} />
              <span className="text-gray-700 dark:text-white">
                Continuar con Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              <span className="px-3 text-emerald-500 text-sm font-semibold">o</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 rounded-lg border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/40 shadow-sm">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Solo podrán ingresar quienes tengan un correo institucional del{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  MAC
                </strong>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
