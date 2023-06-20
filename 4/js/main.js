const DESCRIPTION = [
  "Лучше быть последним — первым, чем первым — последним.",
  "Каждый в цирке думает, что знает в цирке, но не каждый, что в цирке знает, что в цирке не каждый знает думает.",
  "За двумя зайцами погонишься — рыбку из пруда не выловишь, делу время, а отмеришь семь раз…",
  "Кем бы ты ни был, кем бы ты не стал, помни, где ты был и кем ты стал.",
  "Иногда жизнь — это жизнь, а ты в ней иногда."
]

const MESSAGE = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
]

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
]

const PHOTO_COUNT = 25;

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoURL = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoLikes = createRandomIdFromRangeGenerator(15, 200);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const generateCommentsCount = () => getRandomInteger(0, 30);
const generateCommentsId = createRandomIdFromRangeGenerator(0, 999);
const generateCommentsAvatar = () => getRandomInteger(1, 6);

const createComments = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${generateCommentsAvatar()}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
})

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoURL()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: generatePhotoLikes(),
  comments: Array.from({length: generateCommentsCount()}, createComments)
})

const photos = Array.from({length: PHOTO_COUNT}, createPhoto);

for (let i = 0; i < photos.length; i++){
  console.log(photos[i])
}





