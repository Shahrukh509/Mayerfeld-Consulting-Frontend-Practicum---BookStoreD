import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Header({ cartCount }) {
  const { data: session, status } = useSession();

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="brand-logo" aria-label="Booklovers home">
          BOOK<span>lovers</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li><a href="#fiction">Fiction</a></li>
            <li><a href="#nonfiction">Non-Fiction</a></li>
            <li><a href="#staff-picks">Staff Picks</a></li>
            <li><a href="#events">Events</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          {status === 'loading' ? (
            <span className="auth-nav-placeholder" aria-hidden="true" />
          ) : session?.user ? (
            <>
              <span className="auth-name">
                Hi, {session.user.name || session.user.email}
              </span>
              <button
                type="button"
                className="auth-nav-button"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link className="auth-nav-link" href="/auth/signin">
              Sign in
            </Link>
          )}
          <div className="cart-badge-btn" id="cart" role="status" aria-live="polite">
            <span aria-hidden="true">🛒</span>
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}