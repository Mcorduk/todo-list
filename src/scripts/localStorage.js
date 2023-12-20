/* 
    1-Set up a function that saves the projects (and todos) to localStorage every
    time a new project (or todo) is created
    2- Another function that looks for that data in localStorage when your app 

    Make sure your app doesn’t crash if the data you may want to retrieve 
    from localStorage isn’t there!

     You can inspect data you saved in localStorage using DevTools! To do
      this, open the Application tab in DevTools and click on the Local 
      Storage tab under Storage. Every time you add, update and delete data from 
      localStorage in your app, those changes will be reflected in DevTools.

    localStorage uses JSON to send and store data, and when you retrieve the 
    data, it will also be in JSON format. You will learn more about this 
    language in a later lesson, but it doesn’t hurt to get your feet wet now. 
    Keep in mind you cannot store functions in JSON, so you’ll have to figure 
    out how to add methods back to your object properties once you fetch them.

    I only need to store the projects which means only store ProjectHandler's array
    Make sure default ProjectHandler Array = stored array
    Projects have todo's in them
    Store the projects, render the projects, and render todo's in the first projects,
    that's it
    May need a function to render the Projects
    Simple as cake

*/

import { ProjectHandler } from "./projectFactory";


function savetoLocalStorage() {

    if(localStorage.getItem('projectsData') == null) {
        localStorage.setItem('projectsData', '[]')
    }
    
    // Get old data from localStorage
    let storage_data = JSON.parse(localStorage.getItem('projectsData'))

    // Update existing elements in storage_data with the current ProjectHandler's array
    ProjectHandler.projectArray.forEach((project, index) => {
        storage_data[index] = project;
    });

    localStorage.setItem('projectsData', JSON.stringify(storage_data));
    console.log(storage_data)
    console.log(JSON.stringify(storage_data))
    console.log(`Projects saved.`)

}


function loadFromLocalStorage() {
    try {
        const storage_data = localStorage.getItem('projectsData');

        if (storage_data) {
            ProjectHandler.projectArray = JSON.parse(storage_data);
        }
    } catch (error) {
        console.error("Error loading data from localStorage:", error);
    }
}



export { loadFromLocalStorage, savetoLocalStorage };

