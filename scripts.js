const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector("task-container");

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
  } else {
    // Função para adicionar novas tarefas
    if (inputIsValid) {
      const valueInput = inputElement.value;
      taskContainer.appendChild(".task-item")
    }
  }
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

// Adiciona um escutador em addTaskButton, aguardando o click para chamar a função handleAddTask
addTaskButton.addEventListener("click", () => handleAddTask());

// Adiciona um escutador em inputElement, aguardando o click para chamar a função handleInputChange
inputElement.addEventListener("change", () => handleInputChange());
