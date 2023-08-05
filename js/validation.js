const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const HASHTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_AMOUNTH = 5;

const getHashtagArray = () => hashtagField.value.split(' ').filter(Boolean);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

//Проверка комментария
const validateComment = () => commentField.value.length <= MAX_COMMENT_LENGTH;
// Проверка кол-ва хештегов
const validateHashtagCount = () => getHashtagArray().length <= MAX_HASHTAG_AMOUNTH;
// Проверка хештега по шаблону
const validateHashtag = () => getHashtagArray().every((elem) => HASHTAG_TEMPLATE.test(elem));

// Поиск одинаковых хештегов
const validateHashtagSame = () => {
  const hashtagArr = getHashtagArray();
  for (let i = 0; i < hashtagArr.length; i++) {
    let count = 0;
    for (let j = 0; j < hashtagArr.length; j++){
      if (hashtagArr[i].toLowerCase() === hashtagArr[j].toLowerCase()) {
        count++;
      }
    }
    if (count >= 2){
      return false;
    }
  }
  return true;
};

// дизейбл кнопки про ошибках валидации

const onFormInput = () => {
  if (!pristine.validate()) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

pristine.addValidator(hashtagField, validateHashtag, 'Ошибка в хештеге');
pristine.addValidator(hashtagField, validateHashtagCount, 'Слишком много хештегов');
pristine.addValidator(hashtagField, validateHashtagSame, 'Одинаковые хештеги');
pristine.addValidator(commentField, validateComment, 'Слишком длинный комментарий');

export {onFormInput, pristine};
