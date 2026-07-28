const input = document.getElementById("countdownInput");
const startBtn = document.getElementById("startBtn");
const counterContainer = document.getElementById("counterContainer");

let timer;
let intervalId;

const handleCounter = () => {
  timer = Number(input.value);
  if (timer === 0 || timer > 9999) {
    alert("timer second limit in between 1 - 9999.");
    return;
  }
  clearInterval(intervalId);
  // startBtn.disabled = true;
  console.log(timer, "type is", typeof timer);
  if (Math.floor(timer / 10) === 0) {
    counterContainer.textContent = `0${timer}`;
  } else {
    counterContainer.textContent = timer;
  }
  intervalId = setInterval(() => {
    timer--;
    console.log(timer);
    if (Math.floor(timer / 10) === 0) {
      counterContainer.textContent = `0${timer}`;
    } else {
      counterContainer.textContent = timer;
    }
    if (timer === 0) {
      // startBtn.disabled = false;
      console.log("timer stopped");
      alert("Timer Done.");
      clearInterval(intervalId);
    }
    // timer--;
  }, 1000);
  input.value = "";
};

startBtn.addEventListener("click", handleCounter);
