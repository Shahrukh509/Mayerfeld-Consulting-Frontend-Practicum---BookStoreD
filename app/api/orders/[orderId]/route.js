import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import { prisma } from '../../../../lib/prisma';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Sign in to view this order.' },
      { status: 401 },
    );
  }

  const { orderId } = await params;
  const stripeSessionId = request.nextUrl.searchParams.get('session_id');

  if (!stripeSessionId) {
    return NextResponse.json(
      { error: 'Checkout session is required.' },
      { status: 400 },
    );
  }

  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId, stripeSessionId },
      select: {
        id: true,
        status: true,
        currency: true,
        totalInCents: true,
        createdAt: true,
        items: {
          select: {
            productTitle: true,
            unitPriceInCents: true,
            quantity: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('GET /api/orders/[orderId] failed:', error);
    return NextResponse.json(
      { error: 'Unable to load this order.' },
      { status: 500 },
    );
  }
}
