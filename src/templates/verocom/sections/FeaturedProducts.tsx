import Image from "next/image";
import { Product } from "../../../types";
import React from "react";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-[#0a355d]">Produits en vedette</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white shadow flex flex-col items-center">
            <Image src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded mb-2" width={96} height={96} />
            <h4 className="text-lg font-semibold mb-1 text-[#0a355d]">{product.name}</h4>
            <span className="text-[#0a355d] font-bold mb-2">{product.price} DT</span>
            <button className="bg-[#0a355d] text-white px-4 py-2 rounded">Ajouter au panier</button>
          </div>
        ))}
      </div>
    </section>
  );
}
