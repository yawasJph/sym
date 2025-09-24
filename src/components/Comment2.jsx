import React, { useState } from "react";

// 🟢 Componente de un comentario con respuestas
function Comment({ comment, onReply }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText); // Notifica al padre
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className="mb-3 mt-4">
      <div className="flex gap-3">
        {/* Avatar */}
        <img
          src={`https://ui-avatars.com/api/?name=${comment.name}`}
          alt={comment.name}
          className="w-8 h-8 rounded-full"
        />

        {/* Contenido */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <h4 className="font-semibold text-sm">{comment.name}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-words">
            {comment.text}
          </p>
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <button className="hover:text-emerald-500">Me gusta</button>
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="hover:text-emerald-500"
            >
              Responder
            </button>
          </div>

          {/* Caja para responder */}
          {showReplyBox && (
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe una respuesta..."
                className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={handleReply}
                className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Enviar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔁 Respuestas (hilo) */}
      {comment.replies?.length > 0 && (
        <div className="pl-6 mt-2 space-y-2 border-l border-gray-300 dark:border-gray-600 overflow-x-hidden">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

// 🟢 Sección de comentarios de un post
function CommentsSection2() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Juan",
      text: "Muy buen post 👌",
      replies: [],
    },
    {
      id: 2,
      name: "María",
      text: "¡Interesante! 😃",
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  // Agregar nuevo comentario raíz
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        { id: Date.now(), name: "Yo", text: newComment, replies: [] },
      ]);
      setNewComment("");
    }
  };

  // Agregar respuesta a un comentario
  const handleReply = (commentId, replyText) => {
    const addReply = (commentsList) =>
      commentsList.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                { id: Date.now(), name: "Yo", text: replyText, replies: [] },
              ],
            }
          : { ...c, replies: addReply(c.replies) }
      );

    setComments((prev) => addReply(prev));
  };

  return (
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
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
          className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"
        >
          Publicar
        </button>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.map((c) => (
          <Comment key={c.id} comment={c} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}

export default CommentsSection2;
