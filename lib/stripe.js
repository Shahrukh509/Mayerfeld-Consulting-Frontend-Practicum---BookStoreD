import Stripe from 'stripe';

let stripeClient;

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is required for Stripe requests.');
  }

  stripeClient ??= new Stripe(secretKey);
  return stripeClient;
}
