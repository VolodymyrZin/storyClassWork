import { STORAGE_KEYS } from './constants';

function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(
      'fail during fetching data from a local Storage',
      error.message
    );
  }
}
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('error during saving data to local storage', error);
  }
}
function getCartItems() {
  return getFromStorage(STORAGE_KEYS.CART) ?? [];
}
function getWishlistItems() {
  return getFromStorage(STORAGE_KEYS.WISHLIST) ?? [];
}
function isInCart(id) {
  const cartItems = getCartItems();
  return cartItems.includes(id);
}
function removeFromCart(id) {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter(cartItem => cartItem !== id);
  saveToLocalStorage(STORAGE_KEYS.CART, updatedItems);
}

function isInWishList(id) {
  const wishlistItems = getWishlistItems();
  return wishlistItems.includes(id);
}
function removeFromWishlist(id) {
  const wishlistItems = getWishlistItems();
  const updatedItems = wishlistItems.filter(
    wishlistItem => wishlistItem !== id
  );
  saveToLocalStorage(STORAGE_KEYS.WISHLIST, updatedItems);
}
function addToCart(id) {
  const cartItems = getCartItems();
  if (!cartItems.includes(id)) {
    cartItems.push(id);
    saveToLocalStorage(STORAGE_KEYS.CART, cartItems);
  }
}
function addToWishlist(id) {
  const wishlistItems = getWishlistItems();
  if (!wishlistItems.includes(id)) {
    wishlistItems.push(id);
    saveToLocalStorage(STORAGE_KEYS.WISHLIST, wishlistItems);
  }
}
export {
  getFromStorage,
  saveToLocalStorage,
  getCartItems,
  isInCart,
  removeFromCart,
  addToCart,
  isInWishList,
  getWishlistItems,
  removeFromWishlist,
  addToWishlist,
};
