import React from "react";

export default function ProductDetails({ product }: { product: any }) {
  if (!product) return <div>Produit non trouvé</div>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-blue-700 font-semibold mb-2">{product.price} DT</p>
      <p className="mb-4">{product.description}</p>
      <button className="bg-blue-700 text-white px-6 py-2 rounded">Ajouter au panier</button>
    </div>
  );
}
