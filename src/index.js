import "./styles.css";
import { formatRelative, sub, subDays } from "date-fns";


function createTodo(Todo, description, date, priority) {
    const title = Todo;
    const info = description;
    const dueDate = date;
    const importance = priority;
    const testDate = formatRelative( subDays(new Date(), 1), new Date());


    return { title, info, testDate, importance };
}

const dogwalk = createTodo('Walk the dog', "Take sally", Date(), '3');
console.log(dogwalk);


const todoDialog = document.querySelector("#newTodo");
const newTodoBtn = document.querySelector(".addTodo");

const todoTitle = document.querySelector("#todo-title");
const todoDescription = document.querySelector("#todo-description");
const todoDueDate = document.querySelector("#todo-dueDate");
const todoPriority = document.querySelector("#todo-priority");

newTodoBtn.addEventListener("click", () => {
    todoDialog.showModal();
})
const confirmBtn = document.querySelector("#confirmBtn");
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(todoTitle.value, todoDescription.value, todoDueDate.value, todoPriority.value);
})


function createProject() {
    // will be called when new project button is clicked.
    //create blank project list 
}

function displayProject() {
    //will be called when new project button is clicked.
    // will add the created blank project to the DOM
}
