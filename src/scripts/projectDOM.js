import { showDialog } from "./dialog";
import { ProjectHandler, elFactory } from "./projectFactory";

//Callback function that gets the clicked project index
function getClickedProjectIndex(callback) {
    const projectList = document.querySelector("#projectList");

    projectList.addEventListener("click", function (event) {
        if (event.target.tagName.toLowerCase() === "article") {
            const currentProject = event.target.closest("article");
            // Get the index of the project
            const clickedProjectIndex = currentProject.dataset.projectIndex;
            // Remove the Project From The DOM
            console.log(clickedProjectIndex);
            // Call the callback function with the index
            callback(clickedProjectIndex);
        }
    });
}


// function to create button elements for the todo card 
function createTodoButton(buttonClass, src) {
    return elFactory("button", {"class" : `${buttonClass}`},
        elFactory("img", {"src": `${src}`}, ""))
} 

(function checkTodo() {
    const projectDiv = document.querySelector(".project-div")

    projectDiv.addEventListener("click", function (event) {
        const checkTodoButton = event.target.closest(".checkTodoButton");

        if (checkTodoButton) {
            const card = event.target.closest(".card")
            card.classList.toggle("checked")
        }
    });
})()

function createTodoCard(todo) {
    return elFactory("div", { "class": `card ${todo.getPriority().toLowerCase()}` },
        elFactory("h2", {}, `${todo.getTitle()}`,
            createTodoButton(`checkTodoButton`, `../src/img/todoCheck.svg`),
            createTodoButton(`editTodoButton`, `../src/img/todoEdit.svg`), 
            createTodoButton(`deleteTodoButton`, `../src/img/todoDelete.svg`)),
           
        elFactory("p", {}, "Due: ",
            elFactory("span", {}, `${todo.getDueDate()}`)
        ),
    );
}

function createTodoAdderCard() {
    return elFactory("div", {"class":"addTodoButton"}, elFactory("p", {}, elFactory("button", {"id":"showDialog"},
        elFactory("img", {"src":"../src/img/addTodo.svg",
     "alt":"image for a button to add more todos."}))))
}

function renderProject(index) {
    const container = document.querySelector(".project-div");
    container.dataset.projectIndex = `${index}`
    container.innerHTML = "";

    const currentProject = ProjectHandler.projectArray[index];
    const todos = currentProject.getTodos();

    for (const todo of todos) {
        container.append(createTodoCard(todo));
    }
    container.append(createTodoAdderCard());
}

getClickedProjectIndex(function(index) {
    renderProject(index);
});

export { renderProject };

