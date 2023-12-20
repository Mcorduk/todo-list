import { compareAsc, format } from 'date-fns';
import { projectDOMInterface } from './asideDom.js';
import { dialogListeners } from './dialog.js';
import { loadFromLocalStorage, savetoLocalStorage } from './localStorage.js';
import { createTodoCard, renderProject } from './projectDOM';
import { projectRenderer } from './projectDOM.js';
import { ProjectHandler, createProject, projectHandler } from './projectFactory';
import { createTodo, todoHandler } from './todoFactory';



//create Dummy projects, create Dummy Todo's
(function loadDummyData(){
const exampleProject = createProject("Sprint 1");
ProjectHandler.addProject(exampleProject);

const exampleTodo1 = createTodo("Oyun yapıldı.", "Something", "2024-04-04", "normal");
exampleTodo1.toggleCheck();
const exampleTodo2 = createTodo("Ilk 7'ye girildi.", "Something", "2024-04-05", "important");
exampleTodo2.toggleCheck();
const exampleTodo3 = createTodo("San Francisco'ya gidildi.", "Something", "2024-04-06", "urgent");

ProjectHandler.projectArray[0].addTodo(exampleTodo1)
ProjectHandler.projectArray[0].addTodo(exampleTodo2)
ProjectHandler.projectArray[0].addTodo(exampleTodo3)
})();

loadFromLocalStorage();
console.log(ProjectHandler.projectArray[0].getTodos())
//Inital page load, render the first project on default
renderProject(0);

// /////////////////////////////////////////////////////////////////////////////
//DARK/LIGHT THEME TOGGLE IIFE
(function themeToggle() {
  // TOGGLE THEME
  // Get the theme toggle button element
  const themeToggle = document.getElementById('theme-toggle');

  // Function to toggle the dark theme
  function toggleDarkTheme() {
    document.body.classList.toggle('dark-theme');
    const addTodoButton = document.querySelector('.addTodoButton');
    addTodoButton.classList.toggle('addTodoButtonDark');
    // Toggle the dark theme class on the dialog element
    const dialogElement = document.querySelector('dialog');
    if (dialogElement) {
      dialogElement.classList.toggle('dark');
    }

    // Save the user's theme preference to Local Storage
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
  }

  // Event listener for the theme toggle button
  themeToggle.addEventListener('click', toggleDarkTheme);

  // Check if the user's theme preference is already set
  const userThemePreference = localStorage.getItem('theme');

  // If the preference is set, apply the theme
  if (userThemePreference === 'dark') {
    document.body.classList.add('dark-theme');
  }

  // Apply the theme to additional elements
  

})();

// /////////////////////////////////////////////////////////////////////////////






