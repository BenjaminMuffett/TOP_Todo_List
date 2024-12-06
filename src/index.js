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
        console.log(entry);
        return true;
    }
}

function addTodoDOM(todoObj, event) {
    const parentElement = document.getElementsByClassName("addTodo").parentNode;
    return console.log(parentElement);
}

const todoDialog = document.querySelector("#newTodo");
const newTodoBtn = document.querySelector(".addTodo");

newTodoBtn.addEventListener("click", () => {
    todoDialog.showModal();
    const todoForm = document.querySelector("#todo-form");
    todoForm.reset();
});

const cancelBtn = document.querySelector(".cancelBtn");
cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    todoDialog.close();
});

const confirmBtn = document.querySelector("#confirmBtn");
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateTodo() == true) {
        let testCat = createTodoObject()
        console.log(testCat);
        addTodoDOM(testCat, event);
        todoDialog.close();
    }
    // let testCat = createTodoObject()
    // console.log(testCat);
    // let v = createTodoObject(todoTitle.value, todoDescription.value, todoDueDate.value, todoPriority.value);
    // console.log(v);
    // todoDialog.close();
});




function createProject() {
    // will be called when new project button is clicked.
    //create blank project list 
}

function displayProject() {
    //will be called when new project button is clicked.
    // will add the created blank project to the DOM
}
