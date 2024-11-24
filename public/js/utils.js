import { setupDeleteButtonListener } from "./eventListeners/deleteButtonListener.js";
import { updateFilesMetadata } from "./services/metadataService.js";

/**
 * Resize the input textarea to fit the content by using the autosize library.
 */
export function resizeInputTextarea() {
    autosize(document.getElementById("desc-input"));
}

/**
 * Extract the HTML and metadata from a response.
 * @param {Response} response - The response from the server
 * @returns {Promise<{html: string, metadata: object}>} - The extracted HTML and metadata
 */
export async function ExtractHTMLAndMetadata(response) {
    try {
        const data = await response.json();
        const html = data.html;
        const metadata = data.metadata;
        return { html, metadata };
    } catch (error) {
        console.error("Error when parsing response", error);
    }
}

/**
 * Update the file list on the page (server renders _file-previews-list.ejs)
 * @param {string} html - The html to update the file list with
 * @returns {Promise<void>} - A promise that resolves when the file list is updated
 */
export async function updateFileList(html) {
    try {
        document.getElementById("file-previews-list").innerHTML = html;
        console.log("File list updated successfully");
    } catch (error) {
        console.error("Error when updating file list", error);
    }
    setupDeleteButtonListener();
}

/**
 * Parse and update metadata and display
 * @param {Response} res - The response from the server (containing metadata and html)
 */
export async function updateFromResponse(res) {
    const { html, metadata } = await ExtractHTMLAndMetadata(res);
    updateFilesMetadata(metadata);
    updateFileList(html);
}