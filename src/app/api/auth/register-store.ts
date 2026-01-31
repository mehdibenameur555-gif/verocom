import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { nanoid } from 'nanoid';


function generateSubdomain(name?: string) {
  if (name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 30);
  }
  return `store-${nanoid(6)}`;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, userName } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
    // اسم المتجر الافتراضي
    const storeName = userName ? `متجر ${userName}` : `متجرك`;
    // توليد subdomain
    let subdomain = generateSubdomain(userName || 'user');
    let exists = await prisma.store.findUnique({ where: { subdomain } });
    let tries = 0;
    while (exists && tries < 5) {
      subdomain = generateSubdomain((userName || 'user') + '-' + nanoid(3));
      exists = await prisma.store.findUnique({ where: { subdomain } });
      tries++;
    }
    if (exists) {
      return NextResponse.json({ error: 'Could not generate unique subdomain' }, { status: 500 });
    }
    // إنشاء المتجر الافتراضي
    const store = await prisma.store.create({
      data: {
        name: storeName,
        ownerId: userId,
        subdomain,
      },
    });
    return NextResponse.json({ success: true, store });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create default store' }, { status: 500 });
  }
}
