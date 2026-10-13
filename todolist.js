let todoList = [
  {
    id: 1,
    text: "Buy groceries",
    completed: false,
  },
  {
    id: 2,
    text: "Finish JavaScript project",
    completed: true,
  },
  {
    id: 3,
    text: "Walk the dog",
    completed: false,
  },
];

const todoListUl = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const CreateTodoForm = document.querySelector(".todo-form");

function createTodoLi(todoItem) {
  const li = document.createElement("li");
  li.className = "text-xl py-2 text-gray-700 flex justify-between items-center";
  li.setAttribute("data-id", todoItem.id);

  const textDecoration = todoItem.completed ? "line-through" : "none";
  const textColor = todoItem.completed ? "gray" : "black";
  const checkedAttr = todoItem.completed ? "checked" : "";

  li.innerHTML = `
    <div>
      <input type='checkbox' class='todo-box' ${checkedAttr}/> 
      <span class='todo-text' style='text-decoration: ${textDecoration}; color: ${textColor};'>${todoItem.text}</span>
    </div>
    <button class='delete-btn bg-red-500 text-white px-2 py-1 rounded text-sm'>Delete</button>
  `;
  return li;
}

function showTodoList() {
  todoListUl.innerHTML = "";
  todoList.forEach((item) => {
    const todoItem = createTodoLi(item);
    todoListUl.appendChild(todoItem);
  });
  handleTodoClick();
  handleDeleteClick();
}
showTodoList();

CreateTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formTodos = new FormData(event.target);
  const data = Object.fromEntries(formTodos.entries());
  const newTodoText = data["todo-input"] ? data["todo-input"].trim() : "";

  if (newTodoText === "") {
    alert("Task cannot be empty!");
    return;
  }

  let newTodoItem = {
    id: todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1,
    text: newTodoText,
    completed: false,
  };

  todoList.push(newTodoItem);
  showTodoList();
  event.target.reset();
});

function handleTodoClick() {
  const inputCheckBoxes = document.querySelectorAll(".todo-box");
  inputCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const li = checkbox.closest("li");
      const id = Number(li.getAttribute("data-id"));
      const todoItem = todoList.find((value) => value.id === id);

      const todoText = checkbox.nextElementSibling;
      if (event.target.checked) {
        todoText.style.textDecoration = "line-through";
        todoText.style.color = "gray";
        if (todoItem) todoItem.completed = true;
      } else {
        todoText.style.textDecoration = "none";
        todoText.style.color = "black";
        if (todoItem) todoItem.completed = false;
      }
    });
  });
}


function handleDeleteClick() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      const id = Number(li.getAttribute("data-id"));
      const todoItem = todoList.find((value) => value.id === id);

      if (todoItem && todoItem.completed) {
        deleteTodoItem(id);
        showTodoList();
      } else {
        alert("You can only delete tasks that are ticked (completed)!");
      }
    });
  });
}

addTaskBtn.addEventListener("click", (event) => {
  if (addTaskBtn.innerText.trim().toLowerCase() === "add todo") {
    CreateTodoForm.style.display = "flex";
    addTaskBtn.innerText = "Cancel";
  } else if (addTaskBtn.innerText.trim().toLowerCase() === "cancel") {
    CreateTodoForm.style.display = "none";
    addTaskBtn.innerText = "Add Todo";
  }
});

function updateTodo(id) {
  const todoItem = todoList.find((value) => value.id === id);
  if (todoItem) {
    todoItem.completed = !todoItem.completed;
    showTodoList();
  }
  return todoItem;
}

function deleteTodoItem(id) {
  todoList = todoList.filter((todoItem) => todoItem.id !== id);
}