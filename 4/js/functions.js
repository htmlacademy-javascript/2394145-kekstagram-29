//Не длиннее ли строка указаного кол-ва символов?
const checkLength = (string, maxLength) => string.length <= maxLength;

// // Строка является палиндромом?
function isPalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] != string[(string.length - 1) - i]) {
      return false;
    }
  }
  return true;
}

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
//и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN:
function extractionNumbers(string) {
  let number = '';
  string = string.toString();
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i]))){
      number += parseInt(string[i]);
    }
  }
  return number.length == 0 ?  NaN : +number;
}
