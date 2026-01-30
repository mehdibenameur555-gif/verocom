import Link from "next/link";

const staticPages = [
  { name: "Retours & échanges", href: "/pages/retours-echanges" },
  { name: "Contactez nous", href: "/pages/contactez-nous" },
  { name: "Politique de Confidentialité", href: "/pages/politique-confidentialite" },
  { name: "Conditions d'utilisation", href: "/pages/conditions-utilisation" },
  { name: "À propos", href: "/pages/a-propos" },
  { name: "Méthodes de payement", href: "/pages/methodes-paiement" },
  { name: "Expedition et manutention", href: "/pages/expedition-manutention" },
  { name: "Aide & FAQ", href: "/pages/aide-faq" },
];

export default function PagesIndex() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold mb-4">صفحات الموقع الثابتة</h1>
      <ul className="space-y-3">
        {staticPages.map((page) => (
          <li key={page.href}>
            <Link href={page.href} className="text-blue-700 underline hover:text-blue-900 text-lg">
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
