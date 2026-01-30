import ClassicTemplate from "@/templates/classic";
import { useEffect, useState } from "react";

export default function ClassicStorePage() {
  const [settings, setSettings] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/stores/classic");
      if (res.ok) {
        const data = await res.json();
        setSettings({
          storeName: "Classic",
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

  if (loading) return <div className="flex justify-center items-center min-h-screen">جاري تحميل متجر Classic...</div>;

  return <ClassicTemplate settings={settings} products={products} />;
}
