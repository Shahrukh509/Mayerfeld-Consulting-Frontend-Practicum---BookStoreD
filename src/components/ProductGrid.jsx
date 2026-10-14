import React, { useState } from 'react';
import { BOOKS_DATA } from '../data';
import QuantityStepper from './QuantityStepper';

export default function ProductGrid({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState(
    BOOKS_DATA.reduce((acc, book) => ({ ...acc, [book.id]: 1 }), {})
  );

  const categories = ["All", "Fiction", "Non-Fiction", "Staff Picks"];

  const filteredBooks = selectedCategory === "All" 
    ? BOOKS_DATA 
    : BOOKS_DATA.filter(b => b.category === selectedCategory);

  const handleIncrement = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  return (
    <section id="books" className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2C1D11]">Our Catalog</h2>
          <p className="text-xs text-[#6A584C]">Browse through our curated shelf collections</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedCategory === cat 
                  ? 'bg-[#C05A3E] text-white' 
                  : 'bg-[#F5EFE6] text-[#2C1D11] hover:bg-[#E3D8C8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <article key={book.id} className="bg-[#F5EFE6] border border-[#E3D8C8] rounded-lg p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#E3D8C8] text-[#2C1D11]">{book.badge}</span>
                <span className="text-xs font-medium text-[#6A584C]">{book.category}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2C1D11]">{book.title}</h3>
              <p className="text-xs text-[#6A584C] mb-4">by {book.author}</p>
            </div>

            <div className="pt-4 border-t border-[#E3D8C8] flex items-center justify-between gap-2">
              <span className="font-bold text-sm text-[#2C1D11]">{book.price}</span>
              <div className="flex items-center gap-2">
                <QuantityStepper 
                  quantity={quantities[book.id]} 
                  onIncrement={() => handleIncrement(book.id)} 
                  onDecrement={() => handleDecrement(book.id)} 
                />
                <button 
                  onClick={() => onAddToCart(quantities[book.id])}
                  className="bg-[#2C1D11] hover:bg-[#C05A3E] text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}