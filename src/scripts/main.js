const taskNameInput = document.getElementById("task-name-input")
const addTaskBtn = document.getElementById("add-task-btn")
const tasksList = document.getElementById("tasks-list")

const placeholders = [
  "Lavar a louça",
  "Tomar banho",
  "Preparar o almoço"
]

const setPlaceholder = (placeholders) => {
  const placeholder =
    placeholders[Math.floor(Math.random() * placeholders.length)]

  taskNameInput.placeholder = placeholder
}

const tasks = JSON.parse(localStorage.getItem("tasks")) || []

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

const createTask = (task) => {
  const taskDiv = document.createElement("div")
  taskDiv.dataset.taskId = task.id

  const taskTextDiv = document.createElement("div")
  const taskName = document.createElement("p")
  taskName.innerText = task.name

  const trashIcon = document.createElementNS("http://www.w3.org/2000/svg","svg")

  trashIcon.setAttribute("height", "48")
  trashIcon.setAttribute("viewBox", "0 96 960 960")
  trashIcon.setAttribute("width", "48")
  trashIcon.classList.add("icon-trash")

  const trashIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path")

  trashIconPath.setAttribute("d", "M253 961q-39.462 0-67.231-27.475Q158 906.05 158 867V314h-11q-19.75 0-33.375-13.675Q100 286.649 100 266.825 100 247 113.625 233.5 127.25 220 147 220h185q0-20 13.625-34T379 172h202q19.625 0 33.812 14.188Q629 200.375 629 220h184q19.75 0 33.375 13.675Q860 247.351 860 267.175 860 287 846.375 300.5 832.75 314 813 314h-11v553q0 39.05-27.769 66.525Q746.463 961 707 961H253Zm101-210q0 15.475 11.368 26.737 11.369 11.263 27 11.263Q408 789 419.5 777.737 431 766.475 431 751V429q0-15.475-11.868-27.237Q407.263 390 391.632 390 376 390 365 401.763 354 413.525 354 429v322Zm175 0q0 15.475 11.868 26.737Q552.737 789 568.368 789 584 789 595.5 777.737 607 766.475 607 751V429q0-15.475-11.57-27.237Q583.86 390 567.93 390t-27.43 11.763Q529 413.525 529 429v322Z")
  trashIcon.appendChild(trashIconPath)

  trashIcon.addEventListener("click", (e) => {
    const taskDiv = e.target.closest(".task")
    const taskId = parseInt(taskDiv.dataset.taskId)

    deleteTask(taskId)
    taskDiv.remove()
  })

  taskDiv.classList.add("task")
  taskTextDiv.classList.add("task-text")

  taskTextDiv.appendChild(taskName)
  taskDiv.appendChild(taskTextDiv)
  taskDiv.appendChild(trashIcon)
  tasksList.appendChild(taskDiv)

  if (task.completed) {
    taskDiv.classList.add("task-completed")
  }

  taskDiv.addEventListener("click", () => {
    taskDiv.classList.toggle("task-completed")
    task.completed = !task.completed

    saveTasks()
  })
}

const deleteTask = (taskId) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId)
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1)
    saveTasks()
  }
}

const loadTasks = () => {
  tasks.forEach((task) => {
    createTask(task)
  })
}

window.onload = () => {
  setPlaceholder(placeholders)
  loadTasks()
}

taskNameInput.addEventListener("input", () => {
  (taskNameInput.value.trim().length > 0) ? addTaskBtn.disabled = false : addTaskBtn.disabled = true
})

const addTask = () => {
    if (!addTaskBtn.disabled) {
      const taskName = taskNameInput.value.trim()
      const taskId = Date.now()
      const newTask = {
        id: taskId,
        name: taskName,
        completed: false 
      }
  
      tasks.push(newTask)
      saveTasks()
      createTask(newTask)
  
      taskNameInput.value = ""
      addTaskBtn.disabled = true
    }
  }

addTaskBtn.addEventListener("click", addTask)

document.addEventListener("keydown", (event) => {
    if (event.code == "Enter" && !event.shiftKey) addTask()
})
