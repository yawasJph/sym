import { useEffect, useRef, useState } from "react";
import { X, Heart, MoreVertical, MessageCircle } from "lucide-react";

const Comment = ({ user, text, time }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10)); // ejemplo
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  // Detectar clic fuera para cerrar menú
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex gap-3 items-start relative">
      {/* Avatar */}
      <img
        src={`https://i.pravatar.cc/40?u=${user}`}
        alt={user}
        className="w-8 h-8 rounded-full"
      />

      {/* Contenido */}
      <div className="flex-1">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl shadow-sm relative">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            {user}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-around items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
          {/* Tiempo */}
          <span className="text-gray-400">hace 2h</span>

          {/* Like */}
          <button
            onClick={toggleLike}
            className="flex items-center gap-1 hover:text-emerald-600 transition"
          >
            <Heart
              size={16}
              className={`${
                liked ? "fill-emerald-600 text-emerald-600 scale-110" : ""
              } transition-transform`}
            />
            {likes}
          </button>

          {/* Botón menú siempre visible */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <MoreVertical size={14} />
            </button>

            {/* Menú animado */}
            <div
              className={`absolute right-0 bottom-full mb-1 w-36 bg-white dark:bg-gray-800 border dark:border-gray-700 
  rounded-md shadow-lg text-sm transform transition-all duration-200 origin-bottom-right z-50
  ${
    openMenu
      ? "scale-100 opacity-100"
      : "scale-95 opacity-0 pointer-events-none"
  }`}
            >
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Reportar
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Copiar texto
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CommentsOffcanvas() {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.slice(0, 20))); // solo 20
  }, []);

  return (
    <div className="flex justify-around text-gray-500 dark:text-gray-400 text-sm mt-3">
      {/* Botón para abrir panel */}
      {/* <button
        onClick={() => setOpen(true)}
        className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
      >
        Ver comentarios ({comments.length})
      </button> */}

      {/* Acciones */}
      
        <button className="flex items-center gap-1 hover:text-emerald-500 transition">
          <Heart size={16} /> {comments.length}
        </button>
        <button
          className="flex items-center gap-1 hover:text-emerald-500 transition"
          onClick={() => setOpen(true)}
        >
          <MessageCircle size={16} /> {comments.length || 0}
        </button>
      

      {/* Overlay oscuro */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Panel lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Comentarios
          </h3>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Lista de comentarios */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-3rem)] pb-20">
          {comments.map((c) => (
            <Comment key={c.id} user={c.name} text={c.body} />
          ))}
        </div>
      </div>
    </div>
  );
}
