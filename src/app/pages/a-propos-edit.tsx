"use client";
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditAPropos() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("À propos");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("a-propos-content");
      if (saved) setTimeout(() => setContent(saved), 0);
    }
  }, []);
  const [editorFontSize, setEditorFontSize] = useState(16);
  return (
    <div style={{ position: 'relative', maxWidth: 800, margin: '48px auto 0 auto' }}>
      <button
        type="button"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: '#188a3a',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '12px 32px',
          fontSize: 18,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 2px 8px #43e97b55',
          cursor: 'pointer',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#fff" strokeWidth="2" fill="none"/>
          <rect x="7" y="15" width="6" height="4" rx="1" stroke="#fff" strokeWidth="2" fill="none"/>
          <rect x="7" y="7" width="6" height="4" rx="1" stroke="#fff" strokeWidth="2" fill="none"/>
          <rect x="15" y="7" width="2" height="2" rx="0.5" stroke="#fff" strokeWidth="2" fill="none"/>
          <path d="M16 3v5a1 1 0 0 0 1 1h5" stroke="#fff" strokeWidth="2" fill="none"/>
        </svg>
        Enregistrer
      </button>
      <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-8">
        <h1 className="text-2xl font-bold mb-6">Modifier la page</h1>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Nom</label>
          <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Contenu</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button type="button" onClick={() => setEditorFontSize(f => Math.max(12, f - 2))} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f8f9fa', fontSize: 16, cursor: 'pointer' }}>A-</button>
            <button type="button" onClick={() => setEditorFontSize(f => Math.min(32, f + 2))} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f8f9fa', fontSize: 16, cursor: 'pointer' }}>A+</button>
          </div>
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            style={{ height: 240, fontSize: editorFontSize }}
          />
        </div>
      </div>
    </div>
  );
}
