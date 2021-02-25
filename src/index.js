import './css/styles.css';
import refs from './js/refs';
import createGallery from './js/markup';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const basicLightbox = require('basiclightbox');

import { info, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';





const queryOptions = {
  query: '',
  page: 1,
  qOnPage: 12,
};


const apiKey = '20298268-ad7854859c2b2dc6e8b44e367';






refs.searchBtn.addEventListener('click', Handler);



const loadMoreFunc = function (event) {
  event.preventDefault();
  queryOptions.page += 1;
  const promjson = fetchGallery(queryOptions.query, queryOptions.page, queryOptions.qOnPage);
  promjson.then(response => {
    createGallery(response.hits);
    if (queryOptions.page === Math.ceil(response.totalHits / queryOptions.qOnPage)) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    else refs.loadMoreBtn.classList.remove('is-hidden');
     
});
}

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
