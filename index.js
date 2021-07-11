const taskContainer = document.querySelector(".task__container");
const openTaskModal = document.querySelector(".task__modal__body");

//Global Storage
let globalStore = [];

const newCard = ({ id, imageUrl, taskTitle, taskDescription, taskType }) =>
  `<div class="col-md-6 col-lg-4" id=${id}>
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success" id=${id} onclick="editCard.apply(this, arguments)">
                    <i class="fas fa-pencil-alt" id=${id} onclick="editCard.apply(this, arguments)"></i>
                </button>
                <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)">
                    <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this, arguments)"></i>
                </button>
            </div>
            <img
                src=${imageUrl}
                class="card-img-top"
                alt="Your task image"
            />
            <div class="card-body">
                <h5 class="card-title">${taskTitle}</h5>
                <p class="card-text">
                ${taskDescription}
                </p>
                <span class="badge bg-primary">${taskType}</span>
            </div>
            <div class="card-footer text-muted">
                <button type="button" class="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick="openTask.apply(this, arguments)">
                Open Task
                </button>
            </div>
        </div>
    </div>`;

const viewCard = ({ id, imageUrl, taskTitle, taskDescription, taskType }) => {
  return `<div id=${id}>
       <img
       src=${imageUrl}
       alt="bg image"
       class="img-fluid task__image__view mb-3"
       />
       <h2 class="my-3">${taskTitle}</h2>
       <p class="lead">${taskDescription}</p>
       <span class="badge bg-primary">${taskType}</span>
      </div>`;
};

const loadInitialTaskCards = () => {
  // Access LocalStorage
  const getInitialData = localStorage.getItem("tasky");
  if (!getInitialData) return;

  // Convert String object to normal object
  const { cards } = JSON.parse(getInitialData);

  // Map around the array to generate HTML card and inject to DOM
  cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  });
};

const updateLocalStorage = () =>
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, //Unique number for card id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  const createNewCard = newCard(taskData);

  taskContainer.insertAdjacentHTML("beforeend", createNewCard);

  globalStore.push(taskData);

  // Add to Local Storage
  updateLocalStorage();
};

const deleteCard = (event) => {
  // Get the ID
  event = window.event;
  const targetId = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetId);

  updateLocalStorage();

  // Access DOM to remove card
  if (tagname === "BUTTON") {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  }

  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
  );
};

const editCard = (event) => {
  event = window.event;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute(
    "onclick",
    "saveEditchanges.apply(this, arguments)"
  );
  submitButton.innerHTML = "Save Changes";
};

const saveEditchanges = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,
  };

  globalStore = globalStore.map((task) => {
    if (task.id === targetID) {
      return {
        id: task.id,
        imageUrl: task.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
    return task;
  });

  updateLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.removeAttribute("onclick");
  submitButton.innerHTML = "Open Task";
};

const openTask = (event) => {
  if (!event) {
    event = window.event;
  }

  const viewTask = globalStore.filter(({ id }) => id === event.target.id);
  openTaskModal.innerHTML = viewCard(viewTask[0]);
};
