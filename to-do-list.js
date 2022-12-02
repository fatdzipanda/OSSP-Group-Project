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
    let div2 = document.createElement("div");
    div2.className = "row g-3 listing";
    let div = document.createElement("div");
    div.className = "col-sm-1";
    div.style = "padding-left: 30px;";
    div2.appendChild(div);

    if (task.type === Type.Done) {

        let check = document.createElement("input");
        check.className = "form-check-input";
        check.type = "checkbox";
        div.appendChild(check);

        check.addEventListener("click", () => {
            task.type = Type.Todo;
            addToList(task);
            div.remove();
            done = done.filter(t => t !== task);
            saveDone();
            tasks.push(task);
            saveTasks();
        });

        let buttonRemove = document.createElement("button");
        buttonRemove.className = "btn btn-sm btn-danger";
        innerHTML = '<i class="bi bi-x"></i>';
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
    }
    else {
        let check = document.createElement("input");
        check.className = "form-check-input";
        check.type = "checkbox";
        div.appendChild(check);

        check.addEventListener("click", () => {
            task.type = Type.Done;
            addToList(task);
            div.remove();
            tasks = tasks.filter(t => t !== task);
            saveTasks();
            done.push(task);
            saveDone();
        }); 

        let buttonRemove = document.createElement("button");
        buttonRemove.className = "btn btn-sm btn-danger";
        innerHTML = '<i class="bi bi-x"></i>';
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
    }

    let due = document.createElement("div");
    due.className = "col-sm-2";
    div2.appendChild(due);    

    let duein = document.createElement("span");
    duein.className = "to-do-text";
    duein.textContent = task.text;
    due.appendChild(duein);
    
    let tasking = document.createElement("div");
    tasking.className = "col-sm-9";
    div2.appendChild(tasking);    

    let taskin = document.createElement("span");
    taskin.className = "to-do-text";
    taskin.textContent = task.text2; 
    tasking.appendChild(taskin);


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
        text2: text2,
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