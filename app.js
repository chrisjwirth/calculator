'use strict';

// Calculation Functions
// noinspection JSUnusedGlobalSymbols
const calculator = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2
}

// Persistent Variables
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const equals = document.querySelector('.equals');

// Changing Variables
let num1;
let num2;
let storedOperator;
let numInProgress = false;
let operationInProgress = false;

// Clear
clear.addEventListener('click', () => {
  num1 = undefined;
  num2 = undefined;
  numInProgress = false;
  operationInProgress = false;
  result.textContent = '0';
});

// Operation
function processOperator(operator) {
  operators.forEach(operator => {
    operator.classList.remove('operatorClicked');
  });
  operator.classList.add('operatorClicked');
  decimal.disabled = false;
  if (operationInProgress) {
    calculate();
  }
  storedOperator = operator.classList[1];
  num1 = parseFloat(result.textContent);
  numInProgress = false;
  operationInProgress = true;
}

function operatorClicked() {
  processOperator(this);
}

operators.forEach(operator => {
  operator.addEventListener('click', (operatorClicked));
});

// Number
function processNumber(number) {
  if (numInProgress) {
    result.textContent += number;
    if (number === '.') {
      decimal.disabled = true;
    }
  } else {
    result.textContent = number;
    numInProgress = true;
  }
}

function numberClicked() {
  processNumber(this.textContent);
}

numbers.forEach(number => {
  number.addEventListener('click', numberClicked);
});

// Calculate Result
function calculate() {
  if (!operationInProgress) {
    return;
  }
  operators.forEach(operator => {
    operator.classList.remove('operatorClicked');
  });
  decimal.disabled = false;
  num2 = parseFloat(result.textContent);
  if (storedOperator === 'divide' && num2 === 0) {
    result.textContent = 'No Zero Division';
  } else {
    let answer = calculator[storedOperator](num1, num2);
    answer = Math.round((answer + Number.EPSILON) * 100000) / 100000;
    result.textContent = answer.toString();
  }
  numInProgress = false;
  operationInProgress = false;
}

equals.addEventListener('click', calculate);

// Keyboard Support
function typed(event) {
  const validNumBtns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const validOperatorBtns = ['+', '-', '*', '/'];
  const validCalculateBtns = ['+', 'Enter'];
  const key = event.key;
  if (validNumBtns.includes(key)) {
    processNumber(key);
  } else if (validOperatorBtns.includes(key)) {
    let operator;
    switch (key) {
      case '+':
        operator = operators[3];
        break;
      case '-':
        operator = operators[2];
        break;
      case '*':
        operator = operators[1];
        break;
      case '/':
        operator = operators[0];
        break;
    }
    processOperator(operator);
  } else if (validCalculateBtns.includes(key)) {
    calculate();
  } else if (key === "Backspace") {
    result.textContent = result.textContent.slice(0,-1);
    if (result.textContent === '') {
      result.textContent = '0';
      numInProgress = false;
    }
  }
}

document.addEventListener('keydown', typed);
