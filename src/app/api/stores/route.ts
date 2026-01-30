import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

// Helper: generate subdomain from store name or random
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
    const { name, ownerId, domain } = await req.json();
    if (!name || !ownerId) {
      return NextResponse.json({ error: 'Missing name or ownerId' }, { status: 400 });
    }
    // Generate unique subdomain
    let subdomain = generateSubdomain(name);
    let exists = await prisma.store.findUnique({ where: { subdomain } });
    let tries = 0;
    while (exists && tries < 5) {
      subdomain = generateSubdomain(name + '-' + nanoid(3));
      exists = await prisma.store.findUnique({ where: { subdomain } });
      tries++;
    }
    if (exists) {
      return NextResponse.json({ error: 'Could not generate unique subdomain' }, { status: 500 });
    }
    const store = await prisma.store.create({
      data: {
        name,
        ownerId,
        subdomain,
        domain: domain || null,
      },
    });
    return NextResponse.json({ success: true, store });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create store' }, { status: 500 });
  }
}
