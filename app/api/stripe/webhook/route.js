import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getStripeClient } from '../../../../lib/stripe';

export const runtime = 'nodejs';

export async function POST(request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured.');
    return NextResponse.json(
      { error: 'Webhook endpoint is not configured.' },
      { status: 500 },
    );
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Stripe signature.' },
      { status: 400 },
    );
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error) {
    console.error('Stripe client configuration failed:', error);
    return NextResponse.json(
      { error: 'Webhook endpoint is not configured.' },
      { status: 500 },
    );
  }

  let event;
  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid Stripe webhook signature.' },
      { status: 400 },
    );
  }

  if (
    event.type !== 'checkout.session.completed' &&
    event.type !== 'checkout.session.async_payment_succeeded'
  ) {
    return NextResponse.json({ received: true });
  }

  const checkoutSession = event.data.object;
  if (checkoutSession.payment_status !== 'paid') {
    return NextResponse.json({ received: true });
  }

  const orderId = checkoutSession.metadata?.orderId;
  if (!orderId) {
    console.error('Paid Checkout Session is missing its order ID.');
    return NextResponse.json(
      { error: 'Checkout Session is missing order metadata.' },
      { status: 400 },
    );
  }

  const shippingDetails =
    checkoutSession.collected_information?.shipping_details;
  const shippingAddress = shippingDetails?.address;

  try {
    const updated = await prisma.order.updateMany({
      where: {
        id: orderId,
        stripeSessionId: checkoutSession.id,
        status: 'PENDING',
      },
      data: {
        status: 'PAID',
        ...(shippingDetails && shippingAddress
          ? {
              shippingName:
                shippingDetails.name ||
                checkoutSession.collected_information?.individual_name ||
                null,
              shippingAddressLine1: shippingAddress.line1,
              shippingAddressLine2: shippingAddress.line2,
              shippingCity: shippingAddress.city,
              shippingState: shippingAddress.state,
              shippingPostalCode: shippingAddress.postal_code,
              shippingCountry: shippingAddress.country,
            }
          : {}),
      },
    });

    if (updated.count === 0) {
      const existingOrder = await prisma.order.findUnique({
        where: { id: orderId },
        select: { status: true, stripeSessionId: true },
      });

      if (
        existingOrder?.status !== 'PAID' ||
        existingOrder.stripeSessionId !== checkoutSession.id
      ) {
        console.error('Paid Stripe Checkout Session did not match a pending order.', {
          orderId,
          stripeSessionId: checkoutSession.id,
        });
        return NextResponse.json(
          { error: 'No matching pending order was found.' },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Processing Stripe webhook failed:', error);
    return NextResponse.json(
      { error: 'Unable to process payment confirmation.' },
      { status: 500 },
    );
  }
}
