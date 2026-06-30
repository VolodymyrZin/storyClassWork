const API_BASE_URL = 'https://dummyjson.com';
const API_ENDPOINTS = {
  CATEGORIES: '/products/category-list',
  PRODUCTS: '/products',
  PRODUCTS_BY_CATEGORY: '/products/category/',
  PRODUCT_BY_ID: '/products/',
  PRODUCTS_BY_SEARCH: '/products/search',
};
const STORAGE_KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
};
const ITEM_PER_PAGE = 12;
export { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS, ITEM_PER_PAGE };
