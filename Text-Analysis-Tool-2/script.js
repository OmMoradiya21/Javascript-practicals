const intputText = document.getElementById("text");
const btn = document.getElementById("analyzaBtn");
const response = document.getElementById("response");

const anlyzeText = () => {
  const text = intputText.value;
  const words = text.split(/\s+/);
  console.log(words);
  const wordCount = words.length;
  const totalChar = text.replace(/\s/g, "").length;
  const wordFreq = {};

  const averageWordLength = Math.floor(words.reduce((acc, word)=>word.length,0) / wordCount);
  for (let word of words) {
    wordFreq[word] = wordFreq[word] + 1 || 1;
  }

  const element = document.createElement("div");
  element.className = "card";

  element.innerHTML = `
    <h3> Your Text: ${text}</h3>
    
    <h3> Total Character: ${totalChar} </h3>
    
    <h3> Total Word: ${wordCount} </h3>
    
    <h3> Word Frequency: </h3>
    `;

  element.innerHTML += Object.entries(wordFreq)
    .map(([key, value]) => `<p>${key}: ${value}</p>`)
    .join("");

  response.prepend(element);
  intputText.value = "";
};

btn.addEventListener("click", anlyzeText);
