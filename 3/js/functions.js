//Не длиннее ли строка указаного кол-ва символов?
function checkLength(string, maxLength) {
  return string.length <= maxLength;
}

// Строка является палиндромом?
function isPalindrome(string) {
  let newString = '';
  string = string.replaceAll(' ', '').toLowerCase();
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return string === newString;
}
//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
//и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN:
function extractionNumbers(string) {
  let number = '';
  let check = false;
  string = string.toString();
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i]))){
      number += parseInt(string[i]);
      check = true;
    }
  }
  return check ? +number : NaN;
}
