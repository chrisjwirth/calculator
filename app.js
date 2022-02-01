"use strict";

// Calculation Functions
class Calculator {
  add(num1, num2) {
    return num1 + num2;
  }
  subtract(num1, num2) {
    return num1 - num2;
  }
  multiply(num1, num2) {
    return num1 * num2;
  }
  divide(num1, num2) {
    return num1 / num2;
  }
}

// Persistent Variables
const calc = new Calculator();
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');

// Changing Variables
let num1;
let num2;
let operator;

// Clear
clear.addEventListener('click', () => {
  num1 = undefined;
  num2 = undefined;
  result.textContent = '0';
});

// Operation
function operatorClicked() {
  operator = this.classList[1];
}

operators.forEach(operator => {
  operator.addEventListener('click', (operatorClicked));
});

// Number
function numberClicked() {
  const number = this.textContent;
  result.textContent = number;
  if (!num1) {
    num1 = parseInt(number);
  } else {
    num2 = parseInt(number);
  }
}

numbers.forEach(number => {
  number.addEventListener('click', numberClicked);
});

// Calculate Result
equals.addEventListener('click', () => {
  result.textContent = calc[operator](num1, num2).toString();
});

// TODO - Store numbers larger than one digit
// TODO - Allow user to string together several operations
// TODO - Only evaluate a single pair of numbers at a time
// TODO - Round answers with long decimals
// TODO - Display message when attempting to divide by zero
// TODO - Support floating point numbers (disable . button if one is present)
// TODO - Add backspace button
// TODO - Add keyboard support