
import { uploadFileToServer, updateFileList } from "./services/uploadServices.js";
import { getFilesMetadata } from "./services/metadataServices.js"

// open/close dialog buttons
export function initializeEventListeners() {
    initializeFilePreviewListeners();
    initializeUploadFormListener();
}

function initializeFilePreviewListeners() {
    const uploadedFilesList = document.getElementById("file-previews-list");

    // add event listeners to open / close dialog
    uploadedFilesList.addEventListener("click", (event) => {
        if (event.target.classList.contains("file-name")) {
            fileNameButtonSetup(event);
        } else if (event.target.classList.contains("close-button")) {
            closeButtonSetup(event);
        } else if (event.target.classList.contains("delete-button")) {
            deleteButtonSetup(event);
        }
    });
}

function initializeUploadFormListener() {
    const uploadForm = document.getElementById("upload-form");
    uploadForm.addEventListener("submit", (event) => handleUploadFormSubmit);
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
async function handleUploadFormSubmit(event) {
    event.preventDefault(); // prevent form from submitting

    const uploadForm = event.target;
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

    try {
        const response = await uploadFileToServer(formData);
        await updateFileList(response);
    } catch (error) {
        console.error("Error during file upload and html update", error);
    }
}