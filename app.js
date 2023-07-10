//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listerners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions

function addTodo(event) {
  event.preventDefault();
  if (!todoInput.value) return;

  //Todo-Div
  const todoDiv = document.createElement("div");
  // adding the class to the created div
  todoDiv.classList.add("todo");

  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  //Add todo to LocalStorage
  saveInLocal(todoInput.value,false);

  //Add new Todo to Div
  todoDiv.appendChild(newTodo);

  //Check Mark Button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = `<i class="fas fa-check"></>`;
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  //Check Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Attach todoDiv
  todoList.prepend(todoDiv);

  //clear the input after the insertion
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //Delete the item
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");


    removeTodoLocal(todo);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }


  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//filter the todo's
function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    if (todo.nodeName !== "#text")
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (!todo.classList.contains("completed"))
            todo.style.display = "none";
          else if (todo) {
            todo.style.display = "flex";
          }
          break;
        case "uncompleted":
          console.log("in");
          if (!todo.classList.contains("completed"))
            todo.style.display = "flex";
          else todo.style.display = "none";
          break;
        default:
          break;
      }
  });
}

//saving the todo to the local storeage of the browser
function saveInLocal(todo) {
  //check if todos list exists already
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Get the todos from local storage during the loading of page
function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo)=>{
    const todoDiv = document.createElement("div");
    // adding the class to the created div
    todoDiv.classList.add("todo");
  
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
  
    //Add new Todo to Div
    todoDiv.appendChild(newTodo);
  
    //Check Mark Button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = `<i class="fas fa-check"></>`;
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
  
    //Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
  
    //Attach todoDiv
    todoList.prepend(todoDiv);
  })
}



//function to remove the todos from local storage
function removeTodoLocal(todo){
  //grabing the todos
  let todos;
  if(localStorage.getItem('todos')===null) todos=[];
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //find out the index of the text 
  const todoIndex  = todo.children[0].innerText;
  console.log(todoIndex)
  todos.splice(todos.indexOf(todoIndex),1);

  //update the todos in local storage
  localStorage.setItem("todos",JSON.stringify(todos));
}
