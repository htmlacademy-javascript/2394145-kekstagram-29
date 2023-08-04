import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const likesCount = document.querySelector('.likes-count');
const commentsAllCount = document.querySelector('.comments-count');
const description = document.querySelector('.social__caption');
const comments = document.querySelector('.social__comments');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img ');
const commentTemplate = document.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const body = document.body;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentFragment = document.createDocumentFragment();
const loadMore = document.querySelector('.comments-loader');
const commentsMomentCount = socialCommentCount.querySelector('.comments-count-start');

const NUMBER_OF_COMMENTS = 5;

let numberOfCommentsNow = 0;
let commentsArray = [];
let photos = '';

function setDataForPhoto (data) {
  photos = data;
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)){
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCancelClick = () => {
  closeBigPicture();
};

// добавление комментариев
const onLoadMoreClick = () => {
  for (let i = numberOfCommentsNow; i < numberOfCommentsNow + NUMBER_OF_COMMENTS; i++){
    if (i >= commentsArray.length){
      break;
    } else {
      commentFragment.appendChild(commentsArray[i]);
    }
  }
  numberOfCommentsNow += NUMBER_OF_COMMENTS;
  // проверка не превшена ли ко-во комментариев и скрваем когда все комментарии открыты
  if (numberOfCommentsNow >= commentsArray.length) {
    commentsMomentCount.textContent = commentsArray.length;
    loadMore.classList.add('hidden');
  } else {
    commentsMomentCount.textContent = numberOfCommentsNow;
  }

  comments.appendChild(commentFragment);
};

// генерим комментарии
function commentsCreate (photoItem) {
  //создаем новые комментарии
  for (let i = 0; i < photoItem.comments.length; i++) {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('img').src = photoItem.comments[i].avatar;
    comment.querySelector('img').alt = photoItem.comments[i].name;
    comment.querySelector('p').textContent = photoItem.comments[i].message;
    commentsArray.push(comment);
  }
}

// закрытие окна
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.removeEventListener('click', onCancelClick);
  body.classList.remove('modal-open');
  commentsArray = [];
  numberOfCommentsNow = 0;
  loadMore.classList.remove('hidden');
}

function renderBigPicture (thumbnailId) {
  //открытие окна полного размера
  bigPicture.classList.remove('hidden');
  // берем данные с картинки на которую нажали
  const photoItem = photos.find((x) => x.id === +thumbnailId);

  // заполняем окно данными
  bigPictureImg.src = photoItem.url;
  likesCount.textContent = photoItem.likes;
  commentsAllCount.textContent = photoItem.comments.length;
  description.textContent = photoItem.description;

  // начальное кол-во коммнтариев в счетчике
  if(photoItem.comments.length > NUMBER_OF_COMMENTS) {
    commentsMomentCount.textContent = NUMBER_OF_COMMENTS;
  } else {
    commentsMomentCount.textContent = photoItem.comments.length;
  }

  //очищаем комментарии в данной разметке
  comments.innerHTML = '';

  // вызов функции создания комментариев
  commentsCreate(photoItem);

  // вставляем комментарии
  onLoadMoreClick();

  // убираем прокрутку задника
  body.classList.add('modal-open');

  // событие на крестик
  bigPictureCancel.addEventListener('click', onCancelClick);

  // событие на ескейп
  document.addEventListener('keydown', onDocumentKeydown);
}

// событие загрузить еще
loadMore.addEventListener('click', onLoadMoreClick);

export {renderBigPicture, setDataForPhoto};
