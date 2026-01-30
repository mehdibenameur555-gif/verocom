
"use client";

import { useState } from "react";

export default function AdminSystemSettingsPage() {
    // advanced states must be inside the component
    const [phoneRegistration, setPhoneRegistration] = useState(false);
    const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [freeShipping, setFreeShipping] = useState(false);
    const [minFreeShipping, setMinFreeShipping] = useState(100);
    const [popupsEnabled, setPopupsEnabled] = useState(true);
    const [mainColor, setMainColor] = useState("#1e3a8a");
  const [platformName, setPlatformName] = useState("Verocom");
  const [supportEmail, setSupportEmail] = useState("support@verocom.com");
  const [defaultLang, setDefaultLang] = useState("fr");
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [paymentsEnabled, setPaymentsEnabled] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState("TND");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("");
  const [termsUrl, setTermsUrl] = useState("");
  const [googleLogin, setGoogleLogin] = useState(false);
  const [facebookLogin, setFacebookLogin] = useState(false);
  const [minOrderValue, setMinOrderValue] = useState(0);
  const [maxCartItems, setMaxCartItems] = useState(50);
  const [supportPhone, setSupportPhone] = useState("");
  const [productReviews, setProductReviews] = useState(true);
  const [customerReviews, setCustomerReviews] = useState(true);
  const [timezone, setTimezone] = useState("Africa/Tunis");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: Send data to backend
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Paramètres système - Admin</h1>
      <p className="mb-6 text-gray-800">Gérez les paramètres système globaux de la plateforme.</p>
      <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Configuration générale</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Nom de la plateforme</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={platformName}
            onChange={e => setPlatformName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Email de support</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={supportEmail}
            onChange={e => setSupportEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Langue par défaut</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={defaultLang}
            onChange={e => setDefaultLang(e.target.value)}
          >
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer l'inscription des utilisateurs</label>
          <input type="checkbox" checked={registrationEnabled} onChange={e => setRegistrationEnabled(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer le paiement en ligne</label>
          <input type="checkbox" checked={paymentsEnabled} onChange={e => setPaymentsEnabled(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Devise par défaut</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={defaultCurrency}
            onChange={e => setDefaultCurrency(e.target.value)}
          >
            <option value="TND">TND - Dinar Tunisien</option>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - Dollar US</option>
            <option value="SAR">SAR - Riyal Saoudien</option>
            <option value="MAD">MAD - Dirham Marocain</option>
          </select>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer les notifications</label>
          <input type="checkbox" checked={notificationsEnabled} onChange={e => setNotificationsEnabled(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Mode maintenance</label>
          <input type="checkbox" checked={maintenanceMode} onChange={e => setMaintenanceMode(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">URL de la politique de confidentialité</label>
          <input
            type="url"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={privacyPolicyUrl}
            onChange={e => setPrivacyPolicyUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1 text-gray-900">URL des conditions d'utilisation</label>
          <input
            type="url"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={termsUrl}
            onChange={e => setTermsUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <hr className="my-6" />
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Options avancées</h2>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Connexion avec Google</label>
          <input type="checkbox" checked={googleLogin} onChange={e => setGoogleLogin(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Connexion avec Facebook</label>
          <input type="checkbox" checked={facebookLogin} onChange={e => setFacebookLogin(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Valeur minimale de commande (TND)</label>
          <input
            type="number"
            min="0"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={minOrderValue}
            onChange={e => setMinOrderValue(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Nombre max. d'articles dans le panier</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={maxCartItems}
            onChange={e => setMaxCartItems(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Téléphone support</label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={supportPhone}
            onChange={e => setSupportPhone(e.target.value)}
            placeholder="+216 ..."
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer les avis sur les produits</label>
          <input type="checkbox" checked={productReviews} onChange={e => setProductReviews(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer les avis clients</label>
          <input type="checkbox" checked={customerReviews} onChange={e => setCustomerReviews(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1 text-gray-900">Fuseau horaire par défaut</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
          >
            <option value="Africa/Tunis">Africa/Tunis</option>
            <option value="Europe/Paris">Europe/Paris</option>
            <option value="Europe/Madrid">Europe/Madrid</option>
            <option value="Asia/Riyadh">Asia/Riyadh</option>
            <option value="Africa/Casablanca">Africa/Casablanca</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Asia/Dubai">Asia/Dubai</option>
          </select>
        </div>
        <hr className="my-6" />
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Plus d'options</h2>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer l'inscription par téléphone</label>
          <input type="checkbox" checked={phoneRegistration} onChange={e => setPhoneRegistration(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Nombre max. de tentatives de connexion</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={maxLoginAttempts}
            onChange={e => setMaxLoginAttempts(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Message de bienvenue personnalisé</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={welcomeMessage}
            onChange={e => setWelcomeMessage(e.target.value)}
            placeholder="Bienvenue sur notre plateforme !"
            rows={2}
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer la livraison gratuite</label>
          <input type="checkbox" checked={freeShipping} onChange={e => setFreeShipping(e.target.checked)} className="w-5 h-5" />
        </div>
        {freeShipping && (
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-900">Montant minimum pour livraison gratuite (TND)</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              value={minFreeShipping}
              onChange={e => setMinFreeShipping(Number(e.target.value))}
            />
          </div>
        )}
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-semibold text-gray-900">Activer les popups d'alerte</label>
          <input type="checkbox" checked={popupsEnabled} onChange={e => setPopupsEnabled(e.target.checked)} className="w-5 h-5" />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1 text-gray-900">Couleur principale de la plateforme</label>
          <input
            type="color"
            className="w-12 h-12 p-0 border-0 bg-transparent"
            value={mainColor}
            onChange={e => setMainColor(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded font-bold hover:bg-blue-800 transition"
        >
          Enregistrer
        </button>
        {saved && <span className="ml-4 text-green-600 font-semibold">Enregistré !</span>}
      </form>
    </div>
  );
}
