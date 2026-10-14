import { useState } from 'react';
import { BOOKS_DATA } from '../data';
import QuantityStepper from './QuantityStepper';

export default function ProductGrid({ onAddToCart }) {
  const [quantities, setQuantities] = useState(
    () => Object.fromEntries(BOOKS_DATA.map((book) => [book.id, 1]))
  );

  const handleIncrement = (id) => {
    setQuantities((previous) => ({ ...previous, [id]: previous[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(1, previous[id] - 1),
    }));
  };

  const collections = [
    {
      id: 'fiction',
      category: 'Fiction',
      tag: 'Bestsellers & Classics',
      title: 'Fiction Collection',
      description:
        'Captivating stories, rich character studies, and imaginative worlds.',
    },
    {
      id: 'nonfiction',
      category: 'Non-Fiction',
      tag: 'Knowledge & Insight',
      title: 'Non-Fiction Highlights',
      description: 'Memoirs, historical deep dives, self-discovery, and science.',
    },
  ];

  return (
    <>
      {collections.map((collection) => (
        <section id={collection.id} key={collection.id}>
          <div className="section-header">
            <span className="section-tag">{collection.tag}</span>
            <h2>{collection.title}</h2>
            <p>{collection.description}</p>
          </div>
          <div className="book-grid">
            {BOOKS_DATA.filter((book) => book.category === collection.category).map(
              (book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  quantity={quantities[book.id]}
                  onIncrement={() => handleIncrement(book.id)}
                  onDecrement={() => handleDecrement(book.id)}
                  onAddToCart={() => onAddToCart(quantities[book.id])}
                />
              ),
            )}
          </div>
        </section>
      ))}
    </>
  );
}

function BookCard({
  book,
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart,
}) {
  return (
    <article className="book-card">
      <div className="book-cover">
        <span className="badge">{book.badge}</span>
        <div className={`book-cover-mock ${book.cover}`} aria-hidden="true">
          <div className="mock-title">{book.title}</div>
          <div className="mock-author">{book.author}</div>
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-footer">
          <span className="book-price">{book.price}</span>
          <div className="book-actions">
            <QuantityStepper
              quantity={quantity}
              bookTitle={book.title}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
            <button
              type="button"
              className="add-cart-link"
              onClick={onAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}