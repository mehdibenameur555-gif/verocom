"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Image as ImageIcon,
  Facebook,
  X,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  products: number;
  banner: string;
  status: "published" | "draft";
  adLink: string;
};

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Électronique",
    products: 12,
    banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop",
    status: "published",
    adLink: "",
  },
  {
    id: 2,
    name: "Vêtements",
    products: 25,
    banner: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=200&fit=crop",
    status: "published",
    adLink: "",
  },
  {
    id: 3,
    name: "Décoration",
    products: 18,
    banner: "https://images.unsplash.com/photo-1578500494035-246bc9881df2?w=400&h=200&fit=crop",
    status: "published",
    adLink: "",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    setEditingCategory({
      id: Date.now(),
      name: "",
      products: 0,
      banner: "",
      status: "published",
      adLink: "",
    });
    setShowModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory({ ...category });
    setShowModal(true);
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;

    if (categories.find((c) => c.id === editingCategory.id)) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? editingCategory : cat))
      );
    } else {
      setCategories((prev) => [...prev, editingCategory]);
    }

    setShowModal(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryToDelete.id));
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-8 text-base">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">Catégories</h1>
          <p className="text-lg text-gray-600 mt-2">Gérez les catégories de vos produits</p>
        </div>
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-base"
        >
          <Plus className="w-6 h-6" />
          Ajouter une catégorie
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 px-5 text-base bg-white border-2 border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Nom</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Produits</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Bannière</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Lien des annonces
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-gray-900">{category.name}</td>
                <td className="py-4 px-4 text-gray-600">
                  {category.products === 0 ? "-" : category.products}
                </td>
                <td className="py-4 px-4">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Affiché
                  </span>
                </td>
                <td className="py-4 px-4">
                  <a
                    href={category.adLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Voir"
                    >
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCategoryToDelete(category)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  Aucune catégorie trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      {showModal && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {categories.find((c) => c.id === editingCategory.id)
                  ? "Modifier la catégorie"
                  : "Ajouter une catégorie"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCategory(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  placeholder="Ex: Électronique"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lien des annonces
                </label>
                <input
                  type="url"
                  value={editingCategory.adLink}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, adLink: e.target.value })
                  }
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={editingCategory.status}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      status: e.target.value as "published" | "draft",
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="published">Affiché</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bannière
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Cliquez pour télécharger une image
                  </p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCategory(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveCategory}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold text-white hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Supprimer la catégorie</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Êtes-vous sûr de vouloir supprimer "{categoryToDelete.name}" ? Cette action
                  est irréversible.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700 transition-all"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
