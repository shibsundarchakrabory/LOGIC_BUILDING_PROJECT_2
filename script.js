let tasksData = {};

const todo = document.querySelector("#todo");
const prograss = document.querySelector("#prograss");
const done = document.querySelector("#done");

const toggleModalBtn = document.querySelector("#togleModal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");

const addTaskBtn = document.querySelector("#add-new-task");

const allColumns = [todo, prograss, done];

let dragElement = null;

function createTaskElement(title, description, column) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
                <h2>${title}</h2>
                <p>${description}</p>
                <button class="delete-btn">Delete</button>
            `;

    //* Add delete functionality
    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });

    column.appendChild(div);

    div.addEventListener("dragstart", (e) => {
        dragElement = div;
    });

    return div;
}

function updateTaskCount(params) {
    allColumns.forEach((colomns) => {
        const tasks = colomns.querySelectorAll(".task");
        const count = colomns.querySelector(".right");

        tasksData[colomns.id] = Array.from(tasks).map((t) => {
            return {
                title: t.querySelector("h2").innerText,
                description: t.querySelector("p").innerText,
            };
        });
        localStorage.setItem("tasks", JSON.stringify(tasksData));

        count.innerText = tasks.length;
    });
}

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));
    // console.log(data);

    for (const column in data) {
        // console.log(column);
        const columns = document.querySelector(`#${column}`);
        data[column].forEach((task) => {
            createTaskElement(task.title, task.description, columns);
        });

        // const count = columns.querySelector(".right");
        // if (count) count.innerText = data[column].length;
      }
      updateTaskCount();
}

console.log(todo, prograss, done);

// Global task loop removed; drag events are now handled inside createTaskElement

function addDragEventOnColumn(colomns) {
    colomns.addEventListener("dragenter", (e) => {
        e.preventDefault();
        colomns.classList.add("hover-over");
    });
    colomns.addEventListener("dragleave", (e) => {
        e.preventDefault();
        colomns.classList.remove("hover-over");
    });
    colomns.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    colomns.addEventListener("drop", (e) => {
        e.preventDefault();
        // console.log("droped ", dragElement, colomns);
        colomns.appendChild(dragElement);
        colomns.classList.remove("hover-over");

        updateTaskCount();
    });
}

addDragEventOnColumn(todo);
addDragEventOnColumn(prograss);
addDragEventOnColumn(done);

toggleModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

// modal.addEventListener("click", (e) => {
//     if (e.target === modal) {
//         modal.classList.remove("active")
//     }
// })

addTaskBtn.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title").value;
    const taskDescription = document.querySelector("#task-description").value;

    //   const taxkTamplate = `<div draggable="true" class="task">
    //             <h2>${taskTitle}</h2>
    //             <p>${taskDescription}</p>
    //             <button>Delet</button>
    //           </div>`;

    createTaskElement(taskTitle, taskDescription, todo);
    updateTaskCount();

    // taskDiv.addEventListener("drag", (e) => {
    //     dragElement = taskDiv;
    // });

    document.querySelector("#task-title").value = "";
    document.querySelector("#task-description").value = "";

    modal.classList.remove("active");
});
