function Calculator(previousOperandTextElement, currentOperandTextElement) {
  this.previousOperandTextElement = previousOperandTextElement;
  this.currentOperandTextElement = currentOperandTextElement;
  this.clear();
}

Calculator.prototype.clear = function () {
  this.currentOperand = "";
  this.previousOperand = "";
  this.operation = undefined;
};
Calculator.prototype.delete = function () {
  this.currentOperand = this.currentOperand.toString().slice(0, -1);
};

Calculator.prototype.appendNumber = function (number) {
  if (number === "." && this.currentOperand.includes(".")) return;
  this.currentOperand = this.currentOperand.toString() + number.toString();
};

Calculator.prototype.chooseOperation = function (operation) {
  if (this.currentOperand === "") return;
  if (this.previousOperand !== "") {
    this.compute();
  }
  this.operation = operation;
  this.previousOperand = this.currentOperand;
  this.currentOperand = "";
};

Calculator.prototype.compute = function () {
  let computation;
  const prev = parseFloat(this.previousOperand);
  const current = parseFloat(this.currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (this.operation) {
    case "+":
      computation = prev + current;
      break;

    case "-":
      computation = prev - current;
      break;

    case "*":
      computation = prev * current;
      break;

    case "÷":
      computation = current === 0 ? "Error" : prev / current;
      break;

    default:
      return;
  }
  this.currentOperand = computation;
  this.operation = undefined;
  this.previousOperand = "";
};

Calculator.prototype.updateDisplay = function () {
  this.currentOperandTextElement.innerText = this.getDisplayNumber(
    this.currentOperand
  );
  if (this.operation != null) {
    this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
      this.previousOperand
    )} ${this.operation}`;
  } else {
    // Clear the previous operand display if there's no operation
    this.previousOperandTextElement.innerText = "";
  }
};

Calculator.prototype.getDisplayNumber = function (number) {
  const stringNumber = number.toString();
  const intergerDigit = parseFloat(stringNumber.split(".")[0]);
  const decimalDigit = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(intergerDigit)) {
    integerDisplay = "";
  } else {
    integerDisplay = intergerDigit.toLocaleString('en',{
        maximumFractionDigits:0
    })
  }

  if(decimalDigit != null){
    return `${integerDisplay}.${decimalDigit}`
  }
  else{
    return integerDisplay
  }
};

const numberButtons = document.querySelectorAll("[data-number]");
const operationsButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearsButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearsButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
