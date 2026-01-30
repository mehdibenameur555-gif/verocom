"use client";

import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import Z1Button from "@/components/z1";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function ProductsPage() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
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
  ]);
  const { locale } = useLocaleStore();
  const router = useRouter();
  const isRTL = locale === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";
  const localeKey = locale as "en" | "ar" | "fr";

  const deleteProduct = (id: string) => {
    if (confirm("هل تريد حذف هذا المنتج؟")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Add editProduct function
  const editProduct = (id: string) => {
    // Navigate to the edit page for the product
    router.push(`/products/edit/${id}`);
  };

  // Filter products based on searchTerm
  const filteredProducts = products;

  // Add toggleProductStatus function if missing
  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "نشط" ? "نفذ من المخزون" : "نشط",
            }
          : product
      )
    );
  };

  return (
    <div className="p-6">
      {/* متجر افتراضي: زر أو كارد أعلى الصفحة */}
      <div className="flex items-center gap-4 mb-8 cursor-pointer w-fit" onClick={() => router.push('/boutique/demo-store')}>
        <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center text-white text-2xl font-bold">
          M
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900 leading-tight">My Store</div>
          <div className="text-gray-500 text-sm">Store</div>
        </div>
      </div>
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-6 py-4 ${textAlign} text-sm font-semibold text-gray-700 uppercase tracking-wider`}>{t(localeKey, "colProduct")}</th>
                <th className={`px-6 py-4 ${textAlign} text-sm font-semibold text-gray-700 uppercase tracking-wider`}>{t(localeKey, "colSKU")}</th>
                <th className={`px-6 py-4 ${textAlign} text-sm font-semibold text-gray-700 uppercase tracking-wider`}>{t(localeKey, "colPrice")}</th>
                <th className={`px-6 py-4 ${textAlign} text-sm font-semibold text-gray-700 uppercase tracking-wider`}>{t(localeKey, "colInventory")}</th>
                <th className={`px-6 py-4 ${textAlign} text-sm font-semibold text-gray-700 uppercase tracking-wider`}>{t(localeKey, "colStatus")}</th>
                <th className={`px-6 py-4 ${textAlign} text-sm font-semibold text-gray-700 uppercase tracking-wider`}>{t(localeKey, "colActions")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign}`}>
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""} gap-4`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-base font-semibold text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-600">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-base font-semibold text-gray-900`}>
                    {product.sku}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-base font-semibold text-gray-900`}>
                    {product.price.toFixed(2)} DTN
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-base font-semibold text-gray-900`}>
                    {product.inventory}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign}`}>
                    <span
                      onClick={() => toggleProductStatus(product.id)}
                      className={`px-3 inline-flex text-sm leading-6 font-semibold rounded-full cursor-pointer hover:opacity-80 transition ${product.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {product.status === "نشط" ? t(localeKey, "statusActive") : t(localeKey, "statusOOS")}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-500`}>
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""} gap-2`}>
                      <Z1Button onClick={() => editProduct(product.id)}>
                        <Edit className="w-5 h-5 text-blue-600" />
                      </Z1Button>
                      <Z1Button onClick={() => deleteProduct(product.id)}>
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </Z1Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">{t(localeKey, "noProducts")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
