"use client";
import { useState } from "react";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || "Code incorrect ou expiré");
      }
    } catch {
      setError("Erreur réseau");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#0a355d]">Vérification de l&apos;email</h1>
        <p className="text-center text-gray-600">Un code a été envoyé à votre adresse e-mail. Veuillez le saisir ci-dessous pour activer votre compte.</p>
        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">Votre compte est activé !</div>}
        <input
          type="text"
          placeholder="Code de vérification"
          className="w-full border rounded px-4 py-2 text-center tracking-widest text-lg"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
          maxLength={6}
        />
        <button
          type="submit"
          className="w-full bg-[#0a355d] text-white font-bold py-2 rounded hover:bg-blue-900 transition"
          disabled={loading}
        >
          {loading ? "Vérification..." : "Vérifier"}
        </button>
      </form>
    </div>
  );
}
