import { createProject, ProjectHandler } from "./projects";

    
// Main Factory function to create elements
const elFactory = (type, attributes, ...children) => {
    const el = document.createElement(type)
    
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
  
    children.forEach(child => {
        if (typeof child === "string") {
            const newText = document.createTextNode(child);
            el.append(newText);
        } else {
            el.append(child)
        }
    });
    return el
  }



// Do stuff to projects on DOM
const projectDOMInterface = () => {
    
    //default focused project is the first one
    let focusedProject = 0; 

    //Creates Project delete buttons
    const createDeleteButton = () => {
        return elFactory("button", {"class":"projectDelete", "type":"button"},
            elFactory("img", {"src":"../src/img/project-delete.svg","alt":"project delete button image" },""
            )
         )
    }

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
    
    // Example usage
    getClickedProjectIndex(function (index) {
        console.log("Clicked project index:", index);
        renderProject(index)
        focusedProject = index
    });
    
    // DELETE BUTTON FUNCTIONALITY FOR THE PROJECTS
    (function () {

        function deleteProjectFromDOM() {
            const projectList = document.querySelector("#projectList");

            projectList.addEventListener("click", function (event) {
                if (event.target.classList.contains("projectDelete")) {
                    const currentProject = event.target.closest("article");
                    //Get the index of the project
                    let index = getClickedProjectIndex(function (index) {
                        return index
                        });
                    // Remove the Project From The DOM
                    currentProject.remove();
                    // Remove the Project from Project Array
                    ProjectHandler.removeProject(index);
                }
            });
        }
        document.addEventListener("DOMContentLoaded", deleteProjectFromDOM);

    })();

    
    // Project Input Form: Add Projects using the Input
    function addProjectInputForm() {
        // Get the input value
        const projectTitleInput = document.getElementById('projectTitle');
        const projectTitle = projectTitleInput.value.trim();

        // Check if the input is not empty
        if (projectTitle !== '') {
            
            //Create a project object
            const Project = createProject(projectTitle)
            ProjectHandler.addProject(Project)

            // Create a new article element
            const newArticle = document.createElement('article');
            newArticle.innerText = projectTitle;
            newArticle.dataset.projectIndex = ProjectHandler.getLastIndex();

            newArticle.append(createDeleteButton());
            // Prepend the new article to the "aside main" container
            const projectList = document.getElementById('projectList');
            projectList.append(newArticle);

            // Clear the input field
            projectTitleInput.value = '';

        }

    }

    function renderProject(index) {
    
        function createTodoCard(todo){
            // <div class="card normal">
            //     <h2>Todo 1 Title</h2>
            //     <p>Due: <span>2017-02-14</span></p>
            // </div> 
            return elFactory("div", {"class": `card ${todo.getPriority()}`},
                        elFactory("h2", {}, `${todo.getTitle()}`),
                        elFactory("p", {}, "Due: ",
                            elFactory("span", {}, "2017-02-14")
                        ),
                    )
        }
    
        const container = document.querySelector(".project-div")
        container.innerHTML = ""
        const currentProject = ProjectHandler.projectArray[index];
        const todos = currentProject.getTodos();
    
        for (const todo of todos) {
            container.append(createTodoCard(todo));
        }
     
    }

    // Add event listener for the "Add" button
    document.getElementById('projectAdd').addEventListener('click', addProjectInputForm);
    addProjectInputForm()
    

    return { focusedProject }
}



export { projectDOMInterface };

