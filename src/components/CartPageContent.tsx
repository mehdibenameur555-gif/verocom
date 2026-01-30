"use client";

import { useCartStore } from "@/lib/store";
import { Trash2 } from "lucide-react";
import { useLocaleStore } from "@/lib/locale";
import { t } from "@/i18n";

export default function CartPageContent() {
	const { items, remove, setQty, clear, total } = useCartStore();
	const { locale } = useLocaleStore();

	return (
		<div className="max-w-5xl mx-auto space-y-6">
			<h1 className="text-4xl font-bold text-gray-900">{t(locale as any, "cart")}</h1>

			{items.length === 0 ? (
				<div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
					{t(locale as any, "emptyCart")}
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-4">
						{items.map((item) => (
							<div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
								{item.image && (
									<img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
								)}
								<div className="flex-1">
									<p className="font-medium text-gray-900">{item.name}</p>
									<p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="number"
										min={1}
										value={item.qty}
										onChange={(e) => setQty(item.id, Number(e.target.value))}
										className="w-20 px-2 py-1 border border-gray-300 rounded-lg"
									/>
									<button
										onClick={() => remove(item.id)}
										className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
									>
										<Trash2 className="w-5 h-5" />
									</button>
								</div>
							</div>
						))}
					</div>

					<aside className="bg-white rounded-lg shadow p-6 space-y-4">
						<p className="text-gray-600">{t(locale as any, "total")}</p>
						<p className="text-2xl font-bold text-gray-900">${total().toFixed(2)}</p>
						<button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
							{t(locale as any, "checkout")}
						</button>
						<button onClick={clear} className="w-full px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
							{t(locale as any, "clearCart")}
						</button>
					</aside>
				</div>
			)}
		</div>
	);
}
