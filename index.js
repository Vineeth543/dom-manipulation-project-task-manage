const taskContainer = document.querySelector(".task__container");

//Global Storage
let globalStore = [];

const newCard = ({ id, imageUrl, taskTitle, taskType, taskDescription }) =>
  `<div class="col-md-6 col-lg-4 id=${id}">
        <div class="card text">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)">
                    <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this, arguments)"></i>
                </button>
            </div>
            <img
                src=${imageUrl}
                class="card-img-top"
                alt="image"
            />
            <div class="card-body">
                <h5 class="card-title">${taskTitle}</h5>
                <p class="card-text">
                ${taskDescription}
                </p>
                <h4><span class="badge bg-primary">${taskType}</span></h4>
            </div>
            <div class="card-footer text-muted">
                <button type="button" class="btn btn-outline-primary float-end">
                Open Task
                </button>
            </div>
        </div>
    </div>`;

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
