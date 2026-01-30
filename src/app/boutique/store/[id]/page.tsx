"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product, Settings as StoreSettings } from "@/types";

interface StoreData {
  name: string;
  logo?: string;
  mainColor?: string;
  products: Product[];
}

interface StoreSetting {
  key: string;
  value: string;
}

export default function StoreFrontPage() {
  const params = useParams();
  const [store, setStore] = useState<StoreData | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [TemplateComponent, setTemplateComponent] = useState<React.ComponentType<{ settings: StoreSettings; products: Product[] }> | null>(null);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const res = await fetch(`/api/stores/${params.id}`);
      const settingsRes = await fetch(`/api/stores/${params.id}/settings`);
      let storeData: StoreData | null = null;
      let settingsArr: StoreSetting[] = [];
      if (res.ok) storeData = await res.json();
      if (settingsRes.ok) settingsArr = await settingsRes.json();
      const settingsObj: Record<string, string> = {};
      settingsArr.forEach((s) => (settingsObj[s.key] = s.value));
      setStore(storeData);
      setSettings(settingsObj);
      // تحميل القالب المختار ديناميكيًا
      const templateId = settingsObj.template || "aura";
      import(`@/templates/${templateId}`)
        .then((mod) => setTemplateComponent(mod.default))
        .catch(() => import("@/templates/aura").then((mod) => setTemplateComponent(mod.default)));
      setLoading(false);
    }
    fetchAll();
  }, [params.id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">جاري تحميل المتجر...</div>;
  if (!store || !TemplateComponent) return <div className="flex justify-center items-center min-h-screen text-red-500">لم يتم العثور على المتجر</div>;

  return (
    <div className="min-h-screen">
      <TemplateComponent settings={{
        ...settings,
        storeName: store.name || "",
        logoUrl: store.logo || "",
        mainColor: store.mainColor || ""
      }} products={store.products.map((p) => ({
        ...p,
        image: p.image ?? ""
      }))} />
    </div>
  );
}
