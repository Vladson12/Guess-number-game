'use strict';

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const displayMessage = msg => {
  document.querySelector('.message').textContent = msg;
};

let initialInputValue = '';
let initialMessage = document.querySelector('.message').textContent;
let initialScore = document.querySelector('.score').textContent;

let secretNumber = randomInt(1, 20);
console.log(secretNumber);
let score = initialScore;
let highscore = Number(document.querySelector('.highscore').textContent);
let input;

document.querySelector('.check').addEventListener('click', () => {
  input = Number(document.querySelector('.guess').value);

  // Input validation
  if (!input) {
    displayMessage('⛔ No number!');
    return;
  } else if (input < 0 || input > 20) {
    displayMessage('⚠ A number must be in 0..20 range');
    return;
  }

  console.log(input);
  score--;
  if (score <= 0) {
    // Set lose message
    displayMessage('😞 You lose...');

    // Set correct answer
    document.querySelector('.number').textContent = secretNumber.toString();

    // Set lose color
    document.body.style.backgroundColor = '#f03e3e';

    // Disable check button
    document.querySelector('.check').setAttribute('disabled', 'true');
  } else if (input == secretNumber) {
    //Set correct answer
    document.querySelector('.number').textContent = secretNumber.toString();

    // Set congrats message
    displayMessage('🎉 Correct answer!');

    // Check if we need to set new highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore.toString();
    }

    // Set success color
    document.body.style.backgroundColor = '#60b347';

    // Disable check button
    document.querySelector('.check').setAttribute('disabled', 'true');
    console.log(document.querySelector('.check').disabled);
  } else {
    displayMessage(input < secretNumber ? '📉 Too low...' : '📈 Too big...');
  }

  // Decrement score
  document.querySelector('.score').textContent = score.toString();
});

document.querySelector('.again').addEventListener('click', () => {
  //Reset initial values
  document.querySelector('.check').removeAttribute('disabled');
  console.log(document.querySelector('.check').disabled);
  displayMessage(initialMessage);
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = initialScore;
  document.querySelector('.number').textContent = '?';
  document.body.style.backgroundColor = '#222';

  //Set new secret number
  secretNumber = randomInt(1, 20);
  score = initialScore;
});
