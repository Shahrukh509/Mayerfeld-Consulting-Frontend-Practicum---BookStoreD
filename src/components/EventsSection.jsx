import { EVENTS_DATA } from '../data';

export default function EventsSection() {
  return (
    <section id="events" className="events-section">
      <div className="section-header section-header-compact">
        <span className="section-tag">Community Gatherings</span>
        <h2>Readings &amp; Book Clubs</h2>
        <p>Meet authors, discuss perspectives, and connect in our lounge.</p>
      </div>
      <div className="events-grid">
        {EVENTS_DATA.map((event) => (
          <article key={event.id} className="event-card">
            <div className="event-date">
              <span className="date-day">{event.day}</span>
              <span className="date-month">{event.month}</span>
            </div>
            <div className="event-info">
              <h3>{event.title}</h3>
              <p className="event-time">{event.time}</p>
              <p className="event-desc">{event.desc}</p>
              <a className="rsvp-link" href="#events">
                {event.action} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}