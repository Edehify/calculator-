const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentNumber = "";
let expression = [];
display.value = 0;



// loop through all buttons
buttons.forEach(button => {
  // add event listener to get button clicked
  button.addEventListener("click", (e) => {
    const value = e.target.textContent;
    if(value === "C"){
      currentNumber = "";
      expression = [];
      display.value = 0;
    }
    else if(value === "=") {
 expression.push(parseFloat(currentNumber));
 
 const result = calculateExpression(expression);
 display.value = result;
    }
    else if(value === "+" || value === "-" || value === "*" || value === "/") {
      expression.push(parseFloat(currentNumber));
      expression.push(value);
      currentNumber = "";
    }else if(value ==="."){
      if(currentNumber === "") {
        currentNumber = "0.";
      }else if(!currentNumber.includes(".")) {
        currentNumber += value;
        display.value = currentNumber;
      }else {
        return;
      }
    }

    else { 
      currentNumber += value;
      display.value = currentNumber;
    }

    


});
});
  

function calculateExpression(exp) {
  for(i=0; i<exp.length; i++ ){
    if(exp[i] === "*" || exp[i] === "/")
    {
      const operator = exp[i];
      const num1 = exp[i-1];
      const num2 = exp[i+1];
      const result = operator ==="*" ? num1 * num2 : num1 / num2;
      exp.splice(i-1,3,result);
      i--;

    }

  }

  for(i=0; i<exp.length; i++ ){
    if(exp[i] === "+" || exp[i] === "-")
    {
      const operator = exp[i];
      const num1 = exp[i-1];
      const num2 = exp[i+1];
      const result = operator ==="+" ? num1 + num2 : num1 - num2;
      exp.splice(i-1,3,result);
      i--;

    }

  }
  return exp[0];
}
   

