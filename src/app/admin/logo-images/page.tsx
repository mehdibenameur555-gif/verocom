"use client";
import Image from "next/image";
import { useState } from "react";

export default function AdminLogoImagesPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoConfirmed, setLogoConfirmed] = useState<boolean>(false);
  const [dashboardImages, setDashboardImages] = useState<(string | null)[]>([null, null]);
  const [dashboardConfirmed, setDashboardConfirmed] = useState<boolean[]>([false, false]);

  // جلب الشعار عند تحميل الصفحة
  // يمكن ربطه بباكند لاحقًا
  // useEffect(() => { ... });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoPreview(reader.result);
        setLogoConfirmed(false);
      }
    };
    reader.readAsDataURL(file);
  };
  const confirmLogo = () => {
    if (!logoPreview) return;
    setLogo(logoPreview);
    setLogoConfirmed(true);
    // حفظ الشعار في الخادم (يمكن ربطه بباكند لاحقًا)
  };
  const clearLogo = () => {
    setLogoPreview(null);
    setLogo(null);
    setLogoConfirmed(false);
  };

  const handleDashboardImageUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDashboardImages((prev) => {
          const arr = [...prev];
          arr[idx] = reader.result as string;
          return arr;
        });
        setDashboardConfirmed((prev) => {
          const arr = [...prev];
          arr[idx] = false;
          return arr;
        });
      }
    };
    reader.readAsDataURL(file);
  };
  const confirmDashboardImage = (idx: number) => {
    setDashboardConfirmed((prev) => {
      const arr = [...prev];
      arr[idx] = true;
      return arr;
    });
    // حفظ الصورة في الخادم (يمكن ربطه بباكند لاحقًا)
  };
  const clearDashboardImage = (idx: number) => {
    setDashboardImages((prev) => {
      const arr = [...prev];
      arr[idx] = null;
      return arr;
    });
    setDashboardConfirmed((prev) => {
      const arr = [...prev];
      arr[idx] = false;
      return arr;
    });
  };

  return (
    <div className="space-y-8 p-8">
      {/* قسم رفع اللوجو */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">إعدادات الشعار</p>
            <h2 className="text-xl font-bold text-slate-900">شعار المنصة</h2>
            <p className="text-sm text-slate-500">يمكنك هنا رفع أو تغيير شعار المنصة الذي يظهر في السايدبار.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-48 h-48 flex items-center justify-center bg-slate-100 rounded-lg border border-slate-200">
            {logoPreview || logo ? (
              <Image src={logoPreview || logo || ""} alt="Logo preview" width={180} height={180} className="object-contain w-44 h-44" />
            ) : (
              <span className="text-sm text-slate-400">لا يوجد شعار</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="logo-upload" className="inline-flex items-center gap-2 rounded bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 cursor-pointer">
              رفع شعار جديد
            </label>
            <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
            <div className="flex gap-2 mt-2">
              <button type="button" className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100" onClick={clearLogo} disabled={!logoPreview && !logo}>
                إزالة
              </button>
              <button type="button" className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50" onClick={confirmLogo} disabled={!logoPreview}>
                حفظ الشعار
              </button>
              {logoConfirmed && <span className="text-xs font-semibold text-emerald-700">تم الحفظ</span>}
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Paramètres admin</p>
            <h2 className="text-xl font-bold text-slate-900">Images du tableau de bord</h2>
            <p className="text-sm text-slate-500">Seul l'admin peut définir les visuels affichés en haut du tableau de bord.</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Bloc 1", "Bloc 2"].map((label, idx) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex flex-col gap-3">
              <div className="text-sm font-semibold text-slate-700">{label}</div>
              {dashboardImages[idx] ? (
                <div className="w-full h-40 rounded-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src={dashboardImages[idx] || ""}
                    alt={`${label} preview`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-40 flex items-center justify-center rounded border border-dashed border-slate-300 text-xs font-semibold text-slate-400">
                  Aucun fichier
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <label
                  htmlFor={`admin-slot-upload-${idx}`}
                  className="inline-flex items-center gap-2 rounded bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
                >
                  Ajouter un fichier
                </label>
                <input
                  id={`admin-slot-upload-${idx}`}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleDashboardImageUpload(idx, e)}
                />
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  onClick={() => clearDashboardImage(idx)}
                  disabled={!dashboardImages[idx]}
                >
                  Effacer
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                  onClick={() => confirmDashboardImage(idx)}
                  disabled={!dashboardImages[idx]}
                >
                  Valider l'image
                </button>
                {dashboardImages[idx] && (
                  <span className={`text-xs font-semibold ${dashboardConfirmed[idx] ? "text-emerald-700" : "text-amber-600"}`}>
                    {dashboardConfirmed[idx] ? "Validée" : "En attente de validation"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
