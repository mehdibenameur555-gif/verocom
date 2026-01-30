
"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Copy,
  Download,
  Filter,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Printer,
  QrCode,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { useLocaleStore } from "@/lib/locale";

type OrderStatus =
  | "pending"
  | "waiting"
  | "confirmed"
  | "ready"
  | "shipped"
  | "delivered"
  | "return"
  | "canceled";

type Order = {
  id: number;
  client: string;
  reference: string;
  status: OrderStatus;
  total: string;
  products: string;
  createdAt: string;
  phone: string;
  governorate: string;
  source: string;
};

type StatusConfig = {
  label: string;
  bg: string;
  text: string;
};

const statusConfig: Record<OrderStatus, StatusConfig> = {
  pending: { label: "Panier abandonné", bg: "bg-orange-100", text: "text-orange-700" },
  waiting: { label: "En attente", bg: "bg-amber-100", text: "text-amber-700" },
  confirmed: { label: "Confirmées", bg: "bg-sky-100", text: "text-sky-700" },
  ready: { label: "Prêt à expédier", bg: "bg-indigo-100", text: "text-indigo-700" },
  shipped: { label: "Expédiées", bg: "bg-cyan-100", text: "text-cyan-700" },
  delivered: { label: "Livrées", bg: "bg-emerald-100", text: "text-emerald-700" },
  return: { label: "Retour non reçues", bg: "bg-rose-100", text: "text-rose-700" },
  canceled: { label: "Annulées", bg: "bg-red-100", text: "text-red-700" },
};

const initialOrders: Order[] = [];

const filtersSources = ["Toutes les sources", "Facebook", "Whatsapp", "Instagram", "Site web"];
const filtersGovs = ["Tous les gouvernorats", "Tunis", "Ariana", "Sousse", "Sfax", "Ben Arous"];
const filtersShippers = ["Tous les livreurs", "DHL", "Aramex", "Local"];
const filtersPrint = ["Impression", "A4", "A5", "Ticket"];

export default function OrdersPage() {
  useLocaleStore();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState(filtersSources[0]);
  const [govFilter, setGovFilter] = useState(filtersGovs[0]);
  const [shipperFilter, setShipperFilter] = useState(filtersShippers[0]);
  const [printFilter, setPrintFilter] = useState(filtersPrint[0]);
  const [bulkStatus, setBulkStatus] = useState<OrderStatus | "">("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = `${order.client} ${order.reference} ${order.products}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesSource = sourceFilter === filtersSources[0] || order.source === sourceFilter;
      const matchesGov = govFilter === filtersGovs[0] || order.governorate === govFilter;
      const matchesShipper = shipperFilter === filtersShippers[0];
      return matchesSearch && matchesSource && matchesGov && matchesShipper;
    });
  }, [orders, search, sourceFilter, govFilter, shipperFilter]);

  const toggleSelectAll = () => {
    if (selected.length === filteredOrders.length) {
      setSelected([]);
    } else {
      setSelected(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const updateStatus = (id: number, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const applyBulkStatus = () => {
    if (!bulkStatus || selected.length === 0) return;
    setOrders((prev) => prev.map((o) => (selected.includes(o.id) ? { ...o, status: bulkStatus } : o)));
    setActionMessage(`Statut mis à jour (${selected.length}) vers ${statusConfig[bulkStatus].label}`);
  };

  const runAction = (label: string) => {
    const count = selected.length || filteredOrders.length;
    setActionMessage(`${label} appliqué sur ${count} commande(s)`);
  };

  return (
    <div className="space-y-8 text-base">
      {actionMessage && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {actionMessage}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">
        <StatCard label="Toutes les CMD" value={0} color="bg-sky-50 text-sky-700" icon={<ShoppingCart className="h-5 w-5" />} />
        <StatCard label="Panier abandonné" value={0} color="bg-orange-50 text-orange-700" icon={<ShoppingCart className="h-5 w-5" />} />
        <StatCard label="En attente" value={0} color="bg-amber-50 text-amber-700" icon={<ShoppingCart className="h-5 w-5" />} />
        <StatCard label="Confirmées" value={0} color="bg-sky-50 text-sky-700" icon={<ShoppingCart className="h-5 w-5" />} />
        <StatCard label="Prêt à expédier" value={0} color="bg-indigo-50 text-indigo-700" icon={<Truck className="h-5 w-5" />} />
        <StatCard label="Expédiées" value={0} color="bg-cyan-50 text-cyan-700" icon={<Truck className="h-5 w-5" />} />
        <StatCard label="Livrées" value={0} color="bg-emerald-50 text-emerald-700" icon={<Truck className="h-5 w-5" />} />
        <StatCard label="Annulées" value={0} color="bg-red-50 text-red-700" icon={<ShoppingCart className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
          <input
            className="w-full rounded-lg border-2 border-slate-200 bg-white px-12 py-4 text-base text-slate-800 placeholder:text-slate-400 focus:border-[#1e40af] focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Rechercher par client, référence, produit"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={sourceFilter} onChange={setSourceFilter} options={filtersSources} icon={<ChevronDown className="h-4 w-4" />} />
        <Select value={govFilter} onChange={setGovFilter} options={filtersGovs} icon={<ChevronDown className="h-4 w-4" />} />
        <Select value={shipperFilter} onChange={setShipperFilter} options={filtersShippers} icon={<ChevronDown className="h-4 w-4" />} />
        <Select value={printFilter} onChange={setPrintFilter} options={filtersPrint} icon={<ChevronDown className="h-4 w-4" />} />
        <button className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition hover:border-[#1e40af]">
          Date
          <ChevronDown className="h-5 w-5" />
        </button>
        <button className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition hover:border-[#1e40af]">
          <Filter className="h-5 w-5" />
          Plus de filtres
          <ChevronDown className="h-5 w-5" />
        </button>
        <button className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition hover:border-[#1e40af]">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700">
        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 hover:border-[#1e40af] text-base">
          <Filter className="h-5 w-5" />
          Actions
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-base">
          Changer le statut
          <select
            className="rounded border border-slate-200 px-2 py-1 text-sm focus:border-[#1e40af] focus:outline-none"
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value as OrderStatus | "")}
          >
            <option value="">Choisir</option>
            {Object.entries(statusConfig).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
          <button
            className="rounded bg-[#1e3a8a] px-3 py-1 text-white transition hover:bg-[#1e40af]"
            onClick={applyBulkStatus}
          >
            Appliquer
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <ActionButton icon={<Printer className="h-4 w-4" />} label="Imprimer" onClick={() => runAction("Impression")} />
          <ActionButton icon={<Download className="h-4 w-4" />} label="Exporter" onClick={() => runAction("Export")} />
          <ActionButton icon={<Truck className="h-4 w-4" />} label="Livreur" onClick={() => runAction("Assignation livreur")} />
          <ActionButton icon={<QrCode className="h-4 w-4" />} label="Douchette" onClick={() => runAction("Douchette")} />
          <ActionButton icon={<Copy className="h-4 w-4" />} label="Dupliquées" onClick={() => runAction("Duplication")} />
        </div>
        <div className="ml-auto text-sm font-semibold text-slate-500">Organiser le tableau</div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-800">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-3 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-[#1e40af] focus:ring-[#1e40af]"
                    checked={selected.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-3 py-3 text-left">Client</th>
                <th className="px-3 py-3 text-left">Référence</th>
                <th className="px-3 py-3 text-left">Etat</th>
                <th className="px-3 py-3 text-left">Total</th>
                <th className="px-3 py-3 text-left">Produits</th>
                <th className="px-3 py-3 text-left">Créée le</th>
                <th className="px-3 py-3 text-left">Tél</th>
                <th className="px-3 py-3 text-left">Transport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status];
                return (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-[#1e40af] focus:ring-[#1e40af]"
                        checked={selected.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                      />
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-900">{order.client}</td>
                    <td className="px-3 py-3 text-slate-700">{order.reference}</td>
                    <td className="px-3 py-3">
                      <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                        <select
                          className="text-xs font-semibold text-slate-700 focus:border-[#1e40af] focus:outline-none"
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                        >
                          {Object.entries(statusConfig).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-900">{order.total}</td>
                    <td className="px-3 py-3 text-slate-700">{order.products}</td>
                    <td className="px-3 py-3 text-slate-600">{order.createdAt}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone className="h-4 w-4 text-slate-400" />
                        {order.phone}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <button className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-700">
                        <MessageCircle className="h-4 w-4" />
                        Whatsapp
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-sm text-slate-500">
                    Aucune commande trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
};

function StatCard({ label, value, color, icon }: StatCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <div className="rounded-full bg-slate-100 p-3 text-slate-600">{icon}</div>
    </div>
  );
}

type SelectProps = {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  icon?: React.ReactNode;
};

function Select({ value, onChange, options, icon }: SelectProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm">
      <select
        className="w-full bg-transparent text-base font-semibold text-slate-700 focus:border-[#1e40af] focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {icon}
    </div>
  );
}

type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-base transition hover:border-[#1e40af]"
    >
      {icon}
      {label}
    </button>
  );
}
