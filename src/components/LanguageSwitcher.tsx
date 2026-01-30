"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useLocaleStore } from "@/lib/locale";
import { useEffect, useRef, useState } from "react";

export default function LanguageSwitcher() {
	const { locale, setLocale } = useLocaleStore();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// ensure html dir/lang reflects current locale on mount
		setLocale(locale);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// إغلاق الـ dropdown عند النقر خارجه
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClick, true);
		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, [isOpen]);

	const languages = [
		{ code: "ar", label: "العربية", flag: "🇹🇳" },
		{ code: "en", label: "English", flag: "🇬🇧" },
		{ code: "fr", label: "Français", flag: "🇫🇷" },
	];

	const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
			>
				<span className="text-sm font-semibold">{currentLang.label.split(" ")[0]}</span>
				<span className="text-lg">{currentLang.flag}</span>
				<ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
					{languages.map((lang) => (
						<button
							key={lang.code}
							onClick={() => {
								setLocale(lang.code as any);
								setIsOpen(false);
							}}
							className={`w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
								locale === lang.code ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
							}`}
						>
							<span className="text-lg">{lang.flag}</span>
							<span className="flex-1">{lang.label}</span>
							{locale === lang.code && <span className="text-blue-600 font-bold">✓</span>}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
