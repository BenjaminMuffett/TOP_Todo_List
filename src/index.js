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
        entryLine.textContent = `${todoObj[key]}`
        todoDiv.appendChild(entryLine);
    }
    return todoDiv;
}

const workspaceDelegation = document.getElementById("workspace");
workspaceDelegation.addEventListener("click", (event) => {
    if (event.target.classList.contains("addTodo")) {
        let selectedTitle = bind(event.target.previousElementSibling);
        console.log(selectedTitle);
        let selectedProject = selectedTitle.parentNode.parentNode;
        console.log(selectedProject);
        // const projects = document.getElementsByClassName("project");
        // for (let i = 0; i < projects.length; i++) {
        //     if (projects[i] == event.target.parentNode.parentNode) {
        //         var parentProjectElement = event.target.parentNode.parentNode;
        //     }
        // }
        // console.log(event.target);
        // console.log(parentProjectElement);
        const todoDialog = document.querySelector("#newTodo");

        // Related to the modal buttons  
        var todoTitled = false;
        const modalTodoForm = document.querySelector("#todo-form");
        const cancelBtn = document.querySelector("#cancelBtn");
        cancelBtn.addEventListener("click", (event) => {
            event.preventDefault();
            todoDialog.close();
            modalTodoForm.reset();
        });
        // what if i go one step further and just return a boolean value from confirm button
        // then if true run the functions outside of its scope?
        const confirmBtn = document.querySelector("#confirmBtn");
        confirmBtn.addEventListener("click", (event) => {
            event.preventDefault();
            let checkTitleEmpty = document.querySelector("#todo-title").value;
            if (checkTitleEmpty == false) {
                // alert("Please fill out the title of your Todo.");
            } else {
                todoTitled = true;
                todoDialog.close();
                modalTodoForm.reset();
                onConfirmClick(todoTitled, selectedProject);
            }
        });

        modalTodoForm.addEventListener("keydown", (event) => {
            if (event.code === 'Enter') {
                event.preventDefault();
            }
        })
        // End of modal responsibilities.
        todoDialog.showModal();
        console.log(todoTitled);

        function onConfirmClick (valuedTitle,parentDiv) {
            if (valuedTitle) {
                let newTodo = createTodoObject();
                let newTodoDiv = createTodoDOM(newTodo);
                parentDiv.appendChild(newTodoDiv);
            } else {
                alert("Please fill out the title of your Todo.")
            }
        };
    }
});

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