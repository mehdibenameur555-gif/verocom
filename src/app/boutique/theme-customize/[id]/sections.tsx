"use client";
import { useEffect, useState } from "react";
import { SectionConfig, SectionType, defaultSectionSettings } from "@/lib/sections";
import { v4 as uuidv4 } from "uuid";

export default function SectionsEditor({ storeId }: { storeId: string }) {
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSections() {
      setLoading(true);
      const res = await fetch(`/api/stores/${storeId}/settings`);
      let settingsArr = [];
      if (res.ok) settingsArr = await res.json();
      const sectionsSetting = (settingsArr as StoreSetting[]).find((s) => s.key === "sections");
      let sections: SectionConfig[] = [];
      if (sectionsSetting) {
        try { sections = JSON.parse(sectionsSetting.value); } catch {}
      }
      setSections(sections);
      setLoading(false);
    }
    fetchSections();
  }, [storeId]);

  async function saveSections(newSections: SectionConfig[]) {
    setSections(newSections);
    await fetch(`/api/stores/${storeId}/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "sections", value: JSON.stringify(newSections) })
    });
  }

  function addSection(type: SectionType) {
    const newSection: SectionConfig = {
      id: uuidv4(),
      type,
      enabled: true,
      order: sections.length,
      settings: { ...defaultSectionSettings[type] },
    };
    const newSections = [...sections, newSection];
    saveSections(newSections);
  }

  function removeSection(id: string) {
    const newSections = sections.filter(s => s.id !== id);
    saveSections(newSections);
  }

  function moveSection(id: string, dir: "up" | "down") {
    const newSections = [...sections];
    if (dir === "up" && sections[0].id !== id) {
      [newSections[0], newSections[sections.findIndex(s => s.id === id)]] = [newSections[sections.findIndex(s => s.id === id)], newSections[0]];
    } else if (dir === "down" && sections[sections.length - 1].id !== id) {
      [newSections[sections.findIndex(s => s.id === id)], newSections[sections.length - 1]] = [newSections[sections.length - 1], newSections[sections.findIndex(s => s.id === id)]];
    }
    saveSections(newSections.map((s, i) => ({ ...s, order: i })));
  }

  if (loading) return <div>جاري تحميل الأقسام...</div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        {(["notice-bar","navbar","slider","multi-column","featured-products","products-slider","footer"] as SectionType[]).map(type => (
          <button key={type} onClick={() => addSection(type)} className="bg-pink-100 text-pink-700 px-3 py-1 rounded text-sm">+ {type}</button>
        ))}
      </div>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id} className="bg-white border rounded p-3 flex items-center justify-between">
            <span>{section.type}</span>
            <div className="flex gap-2">
              <button onClick={() => moveSection(section.id, "up")}>⬆️</button>
              <button onClick={() => moveSection(section.id, "down")}>⬇️</button>
              <button onClick={() => removeSection(section.id)} className="text-red-500">حذف</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface StoreSetting { key: string; value: string; }
