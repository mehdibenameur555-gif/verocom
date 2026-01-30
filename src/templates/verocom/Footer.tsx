import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a355d] text-center py-4 mt-8 border-t text-white">
      <div>Tous droits réservés &copy; {new Date().getFullYear()} - Verocom</div>
    </footer>
  );
}
