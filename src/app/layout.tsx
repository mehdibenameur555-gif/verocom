import type { Metadata } from "next";
import "./globals.css";
import ConditionalDashboardLayout from "@/components/ConditionalDashboardLayout";
import ClientHtmlLangDir from "@/components/ClientHtmlLangDir";

export const metadata: Metadata = {
  title: "Verocom - منصة التجارة الإلكترونية",
  description: "منصة متكاملة لإدارة المتاجر الإلكترونية مثل Shopify",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        <ClientHtmlLangDir />
        <ConditionalDashboardLayout>{children}</ConditionalDashboardLayout>
      </body>
    </html>
  );
}
