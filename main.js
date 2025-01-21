let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// empty array to syore tasks
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage()

// Add Task
submit.onclick = function() {
  if(input.value != "") {
    addTaskToArray(input.value); // add task to array of tasks
    input.value = "";
  }
}

// Click On Task Element
taskDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray (taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false
  };
  // push task to array of tasks
  arrayOfTasks.push(task);

  //add tasks to page
  addElementsToPageFrom(arrayOfTasks);

  //add tasks to local storage
  addToLocaltorage(arrayOfTasks)
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Task Div
  taskDiv.innerHTML = "";
  //Loop on array of tasks
  arrayOfTasks.forEach(task => {
    // creat main div
    let div = document.createElement("div");
    div.className = "task"
    if (task.completed) {
      div.className = "task done"
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title))
    //creat delete button
    let span = document.createElement("i");
    span.className = "fa-solid fa-trash del";
    div.appendChild(span);
    //add tasks div to main tasks div
    taskDiv.appendChild(div);
  });
}

function addToLocaltorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks")
  if(data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLocaltorage(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addToLocaltorage(arrayOfTasks);
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
});
