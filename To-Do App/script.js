const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoContainer = document.getElementById("container");
let allTodos = [];

const handleToggle = (todoId) => {
  allTodos.forEach((todo) => {
    if (todo.id === todoId) {
      todo.isComplete = !todo.isComplete;
      console.log("toggle successs");
    }
  });
  renderTodo(allTodos);
};

const deleteTodo = (todoId) => {
  const todo = allTodos.find(({ id }) => id === todoId);
  if (!todo.isComplete) {
    const confirm = window.confirm(
      "To-Do is not complete. Are you sure to delete it?",
    );
    if (confirm) {
      allTodos = allTodos.filter(({ id }) => id !== todoId);
    }
  } else {
    allTodos = allTodos.filter(({ id }) => id !== todoId);
  }
  renderTodo(allTodos);
};

const renderTodo = (arr) => {
  if (arr.length === 0) {
    todoContainer.innerHTML = "";
    return;
  }
  todoContainer.innerHTML = arr
    .map(
      ({ id, inputValue, isComplete }, index) =>
        `
    <div class="todo" id='${id}'>
    <span class=${isComplete ? "completedTodo" : "incompleteTodo"}>${index + 1}</span>
    <p class=${isComplete ? "completedTodo" : "incompleteTodo"}>${inputValue}</p>
    <button type="button" onclick="deleteTodo('${id}')">Delete</button>
    <input type="checkbox" id="${id}" ${isComplete ? "checked" : ""} onchange="handleToggle('${id}')"/>
    
    </div>
    `,
    )
    .join("");
};

const addTodo = () => {
  const inputValue = todoInput.value.trim();
  if (inputValue === "") {
    alert("Please Enter To-Do..");
    return;
  }
  const todo = {
    id: crypto.randomUUID(),
    inputValue: inputValue,
    isComplete: false,
  };
  allTodos.unshift(todo);
  renderTodo(allTodos);
  todoInput.value = "";
};

addBtn.addEventListener("click", addTodo);
