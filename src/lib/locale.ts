import { create } from "zustand";

export type Locale = "ar" | "en" | "fr";

type LocaleState = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  hydrate: () => void;
};

const getInitialLocale = (): Locale => {
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem("locale") as Locale | null;
    if (saved === "ar" || saved === "en" || saved === "fr") return saved;
  }
  return "fr";
};

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: getInitialLocale(),
  
  setLocale: (l) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", l);
      const isRTL = l === "ar";
      document.documentElement.lang = l;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
    }
    set({ locale: l });
  },
  
  hydrate: () => {
    const saved = getInitialLocale();
    if (typeof window !== "undefined") {
      const isRTL = saved === "ar";
      document.documentElement.lang = saved;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      window.localStorage.setItem("locale", saved);
      set({ locale: saved });
    }
  },
}));

if (typeof window !== "undefined") {
  useLocaleStore.getState().hydrate();
}
