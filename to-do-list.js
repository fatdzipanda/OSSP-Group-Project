const Type = {
    Todo: 1,
    Done: 2,
};

let tasks = [];
let done = [];

function loadTasks() {
    let lastTasks = localStorage.getItem("tasks");
    if (!lastTasks) return;

    tasks = JSON.parse(lastTasks);
    tasks.forEach(addToList);
}

function loadDone() {
    let lastDone = localStorage.getItem("done");
    if (!lastDone) return;
    Done = JSON.parse(lastDone);
    Done.forEach(addToList);
}

function saveDone() {
    localStorage.setItem("done", JSON.stringify(done));
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addToList(task) {
    let div = document.createElement("div");
    div.className = "task bg-light p-1 rounded-2 ps-2 d-flex align-items-center";

    let span = document.createElement("span");
    span.className = "me-auto";
    span.textContent = task.text;
    div.appendChild(span);

    if (task.type === Type.Todo) {
        let buttonUp = document.createElement("button");
        buttonUp.className = "btn btn-sm btn-primary me-1";
        buttonUp.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
        div.appendChild(buttonUp);

        buttonUp.addEventListener("click", () => {
            let index = tasks.indexOf(task); 
            if (index != 0){
                [tasks[index], tasks[index+1]] = [tasks[index+1], tasks[index]];
                saveTasks();
            }
        });

        let buttonDone = document.createElement("button");
        buttonDone.className = "btn btn-sm btn-success me-1";
        buttonDone.innerHTML = '<i class="bi bi-check"></i>';
        div.appendChild(buttonDone);

        buttonDone.addEventListener("click", () => {
            task.type = Type.Done;
            addToList(task);
            div.remove();
            tasks = tasks.filter(t => t !== task);
            saveTasks();
            done.push(task);
            saveDone();
        });
    }

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-sm btn-danger";
    buttonRemove.innerHTML = '<i class="bi bi-x"></i>';
    div.appendChild(buttonRemove);

    buttonRemove.addEventListener("click", () => {
        div.remove();
        if (task.type === Type.Done) {
            done = done.filter(t => t !== task);
            saveDone();
        }
        tasks = tasks.filter(t => t !== task);
        saveTasks();

    });

    let list = document.querySelector(task.type === Type.Todo ? "#todo-list" : "#done-list");
    list.appendChild(div);
}

window.addEventListener("load", () => {
    loadTasks();
    loadDone();
});

let button = document.querySelector("#add");
button.addEventListener("click", () => {
    // 1. Read the text in #task-input.
    let input = document.querySelector("#task-input");
    let text = input.value;

    if (!text.length) return;

    // 2. Create a new Task object.
    let task = {
        text: text,
        type: Type.Todo
    };

    // 3. Append the new Task object to tasks						
    tasks.push(task);
    saveTasks();

    // 4. Create a new task item and attach it to #todo-list.
    addToList(task);

    // 5. Clear #task-input.
    input.value = "";
});
let enter = document.querySelector("#task-input");
enter.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector("#add").click();
      }
});