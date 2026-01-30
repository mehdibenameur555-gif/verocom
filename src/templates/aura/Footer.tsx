import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-center py-4 mt-8 border-t">
      <div>Tous droits réservés &copy; {new Date().getFullYear()} - Votre boutique sur Verocom</div>
    </footer>
  );
}
