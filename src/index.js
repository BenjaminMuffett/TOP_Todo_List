import "./styles.css";
import { formatRelative, sub, subDays, endOfDay, endOfToday } from "date-fns";


function createTodoObject() {
    const todoTitle = document.querySelector("#todo-title");
    const todoDescription = document.querySelector("#todo-description");
    const todoDueDate = document.querySelector("#todo-dueDate");
    const todoPriority = document.querySelector("#todo-priority");

    const title = todoTitle.value;
    const info = todoDescription.value;
    const dueDate = dateChecker(todoDueDate);
    const importance = todoPriority.value;

    function dateChecker(dueDate) {
        if (dueDate.value == '') {
            return '';
        } else {
            return "Get done by: " + formatRelative(endOfDay(dueDate.value), endOfDay(new Date()));
        }
    }

    return { title, info, dueDate, importance };
}

function createTodoDOM(todoObj) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    for (var key in todoObj) {
        let entryLine = document.createElement("p");
        entryLine.classList.add(key);
        entryLine.textContent = `${todoObj[key]}`
        todoDiv.appendChild(entryLine);
    }
    var prioritySelector = todoDiv.lastChild;
    todoDiv.classList.add(prioritySelector.textContent);
    prioritySelector.style.display = 'none';
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
        delTodoBtnFunction();
        doneTodoBtnFunction();
        editTodoBtnFunction();

        savingDOMDisplay();
    } else {
        alert("Please fill out the title of your Todo.")
        return
    }
};

function delTodoBtnFunction() {
    const selectDelTodoBtn = document.getElementsByClassName("delTodo");
    Array.prototype.forEach.call(selectDelTodoBtn, function(uwu) {
        if (uwu.getAttribute("listener") != 'true') {
            uwu.setAttribute("listener", 'true');
            uwu.addEventListener("click", event => {
            let target = event.target.parentNode.parentNode;
            target.remove();
        })
        }
    })
};

function doneTodoBtnFunction() {
    const selectDoneTodoBtn = document.getElementsByClassName("doneBtn");
    Array.prototype.forEach.call(selectDoneTodoBtn, function(uwu) {
        if (uwu.getAttribute("listener") != 'true') {
            uwu.setAttribute("listener", 'true');
            uwu.addEventListener("click", event => {
            let target = event.target.parentNode.parentNode;

            if (target.classList.contains("complete")) {
                target.classList.remove("complete");
                event.target.textContent = "Done";
            } else {
                target.classList.add("complete");
                event.target.textContent = "Undo";
            }
        })
        }
        
    })
};

function editTodoBtnFunction() {
    const selectEditTodoBtn = document.getElementsByClassName("editBtn");
    Array.prototype.forEach.call(selectEditTodoBtn, function(edit) {
        if (edit.getAttribute("listener") != 'true') {
            edit.setAttribute("listener", 'true');
            edit.addEventListener("click", event => {
                let target = event.target.parentNode.parentNode.childNodes;
                console.log(target);
                console.log(event.target);
                console.log(event.target.textContent);
                console.log(target[0]);
                if (event.target.textContent == "Edit") {
                    event.target.textContent = "Save";
                    target[0].contentEditable = true;
                    target[1].contentEditable = true;
                } else if (event.target.textContent == "Save") {
                    event.target.textContent = "Edit";
                    target[0].contentEditable = false;
                    target[1].contentEditable = false;
                }     
            })
        }
    })
}

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
    return projectDiv;
}

function displayProject() {
    const workspaceDiv = document.querySelector("#workspace");
    let userProject = prompt("Please enter the name of your new project.");
    if (validateNewProject(userProject) == false) {
        return
    };
    let newDiv = createProject(userProject); 
    return workspaceDiv.appendChild(newDiv)//, savingDOMDisplay(); 
};

function validateNewProject(name) {
    if (name == '') {
        alert("Please fill out the title of your Project.");
        return false;
    } else if (name == null) {
        return false;
    } else {
        return true;
    }
}

function savingDOMDisplay() {    
    const workspaceSave = document.getElementById("workspace");
    const projects = workspaceSave.getElementsByClassName("project");
    console.log(projects.length);
    for (let project of projects) {
        console.log(project.children);
        let projectTitle = project.querySelector(".title").textContent;
        let todoList = project.getElementsByClassName("todo");
        const projectArray = [];
        for (let todo of todoList) {
            let todoArray = {};
            todoArray.todoTitle = todo.querySelector(".title").textContent;
            todoArray.todoDescription = todo.querySelector(".info").textContent;
            todoArray.todoDate = todo.querySelector(".dueDate").textContent;
            todoArray.todoPriority = todo.querySelector(".importance").textContent;
            projectArray.push(todoArray);
            console.log(todoArray);
        }
        localStorage.setItem(projectTitle, JSON.stringify(projectArray));
    }
}

function getFromStorage() {
    if (localStorage.length > 0) {
        const workspaceSave = document.getElementById("workspace");
        workspaceSave.innerHTML = '';
        // let savedKeys = Object.keys(localStorage).reduce(function(obj, str) {
        //     obj[str] = JSON.parse(localStorage.getItem(str));
        //     return obj
        // }, []); // order gets messed up during load but idk
        let savedKeys = Object.keys(localStorage);
        console.log(savedKeys);
        for (let key of savedKeys) {
            let keyDiv = createProject(key);
            console.log(keyDiv);
            workspaceSave.appendChild(keyDiv);
            for (let obj of JSON.parse(localStorage.getItem(key))) {
                console.log(obj);
                let returnedTodo = createTodoDOM(obj);
                console.log(returnedTodo);
                keyDiv.appendChild(returnedTodo);
                delTodoBtnFunction();
                doneTodoBtnFunction();
                editTodoBtnFunction();
            }
        }
    }
}

getFromStorage();