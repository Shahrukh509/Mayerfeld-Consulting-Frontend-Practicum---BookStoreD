export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <a href="#" className="brand-logo footer-brand" aria-label="Booklovers home">
            BOOK<span>lovers</span>
          </a>
          <p className="footer-description">
            Your local independent bookshop, bringing readers and authors
            together for over two decades.
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Navigation</h3>
          <ul className="footer-links">
            <li><a href="#fiction">Fiction Bestsellers</a></li>
            <li><a href="#nonfiction">Non-Fiction</a></li>
            <li><a href="#staff-picks">Staff Picks</a></li>
            <li><a href="#events">Upcoming Events</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Store Information</h3>
          <ul className="footer-links">
            <li>123 Reader's Way, Novel City</li>
            <li>(555) 839-2665</li>
            <li>Mon-Sat: 9 AM - 8 PM</li>
            <li>Sun: 10 AM - 6 PM</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact &amp; Social</h3>
          <ul className="footer-links">
            <li><a href="mailto:hello@booklovers.com">hello@booklovers.com</a></li>
            <li><a href="https://www.instagram.com/">Instagram / @booklovers</a></li>
            <li><a href="https://x.com/">X / @booklovers_shop</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Booklovers Bookstore. All rights reserved.</p>
      </div>
    </footer>
  );
}