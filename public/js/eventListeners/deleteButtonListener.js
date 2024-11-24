import { handleDelete } from "../services/deleteService.js";

/**
 * Add event lesteners to all delete buttons
 */
export function setupDeleteButtonListener() {
    const deleteButtons = Array.from(getDeleteButtons());
    deleteButtons.forEach(button => {
        const fileName = button.closest(".file-preview").id;
        button.addEventListener("click", () => {
            handleDelete(fileName);
        });
    });
}

/**
 * Get the delete buttons on the page.
 * @returns {HTMLCollectionOf<Element>} - The delete buttons on the page
 */
function getDeleteButtons() {
    return document.getElementsByClassName("delete-button");
}