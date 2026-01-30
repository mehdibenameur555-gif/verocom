"use client";

import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function CouponsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { locale } = useLocaleStore();
  const isRTL = locale === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";
  const localeKey = locale as "en" | "ar" | "fr";

  const coupons = [
    {
      id: "1",
      code: "SAVE20",
      type: "نسبة مئوية",
      value: 20,
      minPurchase: 100,
      usageCount: 45,
      usageLimit: 100,
      status: "نشط",
      endDate: "2024-12-31",
    },
    {
      id: "2",
      code: "WELCOME10",
      type: "مبلغ ثابت",
      value: 10,
      minPurchase: 50,
      usageCount: 120,
      usageLimit: 200,
      status: "نشط",
      endDate: "2024-06-30",
    },
    {
      id: "3",
      code: "SPRING2024",
      type: "نسبة مئوية",
      value: 15,
      minPurchase: 200,
      usageCount: 30,
      usageLimit: 50,
      status: "منتهي",
      endDate: "2024-03-31",
    },
  ];

  return (
    <div className="space-y-8 text-base">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">{t(localeKey, "couponsTitle")}</h1>
          <p className="text-gray-500 mt-1">{t(localeKey, "couponsSubtitle")}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          {t(localeKey, "addCoupon")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6`} />
          <input
            type="text"
            placeholder={t(localeKey, "searchCode") || "بحث عن كوبون..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full ${isRTL ? "pl-12 pr-4" : "pr-12 pl-4"} py-3.5 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colCode")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colType")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colValue")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colUsage")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colExpiry")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colStatus")}</th>
                <th className={`px-6 py-3 ${textAlign} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{t(localeKey, "colActions")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm font-mono font-bold text-gray-900`}>
                    {coupon.code}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-900`}>
                    {coupon.type}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-900`}>
                    {coupon.type === "نسبة مئوية" ? `${coupon.value}%` : `$${coupon.value}`}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-900`}>
                    {coupon.usageCount} / {coupon.usageLimit}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-500`}>
                    {coupon.endDate}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign}`}>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        coupon.status === "نشط"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {coupon.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${textAlign} text-sm text-gray-500`}>
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""} gap-2`}>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
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
