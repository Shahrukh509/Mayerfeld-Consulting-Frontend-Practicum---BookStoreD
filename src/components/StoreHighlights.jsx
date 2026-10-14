const highlights = [
  {
    icon: '📚',
    title: 'Hand-Curated Selection',
    description: 'Every title chosen with care',
  },
  {
    icon: '🚚',
    title: 'Local Shipping',
    description: 'Fast delivery to your door',
  },
  {
    icon: '☕',
    title: 'In-Store Cafe Lounge',
    description: 'Artisanal coffee & quiet nooks',
  },
  {
    icon: '🎟️',
    title: 'Author Meetups',
    description: 'Monthly readings & book clubs',
  },
];

export default function StoreHighlights() {
  return (
    <aside className="features-section" aria-label="Store highlights">
      <div className="features-grid">
        {highlights.map((highlight) => (
          <article className="feature-card" key={highlight.title}>
            <span className="feature-icon" aria-hidden="true">
              {highlight.icon}
            </span>
            <div className="feature-text">
              <h2>{highlight.title}</h2>
              <p>{highlight.description}</p>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
