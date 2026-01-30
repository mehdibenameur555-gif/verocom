"use client";

import { Search as SearchIcon, Loader, CheckCircle, AlertCircle, XCircle, Phone, Mail, Calendar, Upload, MapPin } from "lucide-react";
import { useState } from "react";
import { useLocaleStore } from "@/lib/locale";

interface CustomerData {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  deliveredOrders: number;
  returnedOrders: number;
  cancelledOrders: number;
  lastOrderDate: string;
  trustScore: number;
  riskLevel: "safe" | "neutral" | "dangerous";
}

// Mock customer database
const mockCustomers: Record<string, CustomerData> = {
  "98765432": {
    id: "CUS001",
    name: "أحمد محمد",
    phone: "+216 98 765 432",
    email: "ahmed@example.com",
    totalOrders: 15,
    deliveredOrders: 14,
    returnedOrders: 1,
    cancelledOrders: 0,
    lastOrderDate: "2024-01-20",
    trustScore: 93,
    riskLevel: "safe",
  },
  "97654321": {
    id: "CUS002",
    name: "فاطمة علي",
    phone: "+216 97 654 321",
    email: "fatima@example.com",
    totalOrders: 8,
    deliveredOrders: 6,
    returnedOrders: 1,
    cancelledOrders: 1,
    lastOrderDate: "2024-01-15",
    trustScore: 75,
    riskLevel: "neutral",
  },
  "96543210": {
    id: "CUS003",
    name: "محمود الكريم",
    phone: "+216 96 543 210",
    email: "mahmoud@example.com",
    totalOrders: 5,
    deliveredOrders: 1,
    returnedOrders: 2,
    cancelledOrders: 2,
    lastOrderDate: "2024-01-10",
    trustScore: 20,
    riskLevel: "dangerous",
  },
};

export default function RechercheDetailsPage() {
  const [activeTab, setActiveTab] = useState<"search" | "upload" | "map">("search");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [searchError, setSearchError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [stats, setStats] = useState({ totalSearches: 0, matchesFound: 0, riskyClients: 0 });
  const { locale } = useLocaleStore();
  const isRTL = locale === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";

  const validateTunisianPhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    // Check if it's 8 digits (Tunisian mobile) or starts with 216 followed by 8 digits
    return cleaned.length === 8 || (cleaned.length === 10 && cleaned.startsWith("216"));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchInput.trim()) {
      setSearchError("Veuillez entrer un numéro de téléphone ou un email");
      setCustomerData(null);
      return;
    }

    // Validate phone format
    if (!/^\d/.test(searchInput) && !searchInput.includes("@")) {
      setSearchError("Format invalide. Entrez un numéro de téléphone ou un email valide.");
      setCustomerData(null);
      return;
    }

    if (/^\d/.test(searchInput) && !validateTunisianPhone(searchInput)) {
      setSearchError("Le numéro de téléphone doit être tunisien (8 chiffres)");
      setCustomerData(null);
      return;
    }

    setIsLoading(true);
    setSearchError("");

    // Simulate API call
    setTimeout(() => {
      const cleaned = searchInput.replace(/\D/g, "").slice(-8);
      const customer = mockCustomers[cleaned];

      if (customer) {
        setCustomerData(customer);
        setStats((s) => ({
          totalSearches: s.totalSearches + 1,
          matchesFound: s.matchesFound + 1,
          riskyClients: s.riskyClients + (customer.riskLevel === "dangerous" ? 1 : 0),
        }));
      } else {
        setSearchError("Aucun client trouvé avec ces informations");
        setCustomerData(null);
        setStats((s) => ({ ...s, totalSearches: s.totalSearches + 1 }));
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    // Simulate parsing and premium check
    setUploadMessage("Fichier reçu. Fonctionnalité Premium — analyse simulée.");
  };

  const getTrustBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return "bg-green-100 text-green-800 border-green-300";
      case "neutral":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "dangerous":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTrustIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "neutral":
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
      case "dangerous":
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getActionSuggestion = (customer: CustomerData): { text: string; color: string } => {
    if (customer.riskLevel === "safe") {
      return { text: "✓ Sûr à expédier", color: "text-green-700" };
    } else if (customer.riskLevel === "neutral") {
      return { text: "⚠ Vérifier avant d'expédier", color: "text-orange-700" };
    } else {
      return { text: "✗ Appeler le client d'abord", color: "text-red-700" };
    }
  };

  const deliveryRate = customerData
    ? Math.round((customerData.deliveredOrders / customerData.totalOrders) * 100)
    : 0;

  return (
    <div className={`space-y-8 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className={`text-5xl font-bold text-gray-900 ${textAlign}`}>
            Recherche de client
          </h1>
          <p className={`text-lg text-gray-600 mt-2 ${textAlign}`}>
            Gérez vos clients et créez des publicités personnalisées
          </p>
        </div>
        {/* Tabs */}
        <div className="grid grid-cols-3 gap-6">
          <button
            onClick={() => setActiveTab("search")}
            className={`flex items-center justify-center gap-2 rounded-xl py-4 border transition-all shadow-sm ${
              activeTab === "search"
                ? "bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white border-transparent"
                : "bg-white text-slate-700 border border-slate-200 hover:border-[#16a34a]"
            }`}
          >
            <SearchIcon className="w-5 h-5" />
            <span className="font-semibold">Rechercher</span>
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center justify-center gap-2 rounded-xl py-4 border transition-all shadow-sm ${
              activeTab === "upload"
                ? "bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white border-transparent"
                : "bg-white text-slate-700 border border-slate-200 hover:border-[#16a34a]"
            }`}
          >
            <Upload className="w-5 h-5" />
            <span className="font-semibold">Télécharger un fichier (Premium)</span>
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex items-center justify-center gap-2 rounded-xl py-4 border transition-all shadow-sm ${
              activeTab === "map"
                ? "bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white border-transparent"
                : "bg-white text-slate-700 border border-slate-200 hover:border-[#16a34a]"
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">Statistiques de la carte</span>
          </button>
        </div>
      </div>

      {/* Search Card */}
      {activeTab === "search" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className={`max-w-2xl mx-auto w-full ${textAlign}`}>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Numéro de téléphone ou email
              </label>
              <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setSearchError("");
                    }}
                    placeholder="Ex: 98765432 ou email..."
                    className={`w-[32ch] md:w-[40ch] lg:w-[48ch] px-6 py-3.5 text-base border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 ${searchError ? "border-red-500" : ""}`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white text-base font-semibold rounded-2xl hover:from-[#22c55e] hover:to-[#16a34a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Recherche...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="w-4 h-4" />
                      Rechercher
                    </>
                  )}
                </button>
              </div>
              {searchError && (
                <p className="text-red-600 text-base font-medium mt-2">{searchError}</p>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Upload Card */}
      {activeTab === "upload" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className={`space-y-4 ${textAlign}`}>
            <p className="text-base text-slate-700">Importez un fichier CSV/XLSX contenant les clients à vérifier. Cette fonctionnalité est Premium — démonstration active.</p>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex items-center justify-center bg-slate-50">
              <label className="cursor-pointer flex flex-col items-center gap-3">
                <Upload className="w-8 h-8 text-[#16a34a]" />
                <span className="text-base font-semibold">Choisir un fichier</span>
                <input type="file" className="hidden" accept=".csv,.xlsx" onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} />
              </label>
            </div>
            {selectedFile && (
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="font-semibold text-slate-900">{selectedFile.name}</p>
                <p className="text-base text-slate-600">{uploadMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Map/Stats Card */}
      {activeTab === "map" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#16a34a] to-[#22c55e] text-white rounded-lg p-6">
              <p className="text-sm uppercase tracking-wide opacity-90">Recherches totales</p>
              <p className="text-4xl font-bold">{stats.totalSearches}</p>
            </div>
            <div className="bg-gradient-to-br from-[#22c55e] to-[#34d399] text-white rounded-lg p-6">
              <p className="text-sm uppercase tracking-wide opacity-90">Correspondances trouvées</p>
              <p className="text-4xl font-bold">{stats.matchesFound}</p>
            </div>
            <div className="bg-gradient-to-br from-[#059669] to-[#10b981] text-white rounded-lg p-6">
              <p className="text-sm uppercase tracking-wide opacity-90">Clients risqués</p>
              <p className="text-4xl font-bold">{stats.riskyClients}</p>
            </div>
          </div>
          <div className="mt-6 text-slate-600 text-sm">
            <p>Affichage de carte à venir — vous pourrez visualiser les zones géographiques des recherches et la répartition par gouvernorat.</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {activeTab === "search" && isLoading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium text-lg">Recherche du client...</p>
          </div>
        </div>
      )}

      {/* Results Card */}
      {activeTab === "search" && customerData && !isLoading && (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header with Trust Badge */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b border-gray-200">
            <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""} justify-between gap-4`}>
              <div className={textAlign}>
                <h2 className="text-lg font-bold text-gray-900">{customerData.name}</h2>
                <p className="text-gray-600 text-sm mt-0.5">ID: {customerData.id}</p>
              </div>
              <div className={`flex flex-col items-center gap-0.5 ${getTrustBadgeColor(customerData.riskLevel)} px-2 py-1 rounded-lg border`}>
                {getTrustIcon(customerData.riskLevel)}
                <span className="font-bold text-base">{customerData.trustScore}%</span>
                <span className="text-xs font-semibold">
                  {customerData.riskLevel === "safe"
                    ? "Vérifié"
                    : customerData.riskLevel === "neutral"
                    ? "Neutre"
                    : "Risqué"}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="px-8 py-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`flex items-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-base text-gray-600">Téléphone</p>
                <p className="text-lg font-semibold text-gray-900">{customerData.phone}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-base text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900">{customerData.email}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-base text-gray-600">Dernière commande</p>
                <p className="text-lg font-semibold text-gray-900">{customerData.lastOrderDate}</p>
              </div>
            </div>
          </div>

          {/* Trust Score Section */}
          <div className="px-8 py-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Circular Progress */}
            <div className="flex items-center justify-center">
              <div className="relative w-44 h-44">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={
                      customerData.riskLevel === "safe"
                        ? "#16a34a"
                        : customerData.riskLevel === "neutral"
                        ? "#ea580c"
                        : "#dc2626"
                    }
                    strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - customerData.trustScore / 100)}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-5xl font-bold text-gray-900">
                    {customerData.trustScore}%
                  </span>
                  <span className="text-base text-gray-600 font-medium">Confiance</span>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="space-y-3">
              <h3 className={`text-xl font-bold text-gray-900 ${textAlign}`}>
                Historique des commandes
              </h3>
              <div className="space-y-2.5">
                <div className={`flex items-center justify-between p-4 rounded-lg ${isRTL ? "flex-row-reverse" : ""} bg-green-50 border border-green-200`}>
                  <span className="text-base text-gray-700 font-medium">Commandes livrées</span>
                  <span className="text-3xl font-bold text-green-600">
                    {customerData.deliveredOrders}/{customerData.totalOrders}
                  </span>
                </div>
                <div className={`flex items-center justify-between p-4 rounded-lg ${isRTL ? "flex-row-reverse" : ""} bg-orange-50 border border-orange-200`}>
                  <span className="text-base text-gray-700 font-medium">Retours/Faux</span>
                  <span className="text-3xl font-bold text-orange-600">
                    {customerData.returnedOrders + customerData.cancelledOrders}
                  </span>
                </div>
                <div className={`flex items-center justify-between p-4 rounded-lg ${isRTL ? "flex-row-reverse" : ""} bg-red-50 border border-red-200`}>
                  <span className="text-base text-gray-700 font-medium">Annulées</span>
                  <span className="text-3xl font-bold text-red-600">
                    {customerData.cancelledOrders}
                  </span>
                </div>
                <div className="mt-2.5 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-base text-gray-700 mb-1.5 font-medium">Taux de livraison</p>
                  <div className="relative w-full bg-gray-300 rounded-full h-3">
                    <div
                      className={`bg-blue-600 h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${deliveryRate}%` }}
                    ></div>
                  </div>
                  <p className="text-lg font-bold text-blue-900 mt-2">{deliveryRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Suggestion */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div
              className={`p-6 rounded-lg ${isRTL ? "text-right" : "text-left"} ${
                customerData.riskLevel === "safe"
                  ? "bg-green-50 border border-green-300"
                  : customerData.riskLevel === "neutral"
                  ? "bg-orange-50 border border-orange-300"
                  : "bg-red-50 border border-red-300"
              }`}
            >
              <p className="font-bold text-lg mb-1">Recommandation</p>
              <p className={`text-lg font-semibold ${getActionSuggestion(customerData).color}`}>
                {getActionSuggestion(customerData).text}
              </p>
              <p className="text-lg text-gray-700 mt-3">
                {customerData.riskLevel === "safe"
                  ? "Ce client a un excellent historique de livraison. Vous pouvez expédier en confiance."
                  : customerData.riskLevel === "neutral"
                  ? "Ce client a un historique mixte. Vérifiez les détails avant d'expédier."
                  : "Ce client a plusieurs commandes annulées. Appelez avant d'expédier pour confirmer."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`px-8 py-6 flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""} border-t border-gray-200`}
          >
            <button className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
              Voir la commande complète
            </button>
            <button className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-lg">
              Nouvelle recherche
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {activeTab === "search" && !customerData && !isLoading && !searchError && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl">
            Entrez un numéro de téléphone ou un email pour commencer la recherche
          </p>
        </div>
      )}
    </div>
  );
}
