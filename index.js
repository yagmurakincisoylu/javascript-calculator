const prevInput = document.getElementById("prevInput");
const currentInput = document.getElementById("currentInput");

let currentInputArray = [];
let prevInputArray = [];
let lastButtonPressed = "";
//let lastOperationPressed = "";
const operationsArray = ["+", "-", "/" , "*"];

// functions

const appendInput = input => {
  let isLastInputOperation = operationsArray.includes(currentInputArray[currentInputArray.length - 1]);
  let isLastButtonPressedOperation = operationsArray.includes(lastButtonPressed);
  let hasAlreadyOperation = currentInputArray.some(element => operationsArray.includes(element));

  // if input = operator
  if(operationsArray.includes(input)) {
    if(hasAlreadyOperation) {
      if(isLastInputOperation && !isLastButtonPressedOperation) {
        currentInputArray = [...currentInputArray, ...prevInputArray];
        currentInputArray.push(input);
        lastButtonPressed = input;
        calculate();
      } else {
        currentInputArray[currentInputArray.length - 1] = input;
        lastButtonPressed = input;
      }
    } else {
      currentInputArray = [...currentInputArray, ...prevInputArray];
      currentInputArray.push(input);
      lastButtonPressed = input;
      //lastOperationPressed = input;
    }
  // if input = number
  } else {
    if(isLastInputOperation && operationsArray.includes(lastButtonPressed)) {
      prevInputArray = [];
    }
    lastButtonPressed = input;
    prevInputArray.push(input);
  }

  displayResult();
}

const chooseOperation = operation => {
  if(prevInput.textContent === "0") {
    return;
  }
  appendInput(operation);
}

const clearEntry = () => {
  if(prevInputArray.length === 0) {
    return;
  } else if(prevInputArray.length === 1 ) {
    prevInputArray = [];
  } else {
    prevInputArray = [...prevInputArray.slice(0, -1)];
  }

  displayResult();
}

const clearAll = () => {
  prevInput.textContent = "0";
  currentInput.textContent = "";
  currentInputArray = [];
  prevInputArray = [];
  lastButtonPressed = "";
}

const calculate = () => {
  let result = currentInputArray.join("");
  

  //const prevNumber = parseFloat(prevInputArray.join(""));
  //const currentNumber = parseFloat(currentInputArray.join(""));

  // switch(lastOperationPressed) {
  //   case "+":
  //     result = prevNumber + currentNumber
  //     break;

  //   case "-":
  //     result = prevNumber - currentNumber
  //     break;

  //   case "/":
  //     result = prevNumber / currentNumber
  //     break;

  //   case "*":
  //     result = prevNumber * currentNumber
  //     break;

  //   default:

  // }

  console.log(result)
  // currentInputArray = [];
  // prevInputArray = [];
  // prevInputArray.push(result)
  // currentInputArray.push(result);
  // currentInputArray.push(lastButtonPressed);
  displayResult();
}

const displayResult = () => {
  if(!prevInputArray.length) {
    prevInput.textContent = 0;
  } else {
    prevInput.textContent = prevInputArray.join("");
  }
  currentInput.textContent = currentInputArray.join("").replaceAll("/", "÷").replaceAll("*", "x");;
}

// buttons

// numbers button
const numberButtons = document.querySelectorAll("[data-numbers]");

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const prevInputLength = prevInput.textContent.length;

    if(prevInputLength > 6 && prevInputLength < 9) {
      prevInput.style.fontSize = "2rem";
    } else if(prevInputLength > 9 && prevInputLength < 12) {
      prevInput.style.fontSize = "1.5rem";
    } else if(prevInputLength > 12) {
      prevInput.style.fontSize = "1rem";
    } if(prevInputLength === 17) {
      return;
    }

    const number = button.textContent;
    appendInput(number);
  })
})

// operations button
const operationButtons = document.querySelectorAll("[data-operations]");

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    const operation = button.getAttribute("data-operations");
    chooseOperation(operation);
  })
})

// clear-all button

const clearAllButton = document.querySelector("[data-clear-all]");
clearAllButton.addEventListener("click", clearAll);

// clear-entry button

const clearEntryButton = document.querySelector("[data-clear-entry]");
clearEntryButton.addEventListener("click", clearEntry);

// equals button

const equalsButton = document.querySelector("[data-equals]");
equalsButton.addEventListener("click", calculate);