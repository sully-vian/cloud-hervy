// This module contains event listeners for the upload form.

/**
 * Add event listener to upload form to dispatch custom event
 */
export function initializeUploadFormListener() {
    const uploadForm = document.getElementById("upload-form");
    uploadForm.addEventListener("submit", (event) => {
        event.preventDefault(); // prevent form from submitting
        uploadForm.dispatchEvent(
            new CustomEvent("uploadFormSubmit", {
                detail: { submitEvent: event }
            }));
    });
}