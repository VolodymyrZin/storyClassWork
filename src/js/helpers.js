import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { ITEM_PER_PAGE } from './constants';
import { hideLoadMoreBtn, hideLoadMoreBtnLoading } from './render-function';
function toggleActiveClass(elements, activeElement, activeClass) {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });
  activeElement.classList.add(activeClass);
}
function showToast(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    timeout: 3000,
  };
  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    case 'info':
      iziToast.info(options);
      break;
    default:
      iziToast.error({
        message: 'invalid type of the toast',
        position: 'topRight',
        timeout: 3000,
      });
      break;
  }
}
function checkVisibilityLoadMoreButton(page, total) {
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);
  if (page === totalPages) {
    hideLoadMoreBtn();
    showToast('no more products', 'info');
  } else {
    hideLoadMoreBtnLoading();
  }
}
export { toggleActiveClass, showToast, checkVisibilityLoadMoreButton };
