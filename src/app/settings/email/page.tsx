"use client";

import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function EmailSettingsPage() {
  const { locale } = useLocaleStore();
  return <div className="p-6">{t(locale, "emailSettingsText")}</div>;
}