/**
 * Upload file to server
 * @param {FormData} data - FormData object containing file to upload
 * @returns {Promise<Response>} - The response from the server (hopefully the
 *                                updated html of the page)
 */
export async function uploadFileToServer(data) {
    try {
        const response = await fetch("/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
 * @param {Response} response - The response from the server
 * @returns {Promise<void>} - A promise that resolves when the file list is updated
 */
export async function updateFileList(response) {
    try {
        const updatedFileList = await response.text();
        document.getElementById("uploaded-files").innerHTML = updatedFileList;
        console.log("File list updated successfully");
    } catch (error) {
        console.error("Error when updating file list", error);
    }
}