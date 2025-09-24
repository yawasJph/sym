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

export default function CommentsSection4() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Comentarios ({comments.length})
      </h3>

      <div className="max-h-72 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent">
        {comments.map((c) => (
          <Comment key={c.id} user={c.name} text={c.body} />
        ))}
      </div>
    </div>
  );
}
