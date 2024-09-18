/**
 * Creates a new file preview element
 * @param {*} file - file to create preview for
 * @returns {HTMLElement} - new file preview element
 */
export function createFilePreview(file) {
    const listItem = document.createElement("li"); // new file preview elt
    listItem.classList.add("file-preview");

    // populate new file preview elt with file data
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

        <a href="/download/${file.name}">Download</a>
        <button class="delete-button">Delete</button>
    </article>
    `;

    return listItem
}