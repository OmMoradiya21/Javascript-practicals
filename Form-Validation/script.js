const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const status = document.getElementById("status");

name.addEventListener("input", (e) => {
  const val = e.target.value;
  let isValid = /^[a-zA-Z\s]+$/ && val.length >= 3;
 
  if (isValid) {
    status.innerHTML = `Your Name field is valid`;
    name.style.borderColor = "green";
  } else {
    status.innerHTML = `Your Name field is Invalid`;
    name.style.borderColor = "red";
  }
});
email.addEventListener("input", (e) => {
  const val = e.target.value;
  let isValid = /^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]/i.test(val);
  console.log(isValid);
  if (isValid) {
    status.innerHTML = `Your Email field is valid`;
    email.style.borderColor = "green";
  } else {
    status.innerHTML = `Your Email field is Invalid`;
     email.style.borderColor = "red";
  }
});
password.addEventListener("input", (e) => {
  const val = e.target.value;
  let isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val);
  if (isValid) {
    status.innerHTML = `Your password field is valid`;
    password.style.borderColor = "green";
  } else {
    status.innerHTML = `Your password field is Invalid`;
     password.style.borderColor = "red";
  }
});
confirmPassword.addEventListener("input", (e) => {
  const val = e.target.value;
  const pass = password.value;
  const isValid =
    val === pass &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val);
  if (isValid) {
    status.innerHTML = `Your Confirm-password field is valid`;
    confirmPassword.style.borderColor = "green";
  } else {
    status.innerHTML = `Your Confirm-password field is invalid`;
     confirmPassword.style.borderColor = "red";
  }
});
