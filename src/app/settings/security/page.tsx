"use client";

import { useState } from "react";
import { Shield, Key, Lock } from "lucide-react";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";


export default function SecuritySettingsPage() {
  const { locale } = useLocaleStore();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">{t(locale, "securityTitle")}</h1>
        <p className="text-gray-600 mt-2 text-lg">{t(locale, "securitySubtitle")}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Key className="w-6 h-6" />
          {t(locale, "changePassword")}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t(locale, "currentPassword")}</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t(locale, "newPassword")}</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t(locale, "confirmPassword")}</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">{t(locale, "updatePassword")}</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          {t(locale, "twoFactorAuth")}
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-900 font-medium">{t(locale, "enableTwoFactor")}</p>
            <p className="text-sm text-gray-500">{t(locale, "twoFactorHint")}</p>
          </div>


        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6" />
          {t(locale, "activeSessions")}
        </h2>
        
        <div className="space-y-4">
          {[
            { device: "متصفح Chrome - Windows", location: "الرياض، السعودية", time: "نشط الآن" },
            { device: "تطبيق iOS", location: "جدة، السعودية", time: "منذ ساعتين" },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{session.device}</p>
                <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">{t(locale, "endSession")}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
