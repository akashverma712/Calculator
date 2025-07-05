const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let firstOperand = "";
let shouldResetDisplay = false;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.classList.contains("clear")) {
      if (value === "AC") {
        clearAll();
      } else if (value === "DEL") {
        deleteLast();
      }
    } else if (btn.classList.contains("operators")) {
      setOperator(value);
    } else if (btn.classList.contains("equals")) {
      calculate();
    } else {
      appendNumber(value);
    }
  });
});

function appendNumber(number) {
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }

  if (display.value === "0" && number !== ".") {
    display.value = number;
  } else {
    display.value += number;
  }

  currentInput = display.value;
}

function setOperator(op) {
  if (currentInput === "") return;
  firstOperand = currentInput;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === "" || shouldResetDisplay) return;

  const secondOperand = display.value;
  let result;

  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error";
      break;
    case "%":
      result = num1 % num2;
      break;
    default:
      result = "Error";
  }

  display.value = result;
  currentInput = result.toString();
  operator = "";
}

function clearAll() {
  display.value = "";
  currentInput = "";
  firstOperand = "";
  operator = "";
  shouldResetDisplay = false;
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  currentInput = display.value;
}