import { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import Middlebar from "./Middlebar";
import { Link } from "react-router-dom";
import EditProfilePage from "./EditProfilePage";

function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [openDropdown, setOpenDropdown] = useState(false);

  // Estados de los modales
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const dropdownRef = useRef(null);

  // Cierra dropdown si haces clic afuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Portada */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413"
          alt="cover"
          className="w-full h-48 object-cover rounded-xl"
        />
        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-16 px-2">
        <div className="flex justify-between items-center relative">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Joseph Stepham
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">@joseph</p>
          </div>

          {/* Botón Settings con dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="px-3 py-2 rounded-lg shadow bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Settings size={18} />
            </button>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setOpenDropdown(false);
                    setOpenEdit(true);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  
                    ✏️ Editar perfil
                  
                </button>
                <button
                  onClick={() => {
                    setOpenDropdown(false);
                    setOpenPassword(true);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  🔒 Cambiar contraseña
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Desarrollador de sistemas 💻 | Amante del café ☕
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            <strong className="text-gray-900 dark:text-white">120</strong> posts
          </span>
          <span>
            <strong className="text-gray-900 dark:text-white">350</strong>{" "}
            seguidores
          </span>
          <span>
            <strong className="text-gray-900 dark:text-white">180</strong>{" "}
            siguiendo
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-gray-200 dark:border-gray-700 flex">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 py-3 text-sm font-medium text-center transition ${
            activeTab === "posts"
              ? "border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          Mis Posts
        </button>
        <button
          onClick={() => setActiveTab("likes")}
          className={`flex-1 py-3 text-sm font-medium text-center transition ${
            activeTab === "likes"
              ? "border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          Likes
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="mt-6">
        {activeTab === "posts" ? (
          <Middlebar filter="myPosts" />
        ) : (
          <Middlebar filter="liked" />
        )}
      </div>

      {/* Modal Editar perfil */}
      {openEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setOpenEdit(false)} // cerrar clic en fondo
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-96 shadow-lg relative">
            <button
              onClick={() => setOpenEdit(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Editar perfil
            </h2>

            {/* Portada */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Portada
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700 dark:text-gray-300
            file:mr-3 file:py-1 file:px-3 file:rounded-lg
            file:border-0 file:bg-emerald-600 file:text-white
            hover:file:bg-emerald-700 cursor-pointer"
              />
            </div>

            {/* Avatar */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Foto de perfil
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700 dark:text-gray-300
            file:mr-3 file:py-1 file:px-3 file:rounded-lg
            file:border-0 file:bg-emerald-600 file:text-white
            hover:file:bg-emerald-700 cursor-pointer"
              />
            </div>

            {/* Nombre */}
            <input
              type="text"
              placeholder="Nombre"
              className="w-full mb-3 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />

            {/* Bio */}
            <textarea
              placeholder="Biografía"
              className="w-full mb-3 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />

            {/* Botón Guardar */}
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg">
              Guardar cambios
            </button>
          </div>
        </div>
      )}

      {/* Modal Cambiar contraseña */}
      {openPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-96 shadow-lg relative">
            <button
              onClick={() => setOpenPassword(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Cambiar contraseña
            </h2>
            <input
              type="password"
              placeholder="Contraseña actual"
              className="w-full mb-3 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              className="w-full mb-3 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg">
              Actualizar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
