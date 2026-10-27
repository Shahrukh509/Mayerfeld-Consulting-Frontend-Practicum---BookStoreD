import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Header({ cartCount, onOpenCart }) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="brand-logo" aria-label="Booklovers home">
          BOOK<span>lovers</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {isMenuOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <div
          className={`nav-menu${isMenuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
        >
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              <li><a href="#fiction" onClick={() => setIsMenuOpen(false)}>Fiction</a></li>
              <li><a href="#nonfiction" onClick={() => setIsMenuOpen(false)}>Non-Fiction</a></li>
              <li><a href="#staff-picks" onClick={() => setIsMenuOpen(false)}>Staff Picks</a></li>
              <li><a href="#events" onClick={() => setIsMenuOpen(false)}>Events</a></li>
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
              <Link
                className="auth-nav-link"
                href="/auth/signin"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
            <button
              type="button"
              className="cart-badge-btn border-0 font-[inherit] cursor-pointer"
              id="cart"
              aria-label={`Open cart, ${cartCount} items`}
              onClick={onOpenCart}
            >
              <span aria-hidden="true">🛒</span>
              <span>Cart</span>
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}