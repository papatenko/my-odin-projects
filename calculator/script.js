function calculateSequence(operationSequence) {
  var operationArray = operationSequence.split(" ");

  // Calculate Multiples and Divisions
  for (let index = 0; index < operationArray.length; index++) {
    if (operationArray[index] === "*" || operationArray[index] === "/") {
      operationArray[index - 1] = operate(
        operationArray[index - 1],
        operationArray[index],
        operationArray[index + 1]
      ).toString();
      operationArray.splice(index, 2);
      index -= 2;
    }
  }

  // Calculate Addition and Subtractions
  for (let index = 0; index < operationArray.length; index++) {
    if (operationArray[index] === "+" || operationArray[index] === "-") {
      operationArray[index - 1] = operate(
        operationArray[index - 1],
        operationArray[index],
        operationArray[index + 1]
      ).toString();
      operationArray.splice(index, 2);
      index -= 2;
    }
  }

  return operationArray;
}

// Basic Math Functions
function operate(num1, operand, num2) {
  switch (operand) {
    case "+":
      return parseInt(num1) + parseInt(num2); // Requires parseInt to prevent strings from concating
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}
function isNumber(value) {
  if (value >= 48 || value <= 57) return true;
  return false;
}

let operationsDisplay = document.getElementById("operation-list");
let possibleOperations = ["+", "-", "*", "/"];

// Numbers
for (let index = 0; index < 9; index++) {
  let numpad = document.getElementById(index.toString());
  numpad.addEventListener("click", () => {
    operationsDisplay.textContent += index.toString();
  });
}

// Operations
for (let index = 0; index < possibleOperations.length; index++) {
  let operationButtons = document.getElementById(possibleOperations[index]);
  operationButtons.addEventListener("click", () => {
    if (
      isNumber(
        operationsDisplay.textContent.charAt(
          operationsDisplay.textContent.length - 2
        )
      )
    ) {
      operationsDisplay.textContent += " " + possibleOperations[index] + " ";
    }
  });
}

// Backspace
const backspaceButton = document.getElementById("backspace");

backspaceButton.addEventListener("click", () => {
  let operationsTextTemp = operationsDisplay.textContent;

  operationsDisplay.textContent = operationsTextTemp.substring(
    0,
    operationsTextTemp.length - 1
  );
});

// Clear
const clearButton = document.getElementById("clear");

clearButton.addEventListener("click", () => {
  operationsDisplay.textContent = "";
});

// Equals
const equalsButton = document.getElementById("=");

equalsButton.addEventListener("click", () => {
  operationsDisplay.textContent = calculateSequence(
    operationsDisplay.textContent
  );
});

// API Stuff
const api_url = "https://zenquotes.io/api/quotes/";

async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}

getapi(api_url);
