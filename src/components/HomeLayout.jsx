// HomeLayout.jsx
import { useState } from "react";
import { Search, Moon, Sun, Home, Users, Bell, MessageCircle, UserPen, LockKeyhole } from "lucide-react";
import { Outlet, Link } from "react-router-dom";

export default function HomeLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition duration-300">
        {/* 🔹 Navbar */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 shadow z-50 flex items-center justify-between px-4">
          <h1 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            YoMAC
          </h1>

          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg w-1/3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full shadow bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            >
              {darkMode ? (
                <Sun className="text-yellow-400" size={18} />
              ) : (
                <Moon className="text-emerald-500" size={18} />
              )}
            </button>
            <img
              src="https://ui-avatars.com/api/?name=User"
              alt="perfil"
              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
            />
          </div>
        </header>

        {/* 🔹 Layout */}
        <div className="pt-14 flex">
          {/* Sidebar */}
          <aside className="hidden lg:flex lg:w-1/5 flex-col h-[calc(100vh-56px)] sticky top-14 p-6 bg-white dark:bg-gray-800 shadow">
            <nav className="flex flex-col gap-4">
              <Link to="/sym/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <Home size={20} /> Inicio
              </Link>
               <Link to="/sym/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">            
                <UserPen size={20} /> Perfil
              </Link>
              <Link to="/sym/users" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <Users size={20} /> Usuarios
              </Link>        
              <Link to="/sym/change-password" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <LockKeyhole size={20} /> Seguridad
              </Link>
            </nav>
          </aside>

          {/* Middlebar dinámico */}
          <main className="flex-1 lg:w-3/5 p-6 min-h-screen">
            <Outlet />
          </main>

          {/* Rightbar */}
          <aside className="hidden lg:flex lg:w-1/5 flex-col h-[calc(100vh-56px)] sticky top-14 p-6 bg-white dark:bg-gray-800 shadow">
            <h3 className="font-semibold mb-4">Personas sugeridas</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span>Ana López</span>
                <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                  Agregar
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Carlos Ruiz</span>
                <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                  Agregar
                </button>
              </div>
            </div>
          </aside>
        </div>

         {/* 🔹 Barra inferior fija (solo mobile) */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center z-50">
          <Link to="/sym/" className="p-2 text-emerald-600 dark:text-emerald-400">
            <Home size={22} />
          </Link>
          <Link to="/sym/profile" className="p-2 text-gray-600 dark:text-gray-300">
            <UserPen size={20} />
          </Link>
          <Link to="/sym/users" className="p-2 text-gray-600 dark:text-gray-300">
            <Users size={22} />
          </Link>
          <Link to="/sym/change-password" className="p-2 text-gray-600 dark:text-gray-300">
            <LockKeyhole size={20} />
          </Link>
        </nav>
      </div>
    </div>
  );
}
