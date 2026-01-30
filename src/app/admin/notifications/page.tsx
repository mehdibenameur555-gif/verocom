"use client";

export default function AdminNotificationsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Notifications - Admin</h1>
      <p className="mb-6 text-gray-600">Configurez les notifications système, emails, et alertes pour les administrateurs.</p>
      {/* Ajoutez ici les paramètres de notifications, préférences, etc. */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Paramètres de notifications</h2>
        <p className="mb-4 text-gray-500">Activez ou désactivez les notifications importantes pour l'administration.</p>
        {/* Switchs ou formulaires de configuration */}
      </div>
    </div>
  );
}
