// UserProfile.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import Middlebar from "./Middlebar";

function UserProfile() {
  const usersData = [
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
  ];

  const { id } = useParams(); // obtiene el ID de la URL
  const user = usersData.find((u) => u.id.toString() === id);

  const [isFollowing, setIsFollowing] = useState(user?.following || false);

  if (!user) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Usuario no encontrado
      </p>
    );
  }

  return (
    <div>
      {/* Cover */}
      <div className="relative">
        <img
          src={user.cover}
          alt="cover"
          className="w-full h-48 object-cover rounded-xl"
        />
        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-16 px-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.username}
            </p>
          </div>

          {/* Botón seguir */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-3 py-2 rounded-lg shadow flex items-center gap-1 ${
              isFollowing
                ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <UserPlus size={16} />
            {isFollowing ? "Siguiendo" : "Seguir"}
          </button>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-gray-200 dark:border-gray-700 flex">
        <button className="flex-1 py-3 text-sm font-medium text-center text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600">
          Posts
        </button>
      </div>

      {/* Posts del usuario */}
      <div className="mt-6">
        <Middlebar filter={`user-${user.id}`} />
      </div>
    </div>
  );
}

export default UserProfile;
