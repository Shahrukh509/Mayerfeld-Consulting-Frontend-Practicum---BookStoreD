'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (!result?.ok || result.error) {
        setError('Email or password is incorrect.');
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <section
        className="w-full max-w-[440px] rounded-[10px] border border-[#E2D7C7] bg-white p-10 shadow-[0_6px_18px_rgba(44,29,17,0.09)] max-[580px]:px-5 max-[580px]:py-8"
        aria-labelledby="signin-title"
      >
        <Link className="brand-logo mb-6 justify-center" href="/">
          BOOK<span>lovers</span>
        </Link>
        <h1
          id="signin-title"
          className="mb-1 text-center font-[family-name:var(--font-serif)] text-[2rem] text-[#2C1D11]"
        >
          Welcome back
        </h1>
        <p className="text-center text-[#655344]">
          Sign in to your Booklovers account.
        </p>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-[0.4rem] text-[0.9rem] font-semibold text-[#2C1D11]">
            Email address
            <input
              className="w-full rounded-md border border-[#E2D7C7] px-[0.8rem] py-[0.7rem] text-[#2C1D11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C05A3E]"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="grid gap-[0.4rem] text-[0.9rem] font-semibold text-[#2C1D11]">
            Password
            <input
              className="w-full rounded-md border border-[#E2D7C7] px-[0.8rem] py-[0.7rem] text-[#2C1D11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C05A3E]"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {error && (
            <p className="text-sm text-[#a32619]" role="alert">
              {error}
            </p>
          )}
          <button
            className="cursor-pointer rounded-full bg-[#C05A3E] px-4 py-3 font-bold text-white hover:bg-[#A04328] disabled:cursor-wait disabled:opacity-70"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-5 text-sm">
          New to Booklovers?{' '}
          <Link className="font-bold text-[#C05A3E]" href="/auth/signup">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
