const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentNumber = "";
let expression = [];


buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentNumber = "";
      expression = [];
      display.value = "";
    } else if (value === "=") {
      // Push the last number before calculation
      expression.push(parseFloat(currentNumber));
      const result = calculateExpression(expression);
      display.value = result;
      // Reset for next operation
      currentNumber = result.toString();
      expression = [];
    } else if (["+", "-", "*", "/"].includes(value)) {
      expression.push(parseFloat(currentNumber));
      expression.push(value);
      currentNumber = "";
    } else {
      // It's a number or "."
      currentNumber += value;
      display.value = currentNumber;
    }
  });
});


function calculateExpression(expr) {
  // Step 1: handle * and /
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === "*" || expr[i] === "/") {
      const operator = expr[i];
      const num1 = expr[i - 1];
      const num2 = expr[i + 1];
      const result = operator === "*" ? num1 * num2 : num1 / num2;

      // Replace the 3 values with the result
      expr.splice(i - 1, 3, result);
      i--; // Step back one index to re-check
    }
  }

  // Step 2: handle + and -
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === "+" || expr[i] === "-") {
      const operator = expr[i];
      const num1 = expr[i - 1];
      const num2 = expr[i + 1];
      const result = operator === "+" ? num1 + num2 : num1 - num2;

      expr.splice(i - 1, 3, result);
      i--;
    }
  }

  return expr[0]; 
}
