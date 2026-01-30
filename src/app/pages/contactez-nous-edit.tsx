"use client";
import { useState, useEffect } from "react";
// ...existing code...
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
// const  = dynamic(() => import('react-'), { ssr: false });
import { useRouter } from "next/navigation";

export default function EditContactezNous() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("Contactez nous");
  const [slug, setSlug] = useState("contactez-nous");
  const [model, setModel] = useState("default");
  // تم حذف متغير lang لأنه غير مستعمل فعليًا
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
        (window as unknown as { $: typeof $; jQuery: typeof $ }).$ = $;
        (window as unknown as { $: typeof $; jQuery: typeof $ }).jQuery = $;
      import('bootstrap');
      // const storedLang = localStorage.getItem('lang');
      // if (storedLang) setLang(storedLang);
    }
  }, []);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("contactez-nous-content") : null;
    if (saved) setContent(saved);
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("contactez-nous-content", content);
    }
    router.push("/pages/contactez-nous");
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
          rows={10}
          className="w-full border rounded px-3 py-2"
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
          onClick={() => router.push("/pages/contactez-nous")}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
