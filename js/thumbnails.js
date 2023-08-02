import { renderBigPicture, setDataForPhoto } from './full-photo.js';
import { getData } from './api.js';
import { showAlert, debounce} from './util.js';
import { init } from './sort.js';

const templatePicture = document.querySelector('#picture').content;
const containerPictures = document.querySelector('.pictures');
const fragmentPictures = document.createDocumentFragment();


function render (photos) {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  for (let i = 0; i < photos.length; i++){
    const thumbnail = templatePicture.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = photos[i].url;
    thumbnail.querySelector('.picture__img').alt = photos[i].description;
    thumbnail.querySelector('.picture__likes').textContent = photos[i].likes;
    thumbnail.querySelector('.picture__comments').textContent = photos[i].comments.length;
    thumbnail.querySelector('.picture').id = photos[i].id;
    fragmentPictures.appendChild(thumbnail);
  }
  containerPictures.appendChild(fragmentPictures);
  setDataForPhoto(photos);
}

async function renderThumbnails () {
  try {
    const data = await getData();
    const debouncedThumbnails = debounce(render);
    init(data, debouncedThumbnails);
    render(data);
  } catch (err) {
    showAlert(err.message);
  }
}

// открытие большой картинки
containerPictures.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if(thumbnail) {
    renderBigPicture(thumbnail.id);
    evt.preventDefault();
  }
});

export {renderThumbnails};
