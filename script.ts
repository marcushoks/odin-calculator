const DEFAULT_DISPLAY = "0";
let display = DEFAULT_DISPLAY;

let operandA: number | null;
let operandB: number | null;

let operator: Function | null;

const operandBtns = document.querySelectorAll(".button.operand");
operandBtns.forEach((button) => {
  button.addEventListener("click", updateOperand);
});

const decimalBtn = document.querySelector("#decimal-point");
decimalBtn?.addEventListener("click", updateOperand);

const toggleSignBtn = document.querySelector("#toggle-sign");
toggleSignBtn?.addEventListener("click", () => {
  if (display === "0") return;

  if (display.includes("-")) {
    display = display.slice(1);
  } else {
    display = "-" + display;
  }

  updateDisplay(display);
});

const operatorBtns = document.querySelectorAll(".button.operator");
operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (display.length === 0) return;

    if (!operandA) {
      operandA = parseFloat(display);
      display = DEFAULT_DISPLAY;
      updateDisplay(display);
    }

    const operatorId = (e.target as HTMLElement).id;

    switch (operatorId) {
      case "add": {
        operator = add;
        break;
      }
      case "subtract": {
        operator = subtract;
        break;
      }
      case "multiply": {
        operator = multiply;
        break;
      }
      case "divide": {
        operator = divide;
        break;
      }
      case "modulus": {
        operator = modulus;
        break;
      }
    }
  });
});

const evaluateBtn = document.querySelector("#evaluate");
evaluateBtn?.addEventListener("click", evaluate);

const clearEntryBtn = document.querySelector("#clear-entry");
clearEntryBtn?.addEventListener("click", clearEntry);

const backspaceBtn = document.querySelector("#backspace");
backspaceBtn?.addEventListener("click", () => {
  if (display !== DEFAULT_DISPLAY) {
    display = display.slice(0, display.length - 1);
    updateDisplay(display);
  }
});

function add(a: number, b: number) {
  return a + b;
}

function subtract(a: number, b: number) {
  return a - b;
}

function multiply(a: number, b: number) {
  return a * b;
}

function divide(a: number, b: number) {
  return b !== 0 ? a / b : b;
}

function modulus(a: number, b: number) {
  return a % b;
}

function updateOperand(e: Event) {
  const input = (e.target as HTMLElement).textContent;

  if (!input) return;

  // prevent user from stacking 0's
  if (display === "0" && input === "0") return;

  // prevent user from stacking .'s
  if (display.includes(".") && input === ".") return;

  // remove leading 0
  if (display === "0" && input !== ".") display = "";

  display += input;
  updateDisplay(display);
}

function evaluate() {
  if (operandA && operator && display) {
    operandB = parseFloat(display);

    const result = operator(operandA, operandB);

    display = String(result);
    updateDisplay(display);

    operandA = null;
    operandB = null;
    operator = null;
  }
}

function clearEntry() {
  operandA = null;
  operandB = null;
  operator = null;
  display = DEFAULT_DISPLAY;
  updateDisplay(display);
}

function updateDisplay(str: string) {
  const display = document.querySelector("#display");
  if (display) display.textContent = str;
}
