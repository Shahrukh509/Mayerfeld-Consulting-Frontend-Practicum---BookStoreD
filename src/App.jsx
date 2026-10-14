import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import EventsSection from './components/EventsSection';
import Footer from './components/Footer';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (qty) => {
    setCartCount(prev => prev + qty);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] font-sans overflow-x-hidden">
      <Header cartCount={cartCount} />
      <main className="flex-grow">
        <Hero />
        <ProductGrid onAddToCart={handleAddToCart} />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}