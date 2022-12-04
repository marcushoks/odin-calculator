let display = "";

let operandA: number | null;
let operandB: number | null;

let operator: Function | null;

const operandBtns = document.querySelectorAll(".button.operand");
operandBtns.forEach((button) => {
  button.addEventListener("click", updateOperand);
});

const operatorBtns = document.querySelectorAll(".button.operator");
operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (display.length === 0) return;

    if (!operandA) {
      operandA = parseFloat(display);
      display = "";
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
  return a / b;
}

function modulus(a: number, b: number) {
  return a % b;
}

function updateOperand(e: Event) {
  const input = (e.target as HTMLElement).textContent;

  if (!input) return;

  // prevent user from stacking 0's
  if (display === "0" && input === "0") return;

  // remove leading 0
  if (display === "0") display = "";

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
  display = "";
  updateDisplay(display);
}

function updateDisplay(str: string) {
  const display = document.querySelector("#display");
  if (display) display.textContent = str;
}
