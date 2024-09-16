// Add event listener to all file name buttons
document.querySelectorAll('.file-name').forEach(button => {
    button.addEventListener("click", () => {
        const dialogId = button.getAttribute('dialog-id');
        const dialog = document.getElementById(dialogId);
        dialog.showModal();
    });
});

// Add event listener to all close buttons
document.querySelectorAll(".file-info .close-button").forEach(button => {
    button.addEventListener("click", () => {
        const correspondingDialog = button.closest("dialog");
        correspondingDialog.close();
    });
});

autosize(document.querySelectorAll("textarea"));