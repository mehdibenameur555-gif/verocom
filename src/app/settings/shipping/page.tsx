"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { useLocaleStore } from "@/lib/locale";


export default function ShippingPage() {
  const { locale } = useLocaleStore();
  const [settings, setSettings] = useState({
    shippingCost: "5.00",
    freeShippingThreshold: "50.00",
    processingTime: "2",
    estimatedDelivery: "3-5",
    allowShippingCost: true,
    allowFreeShipping: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Shipping settings saved:", settings);
    alert("Paramètres de livraison sauvegardés!");
  };

  return (
    <div className="space-y-8 text-base">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">Paramètres de Livraison</h1>
        <p className="text-gray-600 mt-2 text-lg">Gérez les méthodes et coûts de livraison</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frais de livraison</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Activer les frais de livraison</label>
                <p className="text-xs text-gray-500 mt-1">Appliquer des frais fixes sur toutes les commandes</p>
              </div>


            </div>

            {settings.allowShippingCost && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frais de livraison standard</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={settings.shippingCost}
                      onChange={(e) => setSettings({ ...settings, shippingCost: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ maxWidth: 180 }}
                    />
                    <span className="text-gray-500 font-medium">TND</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Livraison gratuite</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Activer la livraison gratuite</label>
                <p className="text-xs text-gray-500 mt-1">Livraison gratuite à partir d'un montant minimum</p>
              </div>


            </div>

            {settings.allowFreeShipping && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Montant minimum pour livraison gratuite</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ maxWidth: 180 }}
                    />
                    <span className="text-gray-500 font-medium">TND</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Délais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Délai de traitement (en jours)</label>
              <input
                type="number"
                min="0"
                value={settings.processingTime}
                onChange={(e) => setSettings({ ...settings, processingTime: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ maxWidth: 180 }}
                placeholder="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Délai de livraison estimé</label>
              <input
                type="text"
                value={settings.estimatedDelivery}
                onChange={(e) => setSettings({ ...settings, estimatedDelivery: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ maxWidth: 180 }}
                placeholder="3-5 jours"
              />
            </div>
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
