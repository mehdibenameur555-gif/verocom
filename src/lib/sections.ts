// تعريف جميع أنواع الأقسام الممكنة للقوالب
export type SectionType = "notice-bar" | "navbar" | "slider" | "multi-column" | "featured-products" | "products-slider" | "footer";

export interface SectionConfig {
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  settings: Record<string, any>;
}

// الإعدادات الافتراضية لكل نوع قسم
export const defaultSectionSettings: Record<SectionType, Record<string, any>> = {
  "notice-bar": { text: "أهلاً بكم في متجري!", color: "#f50057" },
  navbar: { links: [ { label: "Accueil", url: "/" }, { label: "Collections", url: "/collections" } ] },
  slider: { images: ["/images/overview/aura.png"], autoPlay: true },
  "multi-column": { columns: [ { icon: "🎁", title: "هدية مجانية", desc: "عند كل طلب" } ] },
  "featured-products": { title: "منتجات مميزة", productIds: [] },
  "products-slider": { title: "عروض اليوم", productIds: [] },
  footer: { text: "جميع الحقوق محفوظة" },
};
