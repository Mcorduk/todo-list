import { compareAsc, format } from 'date-fns';
import { createProject, createTodo, todoHandler } from './projects.js';

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

(function dialogListeners() {
  const showButton = document.getElementById("showDialog");
  const favDialog = document.getElementById("favDialog");
  const outputBox = document.querySelector("output");
  const selectEl = favDialog.querySelector("select");
  const confirmBtn = favDialog.querySelector("#confirmBtn");


  // "Show the dialog" button opens the <dialog> modally
  showButton.addEventListener("click", () => {
    favDialog.showModal();
  });

  // "Favorite animal" input sets the value of the submit button
  selectEl.addEventListener("change", (e) => {
    confirmBtn.value = selectEl.value;
  });

  // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
  favDialog.addEventListener("close", (e) => {
    outputBox.value =
      favDialog.returnValue === "default"
        ? "No return value."
        : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
  });

  // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
  confirmBtn.addEventListener("click", (event) => {

    event.preventDefault(); // We don't want to submit this fake form
    favDialog.close(selectEl.value); // Have to send the select box value here.

  });
})();

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
          currentProject.remove();
        }
      });
    }
    document.addEventListener("DOMContentLoaded", deleteProject);
  })();


  // Add Projects using the Input
  (function () {
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
    }
  
    // Add event listener for the "Add" button
    document.getElementById('projectAdd').addEventListener('click', addProjectInputForm);
  })();
}

projectDOMInterface()
