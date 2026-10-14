import React from 'react';

export default function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-50 bg-[#2C1D11] text-[#FDFBF7] shadow-md px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <a href="#" className="text-xl font-serif font-bold tracking-wider text-[#FDFBF7]">
          BOOK<span className="text-[#C05A3E]">LOVERS</span>
        </a>

        <div className="flex-1 max-w-md hidden md:block">
          <input 
            type="text" 
            placeholder="Search title, author..." 
            className="w-full px-4 py-1.5 rounded-full bg-[#3D2B1F] text-sm text-[#FDFBF7] border border-[#6A584C] focus:outline-none focus:border-[#C05A3E]"
          />
        </div>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <a href="#books" className="hover:text-[#C05A3E] transition-colors">Catalog</a>
          <a href="#events" className="hover:text-[#C05A3E] transition-colors">Events</a>
          <a href="#footer" className="hover:text-[#C05A3E] transition-colors">About</a>
          <div className="relative bg-[#C05A3E] px-3 py-1 rounded-full text-xs font-bold">
            Cart ({cartCount})
          </div>
        </nav>
      </div>
    </header>
  );
}