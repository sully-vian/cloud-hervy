import { resizeInputTextarea } from "./utils.js";
import { initializeUploadFormListener } from "./eventListeners/uploadFormListener.js";
import { setupDeleteButtonListener } from "./eventListeners/deleteButtonListener.js";
import { initializeReloadButtonListener } from "./eventListeners/reloadButtonListener.js";
import { handleReload } from "./services/reloadService.js";

// first fetch to get all home contents
handleReload();

initializeUploadFormListener();

initializeReloadButtonListener();

setupDeleteButtonListener();

resizeInputTextarea();