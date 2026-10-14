import React from 'react';

export default function QuantityStepper({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center border border-[#E3D8C8] rounded-md bg-[#FDFBF7] overflow-hidden">
      <button 
        type="button" 
        onClick={onDecrement} 
        className="px-3 py-1 bg-[#F5EFE6] text-[#2C1D11] hover:bg-[#E3D8C8] font-bold transition-colors"
      >
        -
      </button>
      <span className="px-3 text-sm font-semibold text-[#2C1D11]">{quantity}</span>
      <button 
        type="button" 
        onClick={onIncrement} 
        className="px-3 py-1 bg-[#F5EFE6] text-[#2C1D11] hover:bg-[#E3D8C8] font-bold transition-colors"
      >
        +
      </button>
    </div>
  );
}