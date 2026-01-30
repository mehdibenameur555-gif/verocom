"use client";

import { useState } from "react";
import Z1Button from "@/components/z1";
import { Save } from "lucide-react";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function GeneralSettingsPage() {
  const { locale } = useLocaleStore();
  const [settings, setSettings] = useState({
    storeName: "",
    storeTitle: "",
    storeEmail: "",
    currency: "DTN",
    language: "fr",
    timezone: "Africa/Tunis",
    phoneNumber: "",
    address: "",
    taxId: "",
    enableNotifications: false,
    enableTwoFactor: false,
    shippingCost: "",
    freeShippingThreshold: "",
    taxRate: "",
    enableReviews: false,
    enableGuestCheckout: false,
    returnDays: "",
    minOrderAmount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings saved:", settings);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">{t(locale, "generalTitle")}</h1>
          <p className="text-gray-500 mt-2 text-lg">{t(locale, "generalSubtitle")}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Z1Button>
            <Save className="w-5 h-5 mr-2" />
            enregistrer
          </Z1Button>
        </form>
      </div>

      <form className="space-y-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t(locale, "storeInfo")}</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">{t(locale, "storeNameLabel")}</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSettings((prev) => ({ ...prev, storeName: newName }));
                }}
                onBlur={() => {
                  setSettings((prev) => {
                    if (!prev.storeTitle || prev.storeTitle === "") {
                      return { ...prev, storeTitle: prev.storeName };
                    }
                    return prev;
                  });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">Titre de la boutique</label>
              <input
                type="text"
                value={settings.storeTitle || ""}
                onChange={(e) => setSettings({ ...settings, storeTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl font-bold placeholder:font-normal placeholder:text-base"
                placeholder="Titre public du magasin (visible par les visiteurs)"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">{t(locale, "emailLabel")}</label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t(locale, "regionalSettings")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t(locale, "currencyLabel")}</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="DTN">Dinar Tunisien (DTN)</option>
                <option value="USD">{t(locale, "currencyUSD")}</option>
                <option value="EUR">{t(locale, "currencyEUR")}</option>
                <option value="SAR">{t(locale, "currencySAR")}</option>
                <option value="AED">{t(locale, "currencyAED")}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t(locale, "languageLabel")}</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t(locale, "timezoneLabel")}</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Africa/Tunis">Tunis (Africa/Tunis)</option>
                <option value="Asia/Riyadh">{t(locale, "tzRiyadh")}</option>
                <option value="Asia/Dubai">{t(locale, "tzDubai")}</option>
                <option value="Europe/London">{t(locale, "tzLondon")}</option>
                <option value="America/New_York">{t(locale, "tzNewYork")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de contact</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de téléphone</label>
              <input
                type="tel"
                value={settings.phoneNumber}
                onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+216 25 123 456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ville, Pays"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informations légales</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro fiscal</label>
              <input
                type="text"
                value={settings.taxId}
                onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numéro d'identification fiscale"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sécurité et notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Notifications par email</label>
                <p className="text-xs text-gray-500 mt-1">Recevoir les alertes importantes par email</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, enableNotifications: !settings.enableNotifications })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableNotifications ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Authentification à deux facteurs</label>
                <p className="text-xs text-gray-500 mt-1">Renforcer la sécurité de votre compte</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, enableTwoFactor: !settings.enableTwoFactor })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableTwoFactor ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableTwoFactor ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frais de livraison et commande</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frais de livraison standard</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={settings.shippingCost}
                  onChange={(e) => setSettings({ ...settings, shippingCost: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500 font-medium">{settings.currency}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Livraison gratuite à partir de</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500 font-medium">{settings.currency}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Montant minimum de commande</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={settings.minOrderAmount}
                  onChange={(e) => setSettings({ ...settings, minOrderAmount: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500 font-medium">{settings.currency}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Taux TVA (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={settings.taxRate}
                  onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500 font-medium">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Politique de retour</h2>
          
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
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Expérience client</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Autoriser les avis clients</label>
                <p className="text-xs text-gray-500 mt-1">Permettre aux clients de laisser des avis sur les produits</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, enableReviews: !settings.enableReviews })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableReviews ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableReviews ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Panier en tant que client</label>
                <p className="text-xs text-gray-500 mt-1">Permettre aux visiteurs de commander sans créer de compte</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, enableGuestCheckout: !settings.enableGuestCheckout })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableGuestCheckout ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableGuestCheckout ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            {t(locale, "saveChanges")}
          </button>
        </div>
      </form>
    </div>
  );
}
