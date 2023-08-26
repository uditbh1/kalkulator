const displayText = document.querySelector(".display-text");
const smallDisplayText = document.querySelector(".small-display-text");
let currentNumber = "0"; // Track the current number being entered
let expression = ""; // Track the entire expression
console.log(expression.length);
let operatorFlag = 1;
let operatorChangeFlag = 0;

////////////////////////////////////////////////////////////////////////////////////
function countOccurrences(str, targetChar) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === targetChar) {
      count++;
    }
  }
  return count;
}
function calculateExpression(str) {
  let arr, operand1, operand2, result;
  let roundedResult; // Round to 15 decimal places and convert back to a number
  if (str.includes("+") || str.includes("--")) {
    if (str.includes("+")) arr = str.split("+");
    else if (str.includes("--")) arr = str.split("--");
    // Convert the operands to numbers
    operand1 = parseFloat(arr[0]);
    operand2 = parseFloat(arr[1]);

    if (isNaN(operand2)) {
      operand2 = parseFloat(displayText.innerHTML);
      console.log(`operand2 ${operand2}`);
      result = operand1 + operand2;
      expression += operand2;
      console.log(expression);
    } else if (!isNaN(operand1) && !isNaN(operand2)) {
      result = operand1 + operand2;
    }
    // Ensure that result is formatted with a maximum of 15 digits
    if (expression.length > 30) {
      if (expression.includes(".")) {
        roundedResult = Number(result.toFixed(15));
        result = roundedResult;
      } else {
        result = Number(result.toPrecision(15));
      }
    } else {
      result = Number(result.toPrecision(15));
    }

    result = result.toString().substring(0, 15); // Convert the result back to a string
    if (result === "-0") return "0";
    return result;
  } else if (str.includes("*")) {
    arr = str.split("*");
    // Convert the operands to numbers
    operand1 = parseFloat(arr[0]);
    operand2 = parseFloat(arr[1]);

    if (isNaN(operand2)) {
      operand2 = parseFloat(displayText.innerHTML);
      result = operand1 * operand2;
      expression += operand2;
    } else if (!isNaN(operand1) && !isNaN(operand2)) {
      result = operand1 * operand2;
    }

    // Ensure that result is formatted with a maximum of 15 digits
    if (expression.length > 30) {
      if (expression.includes(".")) {
        roundedResult = Number(result.toFixed(15));
        result = roundedResult;
      } else {
        result = Number(result.toPrecision(15));
      }
    } else {
      result = Number(result.toPrecision(15));
    }

    return result.toString().substring(0, 15); // Convert the result back to a string
  } else if (str.includes("/")) {
    arr = str.split("/");

    // Convert the operands to numbers
    operand1 = parseFloat(arr[0]);
    operand2 = parseFloat(arr[1]);
    console.log(`operand1${operand1}`);
    console.log(`operand2${operand2}`);
    if (operand2 == 0) {
      return "Hell nah!";
    }

    if (isNaN(operand2)) {
      operand2 = parseFloat(displayText.innerHTML);
      if (operand2 === 0) {
        expression += "0";
        return "Hell nah!";
      }
      result = operand1 / operand2;
      expression += operand2;
    } else if (!isNaN(operand1) && !isNaN(operand2)) {
      result = operand1 / operand2;
    }
    // Ensure that result is formatted with a maximum of 15 digits
    if (expression.length > 30) {
      if (expression.includes(".")) {
        roundedResult = Number(result.toFixed(15));
        result = roundedResult;
      } else {
        result = Number(result.toPrecision(15));
      }
    } else {
      result = Number(result.toPrecision(15));
    }

    return result.toString().substring(0, 15); // Convert the result back to a string
  } else if (countOccurrences(str, "-") === 2) {
    arr = str.split("-");
    operand1 = parseFloat(arr[1]);
    operand2 = parseFloat(arr[2]);
    // result = operand1 + operand2;
    if (isNaN(operand2)) {
      operand2 = parseFloat(displayText.innerHTML);
      result = operand1 + operand2;
      expression += operand2;
    } else if (!isNaN(operand1) && !isNaN(operand2)) {
      result = operand1 + operand2;
    }
    if (expression.length > 30) {
      if (expression.includes(".")) {
        roundedResult = Number(result.toFixed(15));
        result = roundedResult;
      } else {
        result = Number(result.toPrecision(15));
      }
    } else {
      result = Number(result.toPrecision(15));
    }
    result.toString();
    result = "-" + result;
    if (result === "-0") return "0";
    return result.substring(0, 15); // Convert the result back to a string
  } else if (str.includes("-") && expression[0] != "-") {
    arr = str.split("-");
    // Convert the operands to numbers
    operand1 = parseFloat(arr[0]);
    operand2 = parseFloat(arr[1]);
    result = operand1 + operand2;

    if (isNaN(operand2)) {
      operand2 = parseFloat(displayText.innerHTML);
      result = operand1 - operand2;
      expression += operand2;
    } else if (!isNaN(operand1) && !isNaN(operand2)) {
      result = operand1 - operand2;
    }
    // Ensure that result is formatted with a maximum of 15 digits
    if (expression.length > 30) {
      if (expression.includes(".")) {
        roundedResult = Number(result.toFixed(15));
        result = roundedResult;
      } else {
        result = Number(result.toPrecision(15));
      }
    } else {
      result = Number(result.toPrecision(15));
    }
    return result.toString().substring(0, 15); // Convert the result back to a string
  }

  return str; // Return the original expression if the addition couldn't be performed
}

/////////////////////////////////////////////////////////////////////////////////////////////////

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", handleEvent);
});

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  const keyPressed = event.key;
  console.log(keyPressed);
  const correspondingButton = Array.from(buttons).find((button) => {
    const dataKey = button.getAttribute("data-key");
    return dataKey === keyPressed; // Use === for comparison
  });

  if (correspondingButton) {
    correspondingButton.click();
  }
}

function handleEvent(e) {
  if (e.target.classList.contains("number")) {
    if (currentNumber.length < 14) {
      const digit = e.target.innerHTML;

      // Append the digit to the current number
      if (expression.includes("Hell nah!")) {
        expression = "";
        currentNumber = "0";
        smallDisplayText.innerHTML = expression;
      }
      if (currentNumber === "0" && !currentNumber.includes(".")) {
        if (digit === ".") {
          const lastChar = expression.charAt(expression.length - 1);
          currentNumber += digit;
          if (lastChar === "0") expression = expression.slice(0, -1);
          expression += "0.";
        } else if (digit != "0") {
          currentNumber = digit;
          const lastChar = expression.charAt(expression.length - 1);
          if (lastChar === "0" && expression.length === 1)
            expression = expression.slice(0, -1);
          let secondLastChar;
          if (expression.length > 1)
            secondLastChar = expression.charAt(expression.length - 2);
          if (
            secondLastChar === "+" ||
            secondLastChar === "-" ||
            secondLastChar === "*" ||
            secondLastChar === "/"
          ) {
            expression = expression.slice(0, -1);
          }
          expression += digit;
        } else if (digit === "0" && digit.length == 1) {
          if (expression.charAt(expression.length - 1) != "0") {
            currentNumber = digit;
            console.log(`curr num ${currentNumber}`);
            expression += digit;
          }
        }
      } else if (currentNumber.includes(".") && digit === ".") {
        currentNumber = displayText.innerHTML;
        console.log(`curr num decimal ${currentNumber}`);
      } else {
        console.log(`curr num ${currentNumber}`);
        console.log(`digit ${digit}`);
        const lastChar = expression.charAt(expression.length - 1);
        if (lastChar === "0") expression.slice(0, -1);
        currentNumber += digit;
        expression += digit;
      }
      displayText.innerHTML = currentNumber;
    }
    console.log(expression);
  } else if (
    e.target.classList.contains("operator") &&
    !expression.includes("Hell nah!")
  ) {
    const lastChar = expression.charAt(expression.length - 1);
    if (expression.length >= 2) {
      if (
        expression.includes("+") ||
        expression.includes("-") ||
        expression.includes("*") ||
        expression.includes("/")
      ) {
        if (
          lastChar === "+" ||
          lastChar === "-" ||
          lastChar === "*" ||
          lastChar === "/" ||
          lastChar === "="
        ) {
          let newExp = expression.slice(0, -1) + e.target.innerHTML;
          expression = newExp;
          smallDisplayText.innerHTML = expression;
        } else {
          let newxp = calculateExpression(expression);
          expression = newxp;
          displayText.innerHTML = expression;
          if (!expression.includes("Hell nah!")) {
            expression += e.target.innerHTML;
            smallDisplayText.innerHTML = expression;
          } else {
            smallDisplayText.innerHTML += "0";
          }
        }
      } else {
        ///if only a number
        if (lastChar === ".") {
          expression = expression.slice(0, -1);
          // console.log(`curr num before${currentNumber}`);
          currentNumber = currentNumber.slice(0, -1);
          displayText.innerHTML = currentNumber;
          // console.log(`curr num after${currentNumber}`);
        }
        expression += e.target.innerHTML; //operator added
        smallDisplayText.innerHTML = expression;
      }
    } else if (expression.length == 1) {
      expression += e.target.innerHTML;
      smallDisplayText.innerHTML = expression;
    } else if (expression.length == 0) {
      expression = "0";
      expression += e.target.innerHTML;
      smallDisplayText.innerHTML = expression;
    }
    console.log(expression);

    // Reset the currentNumber for the next number input
    currentNumber = "0";
  } else if (e.target.classList.contains("equals")) {
    if (expression === "") {
      expression = "0";
      console.log(`curr num ${currentNumber}`);
    }
    const lastChar = expression.charAt(expression.length - 1);
    if (!expression.includes("=")) {
      if (lastChar === ".") expression = expression.slice(0, -1);
      console.log(`expression at = before ${expression}`);
      let res = calculateExpression(expression);
      expression += e.target.innerHTML;
      smallDisplayText.innerHTML = expression;
      displayText.innerHTML = res;
      expression = res;
      console.log(`expression at = after ${expression}`);

      // Reset the currentNumber for the next number input
      expression = displayText.innerHTML;
      currentNumber = displayText.innerHTML;
    }
  } else if (
    e.target.classList.contains("sign") &&
    displayText.innerHTML !== "0" &&
    !expression.includes("Hell nah!")
  ) {
    let currentNumber = displayText.innerHTML;
    const lastChar = expression.charAt(expression.length - 1);
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "*" ||
      lastChar === "-"
    ) {
      if (currentNumber[0] !== "-") {
        currentNumber = "-" + currentNumber;
      } else {
        currentNumber = currentNumber.slice(1);
      }
      expression += currentNumber;
      displayText.innerHTML = currentNumber;
    } else {
      let searchnum;
      let minus;

      if (currentNumber[0] !== "-") {
        searchnum = currentNumber; //stored +ve value
        currentNumber = "-" + currentNumber;
        minus = true;
      } else {
        currentNumber = currentNumber.slice(1);
        searchnum = currentNumber; //stored +ve value
        minus = false;
      }

      displayText.innerHTML = currentNumber;

      if (expression.includes(searchnum)) {
        const lastIndex = expression.lastIndexOf(searchnum);

        if (minus) {
          let str = expression;
          expression = str.slice(0, lastIndex) + "-" + str.slice(lastIndex);
        } else {
          expression =
            expression.slice(0, lastIndex - 1) + expression.slice(lastIndex);
        }
      }
    }

    console.log(`currentNumber: ${currentNumber}`);
    console.log(`expression: ${expression}`);
  } else if (
    e.target.classList.contains("backspace") &&
    displayText.innerHTML != "Hell nah!" &&
    displayText.innerHTML != "0"
  ) {
    if (
      smallDisplayText.innerHTML[smallDisplayText.innerHTML.length - 1] === "="
    ) {
      smallDisplayText.innerHTML = "";
      return;
    }
    if (
      expression[expression.length - 1] === "+" ||
      expression[expression.length - 1] === "-" ||
      expression[expression.length - 1] === "*" ||
      expression[expression.length - 1] === "/"
    ) {
      expression += displayText.innerHTML;
      currentNumber = displayText.innerHTML;
    }
    console.log(`curr num bs= ${currentNumber}`);
    console.log(`exp bs=${expression}`);
    if (displayText.innerHTML.length > 2) {
      displayText.innerHTML = displayText.innerHTML.slice(0, -1);
      expression = expression.slice(0, -1);
      currentNumber = currentNumber.slice(0, -1);
    } else if (displayText.innerHTML.length === 2) {
      if (displayText.innerHTML[0] === "-") {
        displayText.innerHTML = "0";
        expression = expression.slice(0, -1);
        currentNumber = "0";
      } else {
        displayText.innerHTML = displayText.innerHTML.slice(0, -1);
        expression = expression.slice(0, -1);
        currentNumber = currentNumber.slice(0, -1);
      }
    } else {
      displayText.innerHTML = "0";
      expression = expression.slice(0, -1);
      currentNumber = "0";
    }
    console.log(`curr num after bs= ${currentNumber}`);
    console.log(`exp after bs=${expression}`);
  } else if (e.target.classList.contains("all-clear")) {
    displayText.innerHTML = "0";
    currentNumber = "0";
    expression = "";
    smallDisplayText.innerHTML = "";
  }
}
