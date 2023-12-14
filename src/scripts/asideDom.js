import { createProject, projectHandler } from "./projects";


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

//Initiate a project handler
const handler = projectHandler()


// Do stuff to projects on DOM
const projectDOMInterface = () => {

    //Creates Project delete buttons
    const createDeleteButton = () => {
        return elFactory("button", {"class":"projectDelete", "type":"button"},
            elFactory("img", {"src":"../src/img/project-delete.svg","alt":"project delete button image" },""
            )
         )
    }

    // DELETE BUTTON FUNCTIONALITY FOR THE PROJECTS
    (function () {

        function deleteProjectFromDOM() {
            const projectList = document.querySelector("#projectList");

            projectList.addEventListener("click", function (event) {
                if (event.target.classList.contains("projectDelete")) {
                    const currentProject = event.target.closest("article");
                    //Get the index of the project
                    let index = currentProject.dataset.projectIndex
                    // Remove the Project From The DOM
                    currentProject.remove();
                    // Remove the Project from Project Array
                    handler.removeProject(index);
                }
            });
        }
        document.addEventListener("DOMContentLoaded", deleteProjectFromDOM);

    })();

    // Add Projects using the Input
    // Project Input Form
    function addProjectInputForm() {
        // Get the input value
        const projectTitleInput = document.getElementById('projectTitle');
        const projectTitle = projectTitleInput.value.trim();

        // Check if the input is not empty
        if (projectTitle !== '') {
            
            //Create a project object
            const Project = createProject(projectTitle)
            handler.addProject(Project)

            // Create a new article element
            const newArticle = document.createElement('article');
            newArticle.innerText = projectTitle;
            newArticle.dataset.projectIndex = handler.getLastIndex();

            newArticle.append(createDeleteButton());
            // Prepend the new article to the "aside main" container
            const projectList = document.getElementById('projectList');
            projectList.append(newArticle);

            // Clear the input field
            projectTitleInput.value = '';

        }

    }
    // Add event listener for the "Add" button
    document.getElementById('projectAdd').addEventListener('click', addProjectInputForm);
    addProjectInputForm()
}


export { handler, projectDOMInterface };

