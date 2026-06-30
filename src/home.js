import {
  handleCategoryClick,
  initHomePage,
  handleProductListClick,
  handleSearchSubmit,
  handleSearchClear,
  handleAddToCartClick,
  handleAddToWishlistClick,
  handleLoadMoreBtnClick,
} from './js/handlers';
import { getCategories } from './js/products-api';
import { refs } from './js/refs';
import { renderCategories } from './js/render-function';

//Логіка сторінки Home
document.addEventListener('DOMContentLoaded', initHomePage);
refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', handleProductListClick);
refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.searchFormClearButton.addEventListener('click', handleSearchClear);
refs.addToCartBtn.addEventListener('click', handleAddToCartClick);
refs.addToWishlistBtn.addEventListener('click', handleAddToWishlistClick);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
