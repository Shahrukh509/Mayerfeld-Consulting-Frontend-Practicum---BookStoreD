export default function Header({ cartCount }) {
  return (
    <header className="site-header">
      <div className="nav-container">
        <a href="#" className="brand-logo" aria-label="Booklovers home">
          BOOK<span>lovers</span>
        </a>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li><a href="#fiction">Fiction</a></li>
            <li><a href="#nonfiction">Non-Fiction</a></li>
            <li><a href="#staff-picks">Staff Picks</a></li>
            <li><a href="#events">Events</a></li>
          </ul>
        </nav>

        <div className="cart-badge-btn" id="cart" role="status" aria-live="polite">
          <span aria-hidden="true">🛒</span>
          <span>Cart</span>
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  );
}