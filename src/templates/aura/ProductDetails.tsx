import Image from "next/image";
import React from "react";

// Define the Product type locally if not available elsewhere
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductDetails({ product }: { product: Product }) {
  if (!product) return <div>Produit non trouvé</div>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Image src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" width={256} height={256} />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-blue-700 font-semibold mb-2">{product.price} DT</p>
      <p className="mb-4">{product.description}</p>
      <button className="bg-blue-700 text-white px-6 py-2 rounded">Ajouter au panier</button>
    </div>
  );
}
