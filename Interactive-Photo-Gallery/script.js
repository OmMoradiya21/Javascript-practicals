const photoURL = document.getElementById("photoURL");
const form = document.getElementById("form");
const photoesContainer = document.getElementById("photoesContainer");

const deletePhoto = (id) =>{
    const photo = document.getElementById(id);
    photo.remove();
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const URL = photoURL.value;
    const id = crypto.randomUUID();
    const photo = `
    <div class="photo" id="${id}">
    <button type="button" onclick="deletePhoto('${id}')">Delete</button>
    <a href=${URL}>
    <img src=${URL}>
    </a>
    </div>
    `
    photoesContainer.innerHTML += photo;
    photoURL.value = "";
})