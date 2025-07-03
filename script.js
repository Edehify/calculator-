// Get the display element where the result is shown
const display = document.getElementById("display");

// Get all button elements from the page
const buttons = document.querySelectorAll("button");

// Initialize current number being entered and the expression array
let currentNumber = "";
let expression = [];
display.value = 0;  // Set initial display value to 0

// Loop through all the calculator buttons
buttons.forEach(button => {
  // Add click event listener to each button
  button.addEventListener("click", (e) => {
    const value = e.target.textContent; // Get the text/content of the clicked button

    // If "C" is clicked, reset everything
    if (value === "C") {
      currentNumber = "";
      expression = [];
      display.value = 0;

    // If backspace ("🔙") is clicked
    } else if (value === "🔙") {
      if (currentNumber === "0") return;  // If already zero, do nothing
      if (currentNumber != "0") {
        currentNumber = currentNumber.slice(0, -1);  // Remove last digit
        display.value = currentNumber;
      }
      if (currentNumber == "") {  // If nothing left, show zero
        currentNumber = "0";
        display.value = currentNumber;
      }

    // If "=" is clicked, finalize expression and calculate
    } else if (value === "=") {
      expression.push(parseFloat(currentNumber));  // Push last number to expression
      const result = calculateExpression(expression);  // Evaluate the expression
      display.value = result;  // Show result
    }

    // If operator is clicked, store current number and operator
    else if (value === "+" || value === "-" || value === "*" || value === "/") {
      expression.push(parseFloat(currentNumber));  // Push current number to expression
      expression.push(value);  // Push operator to expression
      currentNumber = "";  // Reset current number
    }

    // Handle decimal point
    else if (value === ".") {
      if (currentNumber === "") {
        currentNumber = "0.";  // Start with 0. if input starts with dot
      } else if (!currentNumber.includes(".")) {
        currentNumber += value;  // Add dot if not already present
        display.value = currentNumber;
      } else {
        return;  // Do nothing if dot already exists
      }
    }

    // If it's a number (default case)
    else {
      currentNumber += value;  // Add digit to current number
      display.value = currentNumber;  // Show updated number
    }

  });
});

// Function to calculate the final expression result
function calculateExpression(exp) {
  // First pass: handle * and / with higher precedence
  for (i = 0; i < exp.length; i++) {
    if (exp[i] === "*" || exp[i] === "/") {
      const operator = exp[i];
      const num1 = exp[i - 1];
      const num2 = exp[i + 1];
      const result = operator === "*" ? num1 * num2 : num1 / num2;
      exp.splice(i - 1, 3, result);  // Replace the operation with the result
      i--;  // Move index back to handle chained operations
    }
  }

  // Second pass: handle + and - with lower precedence
  for (i = 0; i < exp.length; i++) {
    if (exp[i] === "+" || exp[i] === "-") {
      const operator = exp[i];
      const num1 = exp[i - 1];
      const num2 = exp[i + 1];
      const result = operator === "+" ? num1 + num2 : num1 - num2;
      exp.splice(i - 1, 3, result);  // Replace the operation with the result
      i--;  // Move index back
    }
  }

  return exp[0];  // Final result will be the only item left
}
