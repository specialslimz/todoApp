const todoForm = document.querySelector(".todo-form");
const listContainer = document.querySelector(".task-list");
const todoList = document.querySelector(".todo-list");
const todoInput = document.getElementById("newTaskInput");
const inputEl = document.querySelector(".todo");

const alert = document.querySelector(".alert");
const btnClear = document.querySelector(".btn-clear");
const containerList = document.querySelector(".separate");
todoForm.addEventListener("submit", addList);

function addList(e) {
  e.preventDefault();
  let input = todoInput.value;

  if (input) {
    createList(input);
    displayMsg("you have successfully added a task", "alert-success");
    btnClear.classList.remove("d-none");
  } else {
    displayMsg("Please enter a task", "alert-error");
  }
  clear();
}

function clear() {
  todoInput.value = "";
}
function createList(input) {
  const li = document.createElement("li");
  //get clasname
  li.className = "todoList";
  li.innerHTML = `
  <div class="separate">
  <input class="todo" type="text " value='${input}' disabled />

  <div>
    <span class="material-symbols-outlined edit"> edit </span>
    <span class="material-symbols-outlined delete"> delete </span>
  </div>
</div>    
  `;

  li.querySelector(".edit").addEventListener("click", editItem);

  li.querySelector(".delete").addEventListener("click", deleteItem);

  listContainer.appendChild(li);
}

function editItem(e) {
  const editIcon = e.target.closest(".edit");
  const saveIcon = "<span class='material-symbols-outlined save'> save </span>";
  const item = editIcon.closest(".todoList");
  const input = item.querySelector(".todo");

  if (input.disabled) {
    input.removeAttribute("disabled");
    editIcon.innerHTML = saveIcon;
    editIcon.classList.add("save");
    editIcon.removeEventListener("click", editItem);
    editIcon.addEventListener("click", saveItem);
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  } else {
    input.setAttribute("disabled", true);
    editIcon.innerHTML = "edit";
    editIcon.classList.remove("save");
    editIcon.removeEventListener("click", saveItem);
    editIcon.addEventListener("click", editItem);
  }
}

function saveItem(e) {
  const saveIcon = e.target.closest(".save");
  // Save logic here
  editItem(e);
  displayMsg("changes has been saved", "alert-success");
}

function deleteItem() {
  listContainer.removeChild(this.parentElement.parentElement.parentElement);
  displayMsg("one item has been removed", "alert-error");
  if (listContainer.children.length === 0) {
    btnClear.classList.add("d-none");
  }
}

function displayMsg(msg, styles) {
  alert.innerText = msg;
  alert.classList.add(styles);
  setTimeout(() => {
    alert.innerText = "";
    alert.classList.remove(styles);
  }, 1200);
}
btnClear.addEventListener("click", clearBtn);
function clearBtn() {
  listContainer.innerHTML = "";
  displayMsg("All tasks has been removed", "alert-error");
  btnClear.classList.add("d-none");
}
