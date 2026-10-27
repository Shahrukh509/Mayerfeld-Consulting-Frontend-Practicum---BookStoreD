import { Suspense } from 'react';
import CheckoutSuccessContent from './CheckoutSuccessContent';

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center px-4 py-10">
          <p aria-live="polite">Checking your payment…</p>
        </main>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
