import refs from './refs';
import createGallery from './markup';
import { sentMessage, messageError } from './message';
import fetchGallery from './fetchGallery';

const queryOptions = {
  query: '',
  page: 1,
  qOnPage: 12,
};

const Handler = function (event) {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.galleryContainer.innerHTML = '';

  queryOptions.query = refs.searchForm[0].value;
  if (queryOptions.query.trim() === '') {
    messageError("Query musn't be empty");
    return;
  }

  queryOptions.page = 1;

  event.preventDefault();

  const promjson = fetchGallery(
    queryOptions.query,
    queryOptions.page,
    queryOptions.qOnPage,
  );
  promjson.then(response => {
    createGallery(response.hits);

    if (response.total === 0) {
      refs.loadMoreBtn.classList.add('is-hidden');
      messageError('Specify your query');
    } else sentMessage(response.total, response.totalHits);

    if (response.totalHits <= queryOptions.qOnPage) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  });
};

const loadMoreFunc = function (event) {
  event.preventDefault();
  queryOptions.page += 1;
  const promjson = fetchGallery(
    queryOptions.query,
    queryOptions.page,
    queryOptions.qOnPage,
  );
  promjson.then(response => {
    createGallery(response.hits);
    if (
      queryOptions.page === Math.ceil(response.totalHits / queryOptions.qOnPage)
    ) {
      refs.loadMoreBtn.classList.add('is-hidden');
    } else refs.loadMoreBtn.classList.remove('is-hidden');
  });
};

export { Handler, loadMoreFunc };
