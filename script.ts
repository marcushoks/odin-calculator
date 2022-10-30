let input = "";

const buttons = document.querySelectorAll(".button.number");
buttons.forEach((button) => {
  button.addEventListener("click", updateDisplay);
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
  return a / b;
}

function operate(operator: Function, a: number, b: number): number {
  return operator(a, b);
}

function updateDisplay(e: Event) {
  const buttonClicked = e.target as HTMLElement;
  input += buttonClicked.textContent;

  const display = document.querySelector("#display");
  if (display) display.textContent = input;
}
