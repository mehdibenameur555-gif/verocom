"use client";

import { useState } from "react";
import { Edit, Trash2, Save } from "lucide-react";
import Z1Button from "@/components/z1";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function ParametersPage() {
  const { locale } = useLocaleStore();
  const [productStatuses, setProductStatuses] = useState([
    { id: 1, name: "Actif", color: "green" },
    { id: 2, name: "Actif", color: "green" },
    { id: 3, name: "Rupture de stock", color: "red" },
    { id: 4, name: "Actif", color: "green" },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newColor, setNewColor] = useState("gray");

  const handleAddStatus = () => {
    if (newStatus.trim()) {
      setProductStatuses([
        ...productStatuses,
        {
          id: Math.max(...productStatuses.map(s => s.id), 0) + 1,
          name: newStatus,
          color: newColor,
        },
      ]);
      setNewStatus("");
      setNewColor("gray");
    }
  };

  const handleDeleteStatus = (id: number) => {
    setProductStatuses(productStatuses.filter(s => s.id !== id));
  };

  const handleEditStatus = (id: number, newName: string) => {
    setProductStatuses(productStatuses.map(s =>
      s.id === id ? { ...s, name: newName } : s
    ));
    setEditingId(null);
  };

  const handleSave = () => {
    console.log("Parameters saved:", { productStatuses });
    alert("Paramètres sauvegardés avec succès!");
  };

  const getColorBadge = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'orange':
        return 'bg-orange-100 text-orange-800';
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">Paramètres des produits</h1>
          <p className="text-gray-500 mt-1">Gérez les statuts et options des produits</p>
        </div>
        <Z1Button onClick={handleSave}>
          <Save className="w-5 h-5 mr-2" />
          Enregistrer les paramètres
        </Z1Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Statuts des produits</h2>
        
        {/* Add New Status */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Ajouter un nouveau statut</h3>
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom du statut</label>
              <input
                type="text"
                placeholder="Ex: En attente de validation"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddStatus()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
              <select
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="green">Vert</option>
                <option value="red">Rouge</option>
                <option value="orange">Orange</option>
                <option value="blue">Bleu</option>
                <option value="gray">Gris</option>
              </select>
            </div>
            <button
              onClick={handleAddStatus}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* Product Statuses Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COULEUR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productStatuses.map((status) => (
                <tr key={status.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === status.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleEditStatus(status.id, editValue)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleEditStatus(status.id, editValue);
                          }
                        }}
                        autoFocus
                        className="px-3 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${getColorBadge(status.color)}`}>
                        {status.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 capitalize">{
                      status.color === 'green' ? 'Vert' :
                      status.color === 'red' ? 'Rouge' :
                      status.color === 'orange' ? 'Orange' :
                      status.color === 'blue' ? 'Bleu' :
                      'Gris'
                    }</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingId(status.id); setEditValue(status.name); }}
                        className="p-2 bg-white border border-gray-300 rounded hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
                        title="Éditer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStatus(status.id)}
                        className="p-2 bg-white border border-gray-300 rounded hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {productStatuses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun statut de produit configuré</p>
          </div>
        )}
      </div>

	  {/* Save Button (تم نقله للأعلى) */}
    </div>
  );
}
