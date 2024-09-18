/**
 * Upload file to server
 * @param {*} data - FormData object containing file to upload
 */
export function uploadFile(data) {
    fetch("/upload", {
        method: "POST",
        body: data
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // handle successful upload
                console.log("File uploaded successfully");
            } else {
                // handle failed upload
                console.error("Failed to upload file");
            }
        })
        .catch(error => {
            console.error("Error", error);
        });
}