import React from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import Footer from "./Footer";
import Banner from "./sections/Banner";
import FeaturedProducts from "./sections/FeaturedProducts";
import Testimonials from "./sections/Testimonials";

const fakeTestimonials = [
  { name: "Sami", message: "Service client exceptionnel et livraison rapide !" },
  { name: "Leila", message: "J'ai trouvé tout ce dont j'avais besoin pour ma boutique." },
];

export default function VerocomTemplate({ settings, products }: { settings: any; products: any[] }) {
  const featured = products.slice(0, 3);
  return (
    <div style={{ background: settings?.mainColor || "#f5f8fa" }} className="min-h-screen flex flex-col" lang="fr">
      <Header storeName={settings?.storeName || "Verocom"} logoUrl={settings?.logoUrl} />
      <main className="flex-1">
        <Banner title={settings?.bannerTitle || "Bienvenue sur Verocom !"} subtitle={settings?.bannerSubtitle || "Votre boutique professionnelle prête en quelques clics."} image={settings?.bannerImage || undefined} />
        <FeaturedProducts products={featured} />
        <ProductList products={products} />
        <Testimonials testimonials={fakeTestimonials} />
      </main>
      <Footer />
    </div>
  );
}
