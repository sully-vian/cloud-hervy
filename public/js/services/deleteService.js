import { updateFromResponse } from "../utils.js";

/**
 * Handle the file delete process
 * @param {string} fileName - The name of the file to delete
 */
export async function handleDelete(fileName) {
    const res = await deleteFileFromServer(fileName);
    updateFromResponse(res);
}

/**
 * Delete a file from the server
 * @param {string} fileName - The name of the file to delete
 * @returns {Promise<Response>} - The response from the server (new metadata + new html)
 */
async function deleteFileFromServer(fileName) {
    try {
        const response = await fetch(`/delete/${fileName}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete file");
        }
        console.log("File deleted successfully");
        return response;
    } catch (error) {
        console.error("Error when deleting file", error);
    }
}