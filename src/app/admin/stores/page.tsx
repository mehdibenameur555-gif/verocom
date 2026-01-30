"use client";

import { Search, Filter, Store, MapPin, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function AdminStoresPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const stores = [
    {
      id: 1,
      name: "TechStore Tunisia",
      owner: "Ahmed Ben Ali",
      email: "ahmed@techstore.tn",
      status: "active",
      orders: 234,
      revenue: "45,890 TND",
      created: "2023-01-15",
      city: "Tunis",
    },
    {
      id: 2,
      name: "Fashion Boutique",
      owner: "Fatima Mansouri",
      email: "fatima@fashion.tn",
      status: "active",
      orders: 189,
      revenue: "32,450 TND",
      created: "2023-03-22",
      city: "Sfax",
    },
    {
      id: 3,
      name: "Electronics Hub",
      owner: "Mohamed Trabelsi",
      email: "mohamed@electronics.tn",
      status: "pending",
      orders: 45,
      revenue: "12,340 TND",
      created: "2024-01-10",
      city: "Sousse",
    },
    {
      id: 4,
      name: "Beauty Shop TN",
      owner: "Salma Khaled",
      email: "salma@beauty.tn",
      status: "active",
      orders: 312,
      revenue: "67,230 TND",
      created: "2022-11-05",
      city: "Ariana",
    },
    {
      id: 5,
      name: "Home Decor Plus",
      owner: "Youssef Messaoudi",
      email: "youssef@homedecor.tn",
      status: "suspended",
      orders: 87,
      revenue: "18,920 TND",
      created: "2023-06-18",
      city: "Monastir",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">Gestion des boutiques</h1>
          <p className="text-gray-500 mt-1 text-lg">Gérer toutes les boutiques de la plateforme</p>
        </div>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2">
          <Store className="w-5 h-5" />
          Approuver nouvelles boutiques
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-base text-gray-600 mb-2">Total boutiques</p>
          <p className="text-3xl font-bold text-gray-900">247</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-base text-gray-600 mb-2">Actives</p>
          <p className="text-3xl font-bold text-green-600">189</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-base text-gray-600 mb-2">En attente</p>
          <p className="text-3xl font-bold text-yellow-600">45</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-base text-gray-600 mb-2">Suspendues</p>
          <p className="text-3xl font-bold text-red-600">13</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une boutique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Boutique</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Propriétaire</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Ville</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Commandes</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Revenu</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Créée le</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Store className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{store.name}</p>
                        <p className="text-sm text-gray-500">{store.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{store.owner}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {store.city}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        store.status === "active"
                          ? "bg-green-100 text-green-700"
                          : store.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {store.status === "active"
                        ? "Active"
                        : store.status === "pending"
                        ? "En attente"
                        : "Suspendue"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium">{store.orders}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      {store.revenue}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4" />
                      {store.created}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                      Gérer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
