'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateCartItems } from '../../../src/cart-store';

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const stripeSessionId = searchParams.get('session_id');
  const isCartCheckout = searchParams.get('cart_checkout') === '1';
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({
    status: 'checking',
    order: null,
    error: '',
  });
  const hasConfirmationParams = Boolean(orderId && stripeSessionId);
  const status = hasConfirmationParams ? state.status : 'error';
  const error = hasConfirmationParams
    ? state.error
    : 'This payment confirmation link is incomplete.';

  useEffect(() => {
    if (!hasConfirmationParams) {
      return;
    }

    const controller = new AbortController();

    async function checkOrder() {
      for (let check = 0; check < 5; check += 1) {
        if (check > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1200));
        }

        try {
          const response = await fetch(
            `/api/orders/${encodeURIComponent(orderId)}?session_id=${encodeURIComponent(stripeSessionId)}`,
            { cache: 'no-store', signal: controller.signal },
          );
          const result = await response.json();

          if (!response.ok) {
            setState({
              status: 'error',
              order: null,
              error:
                response.status === 401
                  ? 'Sign in to view this order.'
                  : result.error ?? 'Unable to verify this order.',
            });
            return;
          }

          setState({
            status: result.order.status === 'PAID' ? 'paid' : 'pending',
            order: result.order,
            error: '',
          });
          if (result.order.status === 'PAID') {
            if (isCartCheckout) {
              updateCartItems([]);
            }
            return;
          }
        } catch {
          if (controller.signal.aborted) {
            return;
          }
          setState({
            status: 'error',
            order: null,
            error: 'Unable to verify your payment right now.',
          });
          return;
        }
      }

      setState((current) =>
        current.status === 'pending'
          ? current
          : {
              status: 'pending',
              order: current.order,
              error: '',
            },
      );
    }

    checkOrder();
    return () => controller.abort();
  }, [attempt, hasConfirmationParams, isCartCheckout, orderId, stripeSessionId]);

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-[560px] rounded-[10px] border border-[#E2D7C7] bg-white p-8 shadow-[0_6px_18px_rgba(44,29,17,0.09)]">
        <h1 className="font-[family-name:var(--font-serif)] text-3xl text-[#2C1D11]">
          {status === 'paid' ? 'Thank you for your order!' : 'Order status'}
        </h1>
        {status === 'checking' && (
          <p className="mt-4" aria-live="polite">
            Checking your payment…
          </p>
        )}
        {status === 'paid' && state.order && (
          <div className="mt-4 space-y-3">
            <p role="status">Your payment is confirmed.</p>
            <p>
              Order total: $
              {(state.order.totalInCents / 100).toFixed(2)}
            </p>
            <ul className="list-inside list-disc">
              {state.order.items.map((item, index) => (
                <li key={`${item.productTitle}-${index}`}>
                  {item.quantity} × {item.productTitle}
                </li>
              ))}
            </ul>
          </div>
        )}
        {status === 'pending' && (
          <div className="mt-4 space-y-3">
            <p role="status">
              Your payment is being confirmed. This page checks the order
              automatically; you can also check again shortly.
            </p>
            <button
              type="button"
              className="checkout-button"
              onClick={() => {
                setState({ status: 'checking', order: null, error: '' });
                setAttempt((count) => count + 1);
              }}
            >
              Check again
            </button>
          </div>
        )}
        {status === 'error' && (
          <p className="mt-4 text-[#a32619]" role="alert">
            {error}{' '}
            {error === 'Sign in to view this order.' && (
              <Link className="font-bold text-[#C05A3E]" href="/auth/signin">
                Sign in
              </Link>
            )}
          </p>
        )}
        <Link className="mt-6 inline-block font-bold text-[#C05A3E]" href="/">
          Return to the bookstore
        </Link>
      </section>
    </main>
  );
}
