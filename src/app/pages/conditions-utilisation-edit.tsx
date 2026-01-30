"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditConditionsUtilisation() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("Conditions d'utilisation");
  const [slug, setSlug] = useState("conditions-utilisation");
  const [model, setModel] = useState("default");
  const router = useRouter();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("conditions-utilisation-content") : null;
      if (saved) setTimeout(() => setContent(saved), 0);
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("conditions-utilisation-content", content);
    }
    router.push("/pages/conditions-utilisation");
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
          className="w-full border rounded px-3 py-2 min-h-[200px] font-mono input-placeholder-normal"
          value={content}
          onChange={e => setContent(e.target.value)}
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
          onClick={() => router.push("/pages/conditions-utilisation")}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
