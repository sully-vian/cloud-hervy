import { resizeInputTextarea } from "./utils.js";
import { initializeUploadFormListener } from "./eventListeners/uploadFormListener.js";
import { setupDeleteButtonListener } from "./eventListeners/deleteButtonListener.js";
import { initializeReloadButtonListener } from "./eventListeners/reloadButtonListener.js";

initializeUploadFormListener();

initializeReloadButtonListener();

setupDeleteButtonListener();

resizeInputTextarea();