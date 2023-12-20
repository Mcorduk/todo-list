
import { savetoLocalStorage } from "./localStorage";
import { renderProject } from "./projectDOM";
import { ProjectHandler, createProject, elFactory } from "./projectFactory";


//Creates Project delete buttons
const createDeleteButton = () => {
    return elFactory("button", {"class":"projectDelete", "type":"button"},
        elFactory("img", {"src":"../src/img/project-delete.svg","alt":"project delete button image" },""
        )
    )
}


// Do stuff to projects on DOM
const projectDOMInterface = () => {
    // Get DOM container that holds Projects
    const projectList = document.getElementById('projectList');
    

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
                const projectIndex = document.querySelector(".project-div").getAttribute('data-project-index');
                //Save current state of the Project arrays to storage
                savetoLocalStorage();
                //Render The projects Again
                renderAside()
                if(projectIndex === index ){
                    renderProject(ProjectHandler.getLastIndex())

                }
                
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
            savetoLocalStorage();
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

    return {createDeleteButton}
}


const renderAside = () => {

    const container = document.getElementById('projectList');
    container.innerHTML = "";
    const projects = ProjectHandler.projectArray;
    
    let projectIndex = 0;
    for (const project of projects) {
        // Create a new article element
        const newArticle = document.createElement('article');
        // Articles text node is projects name
        newArticle.innerText = project.getName();
        // Articles project index is projects index
        newArticle.dataset.projectIndex = projectIndex;
        //Add the delete button to the new project
        newArticle.append(createDeleteButton());
        // Append the new article to the "aside main" container
        container.append(newArticle);
        console.log(`Aside Project ${projectIndex} was rendered.`)
        projectIndex++;
    }

}

//Init Interface function
projectDOMInterface()


export { elFactory, projectDOMInterface, renderAside };

