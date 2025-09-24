

function Comment({ user, text, time }) {

  return (
    <div className="flex gap-3 mb-3">
      {/* Avatar */}
      <img
        src={`https://ui-avatars.com/api/?name=${user}`}
        alt={user}
        className="w-8 h-8 rounded-full"
      />

      {/* Contenido */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-sm">{user}</h4>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{text}</p>

        {/* Acciones rápidas */}
        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
          <button className="hover:text-emerald-500">Me gusta</button>
          <button className="hover:text-emerald-500">Responder</button>
        </div>
      </div>
    </div>
  );
}

function CommentsSection({ comments, loading }) {
  if (loading) {
    return <p className="text-sm text-gray-500">Cargando comentarios...</p>;
  }

  return (
    <div className="mt-4">
      {/* Caja para escribir comentario */}
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
      </div>

      {/* Lista de comentarios  max-h-64*/}

      <div className="max-h-124 overflow-y-auto space-y-3">
        {comments?.slice(0, 5).map((c) => (
          <Comment key={c.id} user={c.name} text={c.body} />
        ))}
        {comments.map((c) => (
          <Comment key={c.id} user={c.name} text={c.body} />
        ))}
       
      </div>
    </div>
  );
}

export default CommentsSection;
