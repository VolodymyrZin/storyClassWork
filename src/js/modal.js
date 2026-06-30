import { refs } from './refs';

function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEscKeyPress);
  refs.modal.addEventListener('click', handleBackdropClick);
  refs.modalCloseBtn.addEventListener('click', handleModalCloseBtnClick);
}
function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleEscKeyPress);
  refs.modal.removeEventListener('click', handleBackdropClick);
  refs.modalCloseBtn.removeEventListener('click', handleModalCloseBtnClick);
}
function handleEscKeyPress(event) {
  console.log(event.code);
  if (event.code === 'Escape') {
    closeModal();
  }
}
function handleModalCloseBtnClick() {
  closeModal();
}
function handleBackdropClick(event) {
  if (event.target === refs.modal) {
    closeModal();
  }
}

export {
  openModal,
  closeModal,
  handleEscKeyPress,
  handleModalCloseBtnClick,
  handleBackdropClick,
};
