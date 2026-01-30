"use client";
import VerocomTemplate from "@/templates/verocom";
import { useEffect, useState } from "react";
import { Product, Settings } from "@/types";

const defaultProducts = [
  {
    id: 1,
    name: "Produit 1",
    price: 49.99,
    image: "/images/verocom/product1.jpg",
    description: "Description du produit 1.",
  },
  {
    id: 2,
    name: "Produit 2",
    price: 29.99,
    image: "/images/verocom/product2.jpg",
    description: "Description du produit 2.",
  },
  {
    id: 3,
    name: "Produit 3",
    price: 19.99,
    image: "/images/verocom/product3.jpg",
    description: "Description du produit 3.",
  },
];

export default function VerocomStorePage() {
  const [settings, setSettings] = useState<Settings>({
    titre: "",
    logoUrl: "/images/verocom/logo.png",
    mainColor: "#f5f8fa",
    bannerTitle: "Bienvenue dans votre boutique !",
    bannerSubtitle: "Votre boutique professionnelle prête en quelques clics.",
    bannerImage: "/images/verocom/banner.jpg",
  });
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      let titre = "Verocom";
      try {
        const res = await fetch("/api/stores/verocom");
        if (res.ok) {
          const data = await res.json();
          titre = data.titre || data.title || titre;
          setProducts(data.products || defaultProducts);
          setSettings((prev) => ({
            ...prev,
            titre,
            logoUrl: data.logo || prev.logoUrl,
            bannerTitle: `Bienvenue sur ${titre} !`,
            ...data.settings,
          }));
          setLoading(false);
          return;
        }
      } catch {}
      // fallback: localStorage أو Verocom
      if (typeof window !== "undefined") {
        titre = window.localStorage.getItem("titre-de-la-boutique") || titre;
      }
      setSettings((prev) => ({
        ...prev,
        titre,
        bannerTitle: `Bienvenue sur ${titre} !`,
      }));
      setLoading(false);
    }
    fetchSettings();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Chargement de la boutique...</div>;

  // تمرير titre كاسم المتجر
  return <VerocomTemplate settings={{ ...settings, storeName: settings.titre || "Verocom" }} products={products} />;
}
