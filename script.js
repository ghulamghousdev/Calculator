//JavaScript code for Calculator

let screenTotal = 0;
let currentNumber = "0";
let currentOperator = null;

let screen = document.querySelector('.screen');

function toTargetInnerText() {
    document.querySelector(".calculator-buttons").addEventListener("click", function(event) {
        clickingButton(event.target.innerText);
    });
}

toTargetInnerText();

function clickingButton(value) {
    if (isNaN(parseInt(value))) {
        symbol(value);
    } else {
        toHandleNumber(value);
    }
}


function toHandleNumber(value) {
    if (currentNumber === "0") {
        currentNumber = value;
        rerender();
    } else {
        currentNumber += value;
        rerender();
    }
}

function rerender() {

    screen.innerText = currentNumber;
}

function symbol(value) {
    switch (value) {
        case 'C':

            currentNumber = "0";
            screenTotal = 0;
            currentOperator = null;
            rerender();
            break;

        case "=":

            if (currentOperator === null) {
                return;
            }

            operand(parseInt(currentNumber));
            currentOperator = null;
            currentNumber = screenTotal;
            screenTotal = 0;
            currentNumber = "0";

            break;

        case 'x':
            if (currentNumber.length === 1) {
                currentNumber = "0";
            } else {
                currentNumber = currentNumber.substring(0, currentNumber.length - 1);
            }
            rerender();
            break;

        default:
            mathOperations(value);
            break;
    }
}

function mathOperations(value) {
    if (currentNumber === "0") {
        return;
    }

    const intCurrentNumber = parseInt(currentNumber);
    if (screenTotal === 0) {
        screenTotal = currentNumber;
    } else {

        operand(intCurrentNumber);
    }
    currentOperator = value;
    currentNumber = "0";
}

function operand(intCurrentNumber) {
    if (currentOperator === '+') {
        screenTotal = parseInt(screenTotal) + parseInt(currentNumber);
    } else if (currentOperator === '-') {
        screenTotal -= currentNumber;
    } else if (currentOperator === '*') {
        screenTotal *= currentNumber;
    } else {
        screenTotal /= currentNumber;
    }
    currentNumber = screenTotal;
    rerender();
    currentNumber = "0";
}