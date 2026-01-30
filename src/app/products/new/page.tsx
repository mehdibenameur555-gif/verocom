"use client";
import React, { useRef, useState } from "react";
import OnOff1 from "@/components/OnOff1";
import Qalloum from "../../../components/Qalloum";
import Z1Button from "@/components/z1";
import { Save, Trash2, Upload } from "lucide-react";

// مكون أزرار حفظ/إلغاء بسيط
function Boutons() {
	// استيراد Z1Button
	// import Z1Button from "@/components/z1"; (يجب أن يكون في أعلى الملف)
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', marginBottom: 24 }}>
			<Z1Button type="submit" color="green">
				<Save size={18} />
				Enregistrer le produit
			</Z1Button>
		</div>
	);
}
// مكون أزرار on/off للخيارات المتقدمة (يجب أن يكون خارج الدالة الرئيسية)
function AdvancedOptionsToggles() {
	const [variants, setVariants] = useState(false);
	const [related, setRelated] = useState(false);
	const [metaPixel, setMetaPixel] = useState(false);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
				<OnOff1 checked={variants} onChange={setVariants} />
				<span style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>Enable Variants (Taille/Couleur/Quantité)</span>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
				<OnOff1 checked={related} onChange={setRelated} />
				<span style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>Activer les produits connexes</span>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
				<OnOff1 checked={metaPixel} onChange={setMetaPixel} />
				<span style={{ fontSize: 15, color: '#222', fontWeight: 500 }}>Activer Meta Pixel</span>
			</div>
		</div>
	);
}

// مكون أزرار رفع الصور (يجب أن يكون خارج الدالة الرئيسية)
function ImageUploadButtons() {
	const mainInputRef = useRef<HTMLInputElement | null>(null);
	const secondaryInputRef = useRef<HTMLInputElement | null>(null);
	const [mainImage, setMainImage] = useState<File | null>(null);
	const [secondaryImages, setSecondaryImages] = useState<File[]>([]);

	const handleMainClick = () => mainInputRef.current && mainInputRef.current.click();
	const handleSecondaryClick = () => secondaryInputRef.current && secondaryInputRef.current.click();

	return (
		<div style={{ background: '#fff', borderRadius: 10, border: '1.5px solid #e5e7eb', marginBottom: 24, marginTop: 18, padding: '18px 24px' }}>
			<div style={{ fontWeight: 600, fontSize: 18, color: '#222', marginBottom: 12 }}>Images du produit</div>
			<div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
				{/* label removed as requested */}
				{mainImage && (
					<div style={{ margin: '10px 0', position: 'relative', display: 'inline-block' }}>
						<img src={URL.createObjectURL(mainImage)} alt="main preview" style={{ width: 170, height: 170, objectFit: 'cover', borderRadius: 16, border: '2px solid #eee', marginBottom: 6 }} />
						<button
							type="button"
							onClick={() => setMainImage(null)}
							style={{
								position: 'absolute',
								top: -14,
								right: -14,
								background: '#fff',
								border: '1.5px solid #e5e7eb',
								borderRadius: '50%',
								width: 38,
								height: 38,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 1px 6px #0002',
								cursor: 'pointer',
								padding: 0
							}}
							title="Supprimer l'image"
						>
							<Trash2 size={26} color="#be185d" />
						</button>
					</div>
				)}
				<button type="button" onClick={handleMainClick} style={{ background: '#17416b', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 32px', fontWeight: 700, fontSize: 19, marginTop: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
					<Upload size={26} style={{ marginBottom: 2 }} />
					Télécharger l&apos;image principale
				</button>
				<input
					ref={mainInputRef}
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
					onChange={e => {
						if (e.target.files && e.target.files[0]) {
							setMainImage(e.target.files[0]);
						}
					}}
				/>
			</div>
			<button type="button" onClick={handleSecondaryClick} style={{ background: '#17416b', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 32px', fontWeight: 700, fontSize: 19, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginTop: 12 }}>
				<Upload size={26} style={{ marginBottom: 2 }} />
				Télécharger les images secondaires
			</button>
			<input
				ref={secondaryInputRef}
				type="file"
				accept="image/*"
				multiple
				style={{ display: 'none' }}
				onChange={e => {
					if (e.target.files) {
						setSecondaryImages(prev => {
							const files = Array.from(e.target.files ?? []);
							const total = prev.length + files.length;
							if (total <= 6) {
								return [...prev, ...files];
							} else {
								return [...prev, ...files.slice(0, 6 - prev.length)];
							}
						});
					}
				}}
			/>
			{/* معاينة الصور الثانوية */}
			{secondaryImages.length > 0 && (
				<div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
					{secondaryImages.map((img, idx) => (
						<div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
							<img src={URL.createObjectURL(img)} alt={`secondary-${idx}`} style={{ width: 130, height: 130, objectFit: 'cover', borderRadius: 14, border: '2px solid #eee' }} />
							<button
								type="button"
								onClick={() => setSecondaryImages(images => images.filter((_, i) => i !== idx))}
								style={{
									position: 'absolute',
									top: -12,
									right: -12,
									background: '#fff',
									border: '1.5px solid #e5e7eb',
									borderRadius: '50%',
									width: 32,
									height: 32,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 1px 6px #0002',
									cursor: 'pointer',
									padding: 0
								}}
								title="Supprimer cette image"
							>
								<Trash2 size={20} color="#be185d" />
							</button>
						</div>
					))}
				</div>
			)}
			<div style={{ background: '#f1f5f9', borderRadius: 6, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
				<span style={{ color: '#2563eb', fontSize: 18, fontWeight: 700, marginRight: 4 }}>ℹ️</span>
				<span style={{ color: '#2563eb', fontSize: 12 }}>
					Veuillez choisir une image principale carrée (800x800).
				</span>
			</div>
		</div>
	);
}
// (Removed unreachable and duplicated code block that referenced mainImage/setMainImage out of scope)
export default function AddProductPage() {
	return (
		<div style={{ display: 'flex', height: '100vh', width: '100%', background: '#fff' }}>
			{/* القسم الأول (p1) */}
			<div style={{ width: '75%', minHeight: '100vh' }}>
						<h1 style={{ fontSize: 44, fontWeight: 800, margin: 0, marginBottom: 40, color: '#222', textAlign: 'left', paddingLeft: 32 }}>
								Créer un produit
						</h1>
						<form style={{ width: '95%', maxWidth: 800, margin: '0 auto', background: 'transparent' }}>
							<div style={{ background: '#f8f9fa', borderRadius: 10, padding: 28, marginBottom: 32 }}>
								<div style={{ fontWeight: 600, fontSize: 20, color: '#222', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}></div>
								<div style={{ marginBottom: 10 }}>
									<label htmlFor="product-name" style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222', fontSize: 16 }}>
										Nom du produit <span style={{ color: '#f43f5e' }}>*</span>
									</label>
									<input
										id="product-name"
										name="product-name"
										type="text"
										placeholder="Entrez le nom du produit"
										style={{
											width: '100%',
											padding: '22px 20px',
											border: '2px solid #e5e7eb',
											borderRadius: 10,
											fontSize: 22,
											outline: 'none',
											background: '#fff',
											color: '#222',
											fontWeight: 400,
											boxSizing: 'border-box',
											marginBottom: 12,
										}}
										required
									/>
																</div>

																{/* ...existing code... */}
								<div style={{ marginBottom: 10 }}>
									<label htmlFor="product-slug" style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222', fontSize: 16 }}>
										Slug <span style={{ color: '#f43f5e' }}>*</span>
									</label>
									<div style={{ position: 'relative' }}>
										<input
											id="product-slug"
											name="product-slug"
											type="text"
											placeholder="product-slug"
											style={{
												width: '100%',
												padding: '22px 20px',
												border: '2px solid #e5e7eb',
												borderRadius: 10,
												fontSize: 22,
												outline: 'none',
												background: '#fff',
												color: '#222',
												fontWeight: 400,
												boxSizing: 'border-box',
												marginBottom: 12,
											}}
											required
										/>
									</div>
									<div style={{ color: '#a3a3a3', fontSize: 11, marginTop: 4, marginLeft: 2, letterSpacing: 0.1 }}>
										Identifiant compatible URL (généré automatiquement à partir du nom)
									</div>
								</div>
								<div style={{ flex: 1 }} />
										<div style={{ marginBottom: 10 }}>
											<label htmlFor="description" style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222', fontSize: 16 }}>
												Description
											</label>
											<Qalloum id="description" name="description" placeholder="Nous aimerions avoir de vos nouvelles..." />
										</div>
										{/* خانة رفع الصور بعد الوصف - أزرار مخصصة */}
										<ImageUploadButtons />
									</div>
								{/* خيارات متقدمة بأسفل p1 */}
								<div style={{ background: '#f8f9fa', borderRadius: 10, padding: 24, marginTop: 32, marginBottom: 0, border: '1.5px solid #e5e7eb' }}>
									<div style={{ fontWeight: 600, fontSize: 17, color: '#222', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
										<svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ marginRight: 4 }}><rect width="18" height="18" rx="3" fill="#2563eb22"/><path d="M7 10.5l3 3 7-7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
										Options avancées
									</div>
									<AdvancedOptionsToggles />
								</div>
								</form>
			</div>
			{/* الخط الفاصل */}
			<div style={{ width: 1, background: '#e0e0e0', minHeight: '100vh' }} />
			{/* القسم الثاني (p2) */}
			<div style={{ width: '25%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16 }}>
				<Boutons />
				<div style={{ width: '90%', marginBottom: 10, marginTop: 0, background: '#fafbfc', borderRadius: 12, padding: 18, boxShadow: '0 1px 4px #e5e7eb22' }}>
					<label htmlFor="price" style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222', fontSize: 16 }}>
						Prix (TND) <span style={{ color: '#f43f5e' }}>*</span>
					</label>
					<div style={{ position: 'relative', marginBottom: 16 }}>
						<input
							id="price"
							name="price"
							type="number"
							placeholder="0.00"
							style={{
								width: '100%',
								padding: '22px 20px 22px 44px',
								border: '2px solid #e5e7eb',
								borderRadius: 10,
								fontSize: 22,
								outline: 'none',
								background: '#fff',
								color: '#222',
								fontWeight: 400,
								boxSizing: 'border-box',
								marginBottom: 0,
							}}
							required
						/>
					</div>
					<label htmlFor="original-price" style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222', fontSize: 16 }}>
						Original Price (TND)
					</label>
					<div style={{ position: 'relative' }}>
						<input
							id="original-price"
							name="original-price"
							type="number"
							placeholder="0.00"
							style={{
								width: '100%',
								padding: '22px 20px 22px 44px',
								border: '2px solid #e5e7eb',
								borderRadius: 10,
								fontSize: 22,
								outline: 'none',
								background: '#fff',
								color: '#222',
								fontWeight: 400,
								boxSizing: 'border-box',
								marginBottom: 0,
							}}
						/>
					</div>
				</div>
				<div style={{ width: '90%', marginBottom: 0, background: '#fafbfc', borderRadius: 12, padding: 18, boxShadow: '0 1px 4px #e5e7eb22' }}>
					<label htmlFor="statut" style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222', fontSize: 16 }}>
						Statut
					</label>
					<select
						id="statut"
						name="statut"
						style={{
							width: '100%',
							padding: '18px 16px',
							border: '1.5px solid #e5e7eb',
							borderRadius: 8,
							fontSize: 18,
							outline: 'none',
							background: '#fff',
							color: '#222',
							fontWeight: 400,
							boxSizing: 'border-box',
							appearance: 'none',
							marginBottom: 12,
						}}
						defaultValue="Brouillon"
					>
						<option value="Brouillon">Brouillon</option>
						<option value="Publié">Publié</option>
					</select>
					<label htmlFor="sku" style={{ display: 'block', fontWeight: 500, marginBottom: 8, color: '#222', fontSize: 16, marginTop: 8 }}>
						SKU
					</label>
					<input
						id="sku"
						name="sku"
						type="text"
						placeholder="SKU-001"
						style={{
							width: '100%',
							padding: '22px 20px',
							border: '2px solid #e5e7eb',
							borderRadius: 10,
							fontSize: 22,
							outline: 'none',
							background: '#fff',
							color: '#222',
							fontWeight: 400,
							boxSizing: 'border-box',
						}}
					/>
				</div>
				{/* محتوى القسم الثاني */}
			</div>
		</div>
	);
}
