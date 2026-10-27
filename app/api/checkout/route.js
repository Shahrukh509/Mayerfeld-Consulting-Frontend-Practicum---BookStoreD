import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { prisma } from '../../../lib/prisma';
import { getStripeClient } from '../../../lib/stripe';

export const runtime = 'nodejs';

export async function POST(request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Sign in to place an order.' },
      { status: 401 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Request body must be valid JSON.' },
      { status: 400 },
    );
  }

  const requestedItems = Array.isArray(body?.items)
    ? body.items
    : [{ productId: body?.productId, quantity: body?.quantity }];
  const isCartCheckout = body?.cartCheckout === true;
  if (requestedItems.length < 1 || requestedItems.length > 50) {
    return NextResponse.json(
      { error: 'Your cart must contain between 1 and 50 different products.' },
      { status: 400 },
    );
  }

  const quantitiesByProductId = new Map();
  for (const item of requestedItems) {
    if (
      typeof item?.productId !== 'string' ||
      !item.productId ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 100
    ) {
      return NextResponse.json(
        { error: 'Each cart item needs a product and a quantity from 1 to 100.' },
        { status: 400 },
      );
    }

    const quantity =
      (quantitiesByProductId.get(item.productId) || 0) + item.quantity;
    if (quantity > 100) {
      return NextResponse.json(
        { error: 'A product quantity cannot exceed 100.' },
        { status: 400 },
      );
    }
    quantitiesByProductId.set(item.productId, quantity);
  }

  try {
    const products = await prisma.product.findMany({
      where: { id: { in: [...quantitiesByProductId.keys()] } },
      select: { id: true, title: true, priceInCents: true },
    });

    if (products.length !== quantitiesByProductId.size) {
      return NextResponse.json(
        { error: 'One or more products in your cart are no longer available.' },
        { status: 404 },
      );
    }

    const orderItems = products.map((product) => ({
      product,
      quantity: quantitiesByProductId.get(product.id),
    }));
    let totalInCents = 0;
    for (const { product, quantity } of orderItems) {
      const lineTotal = product.priceInCents * quantity;
      if (
        !Number.isSafeInteger(product.priceInCents) ||
        product.priceInCents < 1 ||
        !Number.isSafeInteger(lineTotal)
      ) {
        return NextResponse.json(
          { error: 'A product in your cart cannot be checked out.' },
          { status: 400 },
        );
      }

      totalInCents += lineTotal;
      if (!Number.isSafeInteger(totalInCents) || totalInCents > 99_999_999) {
        return NextResponse.json(
          { error: 'Your cart total exceeds the checkout limit.' },
          { status: 400 },
        );
      }
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalInCents,
        items: {
          create: orderItems.map(({ product, quantity }) => ({
            productId: product.id,
            productTitle: product.title,
            unitPriceInCents: product.priceInCents,
            quantity,
      })),
        },
      },
      select: { id: true },
    });

    const stripe = getStripeClient();
    const baseUrl = (process.env.AUTH_URL || request.nextUrl.origin).replace(
      /\/+$/,
      '',
    );
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session.user.email,
      client_reference_id: order.id,
      metadata: { orderId: order.id, userId },
      line_items: orderItems.map(({ product, quantity }) => ({
          quantity,
          price_data: {
            currency: 'usd',
            unit_amount: product.priceInCents,
            product_data: { name: product.title },
          },
        })),
      success_url: `${baseUrl}/checkout/success?orderId=${encodeURIComponent(order.id)}&session_id={CHECKOUT_SESSION_ID}${isCartCheckout ? '&cart_checkout=1' : ''}`,
      cancel_url: `${baseUrl}/?checkout=cancelled`,
    });

    if (!checkoutSession.url) {
      throw new Error('Stripe did not return a Checkout URL.');
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkoutSession.id },
    });

    return NextResponse.json(
      { checkoutUrl: checkoutSession.url },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/checkout failed:', error);
    return NextResponse.json(
      { error: 'Unable to start checkout. Please try again.' },
      { status: 500 },
    );
  }
}
