"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";
import { useEffect, useState } from "react";

export default function HeaderBar() {
	const pathname = usePathname();
	const { locale } = useLocaleStore();
	const [logo, setLogo] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/logo")
			.then((res) => res.json())
			.then((data) => {
				if (data.dataUrl) setLogo(data.dataUrl);
			});
	}, []);

	return (
		<header className="sticky top-0 z-20 bg-white border-b border-gray-200">
			<div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
				<Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
					{logo ? (
						<img
							src={logo}
							alt="Logo"
							className="w-10 h-10 rounded-full object-cover border border-gray-300"
							style={{ background: "#fff" }}
						/>
					) : (
						<span className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white text-xl font-bold">M</span>
					)}
					<span>My Store</span>
				</Link>

				<div className="flex-1 relative">
					<Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						placeholder={t(locale as any, "searchStore")}
						className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<LanguageSwitcher />

				<Link
					href="/cart"
					className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
				>
					<ShoppingCart className="w-5 h-5" />
					{t(locale as any, "cart")}
				</Link>
			</div>
		</header>
	);
}
