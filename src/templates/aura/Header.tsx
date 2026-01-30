import React from "react";

export default function Header({ storeName, logoUrl }: { storeName: string; logoUrl?: string }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-3">
        {logoUrl && <img src={logoUrl} alt="Logo" className="h-10 w-10 object-contain" />}
        <span className="text-2xl font-bold text-blue-900">{storeName}</span>
      </div>
      <nav className="flex gap-6">
        <a href="/" className="text-blue-700 hover:underline">Accueil</a>
        <a href="/products" className="text-blue-700 hover:underline">Produits</a>
        <a href="/about" className="text-blue-700 hover:underline">À propos</a>
        <a href="/contact" className="text-blue-700 hover:underline">Contact</a>
      </nav>
      <a href="/cart" className="text-blue-700 font-bold">Panier</a>
    </header>
  );
}
