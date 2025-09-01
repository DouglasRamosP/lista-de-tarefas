const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".task-container");

// Valida o valor passado no imput, se estiver preenchido retorna true, se vazio retorna false.
const validateIput = () => {
  return inputElement.value.trim().length > 0;
};

// Lida com o adicionar de tarefas
const handleAddTask = () => {
  //repassa o true ou false para inputIsValid
  const inputIsValid = validateIput();
  // Se inputIsValid não for válido (true), adiciona a class "error" em inputElement(.new-task-input)
  if (!inputIsValid) {
    // o return serve para sair da função após cumprir com a condição
    return (
      inputElement.classList.add("error"),
      inputElement.classList.remove("valid")
    );
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerHTML = inputElement.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-regular");
  deleteItem.classList.add("fa-trash-can");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  taskContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = taskContainer.children;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstElementChild === taskContent;

    if (currentTaskIsBeingClicked) {
      task.firstElementChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = taskContainer.children;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstElementChild === taskContent;

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

// Função para lidar com a mudança de estado do input, caso ele receba algum valor (ele fica true) ele remove a classe error
const handleInputChange = () => {
  const inputIsValid = validateIput();

  if (inputIsValid) {
    return (
      inputElement.classList.remove("error"),
      inputElement.classList.add("valid")
    );
  }
};

const updateLocalStorage = () => {
  const tasks = taskContainer.children;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstElementChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;
    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-regular");
    deleteItem.classList.add("fa-trash-can");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    taskContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

// Adiciona um escutador em addTaskButton, aguardando o click para chamar a função handleAddTask
addTaskButton.addEventListener("click", () => handleAddTask());

// Adiciona um escutador em inputElement, aguardando o click para chamar a função handleInputChange
inputElement.addEventListener("change", () => handleInputChange());
