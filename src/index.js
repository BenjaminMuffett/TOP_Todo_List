import "./styles.css";
import { format, compareAsc } from "date-fns";


function createTodo(Todo, description, date, priority) {
    const title = Todo;
    const info = description;
    const dueDate = date;
    const importance = priority;

    return { title, info, dueDate, importance };
}

const dogwalk = createTodo('Walk the dog', "Take sally", Date.now(), '3');
console.log(dogwalk);


function createProject() {
    // will be called when new project button is clicked.
    //create blank project list 
}

function displayProject() {
    //will be called when new project button is clicked.
    // will add the created blank project to the DOM
}
