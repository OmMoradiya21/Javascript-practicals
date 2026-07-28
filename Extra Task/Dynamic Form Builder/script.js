const form = document.getElementById("form");
const formContainer = document.getElementById("formContainer");
const addBtn = document.getElementById("addBtn");

const appendInputField = (labelName, inputType) => {
  formContainer.innerHTML += `
    <label for=${labelName}>${labelName} : </label>
    <input type=${inputType} id=${labelName} required />
    <br>
    `;
};

const appendMultiChoiceInputField = (labelName, inputType, choices) => {
  const choicesArr = choices.split(",");
  console.log(choicesArr);

  formContainer.innerHTML += `
    <label >${labelName} : </label>
    ${choicesArr
      .map(
        (choice) => `
        <input type=${inputType} name=${labelName} value=${choice.trim()} id=${choice.trim()} />
        <label for=${choice.trim()} >${choice.trim()}</label>
        `,
      )
      .join("")}
    <br>
    `;
};

const addField = () => {
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

const handleAddBtn = () => {
  let numberOfFields = prompt("How many fields you want?", 1);
  if (!numberOfFields || Math.floor(numberOfFields) < 1 || Math.floor(numberOfFields) > 10) {
    alert("Enter appropriate number or number should between 1 to 10");
    return;
  }
  numberOfFields = Math.floor(numberOfFields);

  for (let i = 1; i <= numberOfFields; i++) {
    addField();
  }
};

addBtn.addEventListener("click", handleAddBtn);

form.addEventListener("submit", () => alert("Form Submitted Successfully."));
