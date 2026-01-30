"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import $ from 'jquery';
if (typeof window !== 'undefined') {
  (window as unknown as { $: typeof $; jQuery: typeof $ }).$ = $;
  (window as unknown as { $: typeof $; jQuery: typeof $ }).jQuery = $;
  // import('bootstrap');
}
import { useRouter } from "next/navigation";

export default function EditPolitiqueConfidentialite() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("Politique de Confidentialité");
  const [slug, setSlug] = useState("politique-confidentialite");
  const [model, setModel] = useState("default");
  const [lang, setLang] = useState('fr');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('lang');
      if (storedLang) setTimeout(() => setLang(storedLang), 0);
    }
  }, []);
  const router = useRouter();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("politique-confidentialite-content") : null;
    if (saved) setTimeout(() => setContent(saved), 0);
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("politique-confidentialite-content", content);
    }
    router.push("/pages/politique-confidentialite");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Modifier la page</h1>
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
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={10}
        />
      </div>
      <div className="flex gap-4 justify-end">
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded font-bold hover:bg-pink-700"
          onClick={handleSave}
        >
          Sauvegarder
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-300"
          onClick={() => router.push("/pages/politique-confidentialite")}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
