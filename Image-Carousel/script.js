const prevBtn = document.getElementById("prev");
const nxtBtn = document.getElementById("next");

let prevIndex = -1;
let nextIndex = 1;
let slideIndex = 0;
let intervalId = null;

const showSlide = (index) => {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  console.log("index", index);
  if (index < 0) {
    index = slides.length - 1;
    prevIndex = slides.length - 1;
  }
  if (index > slides.length - 1) {
    index = 0;
    slideIndex = 0;
  }
  nextIndex = index;
  slides[index].style.display = "block";
  console.log("slide no.", index);
};
const slideShow = () => {
  prevIndex = slideIndex;

  slideIndex++;
  showSlide(slideIndex - 1);
  console.log("slide index in interval", slideIndex);
};

intervalId = setInterval(slideShow, 5000);

prevBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  prevIndex--;
  showSlide(prevIndex);
  intervalId = setInterval(slideShow, 5000);
});

nxtBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  nextIndex++;
  showSlide(nextIndex);
  intervalId = setInterval(slideShow, 5000);
});
