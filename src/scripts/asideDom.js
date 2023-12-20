
import { renderProject } from "./projectDOM";
import { ProjectHandler, createProject, elFactory } from "./projectFactory";


// Do stuff to projects on DOM
const projectDOMInterface = () => {
    // Get DOM container that holds Projects
    const projectList = document.getElementById('projectList');

    //Creates Project delete buttons
    const createDeleteButton = () => {
        return elFactory("button", {"class":"projectDelete", "type":"button"},
            elFactory("img", {"src":"../src/img/project-delete.svg","alt":"project delete button image" },""
            )
         )
    }
    
    
    // I am not adding todo index
    // DELETE BUTTON FUNCTIONALITY FOR THE TODOS
    function deleteProjectFromDOM() {

        projectList.addEventListener("click", function (event) {
            if (event.target.closest(".projectDelete")) {
                const currentProject = event.target.closest("article");
                //Get the index of the project
                let index = currentProject.dataset.projectIndex
                // Remove the Project From The DOM
                currentProject.remove();
                // Remove the Project from Project Array
                ProjectHandler.removeProject(index);
                renderProject(index)
            }
        });
    }

    
    // Project Input Form: Add Projects using the Input
    function addProjectInputForm() {
        // Get the input value
        const projectTitleInput = document.getElementById('projectTitle');
        const projectTitle = projectTitleInput.value.trim();

        // Check if the input is not empty
        if (projectTitle !== '') {
            
            //Create a project object
            const Project = createProject(projectTitle)
            //Add the project object to project array
            ProjectHandler.addProject(Project)

            // Create a new article element
            const newArticle = document.createElement('article');
            newArticle.innerText = projectTitle;
            newArticle.dataset.projectIndex = ProjectHandler.getLastIndex();
            //Add the delete button to the new project
            newArticle.append(createDeleteButton());
            // Append the new article to the "aside main" container
            projectList.append(newArticle);
            // Clear the input field
            projectTitleInput.value = '';
        }
        //Render added project if there is no other projects
        if(ProjectHandler.projectArray.length === 1) {
            renderProject[0]
        }
    }


    // Add event listener for the "Add" button
    document.getElementById('projectAdd').addEventListener('click', addProjectInputForm);
    addProjectInputForm()
    deleteProjectFromDOM()
}

//Init Interface function
projectDOMInterface()

export { elFactory, projectDOMInterface };

