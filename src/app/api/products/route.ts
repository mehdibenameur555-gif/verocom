import { NextResponse } from "next/server";

const sampleProducts = [
  {
    id: "1",
    name: "هاتف ذكي Pro Max",
    sku: "PHN-001",
    price: 999.99,
    inventory: 45,
    status: "نشط",
    image: "https://via.placeholder.com/100",
    category: "إلكترونيات",
  },
  {
    id: "2",
    name: "سماعات لاسلكية",
    sku: "AUD-002",
    price: 149.99,
    inventory: 120,
    status: "نشط",
    image: "https://via.placeholder.com/100",
    category: "إكسسوارات",
  },
];

export async function GET() {
  return NextResponse.json({ products: sampleProducts });
}

export async function POST(req: Request) {
  const data = await req.json();
  // هنا يتم عادةً الحفظ عبر Prisma، نُعيد البيانات فقط الآن
  return NextResponse.json({ ok: true, product: data }, { status: 201 });
}
