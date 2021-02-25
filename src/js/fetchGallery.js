import { sentMessage, messageError } from './message';

function fetchGallery(searchQuery, page = 1, qOnPage) {
  const apiKey = '20298268-ad7854859c2b2dc6e8b44e367';
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

export default fetchGallery;
