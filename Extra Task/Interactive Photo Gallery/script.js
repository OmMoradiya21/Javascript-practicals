const photoURL = document.getElementById("photoURL");
const form = document.getElementById("form");
const photoesContainer = document.getElementById("photoesContainer");
const viewOverlay = document.getElementById("viewOverlay");
const viewImage = document.getElementById("viewImage");
const closeView = document.getElementById("closeView");

const openView = (url) => {
  viewImage.src = url;
  viewOverlay.hidden = false;
};

const closeImageView = () => {
  viewOverlay.hidden = true;
  viewImage.src = "";
};

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
    
    <img src=${URL}>
    
    `;
  photoesContainer.prepend(photo);
  photoURL.value = "";
});

closeView.addEventListener("click", closeImageView);
viewOverlay.addEventListener("click", (e) => {
  if (e.target === viewOverlay) closeImageView();
});

photoesContainer.addEventListener("click", (e) => {
  const img = e.target.closest("img");
  if (!img) return;
  e.preventDefault();
  openView(img.src);
});