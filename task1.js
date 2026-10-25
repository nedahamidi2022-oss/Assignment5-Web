const TOTAL_LIVES = 3;
const MIN_VALUE = 1;
const MAX_VALUE = 100;

let lives = TOTAL_LIVES;
let streak = 0;
let bestStreak = 0;
let currentNumber = generateRandom();
let nextNumber = generateRandom();

const livesDisplay = document.getElementById("lives");
const streakDisplay = document.getElementById("streak");
const bestStreakDisplay = document.getElementById("best-streak");
const numberDisplay = document.getElementById("current-number");
const higherBtn = document.getElementById("higher-btn");
const lowerBtn = document.getElementById("lower-btn");
const messageDisplay = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

function generateRandom() {
  return Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
}

function updateUI() {
  livesDisplay.textContent = lives;
  streakDisplay.textContent = streak;
  bestStreakDisplay.textContent = bestStreak;
  numberDisplay.textContent = currentNumber;
}

function handleGuess(userGuess) {
  if (lives <= 0) return;

  if (
    (userGuess === "higher" && nextNumber >= currentNumber) ||
    (userGuess === "lower" && nextNumber <= currentNumber)
  ) {
    streak++;
    if (streak > bestStreak) {
      bestStreak = streak;
    }
    messageDisplay.textContent = "Correct!";
  } else {
    lives--;
    streak = 0;
    messageDisplay.textContent = "Wrong!";
  }

  currentNumber = nextNumber;
  nextNumber = generateRandom();
  updateUI();

  if (lives === 0) {
    messageDisplay.textContent = "Game Over! Restart to play again.";
    higherBtn.disabled = true;
    lowerBtn.disabled = true;
    restartBtn.style.display = "inline-block";
  }
}

function restartGame() {
  lives = TOTAL_LIVES;
  streak = 0;
  currentNumber = generateRandom();
  nextNumber = generateRandom();
  messageDisplay.textContent = "";
  higherBtn.disabled = false;
  lowerBtn.disabled = false;
  restartBtn.style.display = "none";
  updateUI();
}

higherBtn.addEventListener("click", () => handleGuess("higher"));
lowerBtn.addEventListener("click", () => handleGuess("lower"));
restartBtn.addEventListener("click", restartGame);

updateUI();