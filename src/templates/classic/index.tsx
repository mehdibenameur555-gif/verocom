import React from "react";

export default function ClassicTemplate({ settings, products }: { settings: any; products: any[] }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-gray-800 text-white flex items-center justify-between">
        <img src={settings?.logoUrl || "/images/logo.txt"} alt="Logo" className="h-10" />
        <h1 className="text-xl font-bold">{settings?.storeName || "متجري"}</h1>
      </header>
      <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg p-3 flex flex-col items-center">
            <img src={product.image || "/images/overview/classic.png"} alt={product.name} className="w-24 h-24 object-cover rounded mb-1" />
            <h2 className="text-base font-semibold mb-1">{product.name}</h2>
            <span className="text-gray-700 font-bold">{product.price} د.ت</span>
          </div>
        ))}
      </main>
    </div>
  );
}
