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

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  // console.log(data);

  for (const column in data) {
    // console.log(column);
    const columns = document.querySelector(`#${column}`);
    data[column].forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      taskDiv.setAttribute("draggable", "true");
      taskDiv.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <button class="delete-btn">Delete</button>
            `;
      columns.appendChild(taskDiv);

      taskDiv.addEventListener("dragstart", (e) => {
        dragElement = taskDiv;
      });
    });

    const count = columns.querySelector(".right");
    if (count) count.innerText = data[column].length;
  }


  
}

console.log(todo, prograss, done);

const task = document.querySelectorAll(".task");

task.forEach((task) => {
  task.addEventListener("drag", (e) => {
    console.log("***");
    dragElement = task;
  });
});

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
    console.log("droped ", dragElement, colomns);
    colomns.appendChild(dragElement);
    colomns.classList.remove("hover-over");

    

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

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.setAttribute("draggable", "true");
  taskDiv.innerHTML = `
            <h2>${taskTitle}</h2>
            <p>${taskDescription}</p>
            <button>Delet</button>
            `;
  todo.appendChild(taskDiv);

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

  taskDiv.addEventListener("drag", (e) => {
    dragElement = taskDiv;
  });

  document.querySelector("#task-title").value = "";
  document.querySelector("#task-description").value = "";

  modal.classList.remove("active");
});
