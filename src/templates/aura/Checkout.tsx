import React from "react";

export default function Checkout() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Passer la commande</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Nom complet" className="w-full border rounded px-4 py-2" required />
        <input type="text" placeholder="Adresse" className="w-full border rounded px-4 py-2" required />
        <input type="tel" placeholder="Téléphone" className="w-full border rounded px-4 py-2" required />
        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded">Confirmer la commande</button>
      </form>
    </div>
  );
}
