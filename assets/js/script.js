// EVENT LISTENERS

// Wait for the DOm to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function () {
  let buttons = document.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function () {
      if (this.getAttribute('data-type') === 'submit') {
        checkAnswer();
      } else {
        let gameType = this.getAttribute('data-type');
        runGame(gameType);
      }
    });
  }

  // allow enter key to submit answer
  document
    .getElementById('answer-box')
    .addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        checkAnswer();
      }
    });

  runGame('addition');
});

// FUNCTIONS
/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
  // reset the answer box after each go
  document.getElementById('answer-box').value = '';

  // set cursor to answerbox at start and after each go
  document.getElementById('answer-box').focus();

  // create two random numbers between 1 and 25
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  if (gameType === 'addition') {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === 'division') {
    displayDivisionQuestion(num1, num2);
  } else if (gameType === 'multiply') {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === 'subtract') {
    displaySubtractQuestion(num1, num2);
  } else {
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}, Aborting`;
  }
}

/**
 * check the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById('answer-box').value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert('You got it right.');
    incrementScore();
  } else {
    alert(
      `You answered ${userAnswer}. This is incorrect. The correct answer was ${calculatedAnswer[0]}`
    );
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]);
}

/**
 * Get the operand (the numbers) and the operator (plus, minus, etc)
 * directly from the DOMException, and returns the correct checkAnswer.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById('operand1').innerText);
  let operand2 = parseInt(document.getElementById('operand2').innerText);
  let operator = document.getElementById('operator').innerText;

  if (operator === '+') {
    return [operand1 + operand2, 'addition'];
  } else if (operator === '/') {
    return [operand1 / operand2, 'division'];
  } else if (operator === '-') {
    return [operand1 - operand2, 'subtract'];
  } else if (operator === 'x') {
    return [operand1 * operand2, 'multiply'];
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}. Aborting`;
  }
}

/**
 * get the current score from the DOM and increment by 1
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById('score').innerText);
  document.getElementById('score').innerText = ++oldScore;
}

/**
 * get the tally of incorrect answers from the DOM and increment by 1
 */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById('incorrect').innerText);
  document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
  // check to see which number is bigger. biggest number first
  document.getElementById('operand1').textContent =
    operand1 > operand2 ? operand1 : operand2;
  document.getElementById('operand2').textContent =
    operand1 > operand2 ? operand2 : operand1;
  document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion(operand1, operand2) {
  operand1 = operand1 * operand2;
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = '/';
}
