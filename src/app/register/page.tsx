"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", password: "" });
      } else {
        const data = await res.json();
        setError(data.message || "Erreur lors de l'inscription");
      }
    } catch {
      setError("Erreur réseau");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#0a355d]">Créer un compte</h1>
        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">Inscription réussie !</div>}
        <input
          type="text"
          placeholder="Nom de la boutique"
          className="w-full border rounded px-4 py-2"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          type="email"
          placeholder="Adresse e-mail"
          className="w-full border rounded px-4 py-2"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border rounded px-4 py-2"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#0a355d] text-white font-bold py-2 rounded hover:bg-blue-900 transition"
          disabled={loading}
        >
          {loading ? "Création..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
