const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const status = document.getElementById("status");
const form = document.getElementById("form");
const submitBtn = document.getElementById("submitBtn");

const fieldValidation = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
  get isAllValid() {
    return Object.keys(this)
      .filter((key) => key !== "isAllValid")
      .every((key) => this[key] === true);
  },
};

function allFieldValidation(field, isValid) {
  fieldValidation[field] = isValid;
  if (fieldValidation.isAllValid) {
    status.innerHTML = `No validation Error`;
    status.className = "status-valid";
    console.log("all validation true");
    submitBtn.disabled = false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.innerHTML = `Form Submitted Successfully`;
  status.className = "status-valid";
});

name.addEventListener("input", (e) => {
  const val = e.target.value;
  let isValid = /^[a-zA-Z\s]+$/.test(val) && val.length >= 3;

  if (isValid) {
    status.innerHTML = `Your Name is valid`;
    status.className = "status-valid";
    name.style.borderColor = "green";
  } else {
    status.innerHTML = `Your Name must be at least 3 characters and must not contain numbers or special characters`;
    status.className = "status-invalid";
    name.style.borderColor = "red";
  }
  allFieldValidation("name", isValid);
});
email.addEventListener("input", (e) => {
  const val = e.target.value;
  let isValid = /^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]/i.test(val);
  if (isValid) {
    status.innerHTML = `Your Email is valid`;
    status.className = "status-valid";
    email.style.borderColor = "green";
  } else {
    status.innerHTML = `Please Enter Valid Email`;
    status.className = "status-invalid";
    email.style.borderColor = "red";
  }
  allFieldValidation("email", isValid);
});
password.addEventListener("input", (e) => {
  const val = e.target.value;
  let isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val);
  if (isValid) {
    status.innerHTML = `Your password is valid`;
    status.className = "status-valid";
    password.style.borderColor = "green";
  } else {
    status.innerHTML = `Password Must include at least one uppercase letter, one lowercase letter, one number, and one special character`;
    status.className = "status-invalid";
    password.style.borderColor = "red";
  }
  allFieldValidation("password", isValid);
});
confirmPassword.addEventListener("input", (e) => {
  const val = e.target.value;
  const pass = password.value;
  const isValid =
    val === pass &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val);
  if (isValid) {
    status.innerHTML = `Your Confirm-password matched`;
    status.className = "status-valid";
    confirmPassword.style.borderColor = "green";
  } else {
    status.innerHTML = `Your Confirm-password field should match with password`;
    status.className = "status-invalid";
    confirmPassword.style.borderColor = "red";
  }
  allFieldValidation("confirmPassword", isValid);
});
