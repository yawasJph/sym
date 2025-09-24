// ChangePasswordPage.jsx
import React, { useState, useEffect } from "react";
import { Lock, Save, XCircle } from "lucide-react";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const [strength, setStrength] = useState({ level: 0, label: "Débil" });

  // función para evaluar seguridad de contraseña
  useEffect(() => {
    const checkStrength = (pwd) => {
      let score = 0;
      if (pwd.length >= 6) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/[0-9]/.test(pwd)) score++;
      if (/[^A-Za-z0-9]/.test(pwd)) score++;

      if (score <= 1) return { level: 1, label: "Débil" };
      if (score === 2 || score === 3) return { level: 2, label: "Media" };
      if (score >= 4) return { level: 3, label: "Fuerte" };
      return { level: 0, label: "Débil" };
    };

    setStrength(checkStrength(newPassword));
  }, [newPassword]);

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMsg({ type: "error", text: "Todos los campos son obligatorios" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setMsg({ type: "success", text: "Contraseña actualizada correctamente ✅" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setStrength({ level: 0, label: "Débil" });
    }, 1500);
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setStrength({ level: 0, label: "Débil" });
    setMsg({ type: "info", text: "Cambios descartados" });
    setTimeout(() => setMsg(null), 1800);
  };

  // Colores de la barra
  const getStrengthColor = () => {
    if (strength.level === 1) return "bg-red-500";
    if (strength.level === 2) return "bg-yellow-500";
    if (strength.level === 3) return "bg-emerald-600";
    return "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition">
      <div className="max-w-md mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <Lock className="text-emerald-600 dark:text-emerald-400" size={22} />
            <h2 className="text-lg font-semibold">Cambiar contraseña</h2>
          </div>

          {/* Form */}
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Contraseña actual
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Nueva contraseña
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          {/* Barra de fuerza */}
          {newPassword && (
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
                <div
                  className={`h-2 rounded transition-all duration-300 ${getStrengthColor()}`}
                  style={{ width: `${strength.level * 33.3}%` }}
                />
              </div>
              <p
                className={`text-sm mt-1 ${
                  strength.level === 1
                    ? "text-red-500"
                    : strength.level === 2
                    ? "text-yellow-500"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                Seguridad: {strength.label}
              </p>
            </div>
          )}

          <label className="block text-sm text-gray-600 dark:text-gray-300 mt-4 mb-1">
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-6 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          {/* Buttons */}
          <div className="flex gap-3 items-center">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 
                text-white rounded-lg shadow disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 
                text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <XCircle size={18} />
              Cancelar
            </button>
          </div>

          {/* Mensaje */}
          {msg && (
            <div
              className={`mt-4 text-sm ${
                msg.type === "error"
                  ? "text-red-600 dark:text-red-400"
                  : msg.type === "success"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {msg.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
