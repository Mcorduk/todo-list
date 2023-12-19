import { showDialog } from "./dialog";
import { ProjectHandler, elFactory } from "./projectFactory";


const projectDiv = document.querySelector(".project-div")


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


//TODO Add functionality to me to change Todo Object Check state
//Check Todo's as complete when check button is clicked, this toggles 
(function checkTodoCard() {
    
    projectDiv.addEventListener("click", function (event) {
        const checkTodoButton = event.target.closest(".checkTodoButton");

        if (checkTodoButton) {
            const card = event.target.closest(".card")
            card.classList.toggle("checked")
        }
    });
})()


function deleteTodoCard() {
    
    const projectDiv = document.querySelector(".project-div")   
    projectDiv.addEventListener("click", function (event) {
        const currentProjectIndex = projectDiv.dataset.projectIndex;
        const currentProject = ProjectHandler.projectArray[currentProjectIndex];

        if (event.target.classList.contains("deleteTodoButton")) {
            const currentTodo = event.target.closest(".card");

            // Get the index of the project
            let index = currentTodo.dataset.todoIndex;

            // Remove the Todo From The DOM
            currentTodo.remove();
            // Remove the Todo from Project Array
            currentProject.removeTodo(index);
            // Render the project again so the project refreshes, todo gets correct index
            renderProject(currentProjectIndex)
        }
    });
}
// To-do delete button gets functionality
deleteTodoCard()


//Used for creating the Delete, Edit and Check button on To-do's
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
    //Dataset to be added to todo card
    let todoIndex = 0
    for (const todo of todos) {
        let todoCard = createTodoCard(todo) 
        todoCard.dataset.todoIndex = todoIndex;
        container.append(todoCard);

        todoIndex++;

    }
    container.append(createTodoAdderCard());
}


getClickedProjectIndex(function(index) {
    renderProject(index);
});


export { renderProject };

