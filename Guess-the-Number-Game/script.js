const inputNum = document.getElementById("numberInput");
const guessBtn = document.getElementById("guessBtn");
const attempts = document.getElementById("attempts");
const hintContainer = document.getElementById("hintContainer");
const hintBtn = document.getElementById("hintBtn");

let randomNum = Math.floor(Math.random() * 100) + 1;
console.log("random number", randomNum);
let attemptsCount = 0;

const handleGuess = () => {
  const guessedNum = Math.floor(Number(inputNum.value));
  console.log(
    "user guess number:",
    guessedNum,
    "and it's type",
    typeof guessedNum,
  );

  attemptsCount++;
  if (randomNum === guessedNum) {
    // show attempts and play again
    const confirm = window.confirm(
      `you win with ${attemptsCount} attempts. would you like to play again?`,
    );
    if (confirm) {
      attemptsCount = 0;
      randomNum = Math.floor(Math.random() * 100) + 1;
      console.log("random number", randomNum);
    }
  }
  attempts.textContent = attemptsCount;
  inputNum.value = "0";
};

const showHint = () => {
  const guessedNum = Math.floor(Number(inputNum.value));
  const diff = guessedNum - randomNum;
  console.log("diff between:", diff);
  let hint;
  if (-10 < diff && diff < 10) {
    hint = "Too close..";
  } else if (10 <= diff && diff < 30) {
    hint = "Your Number is in Medium High range..";
  } else if (30 <= diff && diff < 75) {
    hint = "Your Number is High..";
  } else if (75 <= diff && diff <= 100) {
    hint = "Your Number is very High";
  } else if (-10 >= diff && diff > -30) {
    hint = "Your Number is in Medium Low range..";
  } else if (-30 >= diff && diff > -75) {
    hint = "Your Number is Low..";
  } else {
    hint = "Your Number is very Low..";
  }
  console.log(hint);
  console.log("guessed Number", guessedNum);
  hintContainer.textContent = hint;
};

guessBtn.addEventListener("click", handleGuess);

inputNum.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleGuess();
  }
});

hintBtn.addEventListener("click", showHint);
