const quizQuestions = [
  {
    id: 1,
    question: "National Animal Of India is ______?",
    options: [
      {
        optName: "Lion",
        value: false,
      },
      {
        optName: "Tiger",
        value: true,
      },
      {
        optName: "Dog",
        value: false,
      },
      {
        optName: "Cat",
        value: false,
      },
    ],
  },
  {
    id: 2,
    question: "India got his freedom in____",
    options: [
      {
        optName: "1945",
        value: false,
      },
      {
        optName: "1946",
        value: false,
      },
      {
        optName: "1947",
        value: true,
      },
      {
        optName: "1949",
        value: false,
      },
    ],
  },
  {
    id: 3,
    question: "Diamond city of India is____?",
    options: [
      {
        optName: "Surat",
        value: true,
      },
      {
        optName: "Delhi",
        value: false,
      },
      {
        optName: "Bhavnagar",
        value: false,
      },
      {
        optName: "Agra",
        value: false,
      },
    ],
  },
  {
    id: 4,
    question: "By Which Person, Bollywood Film 3 idiots Inspired By?",
    options: [
      {
        optName: "Narendra Modi",
        value: false,
      },
      {
        optName: "Sonam Wangchuk",
        value: true,
      },
      {
        optName: "Dharmendra Pradhan",
        value: false,
      },
      {
        optName: "Amit Shah",
        value: false,
      },
    ],
  },
  {
    id: 5,
    question: "Tajmahel Located in which City of India?",
    options: [
      {
        optName: "Surat",
        value: false,
      },
      {
        optName: "Delhi",
        value: false,
      },
      {
        optName: "Bhavnagar",
        value: false,
      },
      {
        optName: "Agra",
        value: true,
      },
    ],
  },
];

const nextBtn = document.getElementById("nextBtn");
const rightScore = document.getElementById("rightScore");
const wrongScore = document.getElementById("wrongScore");
const renderQuestionContainer = document.getElementById(
  "renderQuestionContainer",
);
const scoreDiv = document.getElementById("scoreDiv");

const status = {};
let currentQuestionIndex = 0;
const totalQuestion = quizQuestions.length;

const countScore = () => {
  console.log("renderStatus");
  let rightAns = 0;
  let wrongAns = 0;
  Object.values(status).forEach((val) => {
    if (val === "true") {
      rightAns += 1;
    } else {
      wrongAns += 1;
    }
  });
  return { rightAns, wrongAns };
};

const updateStatus = (radio) => {
  console.log("updateStatus");
  const id = radio.name;
  const value = radio.value;
  status[id] = value;
  console.log(typeof value);
  console.log(countScore());
  const { rightAns, wrongAns } = countScore();
  rightScore.textContent = rightAns;
  wrongScore.textContent = wrongAns;
};

const renderQuestion = (index) => {
  const currentQuestion = quizQuestions[index];
  const currentQuestionId = currentQuestion.id;
  const renderOption = currentQuestion.options
    .map(
      ({ optName, value }) => `
        <div class="option">
        <input type="radio" name='${currentQuestionId}' id='${optName}' value=${value} onclick='updateStatus(this)'/>
        <label for='${optName}'>${optName}</label>
        </div>
    `,
    )
    .join("");
  const renderFullQuestion = `
        <div class="question">
            <p>${index + 1}. ${currentQuestion.question}</p>
            ${renderOption}
        </div>
    `;
  renderQuestionContainer.innerHTML = renderFullQuestion;
};

const renderResult = () => {
  const { rightAns } = countScore();
  renderQuestionContainer.innerHTML = `<h2>Your Score is: ${rightAns}/${totalQuestion}</h2>`;
  scoreDiv.style.display = "none";
  nextBtn.style.display = "none";
};

const nextBtnHandling = () => {
  currentQuestionIndex += 1;
  if (currentQuestionIndex === totalQuestion - 1) {
    nextBtn.textContent = "Submit";
  }
  if (currentQuestionIndex < totalQuestion) {
    renderQuestion(currentQuestionIndex);
  } else {
    renderResult();
  }
  nextBtn.disabled = true;
};

nextBtn.addEventListener("click", nextBtnHandling);
renderQuestion(currentQuestionIndex);
console.log(quizQuestions);

document.addEventListener("input", (e) => {
  const allradio = [
    ...document.getElementsByName(`${quizQuestions[currentQuestionIndex].id}`),
  ];
  nextBtn.disabled = false;
  allradio.forEach((radio) => (radio.disabled = true));
});
