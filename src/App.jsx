'use client';

import { useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import StoreHighlights from './components/StoreHighlights';
import StaffPicks from './components/StaffPicks';
import EventsSection from './components/EventsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import {
  getCartItems,
  getServerCartSnapshot,
  subscribeToCart,
  updateCartItems,
} from './cart-store';

export default function App() {
  const router = useRouter();
  const cartItems = useSyncExternalStore(
    subscribeToCart,
    getCartItems,
    getServerCartSnapshot,
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState({
    pending: false,
    error: '',
  });

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotalInCents = cartItems.reduce(
    (total, item) => total + item.priceInCents * item.quantity,
    0,
  );

  const handleAddToCart = (product, quantity) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const nextItems = existingItem
      ? cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      : [...cartItems, { ...product, quantity }];

    updateCartItems(nextItems);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    updateCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemoveFromCart = (productId) => {
    updateCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const handleCheckout = async (
    items,
    { cartCheckout = false, preserveOnSignIn = false } = {},
  ) => {
    setCheckoutState({ pending: true, error: '' });

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartCheckout,
          items: items.map(({ id, quantity }) => ({
            productId: id,
            quantity,
          })),
        }),
      });
      const result = await response.json();

      if (response.status === 401) {
        if (preserveOnSignIn) {
          items.forEach((item) => handleAddToCart(item, item.quantity));
        }
        router.push('/auth/signin?callbackUrl=%2F');
        return;
      }
      if (!response.ok || typeof result.checkoutUrl !== 'string') {
        throw new Error(result.error ?? 'Unable to start checkout.');
      }

      window.location.assign(result.checkoutUrl);
    } catch (error) {
      console.error('Starting checkout failed:', error);
      setCheckoutState({
        pending: false,
        error: 'Checkout could not start. Please try again.',
      });
      setIsCartOpen(true);
    }
  };

  const handleBuyNow = (product, quantity) => {
    handleCheckout([{ ...product, quantity }], { preserveOnSignIn: true });
  };

  return (
    <div className="app-shell bg-[#FDFBF7] text-[#2C1D11]">
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={() => setIsCartOpen(false)}
        >
          <section
            className="ml-auto flex h-full w-full max-w-[480px] flex-col overflow-y-auto bg-[#FDFBF7] p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-4">
              <h2
                id="cart-title"
                className="font-[family-name:var(--font-serif)] text-2xl"
              >
                Your cart ({cartCount})
              </h2>
              <button
                type="button"
                className="rounded px-3 py-2 font-semibold hover:bg-[#E2D7C7]"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                Close
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="py-8 text-[#655344]">Your cart is empty.</p>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-[#E2D7C7]">
                  {cartItems.map((item) => (
                    <li
                      className="flex gap-4 py-5"
                      key={item.id}
                    >
                      <div
                        className={`book-cover-mock ${item.coverClass} h-28 w-20 shrink-0`}
                        aria-hidden="true"
                      >
                        <div className="mock-title">{item.title}</div>
                        <div className="mock-author">{item.author}</div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-[#655344]">
                          by {item.author}
                        </p>
                        <p className="mt-1">
                          ${(item.priceInCents / 100).toFixed(2)} each
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            className="rounded border border-[#E2D7C7] px-3 py-1"
                            aria-label={`Decrease ${item.title} quantity`}
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                          >
                            −
                          </button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button
                            type="button"
                            className="rounded border border-[#E2D7C7] px-3 py-1"
                            aria-label={`Increase ${item.title} quantity`}
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="ml-auto text-sm font-semibold text-[#A04328] underline"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#E2D7C7] pt-5">
                  <p className="mb-4 flex justify-between text-lg font-bold">
                    <span>Estimated total</span>
                    <span>${(cartTotalInCents / 100).toFixed(2)}</span>
                  </p>
                  <button
                    type="button"
                    className="checkout-button w-full py-3"
                    disabled={checkoutState.pending}
                    onClick={() =>
                      handleCheckout(cartItems, { cartCheckout: true })
                    }
                  >
                    {checkoutState.pending
                      ? 'Starting secure checkout…'
                      : 'Checkout with Stripe'}
                  </button>
                  {checkoutState.error && (
                    <p className="mt-3 text-sm text-[#a32619]" role="alert">
                      {checkoutState.error}
                    </p>
                  )}
                  <p className="mt-3 text-center text-sm text-[#655344]">
                    You’ll review and pay securely on Stripe.
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      )}
      <Hero />
      <StoreHighlights />
      <main className="mx-auto w-full max-w-[1200px] px-6 pt-8 pb-20">
        <ProductGrid
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          checkoutPending={checkoutState.pending}
        />
        <StaffPicks />
        <EventsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}