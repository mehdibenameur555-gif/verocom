"use client";

import { useState } from "react";
import { Save, Palette } from "lucide-react";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function AppearanceSettingsPage() {
  const { locale } = useLocaleStore();
  const [settings, setSettings] = useState({
    theme: "light",
    primaryColor: "#3B82F6",
    logoUrl: "",
    faviconUrl: "",
  });

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">{t(locale, "appearanceTitle")}</h1>
        <p className="text-gray-500 mt-2 text-lg">{t(locale, "appearanceSubtitle")}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Palette className="w-7 h-7" />
          {t(locale, "appearanceColors")}
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">{t(locale, "theme")}</label>
            <div className="flex gap-4">
              <button
                onClick={() => setSettings({ ...settings, theme: "light" })}
                className={`flex-1 p-4 border-2 rounded-lg transition-colors ${
                  settings.theme === "light"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {t(locale, "themeLight")}
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: "dark" })}
                className={`flex-1 p-4 border-2 rounded-lg transition-colors ${
                  settings.theme === "dark"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {t(locale, "themeDark")}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">{t(locale, "primaryColor")}</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="w-20 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t(locale, "logoAndFavicon")}</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">{t(locale, "logoUrl")}</label>
            <input
              type="url"
              value={settings.logoUrl}
              onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">{t(locale, "faviconUrl")}</label>
            <input
              type="url"
              value={settings.faviconUrl}
              onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/favicon.ico"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Save className="w-5 h-5" />
          {t(locale, "saveChanges")}
        </button>
      </div>
    </div>
  );
}
