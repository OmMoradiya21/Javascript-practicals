const form = document.getElementById("form");
const formContainer = document.getElementById("formContainer");
const addBtn = document.getElementById("addBtn");

const appendInputField = (labelName, inputType) => {
  let n = prompt("Enter number of input wants:", 1);

  if (!n || n < 1) {
    alert("negative number not Valid or Input not entered.");
    return;
  }
  n = Math.floor(Number(n));
  for (let i = 1; i <= n; i++) {
    formContainer.innerHTML += `
    <label for=${labelName}>${labelName} : </label>
    <input type=${inputType} id=${labelName} required />
    <br>
    `;
  }
};

const appendMultiChoiceInputField = (labelName, inputType, choices) => {
  const choicesArr = choices.split(",");
  console.log(choicesArr);

  let n = prompt("Enter number of input wants:", 1);

  if (!n || n < 1) {
    alert("negative number not Valid or Input not entered.");
    return;
  }
  n = Math.floor(Number(n));
  for (let i = 1; i <= n; i++) {
    formContainer.innerHTML += `
    <label >${labelName} : </label>
    ${choicesArr
      .map(
        (choice) => `
        <input type=${inputType} name=${labelName + i} value=${choice.trim() + i} id=${choice.trim() + i} />
        <label for=${choice.trim() + i} >${choice.trim()}</label>
        `,
      )
      .join("")}
    <br>
    `;
  }
};

const handleAddBtn = () => {
  let labelName = prompt("Enter Label Name: ");
  if (!labelName || labelName.trim().length <= 2) {
    alert("Label Name should more than 2 character.");
    return;
  }
  labelName = labelName.trim();
  const allInputTypes = new Set([
    "color",
    "date",
    "email",
    "file",
    "image",
    "month",
    "number",
    "password",
    "range",
    "reset",
    "search",
    "tel",
    "text",
    "time",
    "url",
    "week",
    "checkbox",
    "radio",
  ]);
  let inputType = prompt("Enter Type of Input: ", "text");

  if (!inputType || !allInputTypes.has(inputType.trim()?.toLowerCase())) {
    alert("please enter apropriate input field.");
    return;
  }
  inputType = inputType.toLowerCase().trim();

  if (inputType === "checkbox" || inputType === "radio") {
    console.log("entered checkbox or radio.");
    let multipleChoice = prompt("Add Multiple choices: ", "eg: a, b, c");
    console.log(multipleChoice);

    if (!multipleChoice || !multipleChoice.trim().length) {
      alert("please add multiple choices for radio/checkbox.");
      return;
    }
    multipleChoice = multipleChoice.trim();
    // function for handling checkbox and radio
    appendMultiChoiceInputField(labelName, inputType, multipleChoice);
  } else {
    appendInputField(labelName, inputType);
  }

  form.style.display = "block";
};

addBtn.addEventListener("click", handleAddBtn);
submitBtn.addEventListener("submit", () => {
  alert("Form submitted.");
});
form.addEventListener("submit",()=>alert("Form Submitted Successfully."));