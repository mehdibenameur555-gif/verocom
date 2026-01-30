"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Package,
  Truck,
  RotateCcw,
  Users,
  Lock,
  Bell,
  Palette,
  Mail,
  CreditCard,
} from "lucide-react";

const settingsSections = [
  {
    group: "Configuration générale",
    items: [
      { label: "Général", href: "/settings/general", icon: Settings },
      { label: "Paramètres des produits", href: "/settings/parameters", icon: Package },
    ],
  },
  {
    group: "Boutique",
    items: [
      { label: "Livraison", href: "/settings/shipping", icon: Truck },
      { label: "Politique de retour", href: "/settings/returns", icon: RotateCcw },
      { label: "Expérience client", href: "/settings/customer", icon: Users },
    ],
  },
  {
    group: "Sécurité et notifications",
    items: [
      { label: "Sécurité", href: "/settings/security", icon: Lock },
      { label: "Notifications", href: "/settings/notifications", icon: Bell },
    ],
  },
  {
    group: "Présentation",
    items: [
      { label: "Apparence", href: "/settings/appearance", icon: Palette },
      { label: "Email", href: "/settings/email", icon: Mail },
    ],
  },
  {
    group: "Abonnement",
    items: [
      { label: "Abonnement", href: "/settings/subscriptions", icon: CreditCard },
    ],
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      {/* Settings Navigation Sidebar */}
      <aside className="w-44 flex-shrink-0">
        <div className="sticky top-4 space-y-6">
          {settingsSections.map((section) => (
            <div key={section.group}>
              <h3 className="px-2 py-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.group}
              </h3>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
