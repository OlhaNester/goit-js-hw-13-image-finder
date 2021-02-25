import './css/styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import tplGalleryFunc from './templates/tpl_gallery.hbs';
const basicLightbox = require('basiclightbox');
// import debounce from 'lodash';

import { info, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

// Сcылки єлементов

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  searchForm: document.querySelector('.js-search-form'),
  searchBtn: document.querySelector('.search'),
  loadMoreBtn: document.querySelector('.load-more'),
  //   spinner: document.querySelector('#spinner'),
  container: document.querySelector('.container'),
};

const queryOptions = {
  query: '',
  page: 1,
  qOnPage: 12,
};
// Создаем запрос

const apiKey = '20298268-ad7854859c2b2dc6e8b44e367';
function fetchGallery(searchQuery, page = 1, qOnPage) {
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${qOnPage}&key=${apiKey}`;
  const options = {
    headers: {
      Authorization: apiKey,
      mode: 'no-cors',
    },
  };
  return fetch(url)
    .then(res => res.json())
    .catch(err => messageError(err));
}

// Обработчик по инпуту

const Handler = function (event) {
  refs.galleryContainer.innerHTML = '';
  const imputValue = refs.searchForm[0].value;
  if (imputValue.trim() === '') {
    messageError("Query musn't be empty");
    return;
  }
  queryOptions.query = imputValue;
  queryOptions.page = 1;

  event.preventDefault();
 

  const promjson = fetchGallery(queryOptions.query, queryOptions.page, queryOptions.qOnPage);
  promjson.then(response => {
    createGallery(response.hits);
    sentMessage(response.total, response.totalHits);
    if (response.total === 0) {
      refs.loadMoreBtn.classList.add('is-hidden');
      messageError("Specify your query");
    }
    if (response.totalHits <= queryOptions.qOnPage) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    
  }
  );
};

refs.searchBtn.addEventListener('click', Handler);

const createGallery = function (arrGallery) {
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

function messageError(err) {
  error({
    title: 'Ups!',
    text: err,
    delay: 2000,
  });
}
function sentMessage(resTotal, resTotalTop) {
  info({
    title: `It's found ${resTotal} results`,
    text: `Available ${resTotalTop} results`,
    delay: 5000,
  });
}

refs.galleryContainer.addEventListener('click', onGalleryClick);
