// Add event listener to all file name buttons
document.querySelectorAll('.file-name').forEach(button => {
    button.addEventListener("click", () => {
        const dialogId = button.getAttribute('dialog-id');
        const dialog = document.getElementById(dialogId);
        dialog.showModal();
    });
});

// Add event listener to all close buttons
document.querySelectorAll(".file-info .close-button").forEach(button => {
    button.addEventListener("click", () => {
        const correspondingDialog = button.closest("dialog");
        correspondingDialog.close();
    });
});

// resize textarea when typing
autosize(document.querySelectorAll("textarea"));

const uploadForm = document.getElementById("upload-form")

uploadForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent form from submitting

    const formData = new FormData(uploadForm);

    fetch("/upload", {
        method: "POST",
        body: formData
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
});

const socket = new WebSocket(`https://${window.location.host}`);

// add new file preview when new file is uploaded
socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "newFile") {
        const listItem = document.createElement("li"); // new file preview elt
        listItem.classList.add("file-preview");

        // populate new file preview elt with file data
        const file = data.file;
        listItem.innerHTML = `
        <article class="file-preview">
            <button class="file-name" dialog-id="${file.name}">
                ${file.name}
            </button>
            <dialog class="file-info" id="${file.name}">
                <button class="close-button">X</button>
                <p>Name: ${file.name}</p>
                <p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
                <p>Upload date: ${file.uploadDate}</p>
                ${file.description ? `<p>Description: ${file.description}</p>` : ""}
            </dialog>

            <a href="/download/${file.path}">Download</a>
        </article>
        `;

        // add new file preview elt to list of uploaded
        const fileList = document.querySelector(".uploaded-files-list");
        fileList.appendChild(listItem);
    }
});