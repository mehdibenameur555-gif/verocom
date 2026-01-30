"use client";

import { Search, Filter, Shield, Mail, Calendar, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      name: "Ahmed Ben Ali",
      email: "ahmed@example.com",
      role: "Vendeur",
      store: "TechStore Tunisia",
      joined: "2023-01-15",
      status: "active",
      orders: 234,
    },
    {
      id: 2,
      name: "Fatima Mansouri",
      email: "fatima@example.com",
      role: "Vendeur",
      store: "Fashion Boutique",
      joined: "2023-03-22",
      status: "active",
      orders: 189,
    },
    {
      id: 3,
      name: "Mohamed Trabelsi",
      email: "mohamed@example.com",
      role: "Client",
      store: "-",
      joined: "2024-01-10",
      status: "active",
      orders: 12,
    },
    {
      id: 4,
      name: "Salma Khaled",
      email: "salma@example.com",
      role: "Vendeur",
      store: "Beauty Shop TN",
      joined: "2022-11-05",
      status: "active",
      orders: 312,
    },
    {
      id: 5,
      name: "Youssef Messaoudi",
      email: "youssef@example.com",
      role: "Client",
      store: "-",
      joined: "2023-06-18",
      status: "suspended",
      orders: 8,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-gray-500 mt-1 text-lg">Gérer tous les utilisateurs de la plateforme</p>
        </div>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Nouvel utilisateur
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-base text-gray-600 mb-2">Total utilisateurs</p>
          <p className="text-3xl font-bold text-gray-900">3,842</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-base text-gray-600 mb-2">Vendeurs</p>
          <p className="text-3xl font-bold text-blue-600">247</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-base text-gray-600 mb-2">Clients</p>
          <p className="text-3xl font-bold text-green-600">3,595</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-base text-gray-600 mb-2">Nouveaux (7j)</p>
          <p className="text-3xl font-bold text-purple-600">+124</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
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

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Utilisateur</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Rôle</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Boutique</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Inscrit le</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Commandes</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "Vendeur"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{user.store}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4" />
                      {user.joined}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status === "active" ? "Actif" : "Suspendu"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium">{user.orders}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
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
