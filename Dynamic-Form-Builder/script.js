const inputLabelName = document.getElementById("inputLabelName");
const inputTypeSelector = document.getElementById("inputTypeSelector");
const inputMultipleChoices = document.getElementById("inputMultipleChoices");
const multipleChoicesDiv = document.getElementById("multipleChoicesDiv");
const form = document.getElementById("form");
const formContainer = document.getElementById("formContainer");
const addBtn = document.getElementById("addBtn");

inputTypeSelector.addEventListener("change", (event) => {
  const selected = event.target.value;
  console.log(event.target.value);
  if (selected === "checkbox" || selected === "radio") {
    multipleChoicesDiv.style.display = "block";
  } else {
    multipleChoicesDiv.style.display = "none";
  }
});

const appendInputField = (labelName, inputType) => {
    formContainer.innerHTML += `
    <label for=${labelName}>${labelName} : </label>
    <input type=${inputType} id=${labelName}/>
    <br>
    `;
}

const handleAddBtn = () =>{
    const labelName = inputLabelName.value;
    const inputType = inputTypeSelector.value;
    const multipleChoice = inputMultipleChoices.value;
    if (labelName.length <= 2){
        alert("Label Name should more than 2 character.");
        return;
    }
    if((inputType === "checkbox" || inputType === "radio") && multipleChoice === ""){
        alert("please add multiple choices for radio/checkbox.");
        return;
    }
    form.style.display = "block";
    if (inputType === "checkbox" || inputType === "radio"){
        appendMultiChoiceInput();
    }else{
        appendInputField(labelName, inputType);
    }
}

addBtn.addEventListener("click", handleAddBtn);