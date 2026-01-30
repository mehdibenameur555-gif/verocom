
"use client";
import Z1Button from "@/components/z1";

import { Plus, Search, Filter, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { locale } = useLocaleStore();
  const isRTL = locale === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";
  const localeKey = locale as "en" | "ar" | "fr";

  const clients = [
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966 50 123 4567",
      orders: 5,
      totalSpent: 1250.0,
      joinedDate: "2024-01-15",
    },
    {
      id: "2",
      name: "فاطمة علي",
      email: "fatima@example.com",
      phone: "+966 55 987 6543",
      orders: 3,
      totalSpent: 890.0,
      joinedDate: "2024-01-10",
    },
    {
      id: "3",
      name: "محمد حسن",
      email: "mohammed@example.com",
      phone: "+966 54 456 7890",
      orders: 8,
      totalSpent: 2100.0,
      joinedDate: "2024-01-05",
    },
  ];

  return (
    <div className="space-y-8 text-base">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">{t(localeKey, "clientsTitle")}</h1>
          <p className="text-gray-600 mt-2 text-base">{t(localeKey, "clientsSubtitle")}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          {t(localeKey, "addClient") || "إضافة عميل"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6`} />
            <input
              type="text"
              placeholder={t(localeKey, "searchClient")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isRTL ? "pl-12 pr-4" : "pr-12 pl-4"} py-3.5 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3.5 text-base font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            {t(localeKey, "colStatus")}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colName")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colEmail")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colPhone")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colOrders")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colTotalSpent")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colJoined")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm font-medium text-gray-900`}>
                    {client.name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-900`}>
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""} gap-2`}>
                      <Mail className="w-4 h-4 text-gray-400" />
                      {client.email}
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-900`}>
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""} gap-2`}>
                      <Phone className="w-4 h-4 text-gray-400" />
                      {client.phone}
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-900`}>
                    {client.orders}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-900`}>
                    ${client.totalSpent.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-500`}>
                    {client.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className={`text-sm text-gray-600 ${textAlign}`}>{t(localeKey, "totalClients") || "إجمالي العملاء"}</p>
          <p className={`text-3xl font-bold text-gray-900 mt-2 ${textAlign}`}>{clients.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className={`text-sm text-gray-600 ${textAlign}`}>{t(localeKey, "totalOrders")}</p>
          <p className={`text-3xl font-bold text-blue-600 mt-2 ${textAlign}`}>
            {clients.reduce((sum, c) => sum + c.orders, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className={`text-sm text-gray-600 ${textAlign}`}>{t(localeKey, "totalSales")}</p>
          <p className={`text-3xl font-bold text-green-600 mt-2 ${textAlign}`}>
            ${clients.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
