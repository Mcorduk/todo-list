function dialogListeners() {
    const showButton = document.getElementById("showDialog");
    const favDialog = document.getElementById("favDialog");
    const confirmBtn = favDialog.querySelector("#confirmBtn");


    // "Show the dialog" button opens the <dialog> modally
    const showDialog = () => {
        showButton.addEventListener("click", () => {
            favDialog.showModal();
        })
    }

    // Prevent the "confirm" button from the default behavior of submitting form,
    //and close the dialog with the `close()` method, triggers "close" event.
    
    //Show dialog box via button
    showDialog()
}


export { dialogListeners };

