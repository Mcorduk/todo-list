import { compareAsc, format } from 'date-fns';
import { projectDOMInterface } from './asideDom.js';
import { dialogListeners } from './dialog.js';
import { createTodoCard, renderProject } from './projectDOM';
import { projectRenderer } from './projectDOM.js';
import { createProject, projectHandler } from './projectFactory.js/index.js';
import { createTodo, todoHandler } from './todoFactory.js/index.js';


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



//Makes dialog box function
dialogListeners()



// FIXME I DONT WORK
function validateForm() {
  var title = document.getElementById('title').value;
  var dueDate = document.getElementById('birthday').value;
  var validationMessageElement = document.getElementById('titleValidationMessage');
  var dateValidationMessageElement = document.getElementById('dateValidationMessage');

  // Clear previous validation messages
  validationMessageElement.innerHTML = '';

  if (title.trim() === '') {
    validationMessageElement.innerHTML = 'Todo Title cannot be empty.';
    return false;
  }

  if (dueDate.trim() === '') {
    dateValidationMessageElement.innerHTML = 'Due Date cannot be empty.';
    return false;
  }

  // Additional validation logic can be added here
  return true; // If all validation passes, the form will be submitted  
}
