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

function validateTodo() {
    let entry = document.forms["todo-form"]["todo-title"].value;
    if (entry == '') {
        alert("Please fill out the title of your Todo.");
        return false;
    } else {
        return true;
    }
}

const workspaceDelegation = document.getElementById("workspace");
workspaceDelegation.addEventListener("click", (event) => {
    if (event.target.classList.contains("addTodo")) {
        console.log(event.target);

    }
});


// Related to the modal buttons  
const todoDialog = document.querySelector("#newTodo");
const modalTodoForm = document.querySelector("#todo-form");

const cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    todoDialog.close();
    // modalTodoForm.reset();
});

const confirmBtn = document.querySelector("#confirmBtn");
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateTodo() == true) {
        todoDialog.close();
        // modalTodoForm.reset();
    }
});

modalTodoForm.addEventListener("keydown", (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
        if (validateTodo() == true) {
            // let todoObj = createTodoObject();
            // console.log(todoObj);
            // addTodoDOM(todoObj);
            todoDialog.close();
            // modalTodoForm.reset();
        }
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
    // const newTodoBtn = newDiv.querySelector(".addTodo");
    // newTodoBtn.addEventListener("click", (event) => {
    //     todoDialog.showModal();
    //     if (validateTodo() == true) {
    //         let todoObj = createTodoObject()
    //         console.log(todoObj);
    //         let todoElement = createTodoElement(todoObj);
    //         let selfDivValue = event.target.parentNode.parentNode;
    //         selfDivValue.appendChild(todoElement);
    //     }
    // });
    
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