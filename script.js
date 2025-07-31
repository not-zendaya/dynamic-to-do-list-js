document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function createTaskElement(taskText) {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const removedButton = document.createElement("button");
    removedButton.textContent = "Remove";
    removedButton.classList.add("remove-btn");
    removedButton.onclick = function () {
      taskList.removeChild(listItem);
      tasks = tasks.filter((task) => task !== taskText);
      saveTasks();
    };

    listItem.appendChild(removedButton);
    taskList.appendChild(listItem);
  }

  tasks.forEach(createTaskElement);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task");
      return;
    }
    tasks.push(taskText);
    saveTasks();
    createTaskElement(taskText);
    taskInput.value = "";
  }

  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask;
    }
  });
});
