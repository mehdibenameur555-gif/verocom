import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// جلب إعدادات المتجر
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const settings = await prisma.storeSetting.findMany({ where: { storeId: id } });
  return NextResponse.json(settings);
}

// حفظ/تحديث إعدادات المتجر
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = await req.json(); // { key: string, value: string }
  if (!data.key) return NextResponse.json({ error: "key required" }, { status: 400 });
  const setting = await prisma.storeSetting.upsert({
    where: { storeId_key: { storeId: id, key: data.key } },
    update: { value: data.value },
    create: { storeId: id, key: data.key, value: data.value }
  });
  return NextResponse.json(setting);
}
