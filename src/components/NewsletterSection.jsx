export default function NewsletterSection() {
  return (
    <section className="newsletter-section" id="newsletter">
      <h2>Stay Connected</h2>
      <p>
        Subscribe to receive weekly reading recommendations, event invites, and
        store announcements.
      </p>
      <form className="newsletter-form" action="#newsletter" method="get">
        <input
          className="newsletter-input"
          type="email"
          name="email"
          placeholder="Enter your email address"
          aria-label="Email address"
          required
        />
        <button className="newsletter-btn" type="submit">
          Subscribe
        </button>
      </form>
    </section>
  );
}
