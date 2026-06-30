import { refs } from './refs';
import { isInCart, isInWishList } from './storage';

function renderCategories(categories = []) {
  // const temp = ["All"].concat(categories)
  const categoriesWithAll = ['All', ...categories];
  const markup = categoriesWithAll
    .map(category => {
      return `
    <li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>
`;
    })
    .join('');
  refs.categoriesList.innerHTML = markup;
  const firstCategoryButton = document.querySelector('.categories__btn');
  if (firstCategoryButton) {
    firstCategoryButton.classList.add('categories__btn--active');
  }
}
function renderProducts(products) {
  const markup = products
    .map(({ id, thumbnail, title, brand, category, price }) => {
      return `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>
`;
    })
    .join('');
  refs.productsList.insertAdjacentHTML('beforeend', markup);
}
function renderProductInModal({
  id,
  thumbnail,
  title,
  brand,
  category,
  price,
  description,
  shippingInformation,
  returnPolicy,
  tags,
}) {
  const tagsMarkup = tags
    ? tags.map(tag => `<li class="modal-product__tag">${tag}</li>`).join('')
    : '';
  const markup = `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
   <div class="modal-product__content">${title}<p class="modal-product__title"></p>
   <ul class="modal-product__tags">${tagsMarkup}</ul>
   <p class="modal-product__description">${description}</p>
   <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
   <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
   <p class="modal-product__price">Price: ${price}$</p>
   <button class="modal-product__buy-btn" type="button">Buy</button> </div>`;
  refs.modalProduct.innerHTML = markup;
  updateModalButtons();
  //add functionality checking of beeng of product in our wishlist
}
function hideNotFound() {
  refs.notFound.classList.remove('not-found--visible');
}
function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}
function clearProductList() {
  refs.productsList.innerHTML = '';
}
function showLoader() {
  refs.loader.classList.remove('is-hidden');
}
function hideLoader() {
  refs.loader.classList.add('is-hidden');
}
function updateModalButtons(productId) {
  if (isInCart(productId)) {
    refs.addToCartBtn.textContent = 'Remove from Cart';
  } else {
    refs.addToCartBtn.textContent = 'Add to Cart';
  }
  if (isInWishList(productId)) {
    refs.addToWishlistBtn.textContent = 'Remove from Wishlist';
  } else {
    refs.addToWishlistBtn.textContent = 'Add to Wishlist';
  }
}
function updateCounters(cartItems, wishlistItems) {
  refs.cartCount.textContent = cartItems.length;
  refs.wishlistCount.textContent = wishlistItems.length;
}
function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
function showLoadMoreBtnLoading() {
  refs.loadMoreBtn.classList.add('is-loading');
}
function hideLoadMoreBtnLoading() {
  refs.loadMoreBtn.classList.remove('is-loading');
}
export {
  renderCategories,
  renderProducts,
  hideNotFound,
  showNotFound,
  clearProductList,
  renderProductInModal,
  showLoader,
  hideLoader,
  updateModalButtons,
  updateCounters,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  showLoadMoreBtnLoading,
  hideLoadMoreBtnLoading,
};
