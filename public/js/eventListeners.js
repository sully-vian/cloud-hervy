import { getFilesMetadata } from "./metadata.js";
import { uploadFile } from "./upload.js";

// open/close dialog buttons
export function initializeEventListeners() {
    const uploadedFilesList = document.querySelector(".uploaded-files-list");

    // add event listeners to opn / close dialog
    uploadedFilesList.addEventListener("click", (event) => {
        if (event.target.classList.contains("file-name")) {
            fileNameButtonSetup(event);
        } else if (event.target.classList.contains("close-button")) {
            closeButtonSetup(event);
        } else if (event.target.classList.contains("delete-button")) {
            deleteButtonSetup(event);
        }
    });

    const uploadForm = document.getElementById("upload-form");
    uploadForm.addEventListener("submit", (event) => uploadFileAndUpdateMeta(event, uploadForm));
}

function fileNameButtonSetup(event) {
    const dialogID = event.target.getAttribute("dialog-id");
    const dialogElt = document.getElementById(dialogID);
    dialogElt.showModal();
}

function closeButtonSetup(event) {
    const correspondingDialog = event.target.closest("dialog");
    correspondingDialog.close();
}

function deleteButtonSetup(event) {
    console.log("TODO: delete file");
}

/**
 * Upload file to server and update files metadata
 * @param {*} event - form submit event
 * @param {*} uploadForm - form to upload file
 */
async function uploadFileAndUpdateMeta(event, uploadForm) {
    event.preventDefault(); // prevent form from submitting

    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    const filesMetadata = await getFilesMetadata();

    // avoid upload files with same name
    if (filesMetadata[file.name]) {
        const overwrite = confirm("A file with same name already exists. Do you want to overwrite it ?")
        if (!overwrite) { return; }
        const oldFilePreview = document.querySelector(`[preview-id="${file.name}"]`);
        oldFilePreview.remove();
    }

    const formData = new FormData(uploadForm);

    uploadFile(formData);
}