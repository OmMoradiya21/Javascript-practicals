const form = document.getElementById("taskForm");
const taskContainer = document.getElementById("taskContainer");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const allTaskBtn = document.getElementById("allTaskBtn");
const completedTaskBtn = document.getElementById("completedTaskBtn");
const incompleteTaskBtn = document.getElementById("incompleteTaskBtn");

let allTask = [];

const addTask = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const task = Object.fromEntries(formData.entries());
  //if id exist in allTask
  if (task.id !== "") {
    allTask = allTask.filter(({ id }) => task.id !== id);
    submitBtn.textContent = "Add Task";
  } else {
    task.id = crypto.randomUUID();
  }

  task.isCompleted = task.isCompleted === "false" ? false : true;
  allTask.unshift(task);
  console.log(allTask);
  renderTasks(allTask);
  resetBtn.click();
};

const deleteTask = (taskId) => {
  allTask = allTask.filter(({ id }) => id !== taskId);
  renderTasks(allTask);
};

const editTask = (taskId) => {
  const task = allTask.find(({ id }) => id === taskId);

  Object.keys(task).forEach((key) => {
    const inputElement =
      document.querySelector(`input[name="${key}"]`) ||
      document.querySelector(`textarea[name="${key}"]`);

    if (inputElement) {
      inputElement.value = task[key];
    }
  });
  submitBtn.textContent = "Edit Task";
};

const updateStatus = (taskId) => {
  allTask.forEach((task) => {
    if (task.id == taskId) {
      task.isCompleted = !task.isCompleted;
    }
  });
  console.log(allTask);
  renderTasks(allTask);
};

const renderTasks = (arr) => {
  if (arr.length === 0) {
    taskContainer.innerHTML = `<h3>No task Found</h3>`;
    return;
  }
  const allTaskHtml = arr
    .map(
      ({ id, isCompleted, taskTitle, taskDescription }) => `
            <div id=${id} class="task">
            <button type="button" onclick="editTask('${id}')">Edit</button>
            <button type="button" onclick="deleteTask('${id}')">Delete</button>
            <button type="button" onclick="updateStatus('${id}')">${isCompleted ? "Complete" : "Incomplete"}</button>
            
            <br/>
            <h2>${taskTitle}</h2>
            <p>Description : ${taskDescription}</p>
            </div>
    `,
    )
    .join("");
  taskContainer.innerHTML = allTaskHtml;
};

form.addEventListener("submit", (e) => {
  addTask(e);
});

allTaskBtn.addEventListener("click", function () {
  renderTasks(allTask);
});

completedTaskBtn.addEventListener("click", function () {
  const completedTasks = allTask.filter(
    ({ isCompleted }) => isCompleted === true,
  );
  renderTasks(completedTasks);
});

incompleteTaskBtn.addEventListener("click", function () {
  const incompleteTasks = allTask.filter(
    ({ isCompleted }) => isCompleted === false,
  );
  renderTasks(incompleteTasks);
});
