import { ProjectHandler } from "./projectFactory";
import { createTodo } from "./todoFactory";


// Get dialog
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");


function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.target; // Get the form that triggered the submit event
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Create a todo object using the form data
    const todo = createTodo(
        formObject.title,
        formObject.description,
        formObject.dueDate,
        formObject.priority
    );

    // Log the todo object to the console
    console.log(todo);
    console.log(todo.getTitle());

    // Close the dialog if needed
    if (favDialog) {
        favDialog.close();
    }
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

function dialogListeners() {

    // Event listener for submit button
    form.addEventListener('submit', submitForm);

    // Show dialog box via button
    showDialog();
}

//Makes dialog box function
dialogListeners()


export { dialogListeners, showDialog };
