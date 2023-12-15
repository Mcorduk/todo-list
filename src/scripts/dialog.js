import { createTodo } from "./todos";
import function submitForm(event) {
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
    const favDialog = document.getElementById("favDialog");
    if (favDialog) {
        favDialog.close();
    }


};

function showDialog() {
    const showButton = document.getElementById("showDialog");
    const favDialog = document.getElementById("favDialog");

    // "Show the dialog" button opens the <dialog> modally
    showButton.addEventListener("click", () => {
        favDialog.showModal();
    });
}

function dialogListeners() {
    const form = document.getElementById("todoForm");

    // Event listener for submit button
    form.addEventListener('submit', submitForm);

    // Show dialog box via button
    showDialog();
}

export { dialogListeners };
