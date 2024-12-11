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

// function createTodoElement(todoObj,event) {
//     const parentProjectElement = event.target.parentNode.parentNode;
//     const todoDiv = document.createElement("div");
//     todoDiv.classList.add("todo");
//     for (var key in todoObj) {
//         let entryLine = document.createElement("p");
//         entryLine.textContent = `${todoObj[key]}`
//         todoDiv.appendChild(entryLine);
//     }
//     parentProjectElement.appendChild(todoDiv);
// }

const workspaceDelegation = document.getElementById("workspace");
workspaceDelegation.addEventListener("click", (event) => {
    if (event.target.classList.contains("addTodo")) {
        var parentProjectElement = event.target.closest(".project");
        console.log(event.target);
        console.log(event.target.closest(".project"));
        const todoDialog = document.querySelector("#newTodo");

        function createTodoElement() {
            var todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");

            // Related to the modal buttons  
            
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
                let valCheck = validateTodo();
                if (valCheck == true) {
                    var todoObj = createTodoObject();
                    console.log(todoObj);
                    for (var key in todoObj) {
                        let entryLine = document.createElement("p");
                        entryLine.textContent = `${todoObj[key]}`
                        todoDiv.appendChild(entryLine);
                    }
                    todoDialog.close();
                    modalTodoForm.reset();
                }
            });
            modalTodoForm.addEventListener("keydown", (event) => {
                if (event.code === 'Enter') {
                    event.preventDefault();
                    if (validateTodo() == true) {
                        let todoObj = createTodoObject();
                        console.log(todoObj);
                        todoDialog.close();
                        modalTodoForm.reset();
                    }
                }
            })
            // End of modal responsibilities.
            return todoDiv;
        }
        todoDialog.showModal();

        let todoDOM = createTodoElement();
        parentProjectElement.appendChild(todoDOM);
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