"use client";

import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";

export default function ConditionalDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isThemeCustomize = pathname.startsWith("/boutique/theme-customize");
  const isPublicStore = pathname.startsWith("/boutiques");
  if (isAdmin || isThemeCustomize || isPublicStore) {
    return <>{children}</>;
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
