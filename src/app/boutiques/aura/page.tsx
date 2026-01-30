"use client";
import AuraTemplate from "@/templates/aura";
import { useEffect, useState } from "react";

export default function AuraStorePage() {
  const [settings, setSettings] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/stores/aura");
      if (res.ok) {
        const data = await res.json();
        setSettings({
          storeName: "Aura",
          logoUrl: data.logo,
          mainColor: data.mainColor,
          ...data.settings,
        });
        setProducts(data.products);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">جاري تحميل متجر Aura...</div>;

  return <AuraTemplate settings={settings} products={products} />;
}
