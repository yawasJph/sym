import { useEffect, useState } from "react";

const Comment = ({ user, text }) => (
  <div className="flex gap-3 items-start">
    <img
      src={`https://i.pravatar.cc/40?u=${user}`}
      alt={user}
      className="w-8 h-8 rounded-full"
    />
    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl shadow-sm">
      <p className="text-sm font-semibold text-gray-800 dark:text-white">
        {user}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
    </div>
  </div>
);

export default function CommentsSection3() {
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="mt-4 space-y-4">
      {comments.slice(0, visibleCount).map((c) => (
        <Comment key={c.id} user={c.name} text={c.body} />
      ))}

      {/* Botón "Ver más" solo si hay más comentarios */}
      {visibleCount < comments.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            Ver más comentarios
          </button>
        </div>
      )}
    </div>
  );
}
