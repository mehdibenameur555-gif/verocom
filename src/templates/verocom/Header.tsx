import React from "react";
import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";

export default function Header({ storeName, logoUrl }: { storeName: string; logoUrl?: string }) {
  const base = "/boutiques/verocom";
  // عدد المنتجات في السلة (مثال ثابت، يمكنك ربطه بالـ state لاحقًا)
  const cartCount = 0;
  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 py-6 bg-white shadow-lg gap-4 sm:gap-0">
      <div className="flex items-center gap-5 w-full sm:w-auto justify-center sm:justify-start">
        {logoUrl && <img src={logoUrl} alt="Logo" className="h-16 w-16 object-contain" />}
        <span className="text-4xl font-extrabold text-[#0a355d]">{storeName}</span>
      </div>
      <nav className="flex flex-col sm:flex-row gap-4 sm:gap-12 w-full sm:w-auto justify-center sm:justify-start items-center">
        <Link href={`${base}`} className="text-[#0a355d] hover:underline text-2xl font-bold">Accueil</Link>
        <Link href={`${base}/products`} className="text-[#0a355d] hover:underline text-2xl font-bold">Produits</Link>
        <Link href={`${base}/about`} className="text-[#0a355d] hover:underline text-2xl font-bold">À propos</Link>
        <Link href={`${base}/contact`} className="text-[#0a355d] hover:underline text-2xl font-bold">Contact</Link>
      </nav>
      <div className="flex items-center gap-6 w-full sm:w-auto justify-center sm:justify-end">
        <Link href={`${base}/cart`} className="relative">
          <ShoppingCart size={36} strokeWidth={2.5} />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs font-bold px-2 py-0.5 border-2 border-white">
            {cartCount}
          </span>
        </Link>
        <Link href={`${base}/search`}>
          <Search size={32} strokeWidth={2.5} />
        </Link>
      </div>
    </header>
  );
}
