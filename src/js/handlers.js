import axios from 'axios';
import {
  checkVisibilityLoadMoreButton,
  showToast,
  toggleActiveClass,
} from './helpers';
import { openModal, closeModal } from './modal';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsByValue,
} from './products-api';
import { refs } from './refs';
import {
  clearProductList,
  hideLoader,
  hideNotFound,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showLoader,
  showLoadMoreBtn,
  showNotFound,
  updateCounters,
} from './render-function';
import iziToast from 'izitoast';
import {
  addToCart,
  addToWishlist,
  getCartItems,
  getWishlistItems,
  isInCart,
  isInWishList,
  removeFromCart,
  removeFromWishlist,
} from './storage';
let page = 1;
let currentProductId = null;

async function initHomePage() {
  updateCounters(getCartItems(), getWishlistItems());
  try {
    showLoader();
    const data = await getCategories();
    renderCategories(data);
    const { products } = await getProducts(page);
    renderProducts(products);
    showLoadMoreBtn();
  } catch (error) {
    console.log('error home init page', error);
  } finally {
    hideLoader();
  }
}
async function handleCategoryClick(event) {
  const categoryButton = event.target.closest('.categories__btn');
  try {
    showLoader();
    if (!categoryButton) {
      return;
    }
    clearProductList();
    const allCategoryButtons =
      refs.categoriesList.querySelectorAll('.categories__btn');
    toggleActiveClass(
      allCategoryButtons,
      categoryButton,
      'categories__btn--active'
    );
    const categorySlag = categoryButton.textContent.trim();

    if (categorySlag === 'All') {
      const { products } = await getProducts(page);
      renderProducts(products);
      hideNotFound();
    } else {
      const { products } = await getProductsByCategory(categorySlag);
      if (products.length > 0) {
        renderProducts(products);
        hideNotFound();
      } else {
        showNotFound();
      }
    }
  } catch (error) {
    console.log(('error products list by category', error));
  } finally {
    hideLoader();
  }
}
async function handleProductListClick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) return;

  const productId = Number(productItem.dataset.id);
  currentProductId = productId;
  try {
    const product = await getProductById(productId);
    openModal();
    renderProductInModal(product);
  } catch (error) {
    console.log('error getting one product', error);
  }
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  const searchValue = event.target.elements.searchValue.value.trim();
  console.log(searchValue);

  if (searchValue === '') {
    showToast('Please, enter search query', 'warning');
    return;
  }
  try {
    clearProductList();
    showLoader();
    const { products } = await getProductsByValue(searchValue);
    if (products.length > 0) {
      renderProducts(products);
      hideNotFound();
    } else {
      showNotFound();
    }
  } catch (error) {
    console.log('error founding products', error);
  } finally {
    hideLoader();
  }
}
async function handleSearchClear(event) {
  refs.searchForm.reset();
  clearProductList();
  try {
    const { products } = await getProducts(page);
    renderProducts(products);
    hideNotFound();
  } catch (error) {
    console.log('Error render products', error);
  }
}
async function handleAddToCartClick(event) {
  console.log(event.target);
  if (!currentProductId) {
    return;
  }
  try {
    if (isInCart(currentProductId)) {
      removeFromCart(currentProductId);
      refs.addToCartBtn.textContent = 'Add to Cart';
      showToast('Product removed From Cart', 'info');
    } else {
      addToCart(currentProductId);
      refs.addToCartBtn.textContent = 'Remove from Cart';
      showToast('Added to Cart', 'info');
    }
    updateCounters(getCartItems(), getWishlistItems());
  } catch (error) {
    console.log('Error during updating cart', error);
  }
}
function handleAddToWishlistClick(event) {
  if (!currentProductId) {
    return;
  }
  try {
    if (isInWishList(currentProductId)) {
      removeFromWishlist(clearProductList);
      refs.addToWishlistBtn.textContent = 'add to Wishlist';
    } else {
      addToWishlist(currentProductId);
      refs.addToWishlistBtn.textContent = 'remove to Wishlist';
      showToast('product');
    }
    updateCounters(getCartItems(), getWishlistItems());
  } catch (error) {
    console.log('error during addidng to wishlist', error);
  }
}
async function handleLoadMoreBtnClick(event) {
  page += 1;
  try {
    const { products, total } = await getProducts(page);
    renderProducts(products);
    checkVisibilityLoadMoreButton(page, total);
  } catch (error) {
    console.log('error load more btn', error);
  }
}
export {
  initHomePage,
  handleCategoryClick,
  handleProductListClick,
  handleSearchSubmit,
  handleSearchClear,
  handleAddToCartClick,
  handleAddToWishlistClick,
  handleLoadMoreBtnClick,
};
