"use client";

import { useState } from "react";

export default function AdminSecurityPage() {
  const [passwordMinLength, setPasswordMinLength] = useState(8);
  const [passwordRequireNumber, setPasswordRequireNumber] = useState(true);
  const [passwordRequireSpecial, setPasswordRequireSpecial] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [adminLock, setAdminLock] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Sécurité - Administration</h1>
      <p className="mb-6 text-gray-800">Gérez les paramètres de sécurité de la plateforme, les accès, les mots de passe, et les permissions des administrateurs.</p>
      <form className="bg-white rounded-lg shadow p-6 max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Paramètres de sécurité</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Longueur minimale du mot de passe</label>
          <input
            type="number"
            min="6"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={passwordMinLength}
            onChange={e => setPasswordMinLength(Number(e.target.value))}
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Exiger un chiffre dans le mot de passe</label>
          <input type="checkbox" checked={passwordRequireNumber} onChange={e => setPasswordRequireNumber(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Exiger un caractère spécial</label>
          <input type="checkbox" checked={passwordRequireSpecial} onChange={e => setPasswordRequireSpecial(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer la double authentification (2FA)</label>
          <input type="checkbox" checked={twoFactorEnabled} onChange={e => setTwoFactorEnabled(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Durée d'inactivité avant déconnexion (minutes)</label>
          <input
            type="number"
            min="5"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={sessionTimeout}
            onChange={e => setSessionTimeout(Number(e.target.value))}
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Verrouiller l'accès admin (mode maintenance)</label>
          <input type="checkbox" checked={adminLock} onChange={e => setAdminLock(e.target.checked)} className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Gestion des accès</h2>
        <p className="mb-4 text-gray-800">Ajoutez, modifiez ou supprimez les administrateurs et gérez leurs permissions.</p>
        {/* Table ou formulaire de gestion des accès */}
      </form>
    </div>
  );
}
