const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const answer = document.getElementById("answer");
const addBtn = document.getElementById("addition");
const subBtn = document.getElementById("subtraction");
const mulBtn = document.getElementById("multiplication");
const divBtn = document.getElementById("division");

window.addEventListener("load", (e) => {
  number1.focus();
});

number1.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    number2.focus();
  }
});

addBtn.addEventListener("click", () => {
	const num1 = Number(number1.value);
	const num2 = Number(number2.value);

	const ans = (num1 + num2).toFixed(2);
	answer.textContent = ans;
});
subBtn.addEventListener("click", () => {
	const num1 = Number(number1.value);
	const num2 = Number(number2.value);

	const ans = (num1 - num2).toFixed(2);
	answer.textContent = ans;
});
mulBtn.addEventListener("click", () => {
	const num1 = Number(number1.value);
	const num2 = Number(number2.value);

	const ans = (num1 * num2).toFixed(2);
	answer.textContent = ans;
});
divBtn.addEventListener("click", () => {
	const num1 = Number(number1.value);
	const num2 = Number(number2.value);

	const ans = (num1 / num2).toFixed(2);
	if (ans === 'NaN'){
		alert("Not valid number for division.");
	}else{
	answer.textContent = ans;}
});

document.addEventListener("keypress", (event) => {
  const num1 = Number(number1.value);
	const num2 = Number(number2.value);
  console.log(event.key);
  if (num1 && num2) {
    switch (event.key) {
      case "+":
        addBtn.click();
        break;
      case "-":
        subBtn.click();
        break;
      case "/":
        divBtn.click();
        break;
      case "*":
        mulBtn.click();
        break;
      default:
        break;
    }
  }
  
});
