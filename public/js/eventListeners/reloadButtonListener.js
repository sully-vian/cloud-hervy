import { handleReload } from "../services/reloadService.js";

/**
 * Get the reload button element
 * @returns {HTMLElement} - The reload button element
 */
function getReloadButton() {
    return document.getElementById('reload-button');
}

export function initializeReloadButtonListener() {
    const reloadButton = getReloadButton();
    reloadButton.addEventListener("click", (event) => {
        handleReload();
    });
}