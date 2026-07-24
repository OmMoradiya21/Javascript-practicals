const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoContainer = document.querySelector(".container");

const handleToggle = (todoId) => {
  const p = document.querySelector(`#${CSS.escape(todoId)}>p`);
  const checkbox = document.getElementById("check" + todoId);
  console.log(checkbox.checked);
  if (checkbox.checked) {
    p.className = "completedTodo";
  } else {
    p.className = "incompleteTodo";
  }
};

const deleteTodo = (todoId) => {
  const el = document.getElementById(todoId);
  const checkbox = document.getElementById("check" + todoId);
  console.log(checkbox.checked);
  if (!checkbox.checked) {
    const confirm = window.confirm(
      "To-Do is not complete. Are you sure to delete it?",
    );
    if (confirm) {
      el.remove();
    }
  } else {
    el.remove();
  }
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
  console.log(todo);
  const li = document.createElement("li");
  li.className = "todo";
  li.id = todo.id;
  li.draggable = "true";

  li.innerHTML = `
  <span>:::</span>
    <p class="incompleteTodo">${todo.inputValue}</p>
    <button type="button" onclick="deleteTodo('${todo.id}')">Delete</button>
    <input type="checkbox" id="check${todo.id}" onchange="handleToggle('${todo.id}')"/>
  `;
  todoContainer.prepend(li);
  todoInput.value = "";
};

let draggingItem = null;
todoContainer.addEventListener("dragstart", (e) => {
  draggingItem = e.target;
  console.log("drag start");
  e.target.classList.add("dragging");
});
todoContainer.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
  console.log("drag end");
  draggingItem = null;
});
todoContainer.addEventListener("dragover", (e) => {
  console.log("drag over");
  e.preventDefault();
  const draggingOverItem = getDragAfterElement(todoContainer, e.clientY);
  console.log("draggingOverItem",draggingOverItem);
  
  if (draggingOverItem) {
    todoContainer.insertBefore(draggingItem, draggingOverItem);
  } else {
    todoContainer.appendChild(draggingItem);
  }
});

const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll(".todo:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
};

addBtn.addEventListener("click", addTodo);
