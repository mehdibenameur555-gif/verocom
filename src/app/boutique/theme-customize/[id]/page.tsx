"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SectionsEditor from "./sections";

export default function ThemeCustomizePage() {
  const params = useParams();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      const res = await fetch(`/api/stores/${params.id}/settings`);
      let settingsArr = [];
      if (res.ok) settingsArr = await res.json();
      const settingsObj: Record<string, string> = {};
      (settingsArr as { key: string; value: string }[]).forEach((s) => (settingsObj[s.key] = s.value));
      setSettings(settingsObj);
      setLoading(false);
    }
    fetchSettings();
  }, [params.id]);

  async function handleChange(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    await fetch(`/api/stores/${params.id}/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value })
    });
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen">جاري تحميل الإعدادات...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar: قائمة الأقسام */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col p-6">
        <h2 className="text-lg font-bold mb-4 text-pink-700">الأقسام</h2>
        <SectionsEditor storeId={params.id as string} />
        <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded font-medium transition">حفظ التغييرات</button>
      </aside>
      {/* Main content: معاينة حية وإعدادات القسم */}
      <main className="flex-1 flex flex-col items-center justify-start p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-pink-700">معاينة المتجر</h1>
        <div className="w-[900px] h-[600px] bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden flex items-center justify-center mb-8">
          <iframe
            src={`/boutique/store/${params.id}`}
            title="معاينة المتجر"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
        {/* إعدادات عامة */}
        <div className="w-full max-w-xl bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">إعدادات عامة</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">اسم المتجر</label>
              <input
                type="text"
                value={settings.storeName || ""}
                onChange={e => handleChange("storeName", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">اللون الرئيسي</label>
              <input
                type="color"
                value={settings.mainColor || "#F50057"}
                onChange={e => handleChange("mainColor", e.target.value)}
                className="w-16 h-10 border-none bg-transparent cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رابط الشعار</label>
              <input
                type="text"
                value={settings.logoUrl || ""}
                onChange={e => handleChange("logoUrl", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </form>
        </div>
        {/* إعدادات القسم المختار */}
        {/* إصلاح: selectedSection غير معرف، لذا نزيل الكود مؤقتًا أو نعرفه بقيمة افتراضية */}
        {/* إذا كنت تريد تفعيل إعدادات قسم معين، عرّف selectedSection في state وأضف منطق الاختيار */}
      </main>
    </div>
  );
}
