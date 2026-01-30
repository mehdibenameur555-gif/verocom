"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

type PageRecord = {
  id: number;
  name: string;
  type: string;
  description: string;
  link: string;
  seo: "good" | "missing";
  active: boolean;
};

const initialPages: PageRecord[] = [
  {
    id: 1,
    name: "Retours & échanges",
    type: "Normale",
    description: "Page des retours et échanges",
    link: "pages/retours-echanges",
    seo: "good",
    active: true,
  },
  {
    id: 2,
    name: "Contactez nous",
    type: "Normale",
    description: "Page de contact",
    link: "pages/contactez-nous",
    seo: "good",
    active: true,
  },
  {
    id: 3,
    name: "Politique de Confidentialité",
    type: "Normale",
    description: "Politique de confidentialité du site",
    link: "pages/politique-confidentialite",
    seo: "good",
    active: true,
  },
  {
    id: 4,
    name: "Conditions d'utilisation",
    type: "Normale",
    description: "Conditions générales d'utilisation",
    link: "pages/conditions-utilisation",
    seo: "good",
    active: true,
  },
  {
    id: 5,
    name: "À propos",
    type: "Normale",
    description: "À propos de la boutique",
    link: "pages/a-propos",
    seo: "good",
    active: true,
  },
  {
    id: 6,
    name: "Méthodes de payement",
    type: "Normale",
    description: "Méthodes de paiement acceptées",
    link: "pages/methodes-paiement",
    seo: "good",
    active: true,
  },
  {
    id: 7,
    name: "Expedition et manutention",
    type: "Normale",
    description: "Informations sur l'expédition et la manutention",
    link: "pages/expedition-manutention",
    seo: "good",
    active: true,
  },
  {
    id: 8,
    name: "Aide & FAQ",
    type: "Normale",
    description: "Questions fréquentes et aide",
    link: "pages/aide-faq",
    seo: "good",
    active: true,
  },
];

export default function PagesPage() {
  const [pages, setPages] = useState<PageRecord[]>(initialPages);
  const [search, setSearch] = useState("");
  const [editId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const router = useRouter();

  const filtered = useMemo(() => {
    return pages.filter((p) => `${p.name} ${p.link}`.toLowerCase().includes(search.toLowerCase()));
  }, [pages, search]);

  const toggleActive = (id: number) => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  // Removed unused handleEdit, handleSave, handleCancel

  return (
    <div className="space-y-8 text-base">
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-3 text-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e3a8a] text-white">📄</div>
          <div>
            <p className="text-base font-semibold text-slate-500">Gestion du contenu du site web</p>
            <p className="text-lg font-bold text-slate-900">Pages statiques</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e40af]">
          <Plus className="h-4 w-4" />
          Ajouter une page
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-semibold uppercase tracking-wide text-slate-500">Liste des pages</h3>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-lg border border-slate-200 bg-white px-9 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-[#1e40af] focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-800">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-left">Nom de la page</th>
                  <th className="px-4 py-3 text-left">Type de la page</th>
                  <th className="px-4 py-3 text-left">Description courte</th>
                  <th className="px-4 py-3 text-left">Lien de la pages</th>
                  <th className="px-4 py-3 text-left">SEO</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filtered.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <label className="inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={page.active}
                          onChange={() => toggleActive(page.id)}
                        />
                        <span
                          className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                            page.active ? "bg-[#1e3a8a]" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute h-4 w-4 rounded-full bg-white shadow transition ${
                              page.active ? "right-1" : "left-1"
                            }`}
                          />
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {page.active ? "Actif" : "Inactif"}
                        </span>
                      </label>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#1e3a8a] underline">
                      {editId === page.id ? (
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                        />
                      ) : (
                        page.name
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{page.type}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {editId === page.id ? (
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={editDescription}
                          onChange={e => setEditDescription(e.target.value)}
                        />
                      ) : (
                        page.description || "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/${page.link}`}
                        className="text-[#1e3a8a] underline hover:text-[#1e40af]"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {page.link}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <SeoBadge status={page.seo} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            let key = "";
                            if (page.link === "pages/retours-echanges") key = "retours-echanges";
                            else if (page.link === "pages/contactez-nous") key = "contactez-nous";
                            else if (page.link === "pages/politique-confidentialite") key = "politique-confidentialite";
                            else if (page.link === "pages/conditions-utilisation") key = "conditions-utilisation";
                            else if (page.link === "pages/a-propos") key = "a-propos";
                            else if (page.link === "pages/methodes-paiement") key = "methodes-paiement";
                            else if (page.link === "pages/expedition-manutention") key = "expedition-manutention";
                            else if (page.link === "pages/aide-faq") key = "aide-faq";
                            if (key) router.push(`/pages/edit-page?key=${key}`);
                          }}
                          className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-bold text-blue-700 bg-white hover:bg-blue-50 transition"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => setPages((prev) => prev.filter((p) => p.id !== page.id))}
                          className="rounded-lg border border-rose-500 px-4 py-2 text-sm font-bold text-rose-700 bg-white hover:bg-rose-50 transition"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                      Aucune page trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-between text-base text-slate-700">
          <span>Nombre de ligne(s) : {filtered.length}</span>
          <div className="flex items-center gap-2">
            <span>Page 1 de 2</span>
            <select className="rounded-lg border border-slate-200 px-3 py-1 text-sm focus:border-[#1e40af] focus:outline-none" defaultValue={10}>
              {[5, 10, 20, 50].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1">
              <button className="rounded-lg border border-slate-200 px-2 py-1 text-slate-600 hover:border-[#1e40af]">«</button>
              <button className="rounded-lg border border-slate-200 px-2 py-1 text-slate-600 hover:border-[#1e40af]">‹</button>
              <button className="rounded-lg border border-slate-200 px-2 py-1 text-slate-600 hover:border-[#1e40af]">›</button>
              <button className="rounded-lg border border-slate-200 px-2 py-1 text-slate-600 hover:border-[#1e40af]">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SeoBadgeProps = {
  status: "good" | "missing";
};

function SeoBadge({ status }: SeoBadgeProps) {
  if (status === "good") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
        <span className="rounded-full bg-white px-1.5 py-0.5 text-[11px] font-bold text-sky-700">G</span>
        BIEN
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
      <span className="rounded-full bg-white px-1.5 py-0.5 text-[11px] font-bold text-rose-700">G</span>
      NON CONFIGURÉ
    </span>
  );
}