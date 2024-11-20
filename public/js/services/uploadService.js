import { fileInput } from "../variables.js";
import { updateFilesMetadata } from "./metadataService.js";
import { filesMetadata, uploadForm } from "../variables.js";

/**
 * Handle the file upload process
 */
export async function handleUpload() {
    const file = fileInput.files[0];

    // check if file with same name already exists
    if (filesMetadata[file.name]) {
        const overwrite = confirm("A file with the same name already exists. Do you want to overwrite it ?");
        if (!overwrite) { return; }
    }

    const formData = new FormData(uploadForm);

    const res = await uploadFileToServer(formData);
    try {
        console.log("raw response", res.clone().text());
        const data = await res.json();
        const html = data.html;
        updateFileList(html);
    } catch (error) {
        console.error("Error when parsing response", error);
    }
}

/**
 * Upload file to server
 * @param {FormData} data - FormData object containing file to upload
 * @returns {Promise<Response>} - The response from the server (hopefully the
 *                                updated html of the page)
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
 * Update the file list on the page (server renders _file-previews-list.ejs)
 * @param {string} html - The html to update the file list with
 * @returns {Promise<void>} - A promise that resolves when the file list is updated
 */
async function updateFileList(html) {
    try {
        document.getElementById("uploaded-files").innerHTML = html;
        console.log("File list updated successfully");
    } catch (error) {
        console.error("Error when updating file list", error);
    }
}