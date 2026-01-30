"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageKey = searchParams.get("key") || "";

  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [model, setModel] = useState("default");

  useEffect(() => {
    if (pageKey) {
      const saved = typeof window !== "undefined" ? localStorage.getItem(pageKey + "-content") : null;
      const savedName = typeof window !== "undefined" ? localStorage.getItem(pageKey + "-name") : null;
      const savedSlug = typeof window !== "undefined" ? localStorage.getItem(pageKey + "-slug") : null;
      const savedModel = typeof window !== "undefined" ? localStorage.getItem(pageKey + "-model") : null;
      if (saved) {
        setTimeout(() => setContent(saved), 0);
      }
      else if (pageKey === "retours-echanges") setTimeout(() => setContent("Retours & échanges"), 0);
      else if (pageKey === "contactez-nous") setTimeout(() => setContent("Contactez nous"), 0);
      else if (pageKey === "politique-confidentialite") setTimeout(() => setContent("Politique de Confidentialité"), 0);
      else if (pageKey === "conditions-utilisation") setTimeout(() => setContent("Conditions d'utilisation"), 0);
      else if (pageKey === "a-propos") setTimeout(() => setContent("À propos"), 0);
      else if (pageKey === "methodes-paiement") setTimeout(() => setContent("Méthodes de payement"), 0);
      else if (pageKey === "expedition-manutention") setTimeout(() => setContent("Expedition et manutention"), 0);
      else if (pageKey === "aide-faq") setTimeout(() => setContent("Aide & FAQ"), 0);
      if (savedName) setTimeout(() => setName(savedName), 0);
      else if (pageKey) setTimeout(() => setName(pageKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())), 0);
      if (savedSlug) setTimeout(() => setSlug(savedSlug), 0);
      else setTimeout(() => setSlug(pageKey), 0);
      if (savedModel) setTimeout(() => setModel(savedModel), 0);
      else setTimeout(() => setModel("default"), 0);
    }
  }, [pageKey]);

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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Modifier la page</h1>
      <div className="mb-8 border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Contenu de la page</h2>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Nom</label>
          <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Slug</label>
          <input className="w-full border rounded px-3 py-2" value={slug} onChange={e => setSlug(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Modèle</label>
          <input className="w-full border rounded px-3 py-2" value={model} onChange={e => setModel(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Corps</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[200px] font-mono"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col md:absolute md:right-8 md:top-24 md:w-72 bg-white border rounded-lg p-4 mb-8 md:mb-0">
        <h3 className="font-bold mb-4">Visibilité</h3>
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" checked readOnly className="accent-pink-600" />
          Afficher la page
        </label>
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" className="accent-pink-600" />
          Définir comme page d&apos;accueil
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked readOnly className="accent-pink-600" />
          Afficher l&apos;en-tête et le pied de page
        </label>
      </div>
      <div className="flex gap-4 justify-end mt-8">
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded font-bold hover:bg-pink-700"
          onClick={handleSave}
        >
          Sauvegarder
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-300"
          onClick={() => router.back()}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
