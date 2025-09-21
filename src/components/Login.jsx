import { useState } from "react";
import fmac from "../assets/fmac.png";

const Login = () => {
  const [showNotification, setShowNotification] = useState(true);

  const handleGoogleLogin = () => {
    // Aquí iría la lógica real de autenticación con Google
    alert("Redirigiendo a autenticación con Google...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex justify-center items-center px-4">
      <div className="max-w-screen-2xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[80vh]">
        {/* Sección de imagen izquierda */}
        <div
          className="flex-1 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url('${fmac}')` }}
        ></div>

        {/* Sección de login */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full space-y-8 p-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Iniciar Sesión
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Accede con tu cuenta institucional
              </p>
            </div>

            {/* Notificación */}
            {showNotification && (
              <div className="bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 p-4 text-sm rounded-md shadow-sm mb-4 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Acceso restringido</p>
                    <p>Solo personal con correo institucional del MAC</p>
                  </div>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="ml-4 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Botón Google */}
            <button
              onClick={handleGoogleLogin}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 transition-all shadow-md"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-red-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48..."></path>
                </svg>
              </span>
              Iniciar sesión con Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
