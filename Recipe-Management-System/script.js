const form = document.getElementById("add-recipe-form");
const allRecipeContainer = document.getElementById("all-recipe");
const resetBtn = document.getElementById("resetBtn");
const getAllRecipeBtn = document.getElementById("get-all-recipe-btn");
const searchBtn = document.getElementById("searchBtn");
const submitBtn = document.getElementById("submitBtn");
const searchByName = document.getElementById("searchByName");
const searchByCatagory = document.getElementById("searchByCatagory");
const searchByIngredients = document.getElementById("searchByIngredients");
const searchField = document.getElementById("searchField");

const deleteRecipe = (recipeId) => {
  const allRecipes = JSON.parse(localStorage.getItem("allRecipe"));
  const filtered = allRecipes.filter(({ id, ...rest }) => id !== recipeId);
  localStorage.setItem("allRecipe", JSON.stringify(filtered));
  renderRecipes(filtered);
};
const editRecipe = (recipeId) => {
  localStorage.setItem("recipeId", recipeId);
  const allRecipes = JSON.parse(localStorage.getItem("allRecipe"));
  const recipe = allRecipes.find(({ id, ...rest }) => id === recipeId);
  Object.keys(recipe).forEach((key) => {
    const inputElement =
      document.querySelector(`input[name="${key}"]`) ||
      document.querySelector(`textarea[name="${key}"]`);
    console.log(key);

    if (inputElement) {
      inputElement.value = recipe[key];
    }
  });
  submitBtn.textContent = "Edit Recipe";
};

const renderRecipes = (arr) => {
  if (arr.length === 0) {
    allRecipeContainer.innerHTML = `<h2>No recipe Exist</h2>`;
    return;
  }
  arr = arr.toReversed();
  const recipes = arr
    .map(
      ({
        id,
        recipeName,
        recipeCatagory,
        recipeIngredients,
        recipeDescription,
      }) =>
        `<div id=${id} class="recipe">
            <button type="button" onclick="editRecipe('${id}')">Edit</button>
            <button type="button" onclick="deleteRecipe('${id}')">Delete</button>
            <br/>
            <h2>${recipeName}</h2>
            <p>catagory: ${recipeCatagory}</p>
            <p>Ingredients: ${recipeIngredients}</p>
        
            <p>Description :</p>
            <p>${recipeDescription}</p>
        </div>`,
    )
    .join("");

  allRecipeContainer.innerHTML = recipes;
};

const addRecipe = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const recipeObject = Object.fromEntries(formData.entries());

  const storedRecipes = localStorage.getItem("allRecipe");
  let allRecipesParse = storedRecipes ? JSON.parse(storedRecipes) : [];
  const recipeId = localStorage.getItem("recipeId");
  if (recipeId) {
    allRecipesParse = allRecipesParse.filter(({ id }) => id !== recipeId);
    recipeObject.id = recipeId;
    console.log("edit completed");
    localStorage.removeItem("recipeId");
  } else {
    recipeObject.id = crypto.randomUUID();
  }
  allRecipesParse.push(recipeObject);
  console.log(allRecipesParse);

  localStorage.setItem("allRecipe", JSON.stringify(allRecipesParse));
  renderRecipes(allRecipesParse);
  resetBtn.click();
  submitBtn.textContent = "Add Recipe";
};

const searchRecipes = () => {
  const searchedText = searchField.value.toLowerCase().trim();
  console.log("search clicked");
  const filterBy = searchByName.checked
    ? searchByName.value
    : null || searchByCatagory.checked
      ? searchByCatagory.value
      : null || searchByIngredients.checked
        ? searchByIngredients.value
        : null;
  console.log(filterBy);

  if (searchedText === "") {
    alert(`Please Enter ${filterBy}...`);
  }
  const allRecipe = JSON.parse(localStorage.getItem("allRecipe"));
  const filterRecipe = allRecipe.filter((recipe) => {
    const targetVal = recipe[filterBy];
    return targetVal?.toLowerCase().includes(searchedText);
  });

  console.log(filterRecipe);

  renderRecipes(filterRecipe);
};

window.onload = () => {
  renderRecipes(JSON.parse(localStorage.getItem("allRecipe")));
};

form.addEventListener("submit", function (e) {
  addRecipe(e);
});

getAllRecipeBtn.addEventListener("click", function () {
  renderRecipes(JSON.parse(localStorage.getItem("allRecipe")));
});

searchBtn.addEventListener("click", searchRecipes);

searchField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchRecipes();
  }
});
