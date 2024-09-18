import { createFilePreview } from "./filePreview.js";

export function initilizeWebSocket() {
    const uploadedFilesList = document.querySelector(".uploaded-files-list");
    const socket = new WebSocket(`https://${window.location.host}`);

    // add new file preview when new file is uploaded
    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "newFile") {
            const file = data.file;
            const filePreviewElt = createFilePreview(file);
            uploadedFilesList.appendChild(filePreviewElt);
        }
    });
}