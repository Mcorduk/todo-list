import { createProject } from "./projects";


// Do stuff to projects on DOM
const projectDOMInterface = () => {

    // DELETE BUTTON FUNCTION FOR THE PROJECT
    //TODO 
    //Hook it up to projects storage
    //Make sure projects are also deleted from the project storage
    (function () {

        function deleteProject() {
            const projectList = document.querySelector("#projectList");

            projectList.addEventListener("click", function (event) {
                if (event.target.classList.contains("projectDelete")) {
                    const currentProject = event.target.closest("article");
                    let index = currentProject.dataset.projectIndex
                    // Remove the Project From The DOM
                    currentProject.remove();
                    // Remove the Project from Project Array
                    //TODO ADD ME BACK
                    // removeProjectFromArray(index);
                }
            });
        }
        document.addEventListener("DOMContentLoaded", deleteProject);

    })();

    // Add Projects using the Input
    // Project Input Form
    function addProjectInputForm() {
        // Get the input value
        const projectTitleInput = document.getElementById('projectTitle');
        const projectTitle = projectTitleInput.value.trim();

        // Check if the input is not empty
        if (projectTitle !== '') {
            // Create a new article element
            const newArticle = document.createElement('article');
            newArticle.innerText = projectTitle;

            // Prepend the new article to the "aside main" container
            const projectList = document.getElementById('projectList');
            projectList.append(newArticle);

            // Clear the input field
            projectTitleInput.value = '';
        }
        // Create a project
        //TODO ADD ME BACK
        // const Project = createProject(projectTitle)
        // projectArray.push(Project)

    }
    console.log(projectArray)
    // Add event listener for the "Add" button
    document.getElementById('projectAdd').addEventListener('click', addProjectInputForm);
    addProjectInputForm()
}


export { projectDOMInterface };

