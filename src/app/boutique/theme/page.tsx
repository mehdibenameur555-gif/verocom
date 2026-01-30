"use client";

import { useState } from "react";
import { Upload, Save } from "lucide-react";

export default function ThemePage() {
  const [formData, setFormData] = useState({
    // Logo and Favicon
    logo: null as File | null,
    favicon: null as File | null,
    
    // Recommended Policies
    policyName: "",
    policyLink: "",
    headerName: "",
    headerLink: "",
    footerName: "",
    footerLink: "",
    
    // Theme Colors
    primary: "#8B5CF6",
    primaryLight: "#A78BFA",
    primaryDark: "#7C3AED",
    secondary: "#EF4444",
    tertiary: "#F59E0B",
    success: "#10B981",
    info: "#3B82F6",
    warning: "#F59E0B",
    danger: "#EF4444",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Theme settings:", formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-semibold text-gray-900">Thème</h1>
          <p className="text-base text-gray-500 mt-2">
            À l&apos;exception des personnalisations du président, toutes les sections sont enregistrées sur chaque page une fois modifiées pour mener plus avec le changer de &#60;&#62; ou le modifier
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Logo et Favicon */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Logo et favicon</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre logo/Nom du Logo que l&apos;on peut voir dans l&apos;onglet de votre navigateur web (et vos raccourcis vers le site, comme votre smartphone icon)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "logo")}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Cliquez ou Glissez un logo ici</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu&apos;à 2 Mo</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Politiques recommendables */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Politiques recommendables
            </h2>
            
            <p className="text-base text-gray-600 mb-6">
              Affichez tous les services ma Filings
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                  <input
                    type="text"
                    value={formData.policyName}
                    onChange={(e) => setFormData({ ...formData, policyName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lien</label>
                  <input
                    type="url"
                    value={formData.policyLink}
                    onChange={(e) => setFormData({ ...formData, policyLink: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    value={formData.headerName}
                    onChange={(e) => setFormData({ ...formData, headerName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu</label>
                  <input
                    type="url"
                    value={formData.headerLink}
                    onChange={(e) => setFormData({ ...formData, headerLink: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Couleurs de thème */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Couleurs de thème
            </h2>

            <div className="space-y-4">
              {/* Primary */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Primaire</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.primary}
                    onChange={(e) => setFormData({ ...formData, primary: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                    {formData.primary}
                  </span>
                </div>
              </div>

              {/* Primary Light */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Primaire léger</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.primaryLight}
                    onChange={(e) => setFormData({ ...formData, primaryLight: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-purple-400 text-white text-xs rounded-full">
                    {formData.primaryLight}
                  </span>
                </div>
              </div>

              {/* Primary Dark */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Primaire sombre</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.primaryDark}
                    onChange={(e) => setFormData({ ...formData, primaryDark: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-purple-700 text-white text-xs rounded-full">
                    {formData.primaryDark}
                  </span>
                </div>
              </div>

              {/* Secondary */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Secondaire</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.secondary}
                    onChange={(e) => setFormData({ ...formData, secondary: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                    {formData.secondary}
                  </span>
                </div>
              </div>

              {/* Tertiary */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Tertiaire-courte</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.tertiary}
                    onChange={(e) => setFormData({ ...formData, tertiary: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs rounded-full">
                    {formData.tertiary}
                  </span>
                </div>
              </div>

              {/* Success */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Réussite</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.success}
                    onChange={(e) => setFormData({ ...formData, success: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                    {formData.success}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Info</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.info}
                    onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                    {formData.info}
                  </span>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Avertissement-mot</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.warning}
                    onChange={(e) => setFormData({ ...formData, warning: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs rounded-full">
                    {formData.warning}
                  </span>
                </div>
              </div>

              {/* Danger */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-gray-700">Plexus</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.danger}
                    onChange={(e) => setFormData({ ...formData, danger: e.target.value })}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                    {formData.danger}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pb-6">
            <button
              type="button"
              className="px-5 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Ré-activer par défault
            </button>
            <button
              type="button"
              className="px-5 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Feuil de thèmes Checkout
            </button>
            <button
              type="button"
              className="px-5 py-2 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Une copie principale
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Sauvegarder
            </button>
            <button
              type="button"
              className="px-5 py-2 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Personnaliser
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
