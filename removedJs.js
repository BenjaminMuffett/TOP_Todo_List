// need to edit so the parentProjectElement references the correct project, not just the first one.
// function createTodoElement(todoObj) {
    // const parentProjectElement = document.querySelector(".addTodo").parentNode.parentNode;
    // let parentElement = fromEle;
    // console.log(parentElement);
    // let idNodeList = document.getElementsByClassName("header");
    // console.log(idNodeList);
    // const todoDiv = document.createElement("div");
    // todoDiv.classList.add("todo");
    // for (var key in todoObj) {
    //     let entryLine = document.createElement("p");
    //     entryLine.textContent = `${todoObj[key]}`
    //     todoDiv.appendChild(entryLine);
    // }
    // return todoDiv;
    // return parentProjectElement.appendChild(todoDiv);
// }


// function eventAdder(newProjectDiv) {
//     const newTodoBtn = newProjectDiv.querySelector(".addTodo");
//     newTodoBtn.addEventListener("click", (event) => {
//         todoDialog.showModal();
//         if (validateTodo == true) {
//             let todoObj = createTodoObject()
//             let todoElement = createTodoElement(todoObj);
//             let selfDivValue = event.target.parentNode.parentNode;
//             selfDivValue.appendChild(todoElement);
//         }
//     });
// }

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
