"use client";

import { useEffect, useMemo, useState } from "react";
import { MoreVertical, Palette, SortAsc } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { templates as installedTemplates } from "@/data/templates";

  // Templates now come from a shared registry in src/data/templates.ts

export default function ModelesPage() {
  const router = useRouter();
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  // جلب القالب المختار من إعدادات المتجر عند التحميل (مؤقتًا من localStorage)
  useEffect(() => {
    // استخدم queueMicrotask لتفادي setState المتزامن
    const stored = window.localStorage.getItem("active-template-id");
    queueMicrotask(() => setActiveTemplate(stored || "aura"));
  }, []);

  // عند اختيار قالب جديد
  async function handleSelectTemplate(templateId: string) {
    // هنا يجب ربطه بالـ API لاحقًا
    setActiveTemplate(templateId);
    window.localStorage.setItem("active-template-id", templateId);
  }

  const [sortBy, setSortBy] = useState<"recent" | "name" | "price">("recent");

  const others = installedTemplates.filter((t) => !t.featured);

  const sortedOthers = useMemo(() => {
    const list = [...others];
    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      list.sort((a, b) => (a.price ?? "")?.localeCompare(b.price ?? ""));
    } else {
      list.sort((a, b) => (b.addedDate ?? "").localeCompare(a.addedDate ?? ""));
    }
    return list;
  }, [others, sortBy]);

  const activeTemplateData = useMemo(() => {
    if (!activeTemplate) return null;
    return installedTemplates.find((t) => t.id === activeTemplate) ?? null;
  }, [activeTemplate]);

  const handleCustomizeClick = (templateId: string) => {
    if (typeof window !== "undefined") {
      window.open(`/boutique/theme-customize/${templateId}`, "_blank");
    } else {
      router.push(`/boutique/theme-customize/${templateId}`);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">Modeles</h1>
        <p className="text-gray-500 mt-1 text-lg">
          Choisissez et personnalisez un theme pour votre boutique
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <SortAsc className="w-4 h-4" />
            Trier par
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="recent">Plus recent</option>
            <option value="name">Nom</option>
            <option value="price">Prix</option>
          </select>
        </div>

        {activeTemplateData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative rounded-lg h-40 overflow-hidden border">
              {activeTemplateData.thumbnailImage ? (
                <Image
                  src={activeTemplateData.thumbnailImage}
                  alt={activeTemplateData.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className={`${activeTemplateData.thumbnail} w-full h-full flex items-center justify-center`}>
                  <span className="text-sm font-semibold text-gray-600">Apercu</span>
                </div>
              )}
            </div>
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">{activeTemplateData.name}</h2>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                  {activeTemplateData.status}
                </span>
                {activeTemplateData.price && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                    {activeTemplateData.price}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{activeTemplateData.description}</p>
              <div className="flex gap-2 flex-wrap">
                {activeTemplateData.sections.slice(0, 4).map((section) => (
                  <span key={section.name} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {section.icon} {section.name}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => handleSelectTemplate(activeTemplateData.id)}
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Marquer comme actif
                </button>
                <button
                  onClick={() => handleCustomizeClick(activeTemplateData.id)}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  Personnaliser
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes themes installes</h3>
        <div className="space-y-3">
          {sortedOthers.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-lg shadow border-2 p-4 flex items-start gap-4 transition-all ${
                activeTemplate === template.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
              role="button"
              tabIndex={0}
            >
              {/* Thumbnail */}
              <div className="relative rounded-lg h-24 w-24 flex-shrink-0 overflow-hidden">
                {template.thumbnailImage ? (
                  <Image
                    src={template.thumbnailImage}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className={`${template.thumbnail} w-full h-full flex items-center justify-center`}>
                    <span className="text-xs font-semibold text-gray-600">Theme</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600">Ajoute: {template.addedDate}</p>
                <p className="text-xs text-gray-500 mt-1">Version {template.version}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {template.sections.slice(0, 2).map((section) => (
                    <span key={section.name} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      {section.icon}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleSelectTemplate(template.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeTemplate === template.id
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {activeTemplate === template.id ? "Actif" : "Activer"}
                </button>
                <button
                  onClick={() => handleCustomizeClick(template.id)}
                  className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <Palette className="w-4 h-4" />
                  Personnaliser
                </button>
                <button className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
