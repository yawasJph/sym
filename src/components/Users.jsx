import { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import { Link } from "react-router-dom";

function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | following | suggested

  const [users] = useState([
    {
      id: 1,
      name: "Joseph Stepham",
      username: "@joseph",
      avatar: "https://i.pravatar.cc/150?img=33",
      cover:
        "https://images.unsplash.com/photo-1503264116251-35a269479413?w=800",
      bio: "Desarrollador de sistemas 💻 | Amante del café ☕",
      following: true,
    },
    {
      id: 2,
      name: "María Pérez",
      username: "@maria",
      avatar: "https://i.pravatar.cc/150?img=5",
      cover:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
      bio: "Diseñadora UX/UI 🎨",
      following: false,
    },
    {
      id: 3,
      name: "Carlos López",
      username: "@carlos",
      avatar: "https://i.pravatar.cc/150?img=18",
      cover:
        "https://images.unsplash.com/photo-1548869447-faef5000334c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Amante del código abierto 🐧",
      following: false,
    },
    {
      id: 4,
      name: "Mario Gomez",
      username: "@Mario",
      avatar: "https://i.pravatar.cc/150?img=55",
      cover:
        "https://images.unsplash.com/photo-1549088521-94b6502fec3d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Amante del código abierto 🐧",
      following: false,
    },
    {
      id: 5,
      name: "Tatania Torres",
      username: "@Tati",
      avatar: "https://i.pravatar.cc/150?img=44",
      cover:
        "https://images.unsplash.com/photo-1548913344-66177da9425e?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Amante del código abierto 🐧",
      following: false,
    },
    {
      id: 6,
      name: "El Bryan",
      username: "@bryan",
      avatar: "https://i.pravatar.cc/150?img=3",
      cover:
        "https://images.unsplash.com/photo-1548736614-128923fa2a11?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Amante del código abierto 🐧",
      following: false,
    },
  ]);

  // Filtrado
  const filteredUsers = users.filter((u) => {
    // Filtro por pestaña
    if (filter === "following" && !u.following) return false;
    if (filter === "suggested" && u.following) return false;

    // Filtro por buscador
    return (
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Usuarios
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        {["all", "following", "suggested"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`py-2 px-4 text-sm font-medium transition border-b-2 ${
              filter === tab
                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            {tab === "all"
              ? "Todos"
              : tab === "following"
              ? "Seguidos"
              : "Sugeridos"}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <Search
          size={18}
          className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
        />
      </div>

      {/* Lista de usuarios */}
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No se encontraron usuarios
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <div
              
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              
            >
              <Link
                key={user.id}
                to={`users/${user.id}`} 
              >
                {/* Cover */}
              <div className="relative h-28">
                <img
                  src={user.cover}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
                {/* Avatar */}
                <div className="absolute -bottom-8 left-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-900 shadow"
                  />
                </div>
              </div>
              </Link>
              

              <div className="pt-10 px-4 pb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.username}
                </p>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {user.bio}
                </p>

                <div className="mt-4 flex justify-end">
                  <button className="px-3 py-2 flex items-center gap-1 rounded-lg shadow bg-emerald-600 text-white hover:bg-emerald-700">
                    <UserPlus size={16} />
                    {user.following ? "Siguiendo" : "Seguir"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPage;
