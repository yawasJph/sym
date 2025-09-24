import { useState } from "react";

export default function EditProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // Mostrar preview de portada
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
    }
  };

  // Mostrar preview de avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow"
      >
        Editar Perfil
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-96 shadow-lg relative">
            {/* Botón cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Editar perfil
            </h2>

            {/* Vista previa Portada */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Portada
              </label>
              {cover && (
                <img
                  src={cover}
                  alt="cover preview"
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="block w-full text-sm text-gray-700 dark:text-gray-300
                  file:mr-3 file:py-1 file:px-3 file:rounded-lg
                  file:border-0 file:bg-emerald-600 file:text-white
                  hover:file:bg-emerald-700 cursor-pointer"
              />
            </div>

            {/* Vista previa Avatar */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Foto de perfil
              </label>
              {avatar && (
                <img
                  src={avatar}
                  alt="avatar preview"
                  className="w-20 h-20 object-cover rounded-full border mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
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
              className="w-full mb-3 px-3 py-2 rounded-lg border dark:border-gray-700 
              bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />

            {/* Bio */}
            <textarea
              placeholder="Biografía"
              className="w-full mb-3 px-3 py-2 rounded-lg border dark:border-gray-700 
              bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />

            {/* Botón Guardar */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
