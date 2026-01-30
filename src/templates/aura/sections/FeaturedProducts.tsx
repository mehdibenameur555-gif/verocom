import React from "react";

export default function FeaturedProducts({ products }: { products: any[] }) {
  return (
    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-blue-900">Produits en vedette</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white shadow flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded mb-2" />
            <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
            <span className="text-blue-700 font-bold mb-2">{product.price} DT</span>
            <button className="bg-blue-700 text-white px-4 py-2 rounded">Ajouter au panier</button>
          </div>
        ))}
      </div>
    </section>
  );
}
