import ConditionalDashboardLayout from "@/components/ConditionalDashboardLayout";
import ClientHtmlLangDir from "@/components/ClientHtmlLangDir";

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientHtmlLangDir />
      <ConditionalDashboardLayout>{children}</ConditionalDashboardLayout>
    </>
  );
}
