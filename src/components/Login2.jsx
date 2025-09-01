import { Info, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import fmac from '../assets/fmac.png'

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

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition duration-300">
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/*login image*/}
        <img className="hidden lg:block lg:w-1/2 bg-cover bg-center" src={fmac} alt="bg-mac" /> 
        {/* <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              `url('${fmac}')`,
          }}
        >
          <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <h2 className="text-4xl font-bold text-white">Bienvenido YoMAC</h2>
          </div>
        </div> */}

        {/*Login Form*/}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 relative">
          {/**Toggle button theme */}
          <div className="absolute top-6 right-6">
            <button
              onClick={toggleTheme}
              className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition flex items-center space-x-2 cursor-pointer"
            >
              {darkMode ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-emerald-600" size={20} />
              )}
            </button>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-12 relative">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Iniciar sesión
            </h2>

            {/* Botón Google */}
            <button
              className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg shadow-sm 
                   hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
            >
              <FcGoogle size={24} />
              <span className="text-gray-700 dark:text-white font-medium">
                Iniciar sesión con Google
              </span>
            </button>
            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-emerald-700 dark:border-emerald-500 " />
              <span className="px-2 text-emerald-500 dark:text-emerald-700 text-sm">
                o
              </span>
              <hr className="flex-grow border-emerald-700 dark:border-emerald-500" />
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-lg border border-blue-300 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/30">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Podrán entrar solo los que tengan correos institucionales del{" "}
                <strong>MAC</strong>.
              </span>
            </div>
          </div>
        </div>

             

      </div>
    </div>
  );
};

export default Login2;
