{
  /* Acciones */
}
{
  <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-3">
    <button className="flex items-center gap-1 hover:text-emerald-500 transition">
      <Heart size={16} /> {post.likes}
    </button>
    <button
      className="flex items-center gap-1 hover:text-emerald-500 transition"
      onClick={() => toggleComments(post.id)}
    >
      <MessageCircle size={16} /> {commentsData[post.id]?.length || 0}
    </button>
    <button className="flex items-center gap-1 hover:text-emerald-500 transition">
      <Repeat size={16} /> {post.shares}
    </button>
    <button className="flex items-center gap-1 hover:text-emerald-500 transition">
      <Share2 size={16} />
    </button>
  </div>;
}

{
  /* Sección de comentarios */
}
{
  openComments === post.id && (
    <CommentsSection
      comments={commentsData[post.id]}
      loading={loadingComments[post.id]}
    />
  );
}

// 🔥 Cargar comentarios cuando se abre un post
const toggleComments = async (postId) => {
  if (openComments === postId) {
    setOpenComments(null);
    return;
  }

  setOpenComments(postId);

  // Si no se han cargado antes → pedir a la API
  if (!commentsData[postId]) {
    setLoadingComments((prev) => ({ ...prev, [postId]: true }));

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const data = await res.json();

      setCommentsData((prev) => ({
        ...prev,
        [postId]: data,
      }));
    } catch (error) {
      console.error("Error cargando comentarios", error);
    } finally {
      setLoadingComments((prev) => ({ ...prev, [postId]: false }));
    }
  }
};

const [openComments, setOpenComments] = useState(null);
const [commentsData, setCommentsData] = useState({});
const [loadingComments, setLoadingComments] = useState({});

<div className="flex gap-2">
  <button
    onClick={() => setIsFollowing((prev) => !prev)}
    className={`px-4 py-2 rounded-lg shadow text-sm font-medium transition ${
      isFollowing
        ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        : "bg-emerald-600 text-white hover:bg-emerald-700"
    }`}
  >
    {isFollowing ? "Siguiendo" : "Seguir"}
  </button>
  <button className="px-3 py-2 rounded-lg shadow bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
    <Settings size={18} />
  </button>
</div>;

<button
  onClick={() => setIsFollowing((prev) => !prev)}
  className={`px-4 py-2 rounded-lg shadow text-sm font-medium transition ${
    isFollowing
      ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
      : "bg-emerald-600 text-white hover:bg-emerald-700"
  }`}
>
  {isFollowing ? "Siguiendo" : "Seguir"}
</button>;
