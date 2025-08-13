const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoTime = document.getElementById("todo-time");
const todoList = document.getElementById("todo-list");
const stats = document.getElementById("stats");
const empty = document.getElementById("empty");

let todos = [];

function cryptoRandomId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2, 10);
}

function loadTodos() {
  try {
    const raw = localStorage.getItem("todos");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      todos = parsed.map((t) => ({
        id: typeof t.id === "string" ? t.id : cryptoRandomId(),
        text: String(t.text || ""),
        time: t.time || "",
        completed: !!t.completed,
      }));
    } else {
      todos = [];
    }
  } catch {
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  const hasTodos = todos.length > 0;
  empty.classList.toggle("hidden", hasTodos);

  const completedCount = todos.filter((t) => t.completed).length;
  stats.textContent = hasTodos ? `${completedCount}/${todos.length} completed` : "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 animate-fadeIn";
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "Toggle task");

    const content = document.createElement("div");
    content.className = "flex min-w-0 flex-col flex-1";

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.className = `truncate ${todo.completed ? "line-through text-slate-400" : "text-slate-900"}`;

    const time = document.createElement("span");
    time.textContent = todo.time || "";
    time.className = "text-xs text-slate-500";

    content.appendChild(text);
    content.appendChild(time);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "ml-2 text-red-600 hover:text-red-700 rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500";
    removeBtn.setAttribute("aria-label", "Delete task");
    removeBtn.dataset.action = "delete";
    removeBtn.textContent = "✕";

    li.appendChild(checkbox);
    li.appendChild(content);
    li.appendChild(removeBtn);

    todoList.appendChild(li);
  });
}

function addTodo(text, time) {
  const newTodo = { id: cryptoRandomId(), text, time, completed: false };
  todos.push(newTodo);
  saveTodos();
  renderTodos();
}

function removeTodoById(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
}

function toggleTodoById(id) {
  const found = todos.find((t) => t.id === id);
  if (found) {
    found.completed = !found.completed;
    saveTodos();
    renderTodos();
  }
}

// Init
loadTodos();
renderTodos();

// Events

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  const time = todoTime.value.trim();
  if (!text || !time) return;
  addTodo(text, time);
  todoInput.value = "";
  todoTime.value = "";
  todoInput.focus();
});

todoList.addEventListener("click", (e) => {
  const target = e.target;
  const li = target.closest("li");
  if (!li) return;
  const id = li.dataset.id;

  if (target.matches('button[data-action="delete"]')) {
    removeTodoById(id);
  } else if (target.matches('input[type="checkbox"]')) {
    toggleTodoById(id);
  }
});
