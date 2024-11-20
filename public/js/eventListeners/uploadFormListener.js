// This module contains event listeners for the upload form.

import { handleUpload } from "../services/uploadService.js";
import { uploadForm } from "../variables.js";

/**
 * Add event listener to upload form to dispatch custom event
 */
export function initializeUploadFormListener() {
    uploadForm.addEventListener("submit", (event) => {
        event.preventDefault();
        handleUpload();
    });
}