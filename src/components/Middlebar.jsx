import { Image, Video, Smile, Send } from "lucide-react";
import { useEffect, useState } from "react";
import CommentsOffcanvas from "./CommentsOffcanvas";

// Generador de posts falsos
const generatePost = (id) => ({
  id,
  name: `Usuario ${id}`,
  username: `@user${id}`,
  time: `${Math.floor(Math.random() * 12)}h`,
  text: "Este es un post de prueba generado automáticamente 😎",
  image: `https://cursin.net/wp-content/uploads/2023/09/curso-gratis-de-javascript.jpg?sig=${id}`,
  likes: Math.floor(Math.random() * 100),
  comments: null,
  shares: Math.floor(Math.random() * 10),
});

function Middlebar() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [posts, setPosts] = useState(() =>
    Array.from({ length: 5 }, (_, i) => generatePost(i + 1))
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Detecta scroll al final
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !loading
      ) {
        setLoading(true);
        setTimeout(() => {
          const newPosts = Array.from({ length: 5 }, (_, i) =>
            generatePost(posts.length + i + 1)
          );
          setPosts((prev) => [...prev, ...newPosts]);
          setPage((p) => p + 1);
          setLoading(false);
        }, 1000); // simula delay
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, posts]);

  return (
    <>
      {/* Crear Post */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
        <div className="flex gap-3">
          {/* Avatar */}
          <img
            src="https://ui-avatars.com/api/?name=User"
            alt="perfil"
            className="w-12 h-12 rounded-full"
          />
          {/* Caja de texto */}
          <textarea
            placeholder="¿Qué estás pensando?"
            className="flex-1 resize-none bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-200"
            rows="3"
          ></textarea>
        </div>

        {/* Acciones de creación */}
        <div className="flex justify-between items-center mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex gap-4 text-gray-500 dark:text-gray-400">
            <button className="hover:text-emerald-500 transition">
              <Image size={20} />
            </button>
            <button className="hover:text-emerald-500 transition">
              <Video size={20} />
            </button>
            <button className="hover:text-emerald-500 transition">
              <Smile size={20} />
            </button>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            Publicar
          </button>
        </div>
      </div>

      {/* Feed de posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6"
        >
          <div className="flex gap-3">
            {/* Columna izquierda (avatar) */}
            <img
              src={`https://ui-avatars.com/api/?name=${post.name}`}
              alt="perfil"
              className="w-12 h-12 rounded-full"
            />

            {/* Columna derecha (contenido) */}
            <div className="flex-1">
              {/* Encabezado */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{post.name}</h3>
                  <span className="text-xs text-gray-500">
                    {post.username} · {post.time}
                  </span>
                </div>
              </div>

              {/* Texto */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                {post.text}
              </p>

              {/* Imagen del post */}
              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="rounded-lg mt-3 cursor-pointer hover:opacity-90 transition"
                  onClick={() => setSelectedImage(post.image)}
                />
              )}

              {/* Modal de imagen */}
              {selectedImage && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex items-center justify-center z-50">
                  <div className="relative max-w-3xl w-full mx-4">
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-gray-300"
                    >
                      ✕
                    </button>
                    <img
                      src={selectedImage}
                      alt="zoom"
                      className="rounded-lg max-h-[80vh] w-full object-contain"
                    />
                  </div>
                </div>
              )}

              <CommentsOffcanvas />

              <div className="mt-4">
                {/* Caja para nuevo comentario */}
                <div className="flex gap-3 mb-4">
                  <img
                    src="https://ui-avatars.com/api/?name=Yo"
                    alt="Yo"
                    className="w-8 h-8 rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Escribe un comentario..."
                    className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700">
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Loader */}
      {loading && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          Cargando más posts...
        </div>
      )}
    </>
  );
}

export default Middlebar;
