const taskContainer = document.querySelector(".task__container");


const newCard = ({
    id,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription,
    }) =>
    `<div class="col-md-6 col-lg-4 id=${id}">
        <div class="card text">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success">
                <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" class="btn btn-outline-danger">
                <i class="fas fa-trash-alt"></i>
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

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,                                                    //Unique number for card id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
};