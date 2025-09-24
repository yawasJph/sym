import { DialogPanel, DialogTitle, Dialog } from "@headlessui/react";
import { X } from "lucide-react";

function SettingsModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className={`relative z-50`} >
      {/* Fondo semi-transparente */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
      />

      {/* Contenido centrado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl transition">
          
            {/* Botón X */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 
                       text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 
                       transition shadow"
            >
              <X size={18} />
            </button>

            {/* Título */}
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Configuración
            </DialogTitle>

            {/* Contenido */}
            <div className="mt-4 space-y-6 text-sm">
              {/* Perfil */}
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Perfil
                </h3>
                <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Cambiar foto de perfil
                </button>
                <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Editar nombre y bio
                </button>
              </div>

              {/* Cuenta */}
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Cuenta
                </h3>
                <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Cambiar contraseña
                </button>
                <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Configuración de privacidad
                </button>
              </div>

              {/* Preferencias */}
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Preferencias
                </h3>
                <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Idioma
                </button>
                <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  Notificaciones
                </button>
              </div>

              {/* Cerrar sesión */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full text-left py-2 px-3 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                  Cerrar sesión
                </button>
              </div>
            </div>
          
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default SettingsModal;
