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

const socket = new WebSocket(`https://${window.location.host}`);

// add new file preview when new file is uploaded
socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "newFile") {
        const fileList = document.querySelector(".uploaded-file ul");
        const listItem = document.createElement("li");
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
        fileList.appendChild(listItem);
    }
});