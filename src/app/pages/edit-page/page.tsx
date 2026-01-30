"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageKey = searchParams.get("key") || "";

  const getInitialContent = () => {
    if (!pageKey) return "";
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(pageKey + "-content");
      if (saved) return saved;
    }
    if (pageKey === "retours-echanges") return "Retours & échanges";
    if (pageKey === "contactez-nous") return "Contactez nous";
    if (pageKey === "politique-confidentialite") return "Politique de Confidentialité";
    if (pageKey === "conditions-utilisation") return "Conditions d'utilisation";
    if (pageKey === "a-propos") return "À propos";
    if (pageKey === "methodes-paiement") return "Méthodes de payement";
    if (pageKey === "expedition-manutention") return "Expedition et manutention";
    if (pageKey === "aide-faq") return "Aide & FAQ";
    return "";
  };
  const getInitialName = () => {
    if (!pageKey) return "";
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem(pageKey + "-name");
      if (savedName) return savedName;
    }
    return pageKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  const getInitialSlug = () => {
    if (!pageKey) return "";
    if (typeof window !== "undefined") {
      const savedSlug = localStorage.getItem(pageKey + "-slug");
      if (savedSlug) return savedSlug;
    }
    return pageKey;
  };
  const getInitialModel = () => {
    if (!pageKey) return "default";
    if (typeof window !== "undefined") {
      const savedModel = localStorage.getItem(pageKey + "-model");
      if (savedModel) return savedModel;
    }
    return "default";
  };

  const [content, setContent] = useState(getInitialContent);
  const [name, setName] = useState(getInitialName);
  const [slug, setSlug] = useState(getInitialSlug);
  const [model, setModel] = useState(getInitialModel);

  const handleSave = () => {
    if (typeof window !== "undefined" && pageKey) {
      localStorage.setItem(pageKey + "-content", content);
      localStorage.setItem(pageKey + "-name", name);
      localStorage.setItem(pageKey + "-slug", slug);
      localStorage.setItem(pageKey + "-model", model);
    }
    router.push(`/pages/${slug || pageKey}`);
  };

  return (
    <div id="placeholder-override" className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-8">
      <style>{`
        .placeholder-strong::placeholder {
          color: #111827 !important;
          opacity: 1 !important;
          font-weight: 600 !important;
          font-size: 1.1rem !important;
        }
      `}</style>
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Modifier la page</h1>
      <div className="mb-8 border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Contenu de la page</h2>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Nom de la page</label>
          <input className="w-full border rounded px-3 py-2 text-lg placeholder-override" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Slug (lien)</label>
          <input className="w-full border rounded px-3 py-2 text-lg placeholder-override" value={slug} onChange={e => setSlug(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Modèle</label>
          <input className="w-full border rounded px-3 py-2 text-lg placeholder-override" value={model} onChange={e => setModel(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Contenu de la page</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[200px] font-mono text-base placeholder-override"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Saisissez ici le contenu de la page..."
          />
        </div>
      </div>
      <div className="flex flex-col md:absolute md:right-8 md:top-24 md:w-72 bg-white border rounded-lg p-4 mb-8 md:mb-0">
        <h3 className="font-bold mb-4 text-gray-800">Visibilité</h3>
        <label className="flex items-center gap-2 mb-2 text-gray-700">
          <input type="checkbox" checked readOnly className="accent-pink-600" />
          Afficher la page
        </label>
        <label className="flex items-center gap-2 mb-2 text-gray-700">
          <input type="checkbox" className="accent-pink-600" />
          Définir comme page d&apos;accueil
        </label>
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" checked readOnly className="accent-pink-600" />
          Afficher l&apos;en-tête et le pied de page
        </label>
      </div>
      <div className="flex gap-4 justify-end mt-8">
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded font-bold hover:bg-pink-700 text-lg"
          onClick={handleSave}
        >
          Sauvegarder
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-300 text-lg"
          onClick={() => router.back()}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
