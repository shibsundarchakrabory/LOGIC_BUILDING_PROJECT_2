const todo  = document.querySelector("#todo")
const prograss  = document.querySelector("#prograss")
const done  = document.querySelector("#done")

const toggleModalBtn = document.querySelector("#togleModal")
const modal = document.querySelector(".modal")
const modalBg = document.querySelector(".modal .bg")

const addTaskBtn = document.querySelector("#add-new-task")

let dragElement = null

console.log(todo, prograss, done);



const task = document.querySelectorAll(".task")



task.forEach(task => {
    task.addEventListener("drag", (e) => {
        console.log("***");
        dragElement = task
        
    })
})

function addDragEventOnColumn(colomns){
    colomns.addEventListener("dragenter", (e) => {
        e.preventDefault()
        colomns.classList.add("hover-over")
    })
    colomns.addEventListener("dragleave", (e) => {
        e.preventDefault()
        colomns.classList.remove("hover-over")
    })
    colomns.addEventListener("dragover", (e) => {
        e.preventDefault()
    })
  
    
    colomns.addEventListener("drop", (e) => {
        e.preventDefault()
        console.log("droped ", dragElement, colomns);
        colomns.appendChild(dragElement);
        colomns.classList.remove("hover-over");
        
    })
}


addDragEventOnColumn(todo)
addDragEventOnColumn(prograss)
addDragEventOnColumn(done)


toggleModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active")
    // modal.classList.add("active")
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active")
})


// modal.addEventListener("click", (e) => {
//     if (e.target === modal) {
//         modal.classList.remove("active")
//     }
// })
