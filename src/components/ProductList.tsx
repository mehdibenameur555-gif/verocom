"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";
import { Plus } from "lucide-react";

type Product = {
	id: string;
	name: string;
	sku: string;
	price: number;
	inventory: number;
	status: string;
	image?: string;
	category?: string;
};

export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const add = useCartStore((s) => s.add);
	const { locale } = useLocaleStore();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch("/api/products");
				const json = await res.json();
				setProducts(json.products ?? []);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{products.map((p) => (
				<div key={p.id} className="bg-white rounded-lg shadow overflow-hidden" dir="rtl">
					{p.image && (
						<img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
					)}
					<div className="p-4 space-y-2">
						<h3 className="font-semibold text-gray-900">{p.name}</h3>
						<p className="text-sm text-gray-500">{p.category}</p>
						<p className="font-bold text-blue-700">${p.price.toFixed(2)}</p>
						<button
							onClick={() => add({ id: p.id, name: p.name, price: p.price, image: p.image })}
							className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded flex items-center gap-2 mt-2"
						>
							<Plus className="w-4 h-4" />
							{t(locale as any, "addToCart")}
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
