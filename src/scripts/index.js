import { compareAsc, format } from 'date-fns';
import { projectDOMInterface } from './asideDom.js';
import { dialogListeners } from './dialog.js';
import { createTodoCard, renderProject } from './projectDOM';
import { projectRenderer } from './projectDOM.js';
import { createProject, projectHandler } from './projectFactory';
import { createTodo, todoHandler } from './todoFactory';

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
})();

// /////////////////////////////////////////////////////////////////////////////


projectDOMInterface()



