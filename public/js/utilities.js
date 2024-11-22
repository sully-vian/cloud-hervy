/**
 * Resize the input textarea to fit the content by using the autosize library.
 */
export function resizeInputTextarea() {
    autosize(document.getElementById("desc-input"));
}

/**
 * Get the delete buttons on the page.
 * @returns {HTMLCollectionOf<Element>} - The delete buttons on the page
 */
export function getDeleteButtons() {
    return document.getElementsByClassName("delete-button");
}