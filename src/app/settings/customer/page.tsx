"use client";


import { useState } from "react";
import { Save } from "lucide-react";


export default function CustomerPage() {
  const [settings, setSettings] = useState({
    enableReviews: true,
    reviewApproval: true,
    enableGuestCheckout: true,
    requireAccount: false,
    minOrderAmount: "10.00",
    enableWishlist: true,
    enableComparison: true,
    enableNewsletterSignup: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Customer settings saved:", settings);
    alert("Paramètres client sauvegardés!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">Expérience client</h1>
        <p className="text-gray-500 mt-2 text-lg">Configurez les fonctionnalités et l'expérience d'achat</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis et évaluations</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-base font-medium text-gray-700">Autoriser les avis clients</label>
                <p className="text-sm text-gray-500 mt-2">Permettre aux clients de laisser des avis sur les produits</p>
              </div>

            </div>

            {settings.enableReviews && (
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Approuver les avis avant affichage</label>
                  <p className="text-xs text-gray-500 mt-1">Valider les avis avant de les publier</p>
                </div>

              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Panier et commande</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-base font-medium text-gray-700">Panier en tant qu'invité</label>
                <p className="text-sm text-gray-500 mt-2">Permettre aux visiteurs de commander sans créer de compte</p>
              </div>

            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Exiger un compte</label>
                <p className="text-xs text-gray-500 mt-1">Forcer la création d'un compte pour passer une commande</p>
              </div>

            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Montant minimum de commande</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={settings.minOrderAmount}
                  onChange={(e) => setSettings({ ...settings, minOrderAmount: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500 font-medium">TND</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fonctionnalités supplémentaires</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Liste de souhaits</label>
                <p className="text-xs text-gray-500 mt-1">Permettre aux clients de créer une liste de souhaits</p>
              </div>

            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Comparateur de produits</label>
                <p className="text-xs text-gray-500 mt-1">Permettre de comparer plusieurs produits</p>
              </div>

            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Inscription à la newsletter</label>
                <p className="text-xs text-gray-500 mt-1">Afficher l'option d'inscription à la newsletter</p>
              </div>

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
