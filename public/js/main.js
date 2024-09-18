import { initializeEventListeners } from "./eventListeners.js";
import { getFilesMetadata } from "./metadata.js";
import { resizeInputTextarea } from "./utilities.js";
import { initilizeWebSocket } from "./webSocket.js";

initializeEventListeners();

initilizeWebSocket();

getFilesMetadata();

resizeInputTextarea();
