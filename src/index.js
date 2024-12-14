import "./styles.css";
import { formatRelative, sub, subDays, endOfDay, endOfToday } from "date-fns";


function createTodoObject() {
    const todoTitle = document.querySelector("#todo-title");
    const todoDescription = document.querySelector("#todo-description");
    const todoDueDate = document.querySelector("#todo-dueDate");
    const todoPriority = document.querySelector("#todo-priority");

    const title = todoTitle.value;
    const info = todoDescription.value;
    const dueDate = todoDueDate.value;
    const importance = todoPriority.value;

    return { title, info, dueDate, importance };
}

function createTodoDOM(todoObj) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    for (var key in todoObj) {
        let entryLine = document.createElement("p");
        // entryLine.setAttribute("contentEditable", true); long text break layout
        entryLine.textContent = `${todoObj[key]}`
        todoDiv.appendChild(entryLine);
    }
    var prioritySelector = todoDiv.lastChild;
    todoDiv.classList.add(prioritySelector.textContent);
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("doneBtn");
    doneBtn.textContent = "Done";
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.textContent = "Edit";
    const delTodoBtn = document.createElement("button");
    delTodoBtn.classList.add("delTodo");
    delTodoBtn.textContent = "Delete";
    btnDiv.appendChild(doneBtn);
    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(delTodoBtn);
    todoDiv.appendChild(btnDiv);
    return todoDiv;
}

function onConfirmClick(parentDiv) {
    let newTodo = createTodoObject();
    if (newTodo.title) {
        let newTodoDiv = createTodoDOM(newTodo);
        parentDiv.appendChild(newTodoDiv);
        
    } else {
        alert("Please fill out the title of your Todo.")
    }
};

// const selectDelTodoBtn = Object.values(document.getElementsByClassName("delTodo"));
// selectDelTodoBtn.forEach(btn => {
//     btn.addEventListener("click", (event) => {
//         console.log(event);
//     })
// });
function delTodoBtnFunction() {
    const selectDelTodoBtn = document.querySelectorAll("delTodo");
    selectDelTodoBtn.forEach( btn => {
        btn.addEventListener("click", event => {
            console.log(event.target);
        })
    })
};


let clickedProject;
const workspaceDelegation = document.getElementById("workspace");
workspaceDelegation.addEventListener("click", (event) => {
    if (event.target.classList.contains("addTodo")) {
        todoDialog.showModal();
    }
    clickedProject = event.target.parentNode.parentNode;
});

// Related to the modal buttons 
const todoDialog = document.querySelector("#newTodo");
const modalTodoForm = document.querySelector("#todo-form");
const cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    todoDialog.close();
    modalTodoForm.reset();
});
const confirmBtn = document.querySelector("#confirmBtn");
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    onConfirmClick(clickedProject);
    todoDialog.close();
    modalTodoForm.reset();
});
modalTodoForm.addEventListener("keydown", (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
    }
})
// End of modal responsibilities.



// Related to Project blocks
const newProjectBtn = document.querySelector("#create-project");
newProjectBtn.addEventListener("click", () => {
    displayProject();
});

function createProject(projectName) {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    let headerDiv = document.createElement("div");
    headerDiv.classList.add("header");
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.contentEditable = true;
    titleDiv.textContent = projectName;
    titleDiv.setAttribute('id', projectName);
    headerDiv.appendChild(titleDiv);
    let btnDiv = document.createElement("button");
    btnDiv.classList.add("addTodo");
    btnDiv.textContent = '+';
    headerDiv.appendChild(btnDiv);
    projectDiv.appendChild(headerDiv);
    return projectDiv
}

function displayProject() {
    const workspaceDiv = document.querySelector("#workspace");
    let userProject = prompt("Please enter the name of your new project.");
    if (validateNewProject(userProject) == false) {
        return
    };
    let newDiv = createProject(userProject); 
    
    return workspaceDiv.appendChild(newDiv); 
};

function validateNewProject(name) {
    if (name == '') {
        alert("Please fill out the title of your Project.");
        return false;
    } else {
        return true;
    }
}