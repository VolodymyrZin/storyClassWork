import {
  handleAddToCartClick,
  handleAddToWishlistClick,
  handleProductListClick,
  initWishListPage,
} from './js/handlers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initWishListPage);
refs.productsList.addEventListener('click', handleProductListClick);
refs.addToCartBtn.addEventListener('click', handleAddToCartClick);
refs.addToWishlistBtn.addEventListener('click', handleAddToWishlistClick);
