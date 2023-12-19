import { format } from "date-fns";
import { renderProject } from "./projectDOM";
import { ProjectHandler, createProject } from "./projectFactory";
import { createTodo } from "./todoFactory";

// Get dialog
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

let currentTodo; // Variable to store the current todo

function parentProjectIndex() {
    const projectDiv = document.querySelector(".project-div");
    
    if (projectDiv) {
        const dataIndex = projectDiv.getAttribute('data-project-index');
        
        if (dataIndex) {
            console.log(`Form submitted: the project form submitted in is ${dataIndex}`)
            return parseInt(dataIndex, 10); // Convert to integer
        }
    }
    console.log("Returning project index to add todo failed.")
    return null; // Return null if no valid index is found
}


// #FIXME Please do not write functions like this
function submitForm(event) {

    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.target; // Get the form that triggered the submit event
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    console.log(formObject.dueDate)
    // Create a todo object using the form data
    const todo = createTodo(
        formObject.title,
        formObject.description,
        formObject.dueDate,
        formObject.priority
    );
    //Get the index of the parent project Div
    let index = parentProjectIndex()
    //Add the submitted Todo to the currrent projects array
    ProjectHandler.projectArray[index].addTodo(todo);
    //render the project again so new todo is also in the Dom
    renderProject(index)
    // Log the todo object to the console
    console.log(todo);
    console.log(todo.getTitle());
    //Reset the form inputs
    form.reset();
    //Close the dialog box
    dialog.close();
};


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
  

function showDialog() {
    const projectDiv = document.querySelector(".project-div")

    projectDiv.addEventListener("click", function (event) {
        console.log(event.target);
        const addButtonDiv = event.target.closest(".addTodoButton");

        if (addButtonDiv) {
            dialog.showModal()
        }
    });
}

function closeDialog() {
    const cancelButton = document.getElementById("cancelButton");

    if (cancelButton) {
        cancelButton.addEventListener("click", function () {
            if (favDialog) {
                favDialog.close();
            }
        });
    }
    //Reset the form
    form.reset();
}
//Makes dialog box function
(function dialogListeners() {

    // Event listener for submit button
    form.addEventListener('submit', submitForm);

    // Show dialog box via button
    showDialog();
    // Close dialog box via button
    closeDialog();
})()


export { showDialog };
