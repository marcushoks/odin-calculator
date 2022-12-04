"use strict";
const DEFAULT_DISPLAY = "0";
const OPERATOR_SELECTED_CLASS = "selected";
let display = DEFAULT_DISPLAY;
let operandA;
let operandB;
let operator;
const operandBtns = document.querySelectorAll(".button.operand");
operandBtns.forEach((button) => {
    button.addEventListener("click", updateOperand);
});
const decimalBtn = document.querySelector("#decimal-point");
decimalBtn === null || decimalBtn === void 0 ? void 0 : decimalBtn.addEventListener("click", updateOperand);
const toggleSignBtn = document.querySelector("#toggle-sign");
toggleSignBtn === null || toggleSignBtn === void 0 ? void 0 : toggleSignBtn.addEventListener("click", () => {
    if (display === "0")
        return;
    // if number is positive, prepends negative sign
    // else if number is negative, remove negative sign
    if (display.includes("-")) {
        display = display.slice(1);
    }
    else {
        display = "-" + display;
    }
    updateDisplay(display);
});
const operatorBtns = document.querySelectorAll(".button.operator");
operatorBtns.forEach((button) => {
    // set clicked button as operator
    button.addEventListener("click", (e) => {
        if (display.length === 0)
            return;
        // if operandA is not set, set operandA to the current value of display
        if (!operandA) {
            operandA = parseFloat(display);
            display = DEFAULT_DISPLAY;
            updateDisplay(display);
        }
        const operatorId = e.target.id;
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
    // toggles current selected operator UI
    button.addEventListener("click", (e) => {
        operatorBtns.forEach((btn) => {
            if (btn === e.target) {
                btn.classList.add(OPERATOR_SELECTED_CLASS);
            }
            else {
                btn.classList.remove(OPERATOR_SELECTED_CLASS);
            }
        });
    });
});
const evaluateBtn = document.querySelector("#evaluate");
evaluateBtn === null || evaluateBtn === void 0 ? void 0 : evaluateBtn.addEventListener("click", evaluate);
const clearEntryBtn = document.querySelector("#clear-entry");
clearEntryBtn === null || clearEntryBtn === void 0 ? void 0 : clearEntryBtn.addEventListener("click", clearEntry);
const backspaceBtn = document.querySelector("#backspace");
backspaceBtn === null || backspaceBtn === void 0 ? void 0 : backspaceBtn.addEventListener("click", () => {
    if (display !== DEFAULT_DISPLAY) {
        display = display.slice(0, display.length - 1);
        updateDisplay(display);
    }
});
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return b !== 0 ? a / b : b;
}
function modulus(a, b) {
    return a % b;
}
function updateOperand(e) {
    const input = e.target.textContent;
    if (!input)
        return;
    // prevent user from stacking 0's
    if (display === "0" && input === "0")
        return;
    // prevent user from stacking .'s
    if (display.includes(".") && input === ".")
        return;
    // remove leading 0
    if (display === "0" && input !== ".")
        display = "";
    display += input;
    updateDisplay(display);
}
/** Evaluate the inputted expression */
function evaluate() {
    // only evaluate when operandA is not null
    // and an operator is already selected
    // and the display is not null
    if (operandA && operator && display) {
        // the current value of display will be set to operandB
        operandB = parseFloat(display);
        const result = operator(operandA, operandB);
        display = String(result);
        updateDisplay(display);
        operandA = null;
        operandB = null;
        operator = null;
    }
}
/** Clears all inputted operands and operators */
function clearEntry() {
    operandA = null;
    operandB = null;
    operator = null;
    display = DEFAULT_DISPLAY;
    updateDisplay(display);
    // remove css class for selected operator
    operatorBtns.forEach((button) => {
        button.classList.remove(OPERATOR_SELECTED_CLASS);
    });
}
/** Updates the display UI */
function updateDisplay(str) {
    const display = document.querySelector("#display");
    if (display)
        display.textContent = str;
}
