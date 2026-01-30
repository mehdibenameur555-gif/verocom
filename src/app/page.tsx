
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

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-2xl flex-col items-center justify-center py-32 px-8 bg-white dark:bg-black">
        <h1 className="text-3xl font-bold mb-8 text-center">مرحبًا بك في منصتنا 👋</h1>
        <p className="mb-6 text-lg text-center">هذه قائمة الصفحات المهمة التي ننصحك بزيارتها كمستخدم جديد:</p>
        <ul className="space-y-4 w-full">
          {staticPages.map((page) => (
            <li key={page.href} className="w-full">
              <Link href={page.href} className="block w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 text-lg font-semibold hover:bg-blue-100 transition">
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
