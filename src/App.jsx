'use client';

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import StoreHighlights from './components/StoreHighlights';
import StaffPicks from './components/StaffPicks';
import EventsSection from './components/EventsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (quantity) => {
    setCartCount((count) => count + quantity);
  };

  return (
    <div className="app-shell bg-[#FDFBF7] text-[#2C1D11]">
      <Header cartCount={cartCount} />
      <Hero />
      <StoreHighlights />
      <main className="mx-auto w-full max-w-[1200px] px-6 pt-8 pb-20">
        <ProductGrid onAddToCart={handleAddToCart} />
        <StaffPicks />
        <EventsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}