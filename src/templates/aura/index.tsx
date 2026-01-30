import { Product, Settings } from "@/types";
import React from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import Footer from "./Footer";
import Banner from "./sections/Banner";
import FeaturedProducts from "./sections/FeaturedProducts";
import Testimonials from "./sections/Testimonials";

const fakeTestimonials = [
  { name: "Nadia", message: "Service rapide et produits de qualité !" },
  { name: "Karim", message: "J'ai adoré mon expérience d'achat." },
];

export default function AuraTemplate({ settings, products }: { settings: Settings; products: Product[] }) {
  // مثال: المنتجات المميزة هي أول 3 منتجات
  const featured = products.slice(0, 3);
  return (
    <div style={{ background: settings?.mainColor || "#fff" }} className="min-h-screen flex flex-col" lang="fr">
      <Header storeName={settings?.storeName || "Ma boutique"} logoUrl={settings?.logoUrl} />
      <main className="flex-1">
        <Banner title={settings?.bannerTitle || "Bienvenue dans notre boutique !"} subtitle={settings?.bannerSubtitle || "Découvrez nos meilleurs produits."} image={settings?.bannerImage || undefined} />
        <FeaturedProducts products={featured} />
        <ProductList products={products} />
        <Testimonials testimonials={fakeTestimonials} />
      </main>
      <Footer />
    </div>
  );
}
