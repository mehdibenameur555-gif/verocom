import React from "react";

export default function ProductList({ products }: { products: any[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <a key={product.id} href={`/products/${product.id}`} className="block border rounded-lg p-4 hover:shadow-lg transition">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
          <h2 className="text-lg font-bold mb-1">{product.name}</h2>
          <p className="text-blue-700 font-semibold mb-2">{product.price} DT</p>
          <button className="bg-blue-700 text-white px-4 py-2 rounded">Ajouter au panier</button>
        </a>
      ))}
    </section>
  );
}
