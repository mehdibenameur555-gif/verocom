"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function ReturnsPage() {
  const { locale } = "fr";
  const [settings, setSettings] = useState({
    returnDays: "14",
    returnShippingFree: true,
    returnReason: ["Produit défectueux", "Taille incorrecte", "Produit non reçu", "Autre"],
    enableAutoRefund: true,
    refundDelay: "7",
    returnAddress: "Tunis, Tunisie",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Return settings saved:", settings);
    alert("Paramètres de retour sauvegardés!");
  };

  return (
    <div className="space-y-8 text-base">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">Politique de retour</h1>
        <p className="text-gray-600 mt-2 text-lg">Configurez la politique de retour et de remboursement</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Délai de retour</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Délai de retour (en jours)</label>
              <input
                type="number"
                min="0"
                value={settings.returnDays}
                onChange={(e) => setSettings({ ...settings, returnDays: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30"
              />
              <p className="text-xs text-gray-500 mt-2">Les clients peuvent retourner les produits dans ce délai après la livraison</p>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Livraison de retour gratuite</label>
                <p className="text-xs text-gray-500 mt-1">Payer les frais d'expédition pour les retours</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, returnShippingFree: !settings.returnShippingFree })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.returnShippingFree ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.returnShippingFree ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Adresse de retour</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse de retour</label>
              <textarea className="input-placeholder-normal"
                value={settings.returnAddress}
                onChange={(e) => setSettings({ ...settings, returnAddress: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Entrez l'adresse complète pour les retours"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Remboursement</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Remboursement automatique</label>
                <p className="text-xs text-gray-500 mt-1">Traiter les remboursements automatiquement après validation du retour</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, enableAutoRefund: !settings.enableAutoRefund })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableAutoRefund ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableAutoRefund ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {settings.enableAutoRefund && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Délai de remboursement (en jours)</label>
                <input
                  type="number"
                  min="0"
                  value={settings.refundDelay}
                  onChange={(e) => setSettings({ ...settings, refundDelay: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="7"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Enregistrer les paramètres
          </button>
        </div>
      </form>
    </div>
  );
}
