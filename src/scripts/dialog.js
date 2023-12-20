// Importing necessary modules and functions
import { format } from "date-fns";
import { savetoLocalStorage } from "./localStorage";
import { renderProject } from "./projectDOM";
import { ProjectHandler, createProject } from "./projectFactory";
import { createTodo } from "./todoFactory";

// Get dialog element and form element
const dialog = document.getElementById("addTodoDialog");
const form = document.querySelector("form");

// Function to get the index of the parent project, determining which project todo to be added
function parentProjectIndex() {
    const projectDiv = document.querySelector(".project-div");

    if (projectDiv) {
        const dataIndex = projectDiv.getAttribute('data-project-index');

        if (dataIndex) {
            console.log(`Form submitted: the project form submitted in is ${dataIndex}`);
            return parseInt(dataIndex, 10); // Convert to integer
        }
    }
    console.log("Returning project index to add todo failed.");
    return null; // Return null if no valid index is found
}

// Function to handle form submission for adding a new todo
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

        // Create a todo object using the form data
        const todo = createTodo(
            formObject.title,
            formObject.description,
            formObject.dueDate,
            formObject.priority
        );

        // Get the index of the parent project Div
        let index = parentProjectIndex();
        // Add the submitted Todo to the current projects array
        ProjectHandler.projectArray[index].addTodo(todo);
        // Render the project again so the new todo is also in the DOM
        renderProject(index);

        form.reset(); // Reset the form inputs
        dialog.close(); // Close the dialog box
    }
}

// Function to handle form submission for editing an existing todo
function editForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    if (validateForm()) {
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

        // Get the index of the parent project Div
        let index = parentProjectIndex();
        // Get the index of the todo to be edited
        let todoIndex = form.dataset.todoIndex;
        // Replace the todo in the current projects array
        ProjectHandler.projectArray[index].replaceTodo(todoIndex, todo);
        // Render the project again so the edited todo is reflected in the DOM
        renderProject(index);

        form.reset(); // Reset the form inputs
        dialog.close(); // Close the dialog box

        // Remove the "edit" class if it exists
        if (form.classList.contains("edit")) {
            form.classList.remove("edit");
        }
    }
}

// Function to clear validation messages
function clearValidationMessage() {
    const titleValidationMessage = document.getElementById('titleValidationMessage');
    const dateValidationMessage = document.getElementById('dateValidationMessage');

    // Clear previous validation messages
    titleValidationMessage.textContent = '';
    dateValidationMessage.textContent = '';
}

// Function to validate form inputs
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
        // Additional date validation (due date must be in the future)
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

// Function to show the dialog box when the "Add Todo" button is clicked
function showDialog() {
    const projectDiv = document.querySelector(".project-div");

    projectDiv.addEventListener("click", function (event) {
        const addButtonDiv = event.target.closest(".addTodoButton");

        if (addButtonDiv) {
            dialog.showModal();
            form.removeEventListener('submit', editForm); // Remove the previous listener
            form.addEventListener('submit', submitForm);
        }
    });
}

// Function to show the edit dialog box when the "Edit Todo" button is clicked
function showEditDialog() {
    const projectDiv = document.querySelector(".project-div");

    projectDiv.addEventListener("click", function (event) {
        const editTodoButton = event.target.closest(".editTodoButton");
        const cardToEdit = event.target.closest(".card");

        if (editTodoButton && cardToEdit) {
            const index = cardToEdit.dataset.todoIndex;

            // Set the form to edit mode
            form.classList.add("edit");
            form.dataset.todoIndex = index;
            dialog.showModal();

            // Dynamically attach the appropriate function to the submit event
            form.removeEventListener('submit', submitForm); // Remove the previous listener
            form.addEventListener('submit', editForm);
        }
    });
}

// Function to close the dialog box when the "Cancel" button is clicked
function closeDialog() {
    const cancelButton = document.getElementById("cancelButton");

    if (cancelButton) {
        cancelButton.addEventListener("click", function () {
            if (dialog) {
                dialog.close();
                // Clear any validation messages
                clearValidationMessage();
                // Reset the form
                form.reset();
                // Remove edit mode from the form
                if (form.classList.contains("edit")) {
                    form.classList.remove("edit");
                }
            }
        });
    }
}

// Self-invoking function to set up dialog box event listeners
(function dialogListeners() {
    // Event listener for submit button
    form.addEventListener('submit', submitForm);

    // Show dialog box via button
    showDialog();
    // Show edit todo dialog box via button
    showEditDialog();
    // Close dialog box via button
    closeDialog();
})();

// Exporting form and showDialog function
export { form, parentProjectIndex, showDialog };

