"use client";

import { useState } from "react";
import { Edit, Plus } from "lucide-react";

type Transaction = {
  id: number;
  date: string;
  price: string;
  addedBalance: string;
  status: "bonus" | "payment" | "refund";
  description: string;
};

type CompanyDetails = {
  companyName: string;
  tvaNumber: string;
  address: string;
};

const initialTransactions: Transaction[] = [];

export default function FacturesPage() {
  const [activeTab, setActiveTab] = useState<"facturation" | "factures" | "abonnement">(
    "facturation"
  );
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: "",
    tvaNumber: "",
    address: "",
  });
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [balance] = useState("0.00");
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "bonus":
        return "bg-purple-100 text-purple-700";
      case "payment":
        return "bg-blue-100 text-blue-700";
      case "refund":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "bonus":
        return "Bonus";
      case "payment":
        return "Paiement";
      case "refund":
        return "Remboursement";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8 text-base">
      {/* Tabs */}
      <div className="flex gap-3 bg-gray-100 p-2 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("facturation")}
          className={`px-7 py-3 rounded-lg font-semibold transition-all text-base ${
            activeTab === "facturation"
              ? "bg-purple-600 text-white shadow-md"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          Facturation
        </button>
        <button
          onClick={() => setActiveTab("factures")}
          className={`px-7 py-3 rounded-lg font-semibold transition-all text-base ${
            activeTab === "factures"
              ? "bg-purple-600 text-white shadow-md"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          Factures
        </button>
        <button
          onClick={() => setActiveTab("abonnement")}
          className={`px-7 py-3 rounded-lg font-semibold transition-all text-base ${
            activeTab === "abonnement"
              ? "bg-purple-600 text-white shadow-md"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          Abonnement
        </button>
      </div>

      {activeTab === "facturation" && (
        <div className="flex gap-6">
          {/* Left Side - Company Details */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Détails de l&apos;entreprise
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Nom de la société</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyDetails.companyName}
                      onChange={(e) =>
                        setCompanyDetails({ ...companyDetails, companyName: e.target.value })
                      }
                      className="px-3 py-1 border border-gray-300 rounded text-right"
                    />
                  ) : (
                    <span className="font-semibold text-gray-900">
                      {companyDetails.companyName}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Numéro de TVA</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyDetails.tvaNumber}
                      onChange={(e) =>
                        setCompanyDetails({ ...companyDetails, tvaNumber: e.target.value })
                      }
                      className="px-3 py-1 border border-gray-300 rounded text-right"
                    />
                  ) : (
                    <span className="font-semibold text-gray-900">
                      {companyDetails.tvaNumber}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Adresse</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyDetails.address}
                      onChange={(e) =>
                        setCompanyDetails({ ...companyDetails, address: e.target.value })
                      }
                      className="px-3 py-1 border border-gray-300 rounded text-right"
                    />
                  ) : (
                    <span className="font-semibold text-gray-900">
                      {companyDetails.address}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Prix</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Solde ajouté
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        {transaction.price}
                      </td>
                      <td className="py-4 px-4 text-gray-600">{transaction.addedBalance}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {getStatusLabel(transaction.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{transaction.description}</td>
                      <td className="py-4 px-4 text-gray-600">-</td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        Aucune transaction trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - Balance Card */}
          <div className="w-80">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-semibold mb-4">Mon solde</h3>
              <div className="text-5xl font-bold mb-6 text-purple-600">{balance} TND</div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <Plus className="w-5 h-5" />
                Ajouter un solde
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "factures" && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600 text-center">Liste des factures à venir...</p>
        </div>
      )}

      {activeTab === "abonnement" && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600 text-center">Détails de l&apos;abonnement à venir...</p>
        </div>
      )}
    </div>
  );
}
