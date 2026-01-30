"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  ShoppingCart,
  Package,
  Users,
  Store,
  BarChart3,
  FileText,
  PlugZap,
  BookOpen,
  Globe2,
  Palette,
  Layers,
  FileCode2,
  ChevronDown,
  Settings,
  Grid3x3,
  Plus,
  Tag,
  CreditCard,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PremiumHeader from "./PremiumHeader";
import Image from "next/image";
import { useEffect } from "react";
import { useLocaleStore } from "@/lib/locale";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Rechercher", href: "/recherche", icon: Search },
  { label: "Commandes", href: "/orders", icon: ShoppingCart },
  { label: "Produits", href: "/products", icon: Package },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Ma boutique", href: "/boutique/pages", icon: Store },
  { label: "Statistiques", href: "/stats", icon: BarChart3 },
  { label: "Factures", href: "/factures", icon: FileText },
  { label: "Documentation", href: "/docs", icon: BookOpen },
  { label: "Intégrations", href: "/settings/integrations", icon: PlugZap },
];

const boutiqueSections = [
  { label: "Domaine", href: "/boutique/domain", icon: Globe2 },
  { label: "Thème", href: "/boutique/theme", icon: Palette },
  { label: "Modèles", href: "/boutique/modeles", icon: Layers },
  { label: "Pages", href: "/boutique/pages", icon: FileCode2 },
  { label: "Express Checkout", href: "/boutique/express-checkout", icon: CreditCard },
];

const productSections = [
  { label: "Tous les produits", href: "/products", icon: Grid3x3 },
  { label: "Nouveau produit", href: "/products/new", icon: Plus },
  { label: "Catégories", href: "/products/categories", icon: Tag },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale } = useLocaleStore();
  const sidebarIsRTL = locale === "ar";
  const alignClass = sidebarIsRTL ? "flex-row-reverse text-right" : "text-left";

  const [boutiqueOpen, setBoutiqueOpen] = useState(pathname.startsWith("/boutique"));
  const [productsOpen, setProductsOpen] = useState(pathname.startsWith("/products"));
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/logo')
      .then(res => res.json())
      .then(data => {
        if (data.dataUrl) setCustomLogo(data.dataUrl);
      });
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollY(target.scrollTop);
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 150);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-80 bg-[#0a355d] text-white flex flex-col overflow-y-auto z-40 transition-transform duration-300 ease-in-out scrollbar-hidden",
        isScrolling && scrollY > 50 ? "-translate-y-full" : "translate-y-0"
      )}>
        <div className="px-4 py-3 text-4xl font-bold tracking-tight border-b border-white/10 flex items-center gap-2 min-h-0">
          {customLogo ? (
            <Image src={customLogo} alt="Logo" width={36} height={36} />
          ) : (
            <Image src="/images/overview/overview-1.svg" alt="Logo" width={36} height={36} />
          )}
          <span className="text-xl">Verocom</span>
        </div>

        <nav className="flex-1 px-3 py-6 pb-5 space-y-4">
          {navigation.map((item) => {
            const isBoutique = item.href.startsWith("/boutique");
            const isProducts = item.href.startsWith("/products");
            const isActive = pathname === item.href || (isBoutique && pathname.startsWith("/boutique")) || (isProducts && pathname.startsWith("/products"));

            if (isBoutique) {
              return (
                <div key={item.href} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setBoutiqueOpen((prev) => !prev);
                      setProductsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 text-2xl font-bold rounded-lg transition-colors",
                      alignClass,
                      isActive ? "bg-white/15" : "hover:bg-white/10"
                    )}
                  >
                    <item.icon className="w-7 h-7 flex-shrink-0" />
                    <span className="flex-1 text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        boutiqueOpen ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>

                  {boutiqueOpen && (
                    <div className={cn("space-y-2 mt-2 bg-[#17416b] rounded-lg", sidebarIsRTL ? "pr-4" : "pl-4")}> 
                       {boutiqueSections.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-1 text-sm font-medium rounded-lg transition-colors",
                              alignClass,
                              childActive ? "bg-white/15" : "hover:bg-white/10"
                            )}
                          >
                            <child.icon className="w-4 h-4 flex-shrink-0" />
                             <span className="flex-1 text-lg font-bold" style={{ fontFamily: 'Lato, sans-serif' }}>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            if (isProducts) {
              return (
                <div key={item.href} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProductsOpen((prev) => !prev);
                      setBoutiqueOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-4 text-2xl font-bold rounded-lg transition-colors",
                      alignClass,
                      isActive ? "bg-white/15" : "hover:bg-white/10"
                    )}
                  >
                    <item.icon className="w-7 h-7 flex-shrink-0" />
                     <span className="flex-1 text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform",
                        productsOpen ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>

                  {productsOpen && (
                    <div className={cn("space-y-2 mt-2 bg-[#17416b] rounded-lg", sidebarIsRTL ? "pr-4" : "pl-4")}> 
                      {productSections.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                              alignClass,
                              childActive ? "bg-white/15" : "hover:bg-white/10"
                            )}
                          >
                            <child.icon className="w-4 h-4 flex-shrink-0" />
                             <span className="flex-1 text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-1 text-base font-semibold rounded-lg transition-colors",
                  alignClass,
                  isActive ? "bg-white/15" : "hover:bg-white/10"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                 <span className="flex-1 text-lg font-bold" style={{ fontFamily: 'Lato, sans-serif' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/settings/subscriptions"
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-base font-semibold rounded-lg transition-colors",
              alignClass,
              pathname === "/settings/subscriptions" ? "bg-white/15" : "hover:bg-white/10"
            )}
          >
            <CreditCard className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-lg font-bold" style={{ fontFamily: 'Lato, sans-serif' }}>Abonnement</span>
          </Link>
          <Link
            href="/settings/general"
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-base font-semibold rounded-lg transition-colors",
              alignClass,
              pathname.startsWith("/settings") && pathname !== "/settings/subscriptions" ? "bg-white/15" : "hover:bg-white/10"
            )}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-lg font-bold" style={{ fontFamily: 'Lato, sans-serif' }}>Paramètres</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen ml-80" onScroll={handleScroll}>
        <PremiumHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
