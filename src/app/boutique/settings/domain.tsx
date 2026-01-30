"use client";
import Z1Button from "@/components/z1";

import { useState } from "react";

type Suggestion = string;

export default function DomainSettings() {
  const [domain, setDomain] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Helper: توليد subdomain من اسم المتجر
  const generateSubdomain = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 30);
  };

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuggestions([]);
    const subdomainCandidate = generateSubdomain(storeName);
    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: storeName, ownerId: "user-id-demo", domain: domain || undefined }),
      });
      const data = await res.json();
      if (data.success) {
        setSubdomain(data.store.subdomain);
        setMessage("تم إنشاء المتجر بنجاح!");
      } else if (data.error && data.error.includes("unique")) {
        // إذا الاسم غير متوفر اقترح أسماء مشابهة
        setMessage("اسم المتجر أو النطاق الفرعي غير متوفر. جرب اسماً آخر.");
        setSuggestions([
          subdomainCandidate + "-shop",
          subdomainCandidate + "-store",
          subdomainCandidate + Math.floor(Math.random() * 1000),
        ]);
      } else {
        setMessage(data.error || "حدث خطأ");
      }
    } catch {
      setMessage("فشل الاتصال بالخادم");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">إعدادات النطاق</h2>
      <form onSubmit={handleCreateStore} className="space-y-4" >
        <div>
          <label className="block mb-1 font-medium">اسم المتجر</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={storeName} onChange={e => setStoreName(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">نطاق خاص (اختياري)</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com" />
        </div>
        <div>
          <label className="block mb-1 font-medium">النطاق الفرعي (يتم توليده تلقائياً)</label>
          <input type="text" className="w-full border rounded px-3 py-2 bg-gray-100" value={generateSubdomain(storeName)} disabled />
        </div>
        <Z1Button disabled={loading}>
          {loading ? "...جاري الإنشاء" : "إنشاء المتجر"}
        </Z1Button>
      </form>
      {subdomain && (
        <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
          <div>النطاق الفرعي الخاص بك:</div>
          <div className="font-mono text-lg text-green-800">{subdomain}.platform.com</div>
          {domain && <div className="mt-2">الدومين الخاص بك: <span className="font-mono text-blue-800">{domain}</span></div>}
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
          <div className="mb-2">اقتراحات لأسماء متاحة:</div>
          <ul className="list-disc pl-6">
            {suggestions.map((s) => (
              <li key={s} className="cursor-pointer text-blue-700 hover:underline" onClick={() => setStoreName(s)}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      {message && <div className="mt-4 text-center text-red-600">{message}</div>}
    </div>
  );
}
