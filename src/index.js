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

// need to edit so the parentProjectElement references the correct project, not just the first one.
function createTodoElement(todoObj) {
    // const parentProjectElement = document.querySelector(".addTodo").parentNode.parentNode;
    // let parentElement = fromEle;
    // console.log(parentElement);
    // let idNodeList = document.getElementsByClassName("header");
    // console.log(idNodeList);
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    for (var key in todoObj) {
        let entryLine = document.createElement("p");
        entryLine.textContent = `${todoObj[key]}`
        todoDiv.appendChild(entryLine);
    }
    return todoDiv;
    // return parentProjectElement.appendChild(todoDiv);
}

function addTodoDOM(TodoElement, eventLocation) {

}

// const newTodoBtn = document.getElementsByClassName("addTodo");
// const newTodoBtn = document.querySelector(".addTodo");
// newTodoBtn.addEventListener("click", () => {
//     todoDialog.showModal();
//     const todoForm = document.querySelector("#todo-form");
//     todoForm.reset();
// });


// let TodoBtnNodeList = Array.from(document.getElementsByClassName("addTodo"));
// TodoBtnNodeList.forEach(btn => {
//     btn.addEventListener("click", () => {
//         todoDialog.showModal();
//         const todoForm = document.querySelector("#todo-form");
//         todoForm.reset();
//     })
// });
// Default Project event listener 
// let headerNodeList = document.getElementsByClassName("header");
// for (let btn of headerNodeList) {
//     btn.addEventListener("click", function(e) {
//         console.log(e.target);
//         if (e.target.matches(".addTodo")) {
//             todoDialog.showModal();
//             const todoForm = document.querySelector("#todo-form");
//             todoForm.reset();
//         }
//     })
// };

// Array.from(headerNodeList).forEach(btn => {
//     btn.addEventListener("click", function(e) {
//         console.log(e.target);
//         if (e.target && e.target.matches(".addTodo")) {
//             todoDialog.showModal();
//             const todoForm = document.querySelector("#todo-form");
//             todoForm.reset();
//         }
// })
// });

// Related to the modal buttons  
const todoDialog = document.querySelector("#newTodo");

const cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    todoDialog.close();
});

const confirmBtn = document.querySelector("#confirmBtn");
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateTodo() == true) {
        todoDialog.close();
    }
});

const modalTodoTitle = document.querySelector("#todo-form");
modalTodoTitle.addEventListener("keydown", (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
        if (validateTodo() == true) {
            // let todoObj = createTodoObject();
            // console.log(todoObj);
            // addTodoDOM(todoObj);
            todoDialog.close();
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
    const newTodoBtn = newDiv.querySelector(".addTodo");
    var selfDivValue;
    newTodoBtn.addEventListener("click", (event) => {
        todoDialog.showModal();
        const todoForm = document.querySelector("#todo-form");
        let todoObj = createTodoObject()
        let todoElement = createTodoElement(todoObj);
        let selfDivValue = event.target.parentNode.parentNode;
        selfDivValue.appendChild(todoElement);
        todoForm.reset();
    });
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