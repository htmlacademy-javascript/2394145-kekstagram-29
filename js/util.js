// проверка что нажат ескейп
export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.classList.add('error__alert');
  alert.textContent = message;
  document.body.append(alert);
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
