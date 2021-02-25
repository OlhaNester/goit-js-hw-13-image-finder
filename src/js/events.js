import { Handler, loadMoreFunc } from './Handler';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';

const basicLightbox = require('basiclightbox');

refs.searchBtn.addEventListener('click', Handler);

refs.loadMoreBtn.addEventListener('click', loadMoreFunc);

const onGalleryClick = function (event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.target.onclick = () => {
    basicLightbox
      .create(
        `
  		<img width="1400" height="900" src="${event.target.dataset.source}">
  	`,
      )
      .show();
  };
};

refs.galleryContainer.addEventListener('click', onGalleryClick);
