import tplGalleryFunc from '../templates/tpl_gallery.hbs';
import refs from './refs';

function createGallery(arrGallery) {
  let topPoint =
    refs.galleryContainer.offsetTop + refs.galleryContainer.offsetHeight;
  const offsetHeight = refs.galleryContainer.offsetHeight;
  const infoGallery = tplGalleryFunc(arrGallery);
  refs.galleryContainer.insertAdjacentHTML('beforeend', infoGallery);
  refs.loadMoreBtn.classList.remove('is-hidden');
  if (offsetHeight !== 0) {
    window.scrollTo({
      top: topPoint,
      behavior: 'smooth',
    });
  }
};

export default createGallery;