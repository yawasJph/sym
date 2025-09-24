// EditProfilePage.jsx
import React, { useEffect, useState, useRef } from "react";
import { Camera, X } from "lucide-react";

/**
 * Página para editar perfil (cover, avatar, nombre, bio).
 * - Guarda en localStorage bajo la key "my_profile".
 * - Muestra previews instantáneas (usa FileReader -> dataURL).
 * - Botones: Guardar / Cancelar (revertir).
 * - Compatible con tema dark (usa clases tailwind).
 */

const STORAGE_KEY = "my_profile";

const DEFAULT_PROFILE = {
  name: "Joseph Stepham",
  username: "joseph",
  bio: "Desarrollador de sistemas 💻 | Amante del café ☕",
  avatar: null, // dataURL
  cover: null, // dataURL
};

export default function EditProfilePage() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [draft, setDraft] = useState(DEFAULT_PROFILE);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  // Refs for file inputs so we can trigger them programmatically
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // load saved profile on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfile((p) => ({ ...p, ...parsed }));
        setDraft((d) => ({ ...d, ...parsed }));
      } else {
        // if none, initialize localStorage with defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      }
    } catch (err) {
      console.error("Error reading profile from localStorage", err);
    }
  }, []);

  // helper: read file as dataURL
  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // handlers for file inputs
  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setDraft((prev) => ({ ...prev, cover: dataUrl }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setDraft((prev) => ({ ...prev, avatar: dataUrl }));
    } catch (err) {
      console.error(err);
    }
  };

  // remove image helpers
  const removeCover = () => setDraft((p) => ({ ...p, cover: null }));
  const removeAvatar = () => setDraft((p) => ({ ...p, avatar: null }));

  // form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  // save (persist to localStorage)
  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setProfile(draft);
      setMsg("Perfil guardado");
      setTimeout(() => setMsg(null), 2500);
    } catch (err) {
      console.error("Error saving profile", err);
      setMsg("Error al guardar");
      setTimeout(() => setMsg(null), 2500);
    } finally {
      setSaving(false);
    }
  };

  // cancel -> revert draft to saved profile
  const handleCancel = () => {
    setDraft(profile);
    setMsg("Cambios descartados");
    setTimeout(() => setMsg(null), 1800);
  };

  return (
   
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 md:p-6 mb-12">
          {/* Header: preview cover + avatar */}
          <div className="relative">
            {/* Cover */}
            <div className="relative">
              <img
                src={
                  draft.cover ||
                  "https://images.unsplash.com/photo-1503264116251-35a269479413"
                }
                alt="cover"
                className="w-full h-48 object-cover rounded-xl"
              />
              {/* Botón editar portada */}
              <button
                onClick={() => coverInputRef.current?.click()}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white px-3 py-1 rounded-lg text-sm"
              >
                <Camera size={18} />
              </button>
              {draft.cover && (
                <button
                  onClick={removeCover}
                  className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Avatar */}
            <div className="absolute -bottom-12 left-6">
              <div className="relative w-24 h-24">
                <img
                  src={draft.avatar || "https://i.pravatar.cc/150?img=32"}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover"
                />
                {/* Botón editar avatar */}
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-800 text-white p-2 rounded-full shadow"
                  aria-label="Cambiar avatar"
                >
                  <Camera size={16} />
                </button>
                {draft.avatar && (
                  <button
                    onClick={removeAvatar}
                    className="absolute top-0 left-0 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow"
                    aria-label="Quitar avatar"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Invisible file inputs */}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />

          {/* Content area (form + preview) */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Form */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-3">Editar perfil</h2>

              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Nombre
              </label>
              <input
                name="name"
                value={draft.name}
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />

              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Usuario
              </label>
              <input
                name="username"
                value={draft.username}
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />

              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Biografía
              </label>
              <textarea
                name="bio"
                value={draft.bio}
                onChange={handleChange}
                rows={4}
                className="w-full mb-4 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />

              {/* Buttons */}
              <div className="flex gap-3 items-center">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow disabled:opacity-60"
                >
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>

                {/* small feedback */}
                {msg && (
                  <div className="ml-3 text-sm text-emerald-600 dark:text-emerald-400">
                    {msg}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Live preview */}
            <aside className="md:col-span-1 ">
              <h3 className="text-sm font-medium mb-3">Vista previa</h3>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <div
                  className="w-full h-28"
                  style={{
                    backgroundImage: draft.cover
                      ? `url(${draft.cover})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: draft.cover ? undefined : "#e6e6e6",
                  }}
                >
                  {!draft.cover && (
                    <div className="p-3 text-gray-500">Portada</div>
                  )}
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-200">
                      {draft.avatar ? (
                        <img
                          src={draft.avatar}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          {draft.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{draft.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        @{draft.username}
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    {draft.bio}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

  );
}
