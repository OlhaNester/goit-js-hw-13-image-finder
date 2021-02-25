import refs from './refs';
import createGallery from './markup';
import { sentMessage, messageError } from './message';
import fetchGallery from './fetchGallery';


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

export default Handler;