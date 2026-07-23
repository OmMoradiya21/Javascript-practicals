const prevBtn = document.getElementById("prev");
const nxtBtn = document.getElementById("next");
const slides = document.getElementsByClassName("slide");

let currentIndex = 0;
let intervalId = null;

const showSlide = (index) => {
  currentIndex = index;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  console.log(index);
  slides[index].style.display = "block";
  console.log("slide no.", index);
};
const slideShow = () => {
  // handle circulation of slide
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
};


prevBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
  intervalId = setInterval(slideShow, 5000);
});

nxtBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
  intervalId = setInterval(slideShow, 5000);
});

showSlide(currentIndex);
intervalId = setInterval(slideShow, 5000);