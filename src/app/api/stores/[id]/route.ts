import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const store = await prisma.store.findUnique({
    where: { id },
    include: { products: true }
  });
  if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 });

  // إعدادات إضافية (شعار، لون...)
  const settings = await prisma.storeSetting.findMany({ where: { storeId: store.id } });
  const mainColor = settings.find((s: { key: string; value: string }) => s.key === "mainColor")?.value;
  const logo = settings.find((s: { key: string; value: string }) => s.key === "logo")?.value;

  return NextResponse.json({
    name: store.name,
    logo,
    mainColor,
    products: store.products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images[0] || null
    }))
  });
}
