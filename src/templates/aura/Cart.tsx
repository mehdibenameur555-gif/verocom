import { CartItem } from "../../types";
import React from "react";

export default function Cart({ items, total }: { items: CartItem[]; total: number }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      {items.length === 0 ? (
        <div>Votre panier est vide</div>
      ) : (
        <ul className="mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.name}</span>
              <span>{item.price} DT</span>
            </li>
          ))}
        </ul>
      )}
      <div className="font-bold mb-4">Total: {total} DT</div>
      <a href="/checkout" className="bg-blue-700 text-white px-6 py-2 rounded">Passer la commande</a>
    </div>
  );
}
