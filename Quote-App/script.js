const quoteContainer = document.getElementById("quoteContainer");
const quoteBtn = document.getElementById("quoteBtn");

const quoteHandler = async () => {
  const res = await fetch("https://dummyjson.com/quotes/random")
const quote = await res.json();
console.log(quote);
quoteContainer.innerHTML = `<q city="https://dummyjson.com/docs/quotes">${quote["quote"]} - ${quote["author"]}/</q>`
};

quoteBtn.addEventListener("click", quoteHandler);
