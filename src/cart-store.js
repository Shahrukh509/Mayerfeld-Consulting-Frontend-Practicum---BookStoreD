const emptyCart = [];
let cartItems = emptyCart;
let isLoaded = false;
const listeners = new Set();

function isCartItem(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.author === 'string' &&
    typeof item.coverClass === 'string' &&
    Number.isSafeInteger(item.priceInCents) &&
    Number.isSafeInteger(item.quantity) &&
    item.quantity > 0
  );
}

function loadCart() {
  if (isLoaded) {
    return;
  }

  isLoaded = true;
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const storedItems = JSON.parse(
      window.sessionStorage.getItem('bookstore-cart') || '[]',
    );
    if (Array.isArray(storedItems) && storedItems.every(isCartItem)) {
      cartItems = storedItems;
    }
  } catch (error) {
    console.error('Restoring the cart failed:', error);
    cartItems = emptyCart;
  }
}

export function getCartItems() {
  loadCart();
  return cartItems;
}

export function getServerCartSnapshot() {
  return emptyCart;
}

export function subscribeToCart(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function updateCartItems(nextItems) {
  loadCart();
  cartItems = nextItems;

  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem('bookstore-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Saving the cart failed:', error);
    }
  }

  listeners.forEach((listener) => listener());
}
