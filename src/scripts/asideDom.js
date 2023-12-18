
import { ProjectHandler, createProject, elFactory } from "./projects";
// Main Factory function to create elements


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
                ProjectHandler.removeProject(index);
            }
        });
    }
    document.addEventListener("DOMContentLoaded", deleteProjectFromDOM);

    
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
    // Add event listener for the "Add" button
    document.getElementById('projectAdd').addEventListener('click', addProjectInputForm);
    addProjectInputForm()
    deleteProjectFromDOM()
}


export { elFactory, projectDOMInterface };

