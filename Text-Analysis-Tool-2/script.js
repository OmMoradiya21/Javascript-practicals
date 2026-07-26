const intputText = document.getElementById("text");
const btn = document.getElementById("analyzaBtn");
const response = document.getElementById("response");

const anlyzeText = () => {
  const text = intputText.value;
  if (text === "" || text.trim() === ""){
    alert('please enter somthing..');
    return;
  }
  const totalChar = text.length;
  const cleanedText = text.replace(/[^\w\s+]/g, "");
  const words = cleanedText.trim().split(/\s+/);
  console.log(words);
  const wordCount = words.length;
  const wordFreq = {};
  const averageWordLength = Math.floor(
    words.reduce((acc, word) => word.length + acc, 0) / wordCount,
  );

  for (let word of words) {
    wordFreq[word] = wordFreq[word] + 1 || 1;
  }
  const topFrequentWords = Object.entries(wordFreq).sort(
    ([, a], [, b]) => b - a,
  );

  const element = document.createElement("div");
  element.className = "card";

  element.innerHTML = `
    <h3>Text: ${text}</h3>
    
    <h4> Total Character: ${totalChar} </h4>
    
    <h4> Total Word: ${wordCount} </h4>
    <h4> Average word length: ${averageWordLength}</h4>
    <h4> common words (top 3): ${topFrequentWords
      .slice(0,3)
      .map(([key, value]) => `<p>${key}: ${value}</p>`)
      .join("")}
      </h4>
    <h4> Word Frequency: </h4>
    `;

  element.innerHTML += topFrequentWords
    .map(([key, value]) => `<p>${key}: ${value}</p>`)
    .join("");

  console.log(wordFreq);

  response.prepend(element);
  intputText.value = "";
};

btn.addEventListener("click", anlyzeText);
