"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

// بيانات افتراضية للمنتجات
const demoProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    sku: "PHN-001",
    price: 3299.99,
    inventory: 45,
    status: "نشط",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=200&h=200&fit=crop",
    category: "الهواتف الذكية",
  },
  {
    id: "2",
    name: "سماعات Sony WH-1000XM5",
    sku: "AUD-002",
    price: 499.99,
    inventory: 120,
    status: "نشط",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    category: "الصوتيات",
  },
  {
    id: "3",
    name: "حقيبة Samsonite Elite",
    sku: "BAG-003",
    price: 269.99,
    inventory: 0,
    status: "نفذ من المخزون",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    category: "الحقائب",
  },
  {
    id: "4",
    name: "Apple Watch Ultra",
    sku: "WCH-004",
    price: 1099.99,
    inventory: 30,
    status: "نشط",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    category: "الساعات الذكية",
  },
];

export default function DemoStorePage() {
  const [products] = useState(demoProducts);
  const { locale } = useLocaleStore();
  const localeKey = locale as "en" | "ar" | "fr";

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">{t(localeKey, "demoStoreTitle") || "المتجر الافتراضي"}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={160}
                height={160}
                className="rounded-lg object-cover mb-4"
              />
              <div className="w-full">
                <h2 className="text-lg font-semibold mb-1 {textAlign}">{product.name}</h2>
                <p className="text-gray-500 mb-2 {textAlign}">{product.category}</p>
                <p className="text-primary font-bold mb-2 {textAlign}">{product.price.toFixed(2)} DTN</p>
                <span className={`inline-block px-3 py-1 text-xs rounded-full mb-2 ${product.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {product.status === "نشط" ? t(localeKey, "statusActive") : t(localeKey, "statusOOS")}
                </span>
                <div className="text-xs text-gray-400 {textAlign}">SKU: {product.sku}</div>
                <div className="text-xs text-gray-400 {textAlign}">المخزون: {product.inventory}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
