export default function QuantityStepper({
  quantity,
  bookTitle,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="quantity-stepper">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${bookTitle}`}
      >
        &minus;
      </button>
      <output aria-live="polite" aria-label={`${quantity} ${bookTitle}`}>
        {quantity}
      </output>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${bookTitle}`}
      >
        +
      </button>
    </div>
  );
}