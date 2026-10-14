import { STAFF_PICKS_DATA } from '../data';

export default function StaffPicks() {
  return (
    <section id="staff-picks">
      <div className="section-header">
        <span className="section-tag">Handpicked Recommendations</span>
        <h2>Staff Favorites</h2>
        <p>Personal recommendations carefully reviewed by our booksellers.</p>
      </div>
      <div className="staff-picks-grid">
        {STAFF_PICKS_DATA.map((pick) => (
          <article className="staff-card" key={pick.id}>
            <div className={`staff-book-cover book-cover-mock ${pick.cover}`} aria-hidden="true">
              <span className="mock-title">{pick.coverTitle}</span>
              <span className="mock-author">{pick.author}</span>
            </div>
            <div className="staff-review">
              <div className="rating" aria-label="5 out of 5 stars">
                <span aria-hidden="true">★★★★★</span>
              </div>
              <h3 className="book-title">{pick.title}</h3>
              <p className="staff-quote">"{pick.quote}"</p>
              <p className="staff-reviewer">— Recommended by {pick.reviewer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
