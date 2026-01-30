"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, LogOut, Settings, ChevronDown } from "lucide-react";
import { useLocaleStore, type Locale } from "@/lib/locale";

interface PremiumHeaderProps {
  storeName?: string;
  plan?: "premium" | "free" | "business";
  userName?: string;
  userEmail?: string;
}

const flagMap: Record<string, string> = {
  ar: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1280px-Flag_of_Tunisia.svg.png",
  fr: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/960px-Flag_of_France.svg.png",
  en: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/960px-Flag_of_the_United_Kingdom_%283-5%29.svg.png",
};

export default function PremiumHeader({
  storeName = "My Store",
  plan = "free",
  userName = "Mohammed",
  userEmail = "user@mazarshop.com",
}: PremiumHeaderProps) {
  const { locale, setLocale } = useLocaleStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const planColors: Record<string, { bg: string; text: string; border: string }> = {
    premium: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
    business: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
    free: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  };

  const planColor = planColors[plan] || planColors.free;

  return (
    <header dir="rtl" className={`sticky top-0 z-50 border-b ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Image
                  src={flagMap[locale]}
                  alt={`${locale} flag`}
                  width={20}
                  height={20}
                  className="rounded object-cover"
                  priority
                />
                <span className="text-sm font-semibold uppercase hidden sm:inline">{locale}</span>
                <ChevronDown size={16} className={`transition-transform ${isLanguageMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Language Menu */}
              {isLanguageMenuOpen && (
                <div
                  className={`absolute left-0 mt-2 w-40 rounded-lg shadow-lg border ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-gray-200"
                  } overflow-hidden`}
                >
                  {(["ar", "fr", "en"] as const).map((lang: Locale) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLocale(lang);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                        locale === lang
                          ? isDarkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-700"
                          : isDarkMode
                            ? "text-gray-300 hover:bg-slate-700"
                            : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Image
                        src={flagMap[lang]}
                        alt={`${lang} flag`}
                        width={20}
                        height={20}
                        className="rounded object-cover"
                        priority
                      />
                      <span>
                        {lang === "ar" && "العربية"}
                        {lang === "fr" && "Français"}
                        {lang === "en" && "English"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-white transition-colors ${
                  isDarkMode
                    ? "bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#2563eb]"
                    : "bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#2563eb]"
                }`}
                title={`${userName} (${userEmail})`}
              >
                {userName.charAt(0).toUpperCase()}
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div
                  className={`absolute left-0 mt-2 w-56 rounded-lg shadow-lg border ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-gray-200"
                  } overflow-hidden`}
                >
                  {/* User Info */}
                  <div className={`px-4 py-3 border-b ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-gray-200 bg-gray-50"}`}>
                    <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {userName}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {userEmail}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    href="/settings/general"
                    className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                      isDarkMode
                        ? "text-gray-300 hover:bg-slate-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>

                  <button
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-red-600 hover:bg-red-50 ${
                      isDarkMode ? "hover:bg-red-900/20" : ""
                    }`}
                    onClick={() => {
                      // Handle logout
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Center: Plan Badge */}
          <div className="hidden md:flex items-center gap-4 flex-1 px-6 justify-center">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${planColor.bg} ${planColor.text} ${planColor.border}`}>
              Plan: <span className="capitalize">{plan}</span>
            </div>
          </div>

          {/* Right: Store Info */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className="hidden sm:block text-right">
              <h1 className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {storeName}
              </h1>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Store</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white font-bold text-base">
              M
            </div>
          </div>
        </div>

        {/* Mobile: Plan Badge */}
        <div className="md:hidden flex items-center gap-3 pb-3 overflow-x-auto">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${planColor.bg} ${planColor.text} ${planColor.border}`}>
            Plan: <span className="capitalize">{plan}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
