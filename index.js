const prevInput = document.getElementById("prevInput");
const currentInput = document.getElementById("currentInput");

let currentInputArray = [];
let prevInputArray = [];
let lastButtonPressed = "";
const operationsArray = ["+", "-", "/" , "*"];

// functions

const appendInput = input => {
  // if last input is an operator
  let isLastInputOperation = operationsArray.includes(currentInputArray[currentInputArray.length - 1]);
  // if last button pressed is an operator
  let isLastButtonPressedOperation = operationsArray.includes(lastButtonPressed);
  // if there is more than one operator
  let hasAlreadyOperation = currentInputArray.some(element => operationsArray.includes(element));


  if(currentInputArray[currentInputArray.length - 1] === "=") {
    currentInputArray = [];
    if(!operationsArray.includes(input)) {
      prevInputArray = [];
      prevInputArray.push(input);
      displayResult();
      return;
    } else {
      currentInputArray.push(prevInputArray[0], input);
    }
  }


  if(operationsArray.includes(input)) {
    // if input = operator
    if(hasAlreadyOperation) {
      if(isLastInputOperation && !isLastButtonPressedOperation) {
        // to calculate
        currentInputArray = [...currentInputArray, ...prevInputArray, ...input];
        lastButtonPressed = input;
        calculate(false);
      } else {
        // to change last operator
        currentInputArray[currentInputArray.length - 1] = input;
        lastButtonPressed = input;
      }
    } else {
      // if there is only one operator
      currentInputArray = [...currentInputArray, ...prevInputArray, ...input];
      lastButtonPressed = input;
    }
  // if input = number
  } else if(input === "=") {
    currentInputArray = [...currentInputArray, ...prevInputArray];
    calculate(true);
  } else {
    if(isLastInputOperation && operationsArray.includes(lastButtonPressed)) {
      prevInputArray = [];
    }

    // if first input is "."
    if(input === "." && prevInputArray.length === 0) {
      prevInputArray.push("0.");
      lastButtonPressed = input;
      displayResult();
      return;
    }

    // if "." has pressed more than one time
    if(prevInputArray.includes(".") && isNaN(parseFloat(input))) {
      return;
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
  let length = prevInputArray.length;
  if(length === 0) {
    return;
  } else if(length === 1 ) {
    prevInputArray = [];
  } else {
    prevInputArray = [...prevInputArray.slice(0, -1)];
  }

  resizeText(length);
  displayResult();
}

const clearAll = () => {
  prevInput.textContent = "0";
  currentInput.textContent = "";
  currentInputArray = [];
  prevInputArray = [];
  lastButtonPressed = "";
  resizeText(prevInputArray.length);
}

const calculate = (bool) => {
  let result;
  let indexOfOperator;
  let lastOperator;

  // if equals button's pressed: 
  if(bool) {
    lastOperator = "=";
    currentInputArray.map((element, index) => {
      if(operationsArray.includes(element)) {
        indexOfOperator = index;
        return;
      }
    });
  } else {
    lastOperator = currentInputArray.pop();
    // to find the operator index:
    currentInputArray.map((element, index) => {
      if(operationsArray.includes(element)) {
        indexOfOperator = index;
        return;
      }
    });
  }

  // slice the array into three peaces to calculate result:
  let firstNumber = parseFloat(currentInputArray.slice(0, indexOfOperator).join(""));
  let secondNumber = parseFloat(currentInputArray.slice((indexOfOperator + 1)).join(""));
  let operator = currentInputArray[indexOfOperator];
  
  // to fix 0.1 + 0.2 = 0.30000000000000004:
  let numbersArr = Array(firstNumber, secondNumber);
  if(numbersArr.includes(0.1) && numbersArr.includes(0.2)) {
    result = 0.3;
  } else {
    // to calculate:
    switch(operator) {
      case "+":
        result = firstNumber + secondNumber
        break;

      case "-":
        result = firstNumber - secondNumber
        break;

      case "/":
        result = firstNumber / secondNumber
        break;

      case "*":
        result = firstNumber * secondNumber
        break;

      default:
        break;
    }
  }

  if(lastOperator === "=") {
    currentInputArray.push("=");
  } else {
    currentInputArray = [];
    currentInputArray.push(result, lastOperator);
  }
  
  prevInputArray = [];
  prevInputArray.push(result);
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

const changePlusMinus = () => {
  let num = prevInputArray[0];
  if(!prevInputArray.length) {
    return;
  } else {
    if(num < 0) {
      prevInputArray[0] = Math.abs(prevInputArray[0])
    } else {
      prevInputArray[0] = -Math.abs(prevInputArray[0])
    }
  }
  
  displayResult()
}

const resizeText = (length) => {
  if(length < 6) {
  prevInput.style.fontSize = "3rem";
  } else if(length > 6 && length < 9) {
    prevInput.style.fontSize = "2rem";
  } else if(length > 9 && length < 12) {
    prevInput.style.fontSize = "1.5rem";
  } else if(length > 12) {
    prevInput.style.fontSize = "1rem";
  }
}

const changeTheme = () => {
  document.body.classList.toggle('light-mode');
}

// buttons

// numbers button
const numberButtons = document.querySelectorAll("[data-numbers]");

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    let prevInputLength = prevInput.textContent.length;
    if(prevInputLength === 17) {
      return;
    }
    resizeText(prevInputLength);
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

// plus-minus button

const plusMinusButton = document.querySelector("[data-plus-minus]");
plusMinusButton.addEventListener("click", changePlusMinus);

// clear-all button

const clearAllButton = document.querySelector("[data-clear-all]");
clearAllButton.addEventListener("click", clearAll);

// clear-entry button

const clearEntryButton = document.querySelector("[data-clear-entry]");
clearEntryButton.addEventListener("click", clearEntry);

// equals button

const equalsButton = document.querySelector("[data-equals]");
equalsButton.addEventListener("click", () => appendInput("="));

// change-theme button

const changeThemeButton = document.querySelector("[data-theme]");
changeThemeButton.addEventListener("click", changeTheme);