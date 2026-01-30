import { NextResponse } from "next/server";

const sampleOrders = [
  { id: "#3066", customer: "أحمد محمد", amount: 199.0, status: "مكتمل", items: 3, date: "2024-01-20" },
  { id: "#3065", customer: "فاطمة علي", amount: 299.0, status: "قيد المعالجة", items: 2, date: "2024-01-19" },
];

export async function GET() {
  return NextResponse.json({ orders: sampleOrders });
}

export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({ ok: true, order: data }, { status: 201 });
}
