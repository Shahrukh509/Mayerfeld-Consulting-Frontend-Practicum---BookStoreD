import React from 'react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#2C1D11] text-[#E3D8C8] py-8 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <p className="font-bold text-[#FDFBF7] text-sm">Booklovers Bookstore</p>
          <p>123 Literary Way, Booktown</p>
        </div>
        <p>© 2026 Booklovers. All rights reserved.</p>
      </div>
    </footer>
  );
}