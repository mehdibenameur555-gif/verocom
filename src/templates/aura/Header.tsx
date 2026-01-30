import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header({ storeName, logoUrl }: { storeName: string; logoUrl?: string }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-3">
        {/* استخدم next/image لتحسين الأداء */}
        {logoUrl && (
          <Image src={logoUrl} alt="Logo" className="h-10 w-10 object-contain" width={40} height={40} />
        )}
        <span className="text-2xl font-bold text-blue-900">{storeName}</span>
      </div>
      <nav className="flex gap-6">
        <Link href="/" className="text-blue-700 hover:underline">Accueil</Link>
        <Link href="/products" className="text-blue-700 hover:underline">Produits</Link>
        <Link href="/about" className="text-blue-700 hover:underline">À propos</Link>
        <Link href="/contact" className="text-blue-700 hover:underline">Contact</Link>
      </nav>
      <Link href="/cart" className="text-blue-700 font-bold">Panier</Link>
    </header>
  );
}
