const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoTime = document.getElementById("todo-time");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    li.className = `flex items-center justify-between px-3 py-2 bg-gray-50 rounded border ${
      todo.completed ? "opacity-60" : ""
    }`;

    const taskInfo = document.createElement("div");
    taskInfo.className = "flex flex-col flex-grow cursor-pointer";
    taskInfo.onclick = () => toggleTodo(i);

    const taskText = document.createElement("span");
    taskText.textContent = todo.text;
    taskText.className = `${
      todo.completed ? "line-through text-gray-400" : ""
    }`;

    const taskTime = document.createElement("span");
    taskTime.textContent = todo.time || "";
    taskTime.className = "text-xs text-gray-500";

    taskInfo.appendChild(taskText);
    taskInfo.appendChild(taskTime);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.className =
      "text-red-500 ml-4 hover:text-red-700 text-lg font-bold px-2 py-0.5 rounded";
    removeBtn.onclick = () => removeTodo(i);

    li.appendChild(taskInfo);
    li.appendChild(removeBtn);
    todoList.appendChild(li);
  });
}

function addTodo(text, time) {
  todos.push({ text, time, completed: false });
  saveTodos();
  renderTodos();
}

function removeTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

todoForm.onsubmit = function (e) {
  e.preventDefault();
  const value = todoInput.value.trim();
  const time = todoTime.value.trim();
  if (value && time) {
    addTodo(value, time);
    todoInput.value = "";
    todoTime.value = "";
  }
};

renderTodos();
