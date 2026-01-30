"use client";
import { useEffect } from "react";

export default function ClientHtmlLangDir() {
  useEffect(() => {
    const lang = localStorage.getItem("lang") || "fr";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);
  return null;
}
