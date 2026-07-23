const photoURL = document.getElementById("photoURL");
const form = document.getElementById("form");
const photoesContainer = document.getElementById("photoesContainer");

const deletePhoto = (id) => {
  const photo = document.getElementById(id);
  photo.remove();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const URL = photoURL.value;
  const id = crypto.randomUUID();
  const photo = document.createElement("div");
  photo.id = id;
  photo.className = "photo";

  photo.innerHTML = `
    <button type="button" onclick="deletePhoto('${id}')">Delete</button>
    <a href=${URL}>
    <img src=${URL}>
    </a>
    `;
  photoesContainer.prepend(photo);
  photoURL.value = "";
});
