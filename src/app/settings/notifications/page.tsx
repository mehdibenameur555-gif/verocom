"use client";

import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function NotificationsSettingsPage() {
  const { locale } = useLocaleStore();
  return <div className="p-6">{t(locale, "notificationsSettingsText")}</div>;
}