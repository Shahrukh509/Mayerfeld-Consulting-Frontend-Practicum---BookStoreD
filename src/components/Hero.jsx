import React from 'react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#2C1D11] to-[#3D2B1F] text-[#FDFBF7] py-16 px-4 text-center sm:py-24">
      <div className="max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#C05A3E] font-semibold">Independent Bookstore</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
          Find Books for All Ages & Passions
        </h1>
        <p className="text-sm sm:text-base text-[#E3D8C8] max-w-xl mx-auto">
          Explore curated fiction, enlightening non-fiction, and personal staff picks.
        </p>
        <div className="pt-4">
          <a href="#books" className="inline-block bg-[#C05A3E] hover:bg-[#a84c33] text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors shadow-lg">
            Explore Collection
          </a>
        </div>
      </div>
    </section>
  );
}