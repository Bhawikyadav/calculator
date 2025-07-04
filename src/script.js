const display = document.getElementById('display');
 
function appendValue(value) {
  display.value += value;
 
}
 
function clearDisplay() {
    display.value = '';
}
function calculate() {
    let expr = display.value;
    let tokens = [];
    let number = "";

    // Split expression into numbers and operators
    for (let i = 0; i < expr.length; i++) {
      let ch = expr[i];
      if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
        tokens.push(Number(number));
        tokens.push(ch);
        number = "";
      } else {
        number += ch;
      }
    }
    tokens.push(Number(number)); // push last number

    // Step 1: Handle * and /
    let i = 0;
    while (i < tokens.length) {
      if (tokens[i] === '*') {
        let result = tokens[i - 1] * tokens[i + 1];
        tokens.splice(i - 1, 3, result);
        i = 0;
      } else if (tokens[i] === '/') {
        if (tokens[i + 1] === 0) {
          display.value = "Error: /0";
          return;
        }
        let result = tokens[i - 1] / tokens[i + 1];
        tokens.splice(i - 1, 3, result);
        i = 0;
      } else {
        i++;
      }
    }

    // Step 2: Handle + and -
    i = 0;
    while (i < tokens.length) {
      if (tokens[i] === '+') {
        let result = tokens[i - 1] + tokens[i + 1];
        tokens.splice(i - 1, 3, result);
        i = 0;
      } else if (tokens[i] === '-') {
        let result = tokens[i - 1] - tokens[i + 1];
        tokens.splice(i - 1, 3, result);
        i = 0;
      } else {
        i++;
      }
    }

    display.value = tokens[0];
  }