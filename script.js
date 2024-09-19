// Variables to store values and operator
let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayValue = "";
const MAX_DISPLAY_LENGTH = 12;

// Select the display element
const display = document.getElementById("display");

// Function to update the display
function updateDisplay() {
    // If displayValue exceeds the max length, only show the first 10 digits
    if (displayValue.length > MAX_DISPLAY_LENGTH) {
        displayValue = displayValue.substring(0, MAX_DISPLAY_LENGTH);
    }
    display.textContent = displayValue || "0"; // Default to "0" if displayValue is empty
}

// Basic math operations
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
    if (b === 0) {
        return "Error: Can't divide by zero!";
    }
    return a / b;
}

// Function to round numbers to 4 decimal places
function roundNumber(number) {
    return Math.round(number * 10000) / 10000;
}

// The operate function, which calls the appropriate operation based on the operator
function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}

// Handle digit and decimal button clicks
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Prevent multiple decimals
        if (button.textContent === "." && displayValue.includes(".")) return;

        displayValue += button.textContent; // Add digit or decimal to display value
        updateDisplay(); // Update display after each click
    });
});

// Handle operator button clicks
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber && displayValue) {
            // If firstNumber and secondNumber exist, calculate the result
            secondNumber = displayValue;
            let result = roundNumber(operate(operator, parseFloat(firstNumber), parseFloat(secondNumber)));
            displayValue = result.toString();
            updateDisplay();
            firstNumber = result;
            secondNumber = "";
        }

        operator = button.textContent; // Set operator based on clicked button
        firstNumber = displayValue; // Store current displayValue as firstNumber
        displayValue = ""; // Reset display for next number input
    });
});

// Handle equals button click
const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => {
    if (firstNumber && displayValue) {
        secondNumber = displayValue;
        let result = roundNumber(operate(operator, parseFloat(firstNumber), parseFloat(secondNumber)));
        displayValue = result.toString(); // Display result
        updateDisplay();
        firstNumber = ""; // Reset for next calculation
        secondNumber = "";
        operator = "";
    }
});

// Handle clear button click
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    // Reset all values and clear the display
    firstNumber = "";
    secondNumber = "";
    operator = "";
    displayValue = "";
    updateDisplay();
});

// Handle backspace functionality (optional)
document.getElementById("backspace").addEventListener("click", () => {
    displayValue = displayValue.slice(0, -1); // Remove the last character from displayValue
    updateDisplay();
});

// Add keyboard support (optional)
window.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || e.key === ".") {
        if (e.key === "." && displayValue.includes(".")) return; // Prevent multiple decimals
        displayValue += e.key;
        updateDisplay();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
        operator = e.key;
        firstNumber = displayValue;
        displayValue = "";
    } else if (e.key === "Enter" || e.key === "=") {
        if (firstNumber && displayValue) {
            secondNumber = displayValue;
            displayValue = roundNumber(operate(operator, parseFloat(firstNumber), parseFloat(secondNumber))).toString();
            updateDisplay();
            firstNumber = "";
            secondNumber = "";
            operator = "";
        }
    } else if (e.key === "Backspace") {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
    } else if (e.key === "Escape") {
        // Clear calculator with Escape key
        firstNumber = "";
        secondNumber = "";
        operator = "";
        displayValue = "";
        updateDisplay();
    }
});
