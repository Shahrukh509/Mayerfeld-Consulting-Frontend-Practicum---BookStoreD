import { useEffect, useState } from 'react';
import QuantityStepper from './QuantityStepper';

export default function ProductGrid({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setStatus('loading');
      setError('');

      try {
        const response = await fetch('/api/products', {
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error ?? 'Unable to load products.');
        }
        if (!Array.isArray(result.products)) {
          throw new Error('The products API returned an invalid response.');
        }

        setProducts(result.products);
        setStatus('loaded');
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        console.error('Loading products failed:', requestError);
        setError('We could not load the catalog. Please try again.');
        setStatus('error');
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [retryCount]);

  const handleIncrement = (id) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: (previous[id] ?? 1) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(1, (previous[id] ?? 1) - 1),
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

  if (status === 'loading') {
    return (
      <section aria-live="polite">
        <div className="section-header">
          <p>Loading the book catalog…</p>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section aria-live="polite">
        <div className="section-header">
          <p role="alert">{error}</p>
          <button
            type="button"
            className="add-cart-link"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

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
            {products.filter((book) => book.category === collection.category).map(
              (book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  quantity={quantities[book.id] ?? 1}
                  onIncrement={() => handleIncrement(book.id)}
                  onDecrement={() => handleDecrement(book.id)}
                  onAddToCart={() =>
                    onAddToCart(quantities[book.id] ?? 1)
                  }
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
      <div className="book-cover" data-cover={book.coverClass}>
        <span className="badge">{book.badge}</span>
        <div
          className={`book-cover-mock ${book.coverClass}`}
          aria-hidden="true"
        >
          <div className="mock-title">{book.title}</div>
          <div className="mock-author">{book.author}</div>
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-footer">
          <span className="book-price">
            ${(book.priceInCents / 100).toFixed(2)}
          </span>
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