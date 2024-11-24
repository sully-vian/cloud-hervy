import { updateFromResponse } from "../utils.js";
import { filesMetadata } from "./metadataService.js";

/**
 * Handle the file upload process
 * @param {HTMLFormElement} uploadForm - The form element containing the file to upload
 */
export async function handleUpload(uploadForm) {
    const fileInput = getFileInput();
    const file = fileInput.files[0];

    // check if file with same name already exists
    if (filesMetadata[file.name]) {
        const overwrite = confirm("A file with the same name already exists. Do you want to overwrite it ?");
        if (!overwrite) { return; }
    }

    const formData = new FormData(uploadForm);
    const res = await uploadFileToServer(formData);
    updateFromResponse(res);
}

/**
 * Upload file to server
 * @param {FormData} data - FormData object containing file to upload
 * @returns {Promise<Response>} - The response from the server (new metadata + new html)
 */
async function uploadFileToServer(data) {
    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: data
        });
        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

        console.log("File uploaded successfully");
        return response;

    } catch (error) {
        console.error("Error when uploading file", error);
    }
}

/**
 * Get the file input element
 * @returns {HTMLElement} - The file input element
 */
function getFileInput() {
    return document.getElementById("file-input");
}