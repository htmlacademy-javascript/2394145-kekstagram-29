import { effects } from './effects-settings.js';

const imageForEffect = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelIndicator = document.querySelector('.effect-level__value');
let effectNow = document.querySelector('.effects__item input').value;

noUiSlider.create (effectSlider, {
  start: 100,
  step: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  }
});

//убрать слайдер
effectSliderContainer.classList.add('hidden');

// меняем параметы слайдера
const changeSlider = (step, min, max) => {
  const newSliderSettings = {
    start: 100,
    step: Number(step),
    connect: 'lower',
    range: {
      'min': Number(min),
      'max': Number(max)
    }
  };
  effectSlider.noUiSlider.updateOptions(newSliderSettings);
};

// выполняем при нажатии на миниатюру эффекта
const onThumbnailEffectClick = (evt) => {
  const thumbnail = evt.target.closest('.effects__item input');
  const val = thumbnail.value;
  if (val === 'none'){
    effectSliderContainer.classList.add('hidden');
    imageForEffect.style.filter = 'none';
  } else {
    effectSliderContainer.classList.remove('hidden');
    effectNow = val;
    changeSlider(effects[val].step, effects[val].min, effects[val].max);
    imageForEffect.style.filter = `${effects[val].filter}(${effects[val].max}${effects[val].mesure})`;
  }
};

// меняем значения фильтра при прокрутке ползунка
effectSlider.noUiSlider.on('update', () => {
  const valueSlider = effectSlider.noUiSlider.get();
  imageForEffect.style.filter = `${effects[effectNow].filter}(${valueSlider}${effects[effectNow].mesure})`;
  effectLevelIndicator.value = valueSlider;
});

const resetEffects = () => {
  effectSliderContainer.removeEventListener('click', onThumbnailEffectClick);
  imageForEffect.style.filter = 'none';
  effectSliderContainer.classList.add('hidden');
};

export {resetEffects, onThumbnailEffectClick};
