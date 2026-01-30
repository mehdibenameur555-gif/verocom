import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const LOGO_PATH = path.join(process.cwd(), 'public', 'images', 'custom-logo.json');

export async function POST(req: NextRequest) {
  try {
    const { dataUrl } = await req.json();
    if (!dataUrl || typeof dataUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    await fs.writeFile(LOGO_PATH, JSON.stringify({ dataUrl }), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save logo' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const file = await fs.readFile(LOGO_PATH, 'utf-8');
    const { dataUrl } = JSON.parse(file);
    return NextResponse.json({ dataUrl });
  } catch (e) {
    return NextResponse.json({ dataUrl: null });
  }
}
