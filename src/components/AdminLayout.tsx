"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  ShoppingBag, 
  Settings, 
  BarChart3,
  Shield,
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useLocaleStore } from "@/lib/locale";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { locale } = useLocaleStore();
  const isRTL = locale === "ar";

  const adminNavItems = [
    {
      name: "Vue d'ensemble",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Boutiques",
      href: "/admin/stores",
      icon: Store,
    },
    {
      name: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Logo & Images",
      href: "/admin/logo-images",
      icon: BarChart3, // You can change to an image icon if available
    },
    {
      name: "Sécurité",
      href: "/admin/security",
      icon: Shield,
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
    },
    {
      name: "Paramètres système",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} h-full bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8" />
              <span className="font-bold text-xl">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-red-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-red-700 text-white font-semibold"
                    : "hover:bg-red-700/50 text-red-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <Icon className={`w-5 h-5 ${!sidebarOpen && "w-6 h-6"}`} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-red-700">
          <button className={`flex items-center gap-3 px-4 py-3 w-full hover:bg-red-700 rounded-lg transition-colors ${!sidebarOpen && "justify-center"}`}>
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? (isRTL ? "mr-64" : "ml-64") : isRTL ? "mr-20" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-bold">
              M
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
              Super Admin
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-bold text-gray-900">Administration</h1>
            <p className="text-sm text-gray-500">Gestion de la plateforme Verocom</p>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
