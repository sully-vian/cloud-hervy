import { handleUpload } from "../services/uploadService.js";

/**
 * Get the upload form element
 * @returns {HTMLElement} - The upload form element
 */
function getUploadForm() {
    return document.getElementById("upload-form");
}
/**
 * Add event listener to upload form to dispatch custom event
 */
export function initializeUploadFormListener() {
    const uploadForm = getUploadForm();
    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await handleUpload(uploadForm);
    });
}