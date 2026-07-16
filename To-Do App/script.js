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
  allTodos = allTodos.filter(({ id }) => id !== todoId);
  renderTodo(allTodos);
};

const renderTodo = (arr) => {
  if (arr.length === 0) {
    todoContainer.innerHTML = `<h2> No To-Do Exist.</h2>`;
    return;
  }
  todoContainer.innerHTML = arr
    .map(
      ({ id, inputValue, isComplete }) =>
        `
    <li class="todo" id='${id}'>
    <p class=${isComplete?"completedTodo":"incompleteTodo"}>${inputValue}</p>
    <button type="button" onclick="deleteTodo('${id}')">Delete</button>
    <input type="checkbox" id="${id}" ${isComplete ? "checked" : ""} onchange="handleToggle('${id}')"/>
    
    </li>
    `,
    )
    .join("");
};

const addTodo = () => {
  const inputValue = todoInput.value.trim();
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
