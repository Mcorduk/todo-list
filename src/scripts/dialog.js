import { format } from "date-fns";
import { renderProject } from "./projectDOM";
import { ProjectHandler, createProject } from "./projectFactory";
import { createTodo } from "./todoFactory";

// Get dialog
const dialog = document.getElementById("addTodoDialog");
const form = document.querySelector("form");


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

    if (validateForm()) {
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

    let index = parentProjectIndex(); //Get the index of the parent project Div
    //Add the submitted Todo to the currrent projects array
    ProjectHandler.projectArray[index].addTodo(todo);
    renderProject(index); //render the project again so new todo is also in the Dom

    form.reset(); //Reset the form inputs
    dialog.close(); //Close the dialog box
    }
};


function clearValidationMessage() {
    const titleValidationMessage = document.getElementById('titleValidationMessage');
    const dateValidationMessage = document.getElementById('dateValidationMessage');

    // Clear previous validation messages
    titleValidationMessage.textContent = '';
    dateValidationMessage.textContent = '';
}


// Validate Form
function validateForm() {
    const titleInput = document.getElementById('title');
    const dueDateInput = document.getElementById('dueDate');

    clearValidationMessage();

    // Perform validation
    if (!titleInput.value.trim()) {
        titleValidationMessage.textContent = 'Todo Title cannot be empty.';
        return false;
    }

    if (!dueDateInput.value.trim()) {
        dateValidationMessage.textContent = 'Due Date cannot be empty.';
        return false;
    } else {
        // You can perform additional date validation if needed
        const currentDate = new Date();
        const selectedDate = new Date(dueDateInput.value);

        if (selectedDate < currentDate) {
            dateValidationMessage.textContent = 'Due Date must be in the future.';
            return false;
        }
    }

    // If all validations pass
    return true;
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
            if (dialog) {
                dialog.close();
                //Clear any validation messages
                clearValidationMessage();
                //Reset the form
                form.reset();
            }
        });
    }


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
