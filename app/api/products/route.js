import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ category: 'asc' }, { title: 'asc' }],
      select: {
        id: true,
        slug: true,
        title: true,
        author: true,
        category: true,
        priceInCents: true,
        badge: true,
        coverClass: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('GET /api/products failed:', error);
    return NextResponse.json(
      { error: 'Unable to load products.' },
      { status: 500 },
    );
  }
}
