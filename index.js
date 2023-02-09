const prevInput = document.getElementById("prevInput");
const currentInput = document.getElementById("currentInput");

let calculationResult = [];

// buttons

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

    const value = button.textContent;
    appendNumber(value);
  })
})

// functions

const appendNumber = number => {
  calculationResult.push(number);
  displayResult();
}

const displayResult = () => {
  prevInput.textContent = calculationResult.join("");
}

